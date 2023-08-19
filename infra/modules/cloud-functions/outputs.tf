output "online_counter_url" {
  value = google_cloudfunctions_function.online_counter.https_trigger_url
}
