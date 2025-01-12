output "supabase_url" {
  value       = "https://${supabase_project.this.id}.supabase.co"
  description = "The URL of the Supabase project"
}

output "supabase_anon_key" {
  value       = data.supabase_apikeys.this.anon_key
  description = "The anon key of the Supabase project"
  sensitive   = true
}

output "supabase_service_role_key" {
  value       = data.supabase_apikeys.this.service_role_key
  description = "The service role key of the Supabase project"
  sensitive   = true
}
