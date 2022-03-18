package handlers

import (
	"encoding/json"
	"net/http"
	"qxp-web/server/pkg/contexts"

	"github.com/tidwall/gjson"
)

func getAdminUserFuncTags(r *http.Request) []string {
	respBody, errMsg := sendRequest(r.Context(), "POST", "/api/v1/regoalie/role/func/user/list", map[string]string{})
	if errMsg != "" {
		contexts.Logger.Errorf("failed to get user func tags: %s", errMsg)
		return []string{}
	}

	tagRaw := gjson.Get(string(respBody), "data.tag").Raw
	var tags []string
	if err := json.Unmarshal([]byte(tagRaw), &tags); err != nil {
		contexts.Logger.Errorf("failed to unmarshal listUserFuncTag: %s", err.Error())

		return []string{}
	}

	return tags
}

// Role represents user role fields
type Role struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	RoleID string `json:"roleID"`
	Tag    string `json:"tag"`
}

func getUserAdminRoles(r *http.Request) []Role {
	respBody, errMsg := sendRequest(r.Context(), "GET", "/api/v1/regoalie/role/now/list", map[string]string{})
	if errMsg != "" {
		contexts.Logger.Errorf("failed to get user roles: %s", errMsg)
		return []Role{}
	}

	rolesRaw := gjson.Get(string(respBody), "data.roles").Raw
	var roles []Role
	if err := json.Unmarshal([]byte(rolesRaw), &roles); err != nil {
		contexts.Logger.Errorf("failed to unmarshal user roles: %s", err.Error())

		return []Role{}
	}

	return roles
}