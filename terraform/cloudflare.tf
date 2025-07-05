resource "cloudflare_zone" "khaykingleb_com" {
  name   = "khaykingleb.com"
  paused = false
  type   = "full"
  account = {
    id = var.cloudflare_account_id
  }
}

resource "cloudflare_dns_record" "khaykingleb_com" {
  zone_id = cloudflare_zone.khaykingleb_com.id

  name    = "khaykingleb.com"
  type    = "CNAME"
  content = "cname.vercel-dns.com"

  proxied = true
  ttl     = 1 # NOTE: Cloudflare manages the TTL automatically
}

resource "cloudflare_dns_record" "www_khaykingleb_com" {
  zone_id = cloudflare_zone.khaykingleb_com.id

  name    = "www.khaykingleb.com"
  type    = "CNAME"
  content = "cname.vercel-dns.com"

  proxied = true
  ttl     = 1 # NOTE: Cloudflare manages the TTL automatically
}
