# Hand Made Gelin Home

A premium, bilingual (English / Arabic) e-commerce website for **Hand Made Gelin Home**, a home-textiles and accessories studio in Nasr City, Cairo.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4, and Prisma. Fully data-driven — products, categories, orders, homepage content and site settings all live in the database and are managed from a private `/admin` dashboard. No code changes are needed to run the store day-to-day.

---

## 1. Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Server Actions, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS 4, custom warm-neutral luxury design system |
| Database | Prisma ORM — **SQLite** for local development (zero setup), **PostgreSQL** for production (one-line provider swap) |
| Auth | Custom email/password admin auth — bcrypt password hashing + signed JWT session cookie (`jose`) |
| Images | Local filesystem storage under `/public/uploads` via a small storage adapter (`src/lib/storage.ts`) — swappable for Vercel Blob / Cloudinary / S3, see §6 |
| Cart / Wishlist | Client-side, persisted to `localStorage` via Zustand |
| i18n | Native App Router `[locale]` routing (`/en`, `/ar`), JSON dictionaries, full RTL support for Arabic |
| Payments | Cash on Delivery today; architected so a payment provider can be added later (`Order.paymentMethod` / `paymentStatus` fields) |

---

## 2. Local development

```bash
npm install
cp .env.example .env      # then edit .env — see §3
npx prisma migrate dev    # creates prisma/dev.db and applies the schema
npm run db:seed           # creates the admin user, categories, 25 demo products, etc.
npm run dev
```

Visit **http://localhost:3000** — you'll be redirected to `/en`. Switch to Arabic with the language toggle in the header (or visit `/ar` directly).

---

## 3. Environment variables

Copy `.env.example` to `.env` and fill in real values. Full list:

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | ✅ | `file:./dev.db` locally. A `postgresql://...` connection string in production (see §5). |
| `ADMIN_NAME` | ✅ (seed only) | Display name for the initial admin account created by `npm run db:seed`. |
| `ADMIN_EMAIL` | ✅ (seed only) | Login email for the initial admin account. |
| `ADMIN_PASSWORD` | ✅ (seed only) | Login password for the initial admin account. **Change this before you seed a real deployment** — do not use the default. |
| `AUTH_SECRET` | ✅ | Random secret used to sign the admin session cookie. Generate one with `openssl rand -base64 32`. Changing it logs every admin out. |
| `NEXT_PUBLIC_SITE_URL` | ✅ | The public URL of the site, e.g. `https://gelinhome.com`. Used for canonical URLs, sitemap, and structured data. |

`ADMIN_*` variables are only read once, by the seed script — they are **not** used at runtime, so changing them later does nothing to an existing admin account. To change the admin password after seeding, use "change my password" flow — see §7.

---

## 4. What's admin-editable (no code required)

Everything a store owner needs to run day-to-day is in `/admin`:

- **Products** — add/edit/delete/duplicate, multiple images, price & sale price, stock, SKU, sizes, colors, material, dimensions, category, and the featured/bestseller/new-arrival/on-sale/active flags.
- **Categories** — add/edit/delete, image, reordering, enable/disable.
- **Orders** — search, filter by status, view full detail, change status (Pending → Confirmed → Preparing → Shipped → Delivered, or Cancelled), print, export all orders to CSV.
- **Customers** — derived automatically from orders (name, phone, email, order count, total spend).
- **Homepage Editor** — hero image/title/subtitle/buttons, brand story, new-collection banner, newsletter copy, Instagram gallery — all bilingual (English + Arabic).
- **Policy Pages** — Shipping, Returns & Exchange, Privacy, Terms & Conditions — bilingual rich text.
- **Settings** — brand name, logo, favicon, phone, WhatsApp number, email, address, opening hours, Google Maps link, social links, delivery fee & free-shipping threshold.

Reviews are customer-submitted on each product page and shown immediately (no moderation queue in this version — see §9 for scope notes). Wishlist and "recently viewed" are stored in the visitor's browser (`localStorage`), not the database, since no customer account system was requested.

---

## 5. Deployment

### Step 1 — Push to GitHub
This repo is already git-initialized. Commit your changes and push to a GitHub repository.

### Step 2 — Database (production)
The app ships configured for SQLite so it runs anywhere with zero setup, but SQLite's on-disk file does not survive redeploys on serverless hosts. For production, switch to Postgres:

