const root=document.documentElement;
const themeToggle=document.getElementById("themeToggle");
const savedTheme=localStorage.getItem("portfolio-theme");
if(savedTheme) root.setAttribute("data-theme",savedTheme);
updateThemeIcon();

themeToggle.addEventListener("click",()=>{
  const next=root.getAttribute("data-theme")==="dark"?"light":"dark";
  root.setAttribute("data-theme",next);
  localStorage.setItem("portfolio-theme",next);
  updateThemeIcon();
});
function updateThemeIcon(){
  const dark=root.getAttribute("data-theme")==="dark";
  themeToggle.innerHTML=dark?'<i class="bi bi-sun"></i>':'<i class="bi bi-moon-stars"></i>';
}

const reveals=document.querySelectorAll(".reveal");
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
reveals.forEach(el=>observer.observe(el));

const navbar=document.getElementById("navbar");
const sections=document.querySelectorAll("main section[id]");
const links=document.querySelectorAll(".nav-link");
window.addEventListener("scroll",()=>{
  navbar.classList.toggle("scrolled",window.scrollY>20);
  if(!sections.length) return;
  let current="";
  sections.forEach(section=>{
    if(window.scrollY>=section.offsetTop-140) current=section.id;
  });
  links.forEach(link=>{
    const href=link.getAttribute("href");
    if(href&&href.startsWith("#")) link.classList.toggle("active",href==="#"+current);
  });
});
navbar.classList.toggle("scrolled",window.scrollY>20);

document.querySelectorAll(".nav-link").forEach(link=>{
  link.addEventListener("click",()=>{
    const menu=document.getElementById("navMenu");
    if(menu.classList.contains("show")){
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

const isFa=document.documentElement.lang==="fa";
const yearEl=document.getElementById("year");
if(yearEl) yearEl.textContent=isFa
  ?new Intl.DateTimeFormat("fa-IR",{year:"numeric"}).format(new Date())
  :new Date().getFullYear();

const form=document.getElementById("contactForm");
if(form) form.addEventListener("submit",e=>{
  e.preventDefault();
  const data=new FormData(form);
  const subject=encodeURIComponent(data.get("name")+(isFa?" — پیام از پورتفولیو":" — Portfolio contact"));
  const body=encodeURIComponent(
    (isFa?"نام: ":"Name: ")+data.get("name")+"\n"+
    (isFa?"ایمیل: ":"Email: ")+data.get("email")+"\n\n"+
    data.get("message")
  );
  window.location.href=`mailto:hello@example.com?subject=${subject}&body=${body}`;
  document.getElementById("formMessage").textContent=isFa?"در حال باز کردن برنامه ایمیل...":"Opening your email client...";
});
