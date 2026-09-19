// Shared header/footer injection + mobile nav toggle.
// Each page includes <div id="site-header"></div> / <div id="site-footer"></div>
// and sets <body data-page="..."> to highlight the active nav link.

const NAV_LINKS = [
  { href: "index.html", label: "홈", page: "home" },
  { href: "research.html", label: "연구분야", page: "research" },
  { href: "people.html", label: "구성원", page: "people" },
  { href: "publications.html", label: "논문", page: "publications" },
  { href: "news.html", label: "소식", page: "news" },
  { href: "contact.html", label: "연락처", page: "contact" },
];

function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;

  const currentPage = document.body.dataset.page || "";
  const links = NAV_LINKS.map(
    (link) =>
      `<a href="${link.href}"${link.page === currentPage ? ' class="active"' : ""}>${link.label}</a>`
  ).join("");

  mount.innerHTML = `
    <div class="nav-bar">
      <a class="brand" href="index.html">
        <img src="assets/images/logo.png" alt="" />
        <span>CSP Lab</span>
      </a>
      <button class="nav-toggle" type="button" aria-label="메뉴 열기" aria-expanded="false">☰</button>
      <nav class="nav-links" id="nav-links">${links}</nav>
    </div>
  `;

  const toggle = mount.querySelector(".nav-toggle");
  const navLinks = mount.querySelector("#nav-links");
  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  const year = new Date().getFullYear();
  mount.innerHTML = `
    <div class="container">
      <p>&copy; ${year} CSP Lab. All rights reserved.</p>
      <p>고려대학교 심리학부 문화·사회·성격심리 전공 (CSP Lab) · 서울특별시 성북구 안암로 145 법학관(구관)</p>
    </div>
  `;
}

function setupLightbox() {
  const targets = document.querySelectorAll(".gallery-item img, .news-card img");
  if (!targets.length) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.hidden = true;
  overlay.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="닫기">&times;</button>
    <img alt="" />
  `;
  document.body.appendChild(overlay);
  const overlayImg = overlay.querySelector("img");

  function open(src, alt) {
    overlayImg.src = src;
    overlayImg.alt = alt || "";
    overlay.hidden = false;
  }

  function close() {
    overlay.hidden = true;
    overlayImg.src = "";
  }

  targets.forEach((img) => {
    img.addEventListener("click", () => open(img.currentSrc || img.src, img.alt));
  });

  overlay.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) close();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  setupLightbox();
});
