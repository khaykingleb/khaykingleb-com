resource "vercel_project" "khaykingleb_com" {
  name         = "khaykingleb-com"
  framework    = "nextjs"
  node_version = "22.x"

  install_command = "make deps-prod"
  build_command   = "make build"
  dev_command     = "make dev"


  git_repository = {
    type = "github"
    repo = "khaykingleb/khaykingleb-com"
  }
}

resource "vercel_project_environment_variable" "supabase_url" {
  project_id = vercel_project.khaykingleb_com.id
  key        = "NEXT_PUBLIC_SUPABASE_URL"
  value      = "https://${supabase_project.khaykingleb_com.id}.supabase.co"
  target     = ["production", "preview", "development"]
  comment    = "Environment variable for the Supabase project URL"
}

resource "vercel_project_environment_variable" "supabase_anon_key" {
  project_id = vercel_project.khaykingleb_com.id
  key        = "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  value      = data.supabase_apikeys.khaykingleb_com.anon_key
  target     = ["production", "preview", "development"]
  comment    = "Environment variable for the Supabase anonymous key used in client-side code"
}

resource "vercel_project_domain" "khaykingleb_com" {
  project_id = vercel_project.khaykingleb_com.id
  domain     = cloudflare_dns_record.khaykingleb_com.name
}

resource "vercel_project_domain" "www_khaykingleb_com" {
  project_id = vercel_project.khaykingleb_com.id
  domain     = cloudflare_dns_record.www_khaykingleb_com.name

  redirect             = vercel_project_domain.khaykingleb_com.domain
  redirect_status_code = 308
}

resource "vercel_attack_challenge_mode" "example" {
  project_id = vercel_project.khaykingleb_com.id
  enabled    = false
}
