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
