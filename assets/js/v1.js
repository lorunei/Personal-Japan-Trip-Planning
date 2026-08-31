// LORUNEI public site interactions — v1
(() => {
  const root = document.documentElement;
  const nav = document.querySelector('.main-nav');
  const menuButton = document.querySelector('.menu-toggle');
  const form = document.getElementById('loruneiInquiry');
  const selectEn = document.getElementById('planSelectEn');
  const selectJa = document.getElementById('planSelectJa');

  const TITLES = {
    en: 'LORUNEI — Personal Japan Trip Planning',
    ja: 'LORUNEI — 日本旅行のパーソナル・プランニング'
  };

  function normalizeLang(value) {
    return value === 'ja' ? 'ja' : 'en';
  }

  function syncServiceSelects(lang) {
    if (!selectEn || !selectJa) return;
    const active = lang === 'ja' ? selectJa : selectEn;
    const inactive = lang === 'ja' ? selectEn : selectJa;
    if (inactive.value !== active.value && active.value) inactive.value = active.value;
    active.disabled = false;
    inactive.disabled = true;
  }

  function syncInternalLinks(lang) {
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || /^(https?:|mailto:|tel:|javascript:)/i.test(href)) return;
      if (!/\.html(?:[?#]|$)/i.test(href)) return;
      try {
        const u = new URL(href, location.href);
        u.searchParams.set('lang', lang);
        a.setAttribute('href', u.pathname.split('/').pop() + u.search + u.hash);
      } catch (_) {}
    });
  }

  function setLanguage(value) {
    const lang = normalizeLang(value);
    root.lang = lang;
    document.title = TITLES[lang];
    try {
      localStorage.setItem('loruneiLang', lang);
      // Read compatibility for visitors who used an older build.
      
    } catch (_) {}

    document.querySelectorAll('[data-lang]').forEach(btn => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    syncServiceSelects(lang);
    syncInternalLinks(lang);
  }

  let initial = new URLSearchParams(location.search).get('lang');
  try {
    initial = initial || localStorage.getItem('loruneiLang') ;
  } catch (_) {}
  initial = initial || ((navigator.language || '').toLowerCase().startsWith('ja') ? 'ja' : 'en');
  setLanguage(initial);

  document.addEventListener('click', event => {
    const langButton = event.target.closest('[data-lang]');
    if (langButton) {
      setLanguage(langButton.dataset.lang);
      return;
    }

    const planLink = event.target.closest('[data-plan]');
    if (planLink) {
      const plan = planLink.dataset.plan;
      if (selectEn) selectEn.value = plan;
      if (selectJa) selectJa.value = plan;
    }

    if (event.target.closest('.main-nav a') && window.innerWidth <= 900) {
      nav?.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
    }
  });

  menuButton?.addEventListener('click', () => {
    const open = !nav?.classList.contains('open');
    nav?.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      nav?.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  if (form) {
    const emailInput = form.querySelector('input[name="email"]');
    const replyTo = document.getElementById('replyToField');
    const status = document.getElementById('formStatus');
    const referenceField = document.getElementById('submissionReferenceField');
    const submittedAtField = document.getElementById('submittedAtJstField');
    const pageLanguageField = document.getElementById('pageLanguageField');
    const receipt = document.getElementById('submissionReceipt');
    const receiptActionStatus = document.getElementById('receiptActionStatus');
    const copyReceiptButton = document.getElementById('copyReceipt');
    const printReceiptButton = document.getElementById('printReceipt');
    let lastReceipt = null;

    function tokyoParts(date) {
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Tokyo',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
      }).formatToParts(date);
      return Object.fromEntries(parts.filter(p => p.type !== 'literal').map(p => [p.type, p.value]));
    }

    function makeReference(date) {
      const p = tokyoParts(date);
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let code = '';
      if (window.crypto?.getRandomValues) {
        const bytes = new Uint8Array(6);
        window.crypto.getRandomValues(bytes);
        code = Array.from(bytes, b => chars[b % chars.length]).join('');
      } else {
        for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
      }
      return `LOR-${p.year}${p.month}${p.day}-${code}`;
    }

    function formatSubmittedAt(date) {
      const p = tokyoParts(date);
      return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second} JST`;
    }

    function buildReceiptText(data, ja) {
      return ja
        ? ['LORUNEI お問い合わせ控え',`受付番号: ${data.reference}`,`送信日時: ${data.submittedAt}`,`お名前: ${data.name}`,`Email: ${data.email}`,`サービス: ${data.service}`,'相談内容:',data.message].join('\n')
        : ['LORUNEI Submission Receipt',`Reference: ${data.reference}`,`Submitted: ${data.submittedAt}`,`Name: ${data.name}`,`Email: ${data.email}`,`Service: ${data.service}`,'Message:',data.message].join('\n');
    }

    function renderReceipt(data) {
      lastReceipt = data;
      document.getElementById('receiptReference').textContent = data.reference;
      document.getElementById('receiptSubmittedAt').textContent = data.submittedAt;
      document.getElementById('receiptName').textContent = data.name;
      document.getElementById('receiptEmail').textContent = data.email;
      document.getElementById('receiptService').textContent = data.service;
      document.getElementById('receiptMessage').textContent = data.message;
      if (receiptActionStatus) receiptActionStatus.textContent = '';
      if (receipt) { receipt.hidden = false; receipt.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    }

    async function copyReceiptText() {
      if (!lastReceipt) return;
      const ja = root.lang === 'ja';
      const text = buildReceiptText(lastReceipt, ja);
      try {
        if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
        else { const area=document.createElement('textarea'); area.value=text; area.setAttribute('readonly',''); area.style.position='fixed'; area.style.opacity='0'; document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove(); }
        if (receiptActionStatus) receiptActionStatus.textContent = ja ? '控えをコピーしました。' : 'Receipt copied.';
      } catch (_) { if (receiptActionStatus) receiptActionStatus.textContent = ja ? 'コピーできませんでした。印刷 / PDF保存をご利用ください。' : 'Could not copy. Please use Print / Save PDF.'; }
    }

    copyReceiptButton?.addEventListener('click', copyReceiptText);
    printReceiptButton?.addEventListener('click', () => window.print());

    emailInput?.addEventListener('input', () => {
      if (replyTo) replyTo.value = emailInput.value.trim();
    });

    form.addEventListener('submit', async event => {
      event.preventDefault();
      const ja = root.lang === 'ja';
      if (replyTo && emailInput) replyTo.value = emailInput.value.trim();
      if (status) status.textContent = ja ? '送信しています…' : 'Sending…';
      const button = form.querySelector(ja ? 'button[type="submit"].lang-ja' : 'button[type="submit"].lang-en');
      if (button) button.disabled = true;

      try {
        const submittedAtDate = new Date();
        const reference = makeReference(submittedAtDate);
        const submittedAt = formatSubmittedAt(submittedAtDate);
        const activeSelect = ja ? selectJa : selectEn;
        const serviceLabel = activeSelect?.options[activeSelect.selectedIndex]?.textContent?.trim() || activeSelect?.value || '';
        const receiptData = { reference, submittedAt, name: form.querySelector('input[name="name"]')?.value.trim() || '', email: emailInput?.value.trim() || '', service: serviceLabel, message: form.querySelector('textarea[name="message"]')?.value.trim() || '' };
        if (referenceField) referenceField.value = reference;
        if (submittedAtField) submittedAtField.value = submittedAt;
        if (pageLanguageField) pageLanguageField.value = ja ? 'ja' : 'en';
        const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('Formspree submit failed');
        renderReceipt(receiptData);
        form.reset();
        syncServiceSelects(root.lang);
        if (replyTo) replyTo.value = '';
        if (referenceField) referenceField.value = '';
        if (submittedAtField) submittedAtField.value = '';
        if (pageLanguageField) pageLanguageField.value = '';
        if (status) status.textContent = ja ? '送信しました。下の送信控えを保存してください。' : 'Sent. Please save the submission receipt below.';
      } catch (_) {
        if (status) status.textContent = ja
          ? '送信できませんでした。時間をおいてもう一度お試しください。'
          : 'We could not send your inquiry. Please try again in a moment.';
      } finally {
        if (button) button.disabled = false;
      }
    });
  }
})();
