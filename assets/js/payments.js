// LORUNEI payment configuration
// Paste the real Stripe Payment Link URL below after Stripe setup.
// Do not use a placeholder or fabricated URL.
// In Stripe, set the post-payment redirect to:
// https://YOUR-DOMAIN/thank-you.html?plan=quick
const STRIPE_QUICK_PAYMENT_LINK = "";

(function(){
  const buttons = [...document.querySelectorAll("[data-quick-checkout]")];

  if (!buttons.length) return;

  function currentLang(){
    let value = document.documentElement.lang || "en";
    try {
      value = localStorage.getItem("loruneiLang")  || value;
    } catch (_) {}
    return value === "ja" ? "ja" : "en";
  }

  function applyCheckoutState(){
    const lang = currentLang();
    buttons.forEach(btn => {
      if (STRIPE_QUICK_PAYMENT_LINK) {
        btn.href = STRIPE_QUICK_PAYMENT_LINK;
        btn.removeAttribute("target");
        btn.removeAttribute("rel");
        btn.textContent = lang === "ja" ? "Quick Helpを購入 — $49" : "Buy Quick Help — $49";
      } else {
        btn.href = btn.dataset.inquiryHref || "#inquiry";
        btn.removeAttribute("target");
        btn.removeAttribute("rel");
        btn.dataset.plan = "quick";
        btn.textContent = lang === "ja" ? "Quick Helpについて相談 — $49" : "Ask about Quick Help — $49";
      }
    });
  }

  applyCheckoutState();
  document.addEventListener("click", e => {
    if (e.target.closest && e.target.closest("[data-lang]")) setTimeout(applyCheckoutState, 20);
  });
})();