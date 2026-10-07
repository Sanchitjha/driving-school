# Raahi Driving School — landing page (placeholder content)

Static site: `index.html` ko browser me kholo (koi build ya install nahi).
Hindi aur English dono, header me **EN / हिं** toggle. Default bhasha `js/config.js` me set hoti hai.

## Kya kahan badalna hai

| Cheez | File |
|---|---|
| School ka naam, shehar, phone, WhatsApp, email, address, timing, social links, default bhasha | `js/config.js` |
| Headings, services, courses, prices, FAQ, reviews (English text HTML me, Hindi `data-hi="..."` me) | `index.html` |
| Colors, fonts, spacing | `css/styles.css` ke upar `:root { ... }` |
| Photos | `images/` — `hero.svg`, `car-manual.svg`, `car-automatic.svg` ko apni photo se badlo (naam same rakho, ya `index.html` me `src` badlo) |
| Logo / favicon | `images/logo.svg`, `images/favicon.svg` |
| Security headers, caching | `vercel.json` |

**WhatsApp number:** `js/config.js` me `whatsapp` (country code + number, sirf digits, jaise `919876543210`). Har "WhatsApp" button aur enquiry form isi number par jaata hai. Enquiry form kuch save nahi karta, sirf WhatsApp message khol deta hai.

## Go-live checklist

Abhi sab kuch **placeholder** hai:

- [ ] `js/config.js`: asli naam, shehar, phone, WhatsApp, email, address, timing.
- [ ] `index.html`: asli prices (₹3,999 / ₹5,999 / ₹2,499 sirf sample hain) aur course ke din/minute.
- [ ] Stats (1000+ students, 10+ years, 5+ trainers) sample hain — asli numbers daalo ya section hata do.
- [ ] Reviews "Sample review" tag ke saath hain — asli reviews daalo, tab tag hata do.
- [ ] Sirf wahi claims rakho jo sach me dete ho: dual-control cars, pickup & drop, ladies batch, RTO help, lady trainer.
- [ ] `index.html` me `<meta name="robots" content="noindex, nofollow">` wali line delete karo, tab Google site ko index karega.
- [ ] Social share image (`og:image`) banao aur `index.html` me jodo (live domain ke saath).
- [ ] Apna domain Vercel dashboard me jodo (Project → Settings → Domains).

## Deploy

```bash
vercel deploy --prod --yes
```

GitHub se connect hone par har `git push` par Vercel apne aap naya version live kar dega.
