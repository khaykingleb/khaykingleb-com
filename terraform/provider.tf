provider "supabase" {
  access_token = var.supabase_access_token
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

provider "vercel" {
  api_token = var.vercel_api_token
}
