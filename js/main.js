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
        <img src="assets/images/logo.svg" alt="" />
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
      <p>[학교명] [학과명] · [주소를 입력하세요]</p>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
});
