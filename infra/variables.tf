variable "vercel_api_token" {
  description = "The Vercel API token"
  type        = string
  sensitive   = true
}

variable "supabase_url" {
  description = "The Supabase URL"
  type        = string
  sensitive   = true
}

variable "supabase_service_role_key" {
  description = "The Supabase service role key"
  type        = string
  sensitive   = true
}

variable "supabase_anon_key" {
  description = "The Supabase anon key"
  type        = string
  sensitive   = true
}
