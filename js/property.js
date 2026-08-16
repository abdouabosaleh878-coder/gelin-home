// Gelin Home — property detail page rendering

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("property-root");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const property = getProperty(params.get("id"));

  if (!property) {
    root.innerHTML = `
      <div class="empty-state">
        <h3>Listing not found</h3>
        <p>We couldn't find that property. It may have been sold or the link is incorrect.</p>
        <a class="btn btn-primary" href="listings.html">Browse all listings</a>
      </div>`;
    document.title = "Listing not found — Gelin Home";
    return;
  }

  document.title = `${property.title} — Gelin Home`;

  document.getElementById("breadcrumb-title").textContent = property.title;

  const otherImages = [property.image, property.image];

  root.innerHTML = `
    <div class="property-hero">
      <img src="${property.image}" alt="${property.title}" />
      <div class="property-hero-side">
        <img src="${otherImages[0]}" alt="${property.title} view 2" />
        <img src="${otherImages[1]}" alt="${property.title} view 3" />
      </div>
    </div>

    <div class="property-layout">
      <div>
        <div class="eyebrow">${property.type} · ${property.city}</div>
        <h1 class="mt-0">${property.title}</h1>
        <p class="card-address" style="font-size:1rem;">${property.address}, ${property.city}</p>
        <h2 style="color:var(--color-primary);">${formatPrice(property.price)}</h2>

        <div class="spec-grid">
          <div class="spec-item"><strong>${property.beds}</strong><span>Bedrooms</span></div>
          <div class="spec-item"><strong>${property.baths}</strong><span>Bathrooms</span></div>
          <div class="spec-item"><strong>${property.sqft.toLocaleString("en-US")}</strong><span>Sq Ft</span></div>
          <div class="spec-item"><strong>${property.yearBuilt}</strong><span>Year Built</span></div>
        </div>

        <h3>About this home</h3>
        <p>${property.description}</p>

        <h3>Features</h3>
        <ul class="feature-list">
          ${property.features.map((f) => `<li><span class="icon">✓</span> ${f}</li>`).join("")}
        </ul>

        <div class="tag-row">
          <span class="tag">Lot size: ${property.lotSize}</span>
          <span class="tag">MLS status: ${property.status === "sold" ? "Sold" : "Active"}</span>
        </div>
      </div>

      <aside class="contact-card">
        <div class="agent">
          <div class="avatar" style="background:var(--color-accent);">${property.agent.name.split(" ").map((n) => n[0]).join("")}</div>
          <div>
            <strong>${property.agent.name}</strong>
            <div class="muted" style="font-size:0.85rem;">Listing Agent</div>
          </div>
        </div>
        <p class="muted" style="font-size:0.9rem;">${property.agent.phone} · ${property.agent.email}</p>
        <a class="btn btn-primary btn-block" href="contact.html?property=${encodeURIComponent(property.id)}">Request a tour</a>
        <a class="btn btn-outline btn-block" style="margin-top:10px;" href="tel:${property.agent.phone.replace(/[^\d+]/g, "")}">Call agent</a>
      </aside>
    </div>
  `;
});
