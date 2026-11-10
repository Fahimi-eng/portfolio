# Alireza Fahimi — Personal Portfolio

A modern, responsive personal portfolio built with:

- HTML5
- CSS3
- Bootstrap 5
- Bootstrap Icons
- Vanilla JavaScript

## Run

No build step is required.

Open `index.html` in a browser, or serve the folder with a local web server.

## Customize

1. Replace the profile placeholder in `index.html` with your photo.
2. Add your real CV at `assets/Alireza-Fahimi-CV.pdf`.
3. Replace `hello@example.com` with your email.
4. Replace LinkedIn and Instagram `#` links.
5. Add real GitHub repository links to each project.
6. Update the project descriptions and timeline as your experience grows.

## Design

The design uses a purple/indigo visual identity, large editorial typography, a developer/code-card hero, dark journey section, project showcase, and a light/dark theme switcher.

## Important

The contact form uses `mailto:`. For production, connect it to a backend/API or a form service instead.

## Persian version (RTL)

- English page: `index.html` — Persian page: `fa/index.html` (served at `/fa/`).
- The "فارسی" button (English page) and "English" button (Persian page) sit in the navbar.
- Shared assets: `css/style.css`, `js/script.js`; Persian-only: `css/rtl.css`, `css/fonts.css`.
- Persian font: Vazirmatn. Put `Vazirmatn-Variable.woff2` in `fonts/` (see `fonts/README.txt`);
  until then the font loads automatically from the jsDelivr CDN.

## Blog (English `/blog/`, Persian `/fa/blog/`)

Static, no build step and no database. Each post is its own HTML page (good for SEO);
the listing, search, filters, pagination, related posts and the "latest posts" block on the
home page are driven by one data file: `js/blog-data.js`.

Features: featured post, live search, category chips, tag filter, sort, pagination (URL-based, shareable),
sidebar (author, categories, recent posts, tag cloud, newsletter), breadcrumbs, reading progress bar,
auto table of contents with scroll-spy, heading anchors, syntax highlighting + copy button,
callouts / tables / quotes / figures, share buttons (X, LinkedIn, Telegram, WhatsApp, copy link),
author box, previous/next, related posts, newsletter form, optional Giscus comments,
JSON-LD (BlogPosting), Open Graph, hreflang between translations, RSS feeds, back-to-top, print styles.

### Publish a new post
1. Copy `blog/_post-template/` to `blog/<your-slug>/` (Persian: `fa/blog/_post-template/` → `fa/blog/<slug>/`).
2. In the new `index.html` edit: `<title>`, meta description, canonical, `data-slug`, title, excerpt,
   category, dates, cover icon/color, tags and the content inside `.post-content`. Remove `noindex`.
3. Add one entry to `js/blog-data.js` (same slug; set `translation` if the other language exists).
4. Add the URL to `sitemap.xml` and an `<item>` to `blog/feed.xml`.

The three sample posts are placeholders — replace or delete them (folder + entry in `blog-data.js` + sitemap + feed).
Settings (posts per page, newsletter endpoint, comments) live at the top of `js/blog-data.js`.
