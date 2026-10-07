# Lowercase public URL migration

Status: prepared; public repository name and Stripe configuration are unchanged.

Target repository: lorunei/personal-japan-trip-planning
Target homepage: https://lorunei.github.io/personal-japan-trip-planning/index.html

## Preserve existing payment return URLs

The live Quick Help Stripe Payment Link remains unchanged. The Stripe dashboard is not accessible in the current session, so its actual after-payment redirect has not been verified or modified.

Proposed compatibility site: a public user-site repository named lorunei.github.io, with the description "LORUNEI URL redirects". Creation is pending explicit user approval: automatic approval review rejected creation because authorization for the URL migration did not explicitly include the additional public repository.

The compatibility site will serve the old Personal-Japan-Trip-Planning paths. Both intake.html (documented in payments.js) and thank-you.html (documented in the older STRIPE-SETUP.md) retain the existing public bilingual pages as a temporary fallback until the matching lowercase destination is ready. Once it is ready, each forwards to the same page, preserving query parameters and fragment.

This avoids changing prices, the payment link, payment processing, or any Stripe account setting. No credentials, payment records, or customer data are added to the repository.

## Prepared source

The complete compatibility site is staged under .github/legacy-url-site/. Publish those files at the root of lorunei.github.io with GitHub Pages using main / root. Do not set a custom domain.

Before renaming the original repository, deploy and verify this compatibility site on its user-site URL. After renaming, deploy the lowercase project and verify the homepage and both old/new payment-return routes, with query and language preserved. If the old URLs fail to resolve through the compatibility site, restore the repository's original name before continuing.

Update external links to the lowercase URL. Keep the compatibility site available for old Stripe return URLs and existing shared links.

GitHub project-site URLs are not automatically redirected on a repository rename; the compatibility site supplies explicit redirects.
