resource "supabase_project" "this" {
  name            = "supabase-db"
  organization_id = var.supabase_organization_id

  region            = "eu-west-2"
  database_password = var.supabase_database_password
  instance_size     = "nano"

  lifecycle {
    ignore_changes = [
      database_password,
      instance_size,
    ]
  }
}

resource "supabase_settings" "this" {
  project_ref = supabase_project.this.id

  api = jsonencode({
    db_extra_search_path = "public, extensions"
    db_schema            = "public,graphql_public"
    max_rows             = 1000
  })

  auth = jsonencode({
    disable_signup = false
    jwt_exp        = 3600
  })
}

data "supabase_apikeys" "this" {
  project_ref = supabase_project.this.id
}
