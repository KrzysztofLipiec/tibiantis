resource "google_project_service" "cloudfunctions" {
  service            = "cloudfunctions.googleapis.com"
  disable_on_destroy = false
}

data "archive_file" "code_source" {
  source_dir  = "../packages/count-checker"
  output_path = "/tmp/count-checker-code.zip"
  type        = "zip"
}

resource "google_storage_bucket_object" "code_source" {
  name   = "count-checker-code.zip"
  bucket = var.config_files_bucket
  source = data.archive_file.code_source.output_path
  cache_control = "public, max-age=0, no-cache"
}

resource "google_cloudfunctions_function" "online_counter" {
  name                  = "online_counter"
  description           = "A simple function that counts online users"
  runtime               = "nodejs18"
  source_archive_bucket = var.config_files_bucket
  source_archive_object = google_storage_bucket_object.code_source.name
  trigger_http          = true
  entry_point           = "playersCountChecker"
  available_memory_mb   = 128
  timeout               = 60
  depends_on            = [google_project_service.cloudfunctions]
}
