// Gelin Home — listings page: filtering and rendering

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("listing-grid");
  const emptyState = document.getElementById("empty-state");
  const resultsCount = document.getElementById("results-count");
  const form = document.getElementById("filters-form");

  if (!grid || !form) return;

  const params = new URLSearchParams(window.location.search);

  const fields = {
    q: form.querySelector("[name=q]"),
    type: form.querySelector("[name=type]"),
    min: form.querySelector("[name=min]"),
    max: form.querySelector("[name=max]"),
    beds: form.querySelector("[name=beds]"),
    sort: form.querySelector("[name=sort]"),
  };

  if (params.get("q")) fields.q.value = params.get("q");
  if (params.get("type")) fields.type.value = params.get("type");
  if (params.get("min")) fields.min.value = params.get("min");
  if (params.get("max")) fields.max.value = params.get("max");

  function applyFilters() {
    const q = fields.q.value.trim().toLowerCase();
    const type = fields.type.value;
    const min = fields.min.value ? Number(fields.min.value) : null;
    const max = fields.max.value ? Number(fields.max.value) : null;
    const minBeds = fields.beds.value ? Number(fields.beds.value) : null;
    const sort = fields.sort.value;

    let results = PROPERTIES.filter((p) => {
      if (q && !(`${p.title} ${p.address} ${p.city}`.toLowerCase().includes(q))) return false;
      if (type && p.type !== type) return false;
      if (min !== null && p.price < min) return false;
      if (max !== null && p.price > max) return false;
      if (minBeds !== null && p.beds < minBeds) return false;
      return true;
    });

    if (sort === "price-asc") results.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") results.sort((a, b) => b.price - a.price);
    else if (sort === "newest") results.sort((a, b) => b.yearBuilt - a.yearBuilt);

    renderResults(results);
  }

  function renderResults(results) {
    resultsCount.textContent = `${results.length} home${results.length === 1 ? "" : "s"} found`;
    if (results.length === 0) {
      grid.innerHTML = "";
      emptyState.style.display = "block";
      return;
    }
    emptyState.style.display = "none";
    grid.innerHTML = results.map(renderCard).join("");
  }

  form.addEventListener("input", applyFilters);
  form.addEventListener("submit", (e) => e.preventDefault());

  form.querySelector("[type=reset]").addEventListener("click", () => {
    setTimeout(applyFilters, 0);
  });

  applyFilters();
});
