terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 2.8.0"
    }
    supabase = {
      source  = "supabase/supabase"
      version = "~> 1.5.1"
    }
  }

  required_version = "~> 1.5.4"
}
