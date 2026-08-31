from pathlib import Path
import re, shutil

root = Path(".")
keep_top = {
    ".nojekyll",
    "404.html","about-masayasu.html","changelog.html","index.html","intake.html",
    "legal.html","privacy.html","samples.html","terms.html","thank-you.html",
    "robots.txt","sitemap.xml","DELIVERY-TEMPLATE.md","ORDER-WORKFLOW.md",
    "QUICK-HELP-CHECKOUT-TEST.md","SERVICE-SCOPE.md","SITE-QA.md","STRIPE-SETUP.md",
    "FORMSPREE-SETUP-v29.md","FORMSPREE-AUTORESPONSE-v41.md","README.md","assets",
}
for p in list(root.iterdir()):
    if p.name in {".git",".github"}: continue
    if p.name not in keep_top:
        shutil.rmtree(p) if p.is_dir() else p.unlink()

css=root/"assets/css"; js=root/"assets/js"
(css/"v1.css").write_text((css/"v57b3.css").read_text(encoding="utf-8").replace("v57b3","v1"),encoding="utf-8")
(css/"samples-v1.css").write_text((css/"samples-v57b3.css").read_text(encoding="utf-8").replace("samples-v57b3","samples-v1").replace("v57b3","v1"),encoding="utf-8")
for p in list(css.iterdir()):
    if p.name not in {"style.css","v1.css","samples-v1.css"}: p.unlink()
(js/"v1.js").write_text((js/"v57b3.js").read_text(encoding="utf-8").replace("v57b3","v1"),encoding="utf-8")
(js/"samples-v1.js").write_text((js/"samples-v57b3.js").read_text(encoding="utf-8").replace("v57b3","v1"),encoding="utf-8")
for p in list(js.iterdir()):
    if p.name not in {"payments.js","v1.js","samples-v1.js"}: p.unlink()
(js/"main.js").write_text("// LORUNEI legacy main.js — retired in v1\n// Current runtime: v1.js, payments.js, samples-v1.js\n",encoding="utf-8")

repls=[
 ("infojapaninsider@gmail.com","infolorunei@gmail.com"),
 ("https://formspree.io/f/xeajbpvn","https://formspree.io/f/mjyvgqad"),
 ("xeajbpvn","mjyvgqad"),
 ("https://japaninsider.github.io/japaninsider/","https://lorunei.github.io/Personal-Japan-Trip-Planning/"),
 ("https://japaninsider.github.io/japaninsider","https://lorunei.github.io/Personal-Japan-Trip-Planning"),
 ("assets/css/v57b3.css","assets/css/v1.css"),("assets/js/v57b3.js","assets/js/v1.js"),
 ("assets/css/samples-v57b3.css","assets/css/samples-v1.css"),("assets/js/samples-v57b3.js","assets/js/samples-v1.js"),
 ("v57b3-home","v1-home"),("samples-v57b3","samples-v1"),("v57b3","v1"),
]
text_ext={".html",".md",".txt",".xml",".css",".js"}
for p in root.rglob("*"):
    if not p.is_file() or ".git" in p.parts or p.suffix.lower() not in text_ext: continue
    s=p.read_text(encoding="utf-8")
    for a,b in repls: s=s.replace(a,b)
    s=re.sub(r"\|\|\s*localStorage\.getItem\(['\"]japanInsiderLang['\"]\)", "", s)
    s=re.sub(r"localStorage\.setItem\(['\"]japanInsiderLang['\"],\s*[^;]+\);?", "", s)
    p.write_text(s,encoding="utf-8")

for old,new in [("FORMSPREE-SETUP-v29.md","FORMSPREE-SETUP.md"),("FORMSPREE-AUTORESPONSE-v41.md","FORMSPREE-AUTORESPONSE.md")]:
    p=root/old
    if p.exists(): p.rename(root/new)

