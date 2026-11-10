/* ==========================================================
   BLOG DATA — the only file you edit to publish a new post.
   1) Copy a post folder (blog/<slug>/ or fa/blog/<slug>/) and write your content.
   2) Add one entry for it below (newest order doesn't matter, it sorts by date).
   Cover: either icon + color (purple|blue|pink|green|orange) OR  image:"assets/images/blog/x.jpg"
   translation: slug of the same post in the other language (or null).
   ========================================================== */
window.BLOG_CONFIG = {
  postsPerPage: 6,
  siteUrl: "https://mrfahimi.com",
  newsletterEmail: "hello@example.com", // used when newsletterAction is empty (opens a mailto)
  newsletterAction: "",                 // e.g. a Formspree / Buttondown / Mailchimp form endpoint
  comments: {                           // Giscus (GitHub Discussions). Fill in to enable. https://giscus.app
    enabled: false, repo: "", repoId: "", category: "", categoryId: ""
  }
};

window.BLOG_POSTS = {
  en: [
    {
      slug: "python-ai-roadmap",
      title: "A Practical Python Roadmap for Aspiring AI Engineers",
      excerpt: "Where do you start when moving from web development into AI? The order I'd follow today: practical, project-first and without the overwhelm.",
      date: "2026-11-02", category: "Python & AI",
      tags: ["Python", "AI", "Roadmap", "Learning"],
      readTime: 2, icon: "bi-robot", color: "purple", featured: true, translation: "python-ai-roadmap"
    },
    {
      slug: "laravel-rest-api-best-practices",
      title: "Laravel REST API Best Practices I Wish I Knew Earlier",
      excerpt: "API resources, form requests, versioning and consistent errors: four habits that make a Laravel API easier to grow and easier to trust.",
      date: "2026-10-20", category: "Backend",
      tags: ["Laravel", "PHP", "API", "MySQL"],
      readTime: 2, icon: "bi-layers", color: "blue", translation: "laravel-rest-api-best-practices"
    },
    {
      slug: "from-support-to-software-engineer",
      title: "From Software Support to Software Engineer: How My Thinking Changed",
      excerpt: "Years of talking to real users taught me things no course did. Here is what I carried from the support desk into engineering.",
      date: "2026-10-05", category: "Career",
      tags: ["Career", "Learning", "Support"],
      readTime: 1, icon: "bi-headset", color: "pink", translation: "from-support-to-software-engineer"
    }
  ],
  fa: [
    {
      slug: "python-ai-roadmap",
      title: "نقشه راه عملی پایتون برای کسانی که می‌خواهند مهندس هوش مصنوعی شوند",
      excerpt: "از کجا شروع کنیم وقتی از توسعه وب به سمت هوش مصنوعی می‌رویم؟ ترتیبی که امروز دنبال می‌کردم: عملی، پروژه‌محور و بدون سردرگمی.",
      date: "2026-11-02", category: "پایتون و هوش مصنوعی",
      tags: ["پایتون", "هوش مصنوعی", "نقشه راه", "یادگیری"],
      readTime: 2, icon: "bi-robot", color: "purple", featured: true, translation: "python-ai-roadmap"
    },
    {
      slug: "laravel-rest-api-best-practices",
      title: "بهترین روش‌های ساخت REST API در لاراول که ای کاش زودتر می‌دانستم",
      excerpt: "API Resource، Form Request، نسخه‌بندی و خطاهای یکدست: چهار عادتی که توسعه و اعتماد به یک API لاراولی را ساده‌تر می‌کنند.",
      date: "2026-10-20", category: "بک‌اند",
      tags: ["لاراول", "PHP", "API", "MySQL"],
      readTime: 2, icon: "bi-layers", color: "blue", translation: "laravel-rest-api-best-practices"
    },
    {
      slug: "from-support-to-software-engineer",
      title: "از پشتیبانی نرم‌افزار تا مهندسی نرم‌افزار: نگاهم چه تغییری کرد",
      excerpt: "سال‌ها صحبت با کاربران واقعی چیزهایی به من یاد داد که هیچ دوره‌ای نداد. این‌ها چیزهایی است که از میز پشتیبانی به مهندسی آوردم.",
      date: "2026-10-05", category: "مسیر شغلی",
      tags: ["مسیر شغلی", "یادگیری", "پشتیبانی"],
      readTime: 1, icon: "bi-headset", color: "pink", translation: "from-support-to-software-engineer"
    }
  ]
};
