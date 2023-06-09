package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"qxp-web/server/pkg/contexts"
	"time"

	"github.com/tidwall/gjson"
)

type contextKey int

const (
	ctxUser contextKey = iota
	ctxToken
	ctxUA
)

// LoginResponseData login response data struct
type LoginResponseData struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	Expire       string `json:"expiry"`
}

// RefreshTokenResponse refresh token response struct
type RefreshTokenResponse struct {
	Code    int              `json:"code"`
	Message string           `json:"msg"`
	Data    RefreshTokenData `json:"data"`
}

// LoginResponse login response struct
type LoginResponse struct {
	Code    int               `json:"code"`
	Message string            `json:"msg"`
	Data    LoginResponseData `json:"data"`
}

// ResetPasswordResponse reset password response struct
type ResetPasswordResponse struct {
	Code    int    `json:"code"`
	Message string `json:"msg"`
}

// RefreshTokenData refresh token response data struct
type RefreshTokenData struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	Expire       string `json:"expiry"`
}

// Department represents department fields
type Department struct {
	ID       string `json:"id"`
	Grade    int    `json:"grade"`
	Pid      string `json:"pid"`
	SuperID  string `json:"superID"`
	LeaderID string `json:"leaderID"`
	Name     string `json:"name"`
	Attr     int    `json:"attr"`
}

// User represents user fields
type User struct {
	ID        string           `json:"id"`
	Name      string           `json:"name"`
	Email     string           `json:"email"`
	SelfEmail string           `json:"selfEmail"`
	Avatar    string           `json:"avatar"`
	Phone     string           `json:"phone"`
	UseStatus int              `json:"useStatus"`
	Status    int              `json:"status"`
	Deps      []([]Department) `json:"deps"`
}

func getTokenKey(r *http.Request) string {
	session := contexts.GetCurrentRequestSession(r)

	return fmt.Sprintf("portal:session:%s:token", session.ID)
}

func getRefreshTokenKey(r *http.Request) string {
	session := contexts.GetCurrentRequestSession(r)

	return fmt.Sprintf("portal:session:%s:refresh_token", session.ID)
}

func getRefreshToken(r *http.Request) string {
	return contexts.Cache.Get(contexts.Ctx, getRefreshTokenKey(r)).Val()
}

// renewToken refresh token
func renewToken(r *http.Request, refreshToken string) bool {
	requestID := contexts.GetRequestID(r)
	respBody, errMsg := contexts.SendRequest(r.Context(), "POST", "/api/v1/warden/refresh", nil, map[string]string{
		"Content-Type":  "application/json",
		"Refresh-Token": refreshToken,
	})

	if errMsg != "" {
		contexts.Logger.Errorf("failed to renew token by refresh_token: %s, error: %s, request_id: %s", refreshToken, errMsg, requestID)
		return false
	}

	var refreshTokenResponse RefreshTokenResponse
	if err := json.Unmarshal(respBody, &refreshTokenResponse); err != nil {
		contexts.Logger.Errorf("failed to unmarshal refresh token body, err: %s, request_id: %s", err.Error(), requestID)
		return false
	}

	if refreshTokenResponse.Data.AccessToken == "" {
		return false
	}

	expireTime, err := time.Parse(time.RFC3339, refreshTokenResponse.Data.Expire)
	if err != nil {
		contexts.Logger.Errorf("invalid token expire value: %v, request_id: %s", refreshTokenResponse.Data.Expire, requestID)
		return false
	}

	saveToken(r, refreshTokenResponse.Data.AccessToken, refreshTokenResponse.Data.RefreshToken, expireTime)

	return true
}

func saveToken(r *http.Request, token string, refreshToken string, expireTime time.Time) {
	tokenKey := getTokenKey(r)
	refreshTokenKey := getRefreshTokenKey(r)
	duration := time.Until(expireTime) - time.Hour

	err := contexts.Cache.Set(contexts.Ctx, tokenKey, token, duration).Err()
	if err != nil {
		log.Fatalf("failed to save user token to cache: %s", err.Error())
	}

	err = contexts.Cache.Set(contexts.Ctx, refreshTokenKey, refreshToken, time.Hour*23).Err()
	if err != nil {
		log.Fatalf("failed to save user refresh_token to cache: %s", err.Error())
	}
}

// getToken return token with auto-renew
func getToken(r *http.Request) string {
	tokenKey := getTokenKey(r)
	token := contexts.Cache.Get(contexts.Ctx, tokenKey).Val()
	if token != "" {
		return token
	}

	refreshToken := getRefreshToken(r)
	if refreshToken == "" {
		return ""
	}

	if !renewToken(r, refreshToken) {
		return ""
	}

	return contexts.Cache.Get(contexts.Ctx, tokenKey).Val()
}

func getCurrentUser(ctx context.Context, token string) *User {
	respBody, errMsg := contexts.SendRequest(ctx, "GET", "/api/v1/org/h/user/info", nil, map[string]string{
		"Access-Token": token,
	})

	if errMsg != "" {
		contexts.Logger.Errorf("get user info error: %s", errMsg)
		return nil
	}

	var user User
	userRaw := gjson.Get(string(respBody), "data").Raw
	if err := json.Unmarshal([]byte(userRaw), &user); err != nil {
		contexts.Logger.Errorf("failed to unmarshal user, err: %s", err.Error())
		return nil
	}

	return &user
}

// PrepareRequest assign token and user on request context
func PrepareRequest(r *http.Request) (*http.Request, bool) {
	session := contexts.GetCurrentRequestSession(r)
	if session.IsNew {
		return r, false
	}

	token := getToken(r)
	if token == "" {
		return r, false
	}

	user := getCurrentUser(r.Context(), token)
	if user == nil {
		return r, false
	}

	ctx := r.Context()
	ctx = context.WithValue(ctx, ctxToken, token)
	ctx = context.WithValue(ctx, ctxUser, user)
	r = r.WithContext(ctx)

	return r, true
}

// HasToken return current session has token
func HasToken(r *http.Request) bool {
	session := contexts.GetCurrentRequestSession(r)
	if session.IsNew {
		return false
	}

	return "" != getToken(r)
}

// RedirectToLoginPage redirect to login page
func RedirectToLoginPage(w http.ResponseWriter, r *http.Request) {
	session := contexts.GetCurrentRequestSession(r)
	redirectURL := r.URL.Path
	if r.URL.RawQuery != "" {
		redirectURL = fmt.Sprintf("%s?%s", redirectURL, r.URL.RawQuery)
	}
	session.Values["redirect_url"] = redirectURL

	if err := session.Save(r, w); err != nil {
		renderErrorPage(w, r, http.StatusInternalServerError, http.StatusText(http.StatusInternalServerError))
		return
	}

	http.Redirect(w, r, "/login", http.StatusFound)
}