1. Create a free Postgres database — [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Railway](https://railway.app) all work well and take under 2 minutes.
2. In `prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "sqlite"   // change to:
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
3. Delete the `prisma/migrations` folder (it was generated for SQLite) and run `npx prisma migrate dev --name init` once against your new Postgres URL to create fresh Postgres migrations. Commit the new `prisma/migrations` folder.
4. Set `DATABASE_URL` to your Postgres connection string in your hosting provider's environment variables.

### Step 3 — Hosting (pick one)

**Option A — Railway / Render (recommended, simplest for a non-expert)**
Both support a persistent disk, so the built-in local image storage (`public/uploads`) works unmodified.
1. Create a new Web Service from your GitHub repo.
2. Build command: `npm run build` — Start command: `npm run start`.
3. Attach a persistent volume mounted at `public/uploads` (Railway: "Volumes"; Render: "Disks") so uploaded images survive restarts and deploys.
4. Add the environment variables from §3, plus your Postgres `DATABASE_URL`.
5. After the first deploy, run `npm run db:migrate:deploy` and `npm run db:seed` once via the platform's shell/console.

**Option B — Vercel**
Vercel's serverless functions have a read-only, ephemeral filesystem — uploaded images written to `public/uploads` will **not** persist. If you deploy here, swap the storage adapter in `src/lib/storage.ts` for [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) (a few lines — the `saveImage`/`deleteImage` function signatures stay the same, so nothing else in the app needs to change). Everything else (Postgres via Neon/Supabase, env vars, build command) works the same as Option A.

### Step 4 — Custom domain & SSL
Both Railway/Render and Vercel let you add a custom domain in their dashboard and issue a free SSL certificate automatically — just point your domain's DNS (an `A`/`CNAME` record) at the value they give you. No manual certificate work needed.

### Step 5 — First admin login
Once deployed and seeded (§3/§7), log in at `https://yourdomain.com/admin/login` with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set before seeding.

---

## 6. Swapping image storage to a cloud provider

`src/lib/storage.ts` exports two functions: `saveImage(file, folder)` and `deleteImage(url)`. Every place in the app that handles an upload (product images, category images, homepage/settings images) calls only these two functions — so moving to Vercel Blob, Cloudinary, or S3 means rewriting just this one file; nothing else changes.

---

## 7. Adding your first product

1. Go to `/admin/login` and sign in.
2. Click **+ Add Product** (top of the sidebar, or Products → Add Product).
3. Fill in name, description, price, SKU and stock, choose a category, optionally add sizes/colors/material/dimensions.
4. Upload one or more images (the first becomes the main photo).
5. Tick **Active** so it's visible on the storefront, and optionally Featured/Bestseller/New Arrival/On Sale.
6. Click **Create Product** — it's live immediately at `/en/products/<slug>`.

To change your admin password: there is no self-service "change password" screen in this version — update `ADMIN_PASSWORD` in your environment and re-run `npm run db:seed` (it upserts the admin user by email, so it updates the existing account's password rather than creating a duplicate).

---

## 8. Demo data

`npm run db:seed` creates 7 categories and 25 demo products (all flagged `isDemo: true` in the database) with royalty-free placeholder photography, plus starter policy-page content and an Instagram gallery. Delete any or all of them from `/admin/products` and `/admin/categories` once you've uploaded your real catalog — nothing else in the app depends on the demo data.

---

## 9. Scope notes

A few pragmatic scoping decisions worth knowing about:

- **Reviews** are stored per-product and shown immediately on submission — there's no admin moderation queue in this version.
- **Wishlist & "recently viewed"** are stored in the visitor's browser (`localStorage`), not tied to a customer account, since the brief didn't call for customer login/accounts — only admin auth and guest checkout.
- **Contact form** submissions are saved to the database (`ContactMessage` table) but don't yet have a dedicated admin screen — view them via `npx prisma studio` for now.
- **Admin dashboard UI is English-only** by design; the storefront is fully bilingual (EN/AR with RTL).

---

## 10. Useful scripts

```bash
npm run dev            # start the dev server
npm run build           # production build (also regenerates the Prisma client)
npm run start           # run a production build
npm run db:migrate      # create/apply a new Prisma migration (dev)
npm run db:migrate:deploy  # apply existing migrations (production/CI)
npm run db:seed         # (re-)seed demo data + admin user
npm run db:studio       # open Prisma Studio, a GUI for your database
```
