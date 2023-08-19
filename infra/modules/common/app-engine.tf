resource "google_project_service" "appengine" {
  service            = "appengine.googleapis.com"
  disable_on_destroy = false
}

resource "google_app_engine_application" "app" {
  project       = data.google_project.project.name
  location_id   = "europe-west3"
  database_type = "CLOUD_DATASTORE_COMPATIBILITY"
  depends_on    = [google_project_service.appengine]
  lifecycle {
    prevent_destroy = true
  }
}

