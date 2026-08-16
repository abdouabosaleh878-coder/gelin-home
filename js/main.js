// Gelin Home — shared site behaviour (nav toggle, active link, hero search)

function statusBadge(property) {
  if (property.status === "sold") return '<span class="card-badge status-sold">Sold</span>';
  if (property.status === "new") return '<span class="card-badge status-new">New Listing</span>';
  return "";
}

function renderCard(property) {
  return `
    <a class="card" href="property.html?id=${encodeURIComponent(property.id)}">
      <div class="card-media">
        <img src="${property.image}" alt="${property.title}" loading="lazy" />
        ${statusBadge(property)}
        <span class="card-price">${formatPrice(property.price)}</span>
      </div>
      <div class="card-body">
        <h3>${property.title}</h3>
        <div class="card-address">${property.address}, ${property.city}</div>
        <div class="card-meta">
          <span>${property.beds} bd</span>
          <span>${property.baths} ba</span>
          <span>${property.sqft.toLocaleString("en-US")} sqft</span>
        </div>
      </div>
    </a>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const currentPage = document.body.dataset.page;
  if (currentPage) {
    document.querySelectorAll(".nav-links a").forEach((link) => {
      if (link.dataset.page === currentPage) {
        link.classList.add("active");
      }
    });
  }

  const heroSearch = document.getElementById("hero-search");
  if (heroSearch) {
    heroSearch.addEventListener("submit", (event) => {
      event.preventDefault();
      const params = new URLSearchParams();
      const location = heroSearch.querySelector("[name=location]").value.trim();
      const type = heroSearch.querySelector("[name=type]").value;
      const minPrice = heroSearch.querySelector("[name=minPrice]").value;
      const maxPrice = heroSearch.querySelector("[name=maxPrice]").value;

      if (location) params.set("q", location);
      if (type) params.set("type", type);
      if (minPrice) params.set("min", minPrice);
      if (maxPrice) params.set("max", maxPrice);

      window.location.href = "listings.html" + (params.toString() ? "?" + params.toString() : "");
    });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const featuredGrid = document.getElementById("featured-grid");
  if (featuredGrid) {
    const featured = PROPERTIES.filter((p) => p.featured).slice(0, 3);
    featuredGrid.innerHTML = featured.map(renderCard).join("");
  }
});
