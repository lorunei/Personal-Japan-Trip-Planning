# Lowercase public URL migration

Status: completed on 2026-10-07. The public repository and canonical project URL use lowercase. The compatibility site preserves the old URLs. Stripe configuration was unchanged during the initial URL migration; see the checkout follow-up below for the current links.

Target repository: lorunei/personal-japan-trip-planning
Target homepage: https://lorunei.github.io/personal-japan-trip-planning/index.html

## Preserve existing payment return URLs

During the initial migration, the live Quick Help Stripe Payment Link was unchanged. The Stripe dashboard was not accessible in that session, so its after-payment redirect was not verified or modified at that stage.

Compatibility site: public user-site repository lorunei/lorunei.github.io, with the description "LORUNEI URL redirects". The user explicitly approved its addition on 2026-10-07. Its GitHub Pages deployment succeeded at commit 2c85a9b827741b669a394ba85d4a57e5a1334173.

The compatibility site serves the old Personal-Japan-Trip-Planning paths. Both intake.html (documented in payments.js) and thank-you.html (documented in the older STRIPE-SETUP.md) retain the existing public bilingual pages as a temporary fallback until the matching lowercase destination is ready. Once it is ready, each forwards to the same page, preserving query parameters and fragment.

This avoids changing prices, the payment link, payment processing, or any Stripe account setting. No credentials, payment records, or customer data are added to the repository.

## Prepared source

The complete compatibility site is staged under .github/legacy-url-site/. Publish those files at the root of lorunei.github.io with GitHub Pages using main / root. Do not set a custom domain.

Before renaming the original repository, deploy and verify this compatibility site on its user-site URL. After renaming, deploy the lowercase project and verify the homepage and both old/new payment-return routes, with query and language preserved. If the old URLs fail to resolve through the compatibility site, restore the repository's original name before continuing.

Update external links to the lowercase URL. Keep the compatibility site available for old Stripe return URLs and existing shared links.

GitHub project-site URLs are not automatically redirected on a repository rename; the compatibility site supplies explicit redirects.

## Verification completed — 2026-10-07

- Compatibility Pages deployment succeeded at 2c85a9b827741b669a394ba85d4a57e5a1334173.
- Lowercase project Pages deployment succeeded at 00bd9fa5b2f3afec942a1d73c68f46c0d041a830.
- Old homepage /Personal-Japan-Trip-Planning/?lang=ja#about forwarded to /personal-japan-trip-planning/index.html?lang=ja#about.
- Old intake.html forwarded to the matching lowercase page, preserving plan=quick, lang=ja, a placeholder session_id and the fragment. The Japanese intake loaded with Quick Help selected.
- Old thank-you.html forwarded to the matching lowercase page, preserving plan=quick, lang=ja and the fragment. Its intake link uses the lowercase URL with plan and language preserved.
- The English name link on the Japanese homepage opened the Japanese profile. Switching to English updated profile content and Home/inquiry/history links to lang=en.
- The existing Quick Help checkout link and $49 price are unchanged.
- The Stripe dashboard redirect setting remains unverified. No Stripe setting, checkout transaction or customer submission was made during this migration.

## Checkout follow-up — 2026-10-07

Stripe is now connected. Japan Answer ($99) and Japan Research ($299) have live one-time links. After the customer reported a pre-checkout error for Quick Help, a fresh link was created using its existing $49 price. All three current public purchase links return to the lowercase thank-you.html page with the matching plan query. See [STRIPE-SETUP.md](STRIPE-SETUP.md) for the current configuration.

The old Quick Help link and the compatibility site remain available for previously shared links. Stripe link identifiers themselves are case-sensitive and must be preserved exactly.
