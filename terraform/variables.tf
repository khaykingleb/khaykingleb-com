variable "supabase_organization_id" {
  description = "The ID of the Supabase organization"
  type        = string
  sensitive   = true
}

variable "supabase_access_token" {
  description = "The personal access token for the Supabase"
  type        = string
  sensitive   = true
}

variable "supabase_database_password" {
  description = "The password for the Supabase database"
  type        = string
  sensitive   = true
}

variable "cloudflare_api_token" {
  description = "The Cloudflare API token"
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "The Cloudflare account ID"
  type        = string
  sensitive   = true
}

variable "vercel_api_token" {
  description = "The Vercel API token"
  type        = string
  sensitive   = true
}
