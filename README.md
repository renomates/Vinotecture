# Vinotecture — The Gallery 72

Static storefront for the Gallery 72 wine rack (72 bottles, 100 × 100 × 30 cm). Plain HTML/CSS/JS — no build step, free hosting on GitHub Pages, checkout through Stripe Payment Links.

```
index.html                 Landing + product page (hero, audiences, specs, pricing, trade form, FAQ)
journal/                   SEO articles (add one a week — see SEO-PLAN.md)
shipping-returns.html      Policy pages
privacy.html
404.html
css/styles.css             All styling (colour tokens at the top)
js/main.js                 CONFIG block: checkout links, racks-left counter, email
assets/                    photos/ (product shots), favicon, og-image.png
robots.txt, sitemap.xml, CNAME, .nojekyll
SEO-PLAN.md                SEO + 50-sale launch plan
```

## Go live in an afternoon

1. **Create the repo** — on GitHub: New repository → `vinotecture-site` → upload all files (or `git init && git add . && git commit -m "Launch" && git push`).
2. **Turn on Pages** — Settings → Pages → Source: *Deploy from a branch* → `main` / root. Site appears at `https://<you>.github.io/vinotecture-site/`.
3. **Domain** — buy `vinotecture.com.au` (needs an ABN; any .au registrar). Add DNS: four `A` records to `185.199.108.153`, `.109.153`, `.110.153`, `.111.153` and a `CNAME` for `www` → `<you>.github.io`. Tick *Enforce HTTPS*. The `CNAME` file is already in the repo.
4. **Payments** — Stripe → Payment Links → create "Gallery 72 – Single" (A$649) and "Gallery 72 – Pair" (A$1,199). Turn on: collect shipping address (AU only), phone number, Afterpay/Clearpay, Apple/Google Pay, automatic tax receipt. Paste both URLs into `CONFIG.checkout` in `js/main.js`. Until then, buy buttons open an email.
5. **Trade form** — free account at formspree.io → new form → paste the endpoint into `data-endpoint` on `#trade-form` in `index.html`. Until then, it opens an email.
6. **Photos** — product shots live in `assets/photos/`. To add more, drop the file in and add a thumbnail button in the hero of `index.html`. Next to add: one styled in a room, one close-up of timber, one with a person for scale. Use your own photos or ones your supplier has given you written permission to use — not images from other stores.
7. **Analytics** — paste the Google Analytics 4 tag in `<head>` of each page; the buttons already fire `begin_checkout` and `generate_lead` events. Verify the domain in Google Search Console and submit `sitemap.xml`.
8. **Fill in the placeholders** — search the repo for `ABN 00 000 000 000`, `STRIPE_LINK`, `FORMSPREE_ENDPOINT_HERE`, `hello@vinotecture.com.au`.

## Before you take money (checklist)

- **Confirm the product with your supplier**: real dimensions, timber species, finish, carton size/weight, and whether an anchoring kit is included. Edit the specs table and FAQ to match exactly.
- **Import rules**: timber furniture entering Australia goes through biosecurity (DAFF). Ask the supplier for a fumigation or heat-treatment certificate and use a customs broker.
- **Landed cost**: unit price + freight + duty + GST + broker + local delivery. The A$549 trade price only works if landed cost + delivery is comfortably below ~A$350.
- **Honest pricing**: the "Founding 50" price and the A$849 rise must be real; only show "racks left" counts you can back up (ACCC).
- **Tip-over safety**: include anchoring hardware and a warning label.
- **Policies**: get the privacy and returns pages checked; register for GST if you'll pass A$75k turnover.

## Editing tips

- Prices appear in `index.html` (visible text **and** the JSON-LD `offers.price`) — update both.
- Colours: tokens at the top of `css/styles.css`.
- New article: copy a file in `journal/`, change title/description/canonical/JSON-LD, link it from `journal/index.html`, add it to `sitemap.xml`.
