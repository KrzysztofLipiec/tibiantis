data "google_project" "project" {}


resource "google_storage_bucket" "config_files" {
  force_destroy = false

  labels = {
  }

  location                 = "EU"
  name                     = "${data.google_project.project.project_id}-config-files-bucket"
  public_access_prevention = "inherited"
  storage_class            = "STANDARD"
}



