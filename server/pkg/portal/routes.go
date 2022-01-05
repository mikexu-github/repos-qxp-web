package portal

import (
	"net/http"
	"qxp-web/server/pkg/contexts"
	"qxp-web/server/pkg/contexts/probe"
	"qxp-web/server/pkg/portal/handlers"

	"github.com/gorilla/mux"
)

func loginRequired(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		r, ok := handlers.PrepareRequest(r)
		if !ok {
			handlers.RedirectToLoginPage(w, r, "")
			return
		}

		h(w, r)
	}
}

func tokenRequired(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if !handlers.HasToken(r) {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		r, _ = handlers.PrepareRequest(r)

		h(w, r)
	}
}

// GetRouter return mux router
func GetRouter() http.Handler {
	probe := probe.New()
	r := mux.NewRouter()

	r.Headers("X-Proxy", "API").HandlerFunc(tokenRequired(handlers.ProxyAPIHandler))
	r.Headers("X-Proxy", "API-NO-AUTH").HandlerFunc(handlers.ProxyAPIHandler)
	r.Headers("X-Proxy", "FORM_DATA").HandlerFunc(handlers.FormDataHandler)
	r.Headers("X-Proxy", "FORM_SCHEMA").HandlerFunc(handlers.FormSchemaHandler)
	r.Path("/_otp").Methods("GET").HandlerFunc(tokenRequired(handlers.OTPHandler))
	r.Path("/_jump_to_home").Methods("GET").HandlerFunc(tokenRequired(handlers.JumpToHome))
	r.Path("/_land_from_portal").Methods("GET").HandlerFunc(handlers.LandFromPortal)
	r.Path("/__liveness").Methods("GET").HandlerFunc(probe.LivenessProbe)
	r.Path("/__readiness").Methods("GET").HandlerFunc(probe.ReadinessProbe)

	r.Path("/login/{type}").Methods("GET").HandlerFunc(handlers.HandleLogin)
	r.Path("/login/{type}").Methods("POST").HandlerFunc(handlers.HandleLoginSubmit)
	r.Path("/logout").Methods("GET").HandlerFunc(handlers.LogoutHandler)
	r.Path("/resetPassword").Methods("GET").HandlerFunc(loginRequired(handlers.HandleResetPassword))
	r.Path("/resetPassword").Methods("POST").HandlerFunc(handlers.HandleResetPasswordSubmit)
	r.Path("/retrievePassword").Methods("GET").HandlerFunc(handlers.HandleRetrievePassword)
	r.Path("/retrievePassword").Methods("POST").HandlerFunc(handlers.HandleRetrievePasswordSubmit)

	r.Path("/upload").Methods("POST").HandlerFunc(tokenRequired(handlers.FileUploadHandler))
	r.Path("/upload/swagger").Methods("POST").HandlerFunc(tokenRequired(handlers.SwaggerUploadHandler))
	r.PathPrefix("/blob").Methods("GET").HandlerFunc(tokenRequired(handlers.FileProxyHandler))

	r.Path("/api/page_schema_with_swagger").Methods("GET").Handler(tokenRequired(handlers.HandleGetSchema))

	// todo server this request in a different package
	r.Host(contexts.Config.ClientConfig.HomeHostname).PathPrefix("/mobile").Methods("GET").HandlerFunc(loginRequired(handlers.MobileHandler))
	r.Host(contexts.Config.ClientConfig.HomeHostname).Methods("GET").HandlerFunc(loginRequired(handlers.HomeHandler))

	r.PathPrefix("/").Methods("GET").HandlerFunc(loginRequired(handlers.PortalHandler))

	return contexts.WithUtilContext(r)
}
