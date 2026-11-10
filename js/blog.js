/* ==========================================================
   Blog engine (vanilla JS, no build step)
   body[data-page]  = home | blog-list | blog-post
   body[data-base]  = relative path to the language home ("" | "../" | "../../")
   ========================================================== */
(() => {
  const CFG = window.BLOG_CONFIG || {};
  const DATA = window.BLOG_POSTS || { en: [], fa: [] };
  const lang = document.documentElement.lang === "fa" ? "fa" : "en";
  const B = document.body, page = B.dataset.page || "", base = B.dataset.base || "";
  const posts = (DATA[lang] || []).slice().sort((a, b) => b.date.localeCompare(a.date));
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const TXT = {
    en: { min: "min read", all: "All", readMore: "Read article", featured: "Featured", results: n => `${n} article${n === 1 ? "" : "s"}`,
      for: "for", clear: "Clear filters", none: "No articles found", noneSub: "Try a different keyword or clear the filters.",
      newest: "Newest first", oldest: "Oldest first", prev: "Previous", next: "Next", copy: "Copy", copied: "Copied!",
      linkCopied: "Link copied", nlOk: "Thanks! You're subscribed.", nlErr: "Something went wrong. Please try again.", nlMail: "Opening your email client...",
      nlSubj: "Newsletter subscription", nlBody: "Please subscribe this address to the newsletter: ", prevPost: "Previous article", nextPost: "Next article", top: "Back to top", comments: "Comments" },
    fa: { min: "دقیقه مطالعه", all: "همه", readMore: "خواندن مطلب", featured: "مطلب ویژه", results: n => `${n.toLocaleString("fa-IR")} مطلب`,
      for: "برای", clear: "پاک کردن فیلترها", none: "مطلبی پیدا نشد", noneSub: "کلمه دیگری را امتحان کنید یا فیلترها را پاک کنید.",
      newest: "جدیدترین", oldest: "قدیمی‌ترین", prev: "قبلی", next: "بعدی", copy: "کپی", copied: "کپی شد!",
      linkCopied: "لینک کپی شد", nlOk: "ممنون! عضو شدید.", nlErr: "مشکلی پیش آمد. دوباره تلاش کنید.", nlMail: "در حال باز کردن برنامه ایمیل...",
      nlSubj: "عضویت در خبرنامه", nlBody: "لطفاً این ایمیل را در خبرنامه عضو کنید: ", prevPost: "مطلب قبلی", nextPost: "مطلب بعدی", top: "بازگشت به بالا", comments: "دیدگاه‌ها" }
  }[lang];

  const nf = n => n.toLocaleString(lang === "fa" ? "fa-IR" : "en-US");
  const fmtDate = d => new Intl.DateTimeFormat(lang === "fa" ? "fa-IR" : "en-US",
    { year: "numeric", month: lang === "fa" ? "long" : "short", day: "numeric" }).format(new Date(d + "T00:00:00"));
  const arrowNext = lang === "fa" ? "bi-arrow-left" : "bi-arrow-right";
  const arrowPrev = lang === "fa" ? "bi-arrow-right" : "bi-arrow-left";
  const url = p => `${base}blog/${p.slug}/`;
  const coverStyle = p => p.image ? "" : ` cover-${p.color || "purple"}`;
  const coverInner = p => p.image ? `<img src="${esc((B.dataset.root || "") + p.image)}" alt="" loading="lazy">` : `<i class="bi ${esc(p.icon || "bi-journal-text")}"></i>`;
  const metaHTML = p => `<div class="post-meta"><span><i class="bi bi-calendar3"></i>${fmtDate(p.date)}</span><span class="dot"></span><span><i class="bi bi-clock"></i>${nf(p.readTime)} ${TXT.min}</span></div>`;

  const card = p => `<article class="post-card fade-in">
    <a class="post-card-cover${coverStyle(p)}" href="${url(p)}" tabindex="-1" aria-hidden="true">${coverInner(p)}<span class="post-chip">${esc(p.category)}</span></a>
    <div class="post-card-body">${metaHTML(p)}<h3><a href="${url(p)}">${esc(p.title)}</a></h3><p>${esc(p.excerpt)}</p>
    <a class="read-more" href="${url(p)}">${TXT.readMore} <i class="bi ${arrowNext}"></i></a></div></article>`;

  const featured = p => `<article class="post-featured fade-in">
    <a class="post-card-cover${coverStyle(p)}" href="${url(p)}" tabindex="-1" aria-hidden="true">${coverInner(p)}<span class="post-chip">${esc(p.category)}</span></a>
    <div class="post-card-body"><span class="featured-label"><i class="bi bi-stars"></i>${TXT.featured}</span>${metaHTML(p)}
    <h3><a href="${url(p)}">${esc(p.title)}</a></h3><p>${esc(p.excerpt)}</p>
    <a class="read-more" href="${url(p)}">${TXT.readMore} <i class="bi ${arrowNext}"></i></a></div></article>`;

  const mini = p => `<div class="mini-post"><a class="mini-thumb${coverStyle(p)}" href="${url(p)}" tabindex="-1" aria-hidden="true"><i class="bi ${esc(p.icon || "bi-journal-text")}"></i></a>
    <a href="${url(p)}"><strong>${esc(p.title)}</strong></a></div>`;

  const countBy = key => { const m = new Map(); posts.forEach(p => (Array.isArray(p[key]) ? p[key] : [p[key]]).forEach(v => m.set(v, (m.get(v) || 0) + 1))); return [...m.entries()]; };

  /* ---------- newsletter forms ---------- */
  $$(".js-newsletter").forEach(f => f.addEventListener("submit", async e => {
    e.preventDefault();
    const msg = $(".js-nl-msg", f), email = new FormData(f).get("email");
    if (CFG.newsletterAction) {
      try { const r = await fetch(CFG.newsletterAction, { method: "POST", body: new FormData(f), headers: { Accept: "application/json" } });
        msg.textContent = r.ok ? TXT.nlOk : TXT.nlErr; if (r.ok) f.reset();
      } catch (_) { msg.textContent = TXT.nlErr; }
    } else {
      location.href = `mailto:${CFG.newsletterEmail}?subject=${encodeURIComponent(TXT.nlSubj)}&body=${encodeURIComponent(TXT.nlBody + email)}`;
      msg.textContent = TXT.nlMail;
    }
  }));

  /* ---------- back to top ---------- */
  if (page !== "home") {
    const t = document.createElement("button");
    t.className = "to-top"; t.type = "button"; t.setAttribute("aria-label", TXT.top); t.innerHTML = '<i class="bi bi-arrow-up"></i>';
    t.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.appendChild(t);
    addEventListener("scroll", () => t.classList.toggle("show", scrollY > 700), { passive: true });
  }

  /* =================== HOME: latest posts =================== */
  if (page === "home") {
    const box = $("#latestPosts");
    if (box) box.innerHTML = posts.slice(0, 3).map(card).join("");
  }

  /* =================== LIST PAGE =================== */
  if (page === "blog-list") {
    const per = CFG.postsPerPage || 6;
    const st = (() => { const u = new URLSearchParams(location.search);
      return { q: u.get("q") || "", cat: u.get("cat") || "", tag: u.get("tag") || "", page: Math.max(1, +u.get("page") || 1), sort: u.get("sort") === "oldest" ? "oldest" : "newest" }; })();
    const qInput = $("#blogSearch"), chips = $("#catChips"), grid = $("#postGrid"), feat = $("#blogFeatured"),
      info = $("#resultsInfo"), pag = $("#pagination"), sortSel = $("#sortSelect");
    qInput.value = st.q; sortSel.value = st.sort;
    sortSel.options[0].text = TXT.newest; sortSel.options[1].text = TXT.oldest;
    const cats = countBy("category"), tags = countBy("tags");
    const buildURL = (o = {}) => { const s = { ...st, ...o }, u = new URLSearchParams();
      if (s.q) u.set("q", s.q); if (s.cat) u.set("cat", s.cat); if (s.tag) u.set("tag", s.tag);
      if (s.sort !== "newest") u.set("sort", s.sort); if (s.page > 1) u.set("page", s.page);
      const qs = u.toString(); return location.pathname + (qs ? "?" + qs : ""); };

    function sidebar() {
      $("#catList").innerHTML = cats.map(([c, n]) => `<li><a href="${buildURL({ cat: c, tag: "", page: 1 })}" data-filter class="${st.cat === c ? "active" : ""}"><span>${esc(c)}</span><em>${nf(n)}</em></a></li>`).join("");
      $("#recentList").innerHTML = posts.slice(0, 4).map(mini).join("");
      $("#tagCloud").innerHTML = tags.map(([t]) => `<a class="tag-pill${st.tag === t ? " active" : ""}" href="${buildURL({ tag: t, cat: "", page: 1 })}" data-filter>#${esc(t)}</a>`).join("");
    }
    function render() {
      chips.innerHTML = `<button class="chip${!st.cat ? " active" : ""}" data-cat="">${TXT.all}</button>` +
        cats.map(([c]) => `<button class="chip${st.cat === c ? " active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
      const q = st.q.trim().toLowerCase();
      let list = posts.filter(p => (!st.cat || p.category === st.cat) && (!st.tag || p.tags.includes(st.tag)) &&
        (!q || [p.title, p.excerpt, p.category, p.tags.join(" ")].join(" ").toLowerCase().includes(q)));
      if (st.sort === "oldest") list = list.slice().reverse();
      const filtering = !!(q || st.cat || st.tag);
      let top = null;
      if (!filtering && st.page === 1 && st.sort === "newest") { top = list.find(p => p.featured) || list[0]; if (top) list = list.filter(p => p !== top); }
      feat.innerHTML = top ? featured(top) : "";
      const pages = Math.max(1, Math.ceil(list.length / per)); st.page = Math.min(st.page, pages);
      const slice = list.slice((st.page - 1) * per, st.page * per);
      const total = list.length + (top ? 1 : 0);
      let label = TXT.results(total);
      if (filtering) { const parts = []; if (q) parts.push(`“${esc(st.q)}”`); if (st.cat) parts.push(esc(st.cat)); if (st.tag) parts.push("#" + esc(st.tag));
        label += ` ${TXT.for} ${parts.join(" · ")} — <a data-clear>${TXT.clear}</a>`; }
      info.innerHTML = label;
      grid.innerHTML = total === 0
        ? `<div class="empty-state" style="grid-column:1/-1"><i class="bi bi-search"></i><h3>${TXT.none}</h3><p>${TXT.noneSub}</p></div>`
        : slice.map(card).join("");
      let h = "";
      if (pages > 1) {
        h += `<button class="page-btn" data-page="${st.page - 1}" ${st.page === 1 ? "disabled" : ""} aria-label="${TXT.prev}"><i class="bi ${arrowPrev}"></i></button>`;
        for (let i = 1; i <= pages; i++) h += `<button class="page-btn" data-page="${i}" ${i === st.page ? 'aria-current="page"' : ""}>${nf(i)}</button>`;
        h += `<button class="page-btn" data-page="${st.page + 1}" ${st.page === pages ? "disabled" : ""} aria-label="${TXT.next}"><i class="bi ${arrowNext}"></i></button>`;
      }
      pag.innerHTML = h; sidebar();
      history.replaceState(null, "", buildURL());
    }
    const go = (o, scroll) => { Object.assign(st, o); render(); if (scroll) $("#blogMain").scrollIntoView({ behavior: "smooth", block: "start" }); };
    let timer; qInput.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(() => go({ q: qInput.value, page: 1 }), 180); });
    sortSel.addEventListener("change", () => go({ sort: sortSel.value, page: 1 }));
    document.addEventListener("click", e => {
      const c = e.target.closest(".chip"); if (c) { go({ cat: c.dataset.cat, tag: "", page: 1 }); return; }
      const p = e.target.closest(".page-btn"); if (p && !p.disabled) { go({ page: +p.dataset.page }, true); return; }
      if (e.target.closest("[data-clear]")) { qInput.value = ""; go({ q: "", cat: "", tag: "", page: 1 }); return; }
      const f = e.target.closest("a[data-filter]");
      if (f) { e.preventDefault(); const u = new URL(f.href); go({ cat: u.searchParams.get("cat") || "", tag: u.searchParams.get("tag") || "", page: 1 }, true); }
    });
    render();
  }

  /* =================== POST PAGE =================== */
  if (page === "blog-post") {
    const slug = B.dataset.slug, art = $(".post-content"), idx = posts.findIndex(p => p.slug === slug), cur = posts[idx];

    // localized dates + auto reading time
    $$(".js-date").forEach(el => el.textContent = fmtDate(el.dataset.date));
    const words = (art.innerText || "").trim().split(/\s+/).length;
    const mins = Math.max(1, Math.round(words / (lang === "fa" ? 170 : 200)));
    $$(".js-readtime").forEach(el => el.textContent = `${nf(mins)} ${TXT.min}`);

    // syntax highlighting + copy buttons
    if (window.hljs) $$("pre code").forEach(c => { try { hljs.highlightElement(c); } catch (_) {} });
    $$("pre", art).forEach(pre => {
      const code = $("code", pre), m = (code.className.match(/language-([\w+-]+)/) || [])[1];
      if (m) { pre.classList.add("has-lang"); const l = document.createElement("span"); l.className = "code-lang"; l.textContent = m; pre.appendChild(l); }
      const b = document.createElement("button"); b.type = "button"; b.className = "copy-btn"; b.textContent = TXT.copy;
      b.onclick = async () => { try { await navigator.clipboard.writeText(code.innerText); b.textContent = TXT.copied; setTimeout(() => b.textContent = TXT.copy, 1600); } catch (_) {} };
      pre.appendChild(b);
    });
    $$("table", art).forEach(t => { const w = document.createElement("div"); w.className = "table-wrap"; t.parentNode.insertBefore(w, t); w.appendChild(t); });

    // table of contents + heading anchors
    const heads = $$("h2, h3", art), used = new Set(), toc = $("#toc");
    heads.forEach(h => {
      let id = h.id || h.textContent.trim().toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, "").replace(/\s+/g, "-");
      while (used.has(id)) id += "-2"; used.add(id); h.id = id;
      const a = document.createElement("a"); a.className = "anchor"; a.href = "#" + id; a.textContent = "#"; a.setAttribute("aria-label", "Link"); h.appendChild(a);
    });
    if (toc) {
      toc.innerHTML = heads.map(h => `<a href="#${h.id}" class="${h.tagName === "H3" ? "lvl3" : ""}">${esc(h.firstChild.textContent)}</a>`).join("");
      if (!heads.length) toc.closest(".toc").style.display = "none";
    }
    const tocLinks = $$("a", toc || document.createElement("div"));

    // progress + scrollspy
    const bar = $("#readProgress");
    const onScroll = () => {
      const r = art.getBoundingClientRect(), total = r.height - innerHeight * .5;
      if (bar) bar.style.width = Math.min(100, Math.max(0, (-r.top + innerHeight * .25) / total * 100)) + "%";
      let cid = ""; heads.forEach(h => { if (h.getBoundingClientRect().top < 140) cid = h.id; });
      tocLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + cid));
    };
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
    if (matchMedia("(max-width:991px)").matches) { const d = $(".toc"); if (d) d.removeAttribute("open"); }

    // share
    const shareURL = (cur ? CFG.siteUrl + (lang === "fa" ? "/fa" : "") + "/blog/" + slug + "/" : location.href.split("#")[0]), title = document.title.split("|")[0].trim();
    const enc = encodeURIComponent;
    const links = [
      ["bi-twitter-x", "X", `https://twitter.com/intent/tweet?url=${enc(shareURL)}&text=${enc(title)}`],
      ["bi-linkedin", "LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${enc(shareURL)}`],
      ["bi-telegram", "Telegram", `https://t.me/share/url?url=${enc(shareURL)}&text=${enc(title)}`],
      ["bi-whatsapp", "WhatsApp", `https://wa.me/?text=${enc(title + " " + shareURL)}`]
    ];
    $$(".js-share").forEach(box => {
      box.insertAdjacentHTML("beforeend", links.map(([i, n, h]) => `<a class="share-btn" href="${h}" target="_blank" rel="noopener noreferrer" aria-label="${n}"><i class="bi ${i}"></i></a>`).join("") +
        `<button type="button" class="share-btn js-copylink" aria-label="${TXT.copy}"><i class="bi bi-link-45deg"></i></button>`);
      $(".js-copylink", box).onclick = async function () { try { await navigator.clipboard.writeText(shareURL); this.classList.add("done"); this.title = TXT.linkCopied; setTimeout(() => this.classList.remove("done"), 1600); } catch (_) {} };
    });

    // previous / next
    const nav = $("#postNav");
    if (nav && cur) {
      const newer = posts[idx - 1], older = posts[idx + 1];
      const item = (p, cls, label, ic, first) => p ? `<a class="${cls}" href="${base}blog/${p.slug}/"><small>${first ? `<i class="bi ${ic}"></i>${label}` : `${label}<i class="bi ${ic}"></i>`}</small><strong>${esc(p.title)}</strong></a>` : `<span class="${cls} empty"></span>`;
      nav.innerHTML = item(older, "prev", TXT.prevPost, arrowPrev, true) + item(newer, "next", TXT.nextPost, arrowNext, false);
    }

    // related posts
    const rel = $("#relatedPosts");
    if (rel && cur) {
      const scored = posts.filter(p => p.slug !== slug).map(p => ({ p, s: (p.category === cur.category ? 2 : 0) + p.tags.filter(t => cur.tags.includes(t)).length }))
        .sort((a, b) => b.s - a.s || b.p.date.localeCompare(a.p.date)).slice(0, 3).map(x => x.p);
      if (scored.length) rel.innerHTML = scored.map(card).join(""); else rel.closest(".related").style.display = "none";
    } else if (rel) rel.closest(".related").style.display = "none";

    // comments (Giscus)
    const cm = $("#comments"), g = CFG.comments || {};
    if (cm) {
      if (g.enabled && g.repo) {
        const s = document.createElement("script"); s.src = "https://giscus.app/client.js"; s.async = true; s.crossOrigin = "anonymous";
        Object.entries({ repo: g.repo, "repo-id": g.repoId, category: g.category, "category-id": g.categoryId, mapping: "pathname", "reactions-enabled": "1",
          "input-position": "top", theme: "preferred_color_scheme", lang: lang }).forEach(([k, v]) => s.setAttribute("data-" + k, v));
        cm.appendChild(s);
      } else cm.style.display = "none";
    }
  }
})();