(root/"changelog.html").write_text("""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>LORUNEI — Version History</title><link rel="stylesheet" href="assets/css/style.css"><style>.subpage{background:#f5f1ea;color:#102c49;min-height:100vh}.sub-head{background:#071d3b;color:#fff;padding:18px 0}.sub-head .container{display:flex;justify-content:space-between;align-items:center}.sub-wrap{width:min(960px,calc(100% - 36px));margin:auto;padding:64px 0}.sub-card{background:#fff;border-radius:14px;padding:26px;margin:16px 0;border:1px solid rgba(7,29,59,.1)}.sub-title{font:400 3rem Georgia,serif}.lang-ja{display:none!important}html:lang(ja) .lang-en{display:none!important}html:lang(ja) .lang-ja{display:block!important}</style></head><body class="subpage"><header class="sub-head"><div class="container"><a href="index.html">LORUNEI</a><div><button data-lang="en">EN</button> <button data-lang="ja">日本語</button></div></div></header><main class="sub-wrap"><div class="lang-en"><h1 class="sub-title">Version history</h1><p>Major public-facing website changes.</p></div><div class="lang-ja"><h1 class="sub-title">変更履歴</h1><p>公開サイトの主な更新内容です。</p></div><section class="sub-card"><h2>v1 — 2026-09-01</h2><div class="lang-en"><ul><li>Initial public release on the dedicated LORUNEI repository.</li><li>Quick Help: $49 for one focused Japan travel topic with up to 3 closely related questions.</li><li>Contact: infolorunei@gmail.com.</li></ul></div><div class="lang-ja"><ul><li>LORUNEI専用リポジトリでの初回公開。</li><li>Quick Help：49米ドル、1つのテーマについて関連する質問3つまで。</li><li>相談先：infolorunei@gmail.com。</li></ul></div></section></main><footer class="sub-head"><div class="container">© 2026 LORUNEI · v1</div></footer><script>const p=new URLSearchParams(location.search);let l=p.get('lang')||localStorage.getItem('loruneiLang')||((navigator.language||'').toLowerCase().startsWith('ja')?'ja':'en');if(!['en','ja'].includes(l))l='en';document.documentElement.lang=l;document.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>{document.documentElement.lang=b.dataset.lang;localStorage.setItem('loruneiLang',b.dataset.lang)});</script></body></html>""",encoding="utf-8")

(root/"README.md").write_text("""# LORUNEI — Personal Japan Trip Planning

- Live site: https://lorunei.github.io/Personal-Japan-Trip-Planning/
- Current public build: **v1**
- Contact: **infolorunei@gmail.com**
- Form delivery: Formspree endpoint `mjyvgqad`
- Hosting: GitHub Pages

## Services
- Quick Help — $49: one focused topic, up to 3 closely related questions.
- Japan Answer — $99: one connected decision / Decision Brief.
- Japan Research — $299: defined-scope research and comparison.
- Private Japan Planning — from $999: custom whole-journey planning.

The Quick Help Stripe Payment Link remains intentionally blank until a verified live link is supplied; inquiry fallback remains active.
""",encoding="utf-8")
(root/"SITE-QA.md").write_text("""# LORUNEI v1 Site QA
- [x] Public build markers use v1.
- [x] Contact email is infolorunei@gmail.com.
- [x] Homepage and intake use Formspree endpoint mjyvgqad.
- [x] Quick Help is $49 for one focused topic with up to 3 related questions.
- [x] Stripe Payment Link remains blank until a verified live URL is supplied.
- [ ] Confirm desktop/mobile EN/JA rendering on public GitHub Pages after deployment.
""",encoding="utf-8")
(root/"FORMSPREE-SETUP.md").write_text("""# Formspree Setup — LORUNEI v1

Endpoint: https://formspree.io/f/mjyvgqad

Contact / intended consultation address: infolorunei@gmail.com

The homepage inquiry form and post-payment intake both use this endpoint. Verify recipient and autoresponse settings in Formspree before paid traffic.
""",encoding="utf-8")
(root/"V1-QA.md").write_text("""# LORUNEI v1 QA — 2026-09-01
- Public build: v1
- Contact: infolorunei@gmail.com
- Formspree: https://formspree.io/f/mjyvgqad
- Live URL target: https://lorunei.github.io/Personal-Japan-Trip-Planning/
- Quick Help: $49 / one focused topic / up to 3 closely related questions
- Japan Answer: $99
- Japan Research: $299
- Private Japan Planning: from $999
- Stripe Payment Link intentionally blank; inquiry fallback preserved.
""",encoding="utf-8")

missing=[]; duplicate=[]
for hp in root.glob("*.html"):
    s=hp.read_text(encoding="utf-8")
    for attr in ("href","src"):
        for m in re.finditer(rf'{attr}=["\']([^"\']+)["\']',s):
            ref=m.group(1)
            if ref.startswith(("http://","https://","#","mailto:","javascript:","data:")): continue
            ref=ref.split("?")[0].split("#")[0]
            if ref and not (hp.parent/ref).exists(): missing.append((hp.name,ref))
    ids=re.findall(r'\bid=["\']([^"\']+)',s)
    d=sorted({x for x in ids if ids.count(x)>1})
    if d: duplicate.append((hp.name,d))
all_text="\n".join(p.read_text(encoding="utf-8",errors="ignore") for p in root.rglob("*") if p.is_file() and ".git" not in p.parts and p.suffix.lower() in text_ext)
assert not missing, missing
assert not duplicate, duplicate
for bad in ("infojapaninsider@gmail.com","xeajbpvn","japaninsider.github.io/japaninsider","v57b3","$45","45米ドル"):
    assert bad not in all_text, bad
assert "infolorunei@gmail.com" in all_text
assert "mjyvgqad" in all_text
