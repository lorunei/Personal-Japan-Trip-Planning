// LORUNEI live, one-time payment links.
// Stripe link identifiers are case-sensitive: keep these URLs exactly as returned.
// Matching links are also present in index.html so checkout works without JavaScript.
// All three return to the lowercase thank-you.html URL with the purchased plan.
const STRIPE_PAYMENT_LINKS = Object.freeze({
  "quick": "https://buy.stripe.com/00w8wQ2uWgiD022e0q9MY03",
  "answer": "https://buy.stripe.com/cNi3cw2uW7M74iie0q9MY01",
  "research": "https://buy.stripe.com/bJecN66Lceav2aa09A9MY02"
});

(function () {
  document.querySelectorAll("[data-checkout-plan]").forEach(button => {
    const link = STRIPE_PAYMENT_LINKS[button.dataset.checkoutPlan];
    if (link) button.href = link;
  });
})();
