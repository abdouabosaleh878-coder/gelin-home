# Gelin Home

Gelin Home is a boutique real estate agency website — a static, multi-page
site for browsing listings and getting in touch with the team.

## Pages

- `index.html` — homepage with a hero search panel and featured listings
- `listings.html` — full listings grid with search/filtering
- `property.html` — single property detail page
- `about.html` — about the team
- `contact.html` — contact form

## Structure

- `css/style.css` — site styles
- `js/` — page scripts (`data.js`, `main.js`, `listings.js`, `property.js`, `contact.js`)
- `assets/` — favicon and illustrations

## Running locally

This is a static site with no build step. Serve the folder with any static
file server, for example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.
