# Stripe checkout setup — LORUNEI

## Public one-time checkout links

| Service | Amount | Stripe Payment Link | Return plan |
| --- | --- | --- | --- |
| Quick Help | $49 USD | https://buy.stripe.com/00w8wQ2uWgiD022e0q9MY03 | quick |
| Japan Answer | $99 USD | https://buy.stripe.com/cNi3cw2uW7M74iie0q9MY01 | answer |
| Japan Research | $299 USD | https://buy.stripe.com/bJecN66Lceav2aa09A9MY02 | research |

These are live-mode links using the existing one-time prices, with quantity fixed at 1.
Each redirects to `https://lorunei.github.io/personal-japan-trip-planning/thank-you.html?plan=PLAN`, where PLAN is the value above. The thank-you page carries the selected plan and language to the intake form.

The English and Japanese purchase buttons link directly to Stripe in index.html. assets/js/payments.js contains the same configuration. Keep the full Stripe URLs exactly as returned; their identifiers are case-sensitive.

For Japan Answer and Japan Research, confirm the request scope before payment. The public service cards retain a separate inquiry link and state this condition.

Private Japan Planning remains from $999 USD with a custom written quote. Confirm the scope, delivery timing and exact price before requesting payment.

## Quick Help link replacement — 2026-10-07

The customer reported an error before the $49 checkout form appeared. The prior link opened the form in the verification browser, so that error was not reproduced.
A fresh Quick Help link was created using the same $49 one-time price, and the public buttons now use it. The old link remains active for previously shared URLs; its legacy return page is covered by the compatibility site.

## Verification

Verify the deployed site by clicking every purchase button in English and Japanese, checking the product, USD amount and presence of the checkout form.
Check all three Stripe redirect settings, then open each configured return page and confirm the matching plan is selected in intake.
These checks do not constitute a completed payment test. No live charge or customer form submission should be made as part of a display check.

## Upgrade credit

If a request is clearly better suited to Japan Answer before deeper individualized work begins, the customer may keep the Quick Help scope or apply the full $49 toward Japan Answer. Collect only the $50 balance after explicit customer approval. Never upgrade or charge automatically.
