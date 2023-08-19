terraform {
  required_providers {
    google = {
      version = "4.44.1"
    }
    #used only for liveness/startup probes in cloud run.
    google-beta = {
      version = "4.56.0"
    }
  }
}

provider "google" {
  project = "tibiantis-charts"
  region  = "europe-west3"
  zone    = "europe-west3-b"
}

terraform {
  backend "gcs" {
    bucket = "tibiantis-state"
    prefix = "terraform/state"
  }
}

module "common" {
  source = "./modules/common"
}

module "cloudFunctions" {
  source              = "./modules/cloud-functions"
  config_files_bucket = module.common.config_files_bucket
}

module "schedulers" {
  source = "./modules/schedulers"
  online_counter_url = module.cloudFunctions.online_counter_url
}
