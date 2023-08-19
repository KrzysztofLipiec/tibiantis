data "google_project" "project" {}

resource "google_cloud_scheduler_job" "scheduler" {
  name             = "online-counter-job"
  schedule         = "*/15 * * * *"
  time_zone        = "Europe/Warsaw"
  attempt_deadline = "60s"
  description      = "Online counter job"
  http_target {
    http_method = "GET"
    uri         = var.online_counter_url
    oidc_token {
      audience              = var.online_counter_url
      service_account_email = "${data.google_project.project.name}@appspot.gserviceaccount.com"
    }
  }
}
