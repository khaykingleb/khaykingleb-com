terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.6.0"
    }
    vercel = {
      source  = "vercel/vercel"
      version = "~> 3.7.0"
    }
    supabase = {
      source  = "supabase/supabase"
      version = "~> 1.5.1"
    }
  }

  required_version = ">= 1.12.0"
}
