# Lowercase public URL migration

Status: prepared on fix/lowercase-public-url; not deployed.

Target repository name: personal-japan-trip-planning
Target homepage: https://lorunei.github.io/personal-japan-trip-planning/index.html

The existing live Stripe Payment Link and all prices remain unchanged. The website cannot change the payment link's after-payment redirect; it is configured in Stripe.

Before renaming the repository:
1. Inspect the live Quick Help Payment Link in Stripe and record its configured after-payment redirect. payments.js currently documents intake.html, while the older STRIPE-SETUP.md describes thank-you.html. Verify the live setting rather than assuming either document is authoritative.
2. Plan an uninterrupted transition: establish a working lowercase destination and retain the old payment-return route, or pause checkout during the coordinated redirect and repository-name switch.
3. Change only the repository-path segment of the actual Stripe return URL to personal-japan-trip-planning; retain its page, query parameters and language behavior.

Publish the prepared URL-reference changes together with the repository rename, then trigger GitHub Pages deployment.

Verify both EN and JA homepages, profile links, CSS/images, inquiry form configuration, sitemap URLs, intake, thank-you, and the configured Stripe return URL. Do not make a live test purchase; use Stripe test mode when available.

GitHub project-site URLs are not automatically redirected on a repository rename. Update external links to the lowercase URL; an old Stripe return URL must not be left unverified.
