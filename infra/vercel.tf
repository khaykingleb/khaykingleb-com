resource "vercel_project" "khaykingleb_com" {
  name      = "khaykingleb-com"
  framework = "remix"

  install_command = "make deps-prod"
  build_command   = "make build"
  dev_command     = "make run-dev"

  git_repository = {
    type = "github"
    repo = "khaykingleb/khaykingleb-com"
  }
}

resource "vercel_project_environment_variable" "supabase_url" {
  project_id = vercel_project.khaykingleb_com.id
  key        = "SUPABASE_URL"
  value      = "https://${supabase_project.this.id}.supabase.co"
  target     = ["production", "preview", "development"]
  comment    = "Supabase URL"
}

resource "vercel_project_environment_variable" "supabase_anon_key" {
  project_id = vercel_project.khaykingleb_com.id
  key        = "SUPABASE_ANON_KEY"
  value      = data.supabase_apikeys.this.anon_key
  target     = ["production", "preview", "development"]
  comment    = "Supabase anon key for client-side code"
}

resource "vercel_project_environment_variable" "supabase_service_role_key" {
  project_id = vercel_project.khaykingleb_com.id
  key        = "SUPABASE_SERVICE_ROLE_KEY"
  value      = data.supabase_apikeys.this.service_role_key
  target     = ["production", "preview"]
  sensitive  = true
  comment    = "Supabase service role key for server-side code"
}

resource "vercel_project_domain" "khaykingleb_com" {
  project_id = vercel_project.khaykingleb_com.id
  domain     = "khaykingleb.com"
}

resource "vercel_project_domain" "www_khaykingleb_com" {
  project_id = vercel_project.khaykingleb_com.id
  domain     = "www.khaykingleb.com"

  redirect             = vercel_project_domain.khaykingleb_com.domain
  redirect_status_code = 308
}

resource "vercel_attack_challenge_mode" "example" {
  project_id = vercel_project.khaykingleb_com.id
  enabled    = false
}
