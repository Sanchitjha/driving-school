# Karthikeyan Driving School — landing page

Keelkattalai, Chennai. Static site: `index.html` ko browser me kholo (koi build ya install nahi).
Do bhasha: **English** aur **தமிழ்** (header me EN / தமிழ் toggle). Pehle kaun si bhasha dikhe, wo `js/config.js` me `defaultLang` se set hota hai.

## Kya kahan badalna hai

| Cheez | File |
|---|---|
| Naam (English + Tamil), phone numbers, WhatsApp, address, landmark, email, timing, social links | `js/config.js` |
| Headings, services, courses, prices, FAQ, tips (English text HTML me, Tamil `data-ta="..."` me) | `index.html` |
| Colors, fonts, spacing | `css/styles.css` ke upar `:root { ... }` |
| Logo, car, photos | `images/` (neeche list) |
| Security headers, caching | `vercel.json` |

`email` aur `hours` config me khali hain, isliye site par dikhte nahi. Bharte hi dikhne lagenge.

**WhatsApp number:** `js/config.js` me `whatsapp` (country code + number, sirf digits). Abhi `919043479878` hai. Har WhatsApp button aur enquiry form isi par jaata hai. Enquiry form kuch save nahi karta, sirf WhatsApp message khol deta hai.

## Images (`images/`)

| File | Kahan se aayi / kahan use hoti hai |
|---|---|
| `logo.jpg`, `car-red.jpg` | Square yellow poster se crop. Header, footer, hero |
| `poster-square.jpg` | Original poster (social share image ke liye rakhi hai, page par use nahi) |
| `women.jpg` | AI se bani photo ka crop. "For women" section |
| `tip-*.jpg` | Driving tips section (seating, steering, pedals, gears, mirrors, road signs) |
| `favicon.svg` | Browser tab icon |

## Go-live checklist

- [ ] WhatsApp number confirm karo (`js/config.js`).
- [ ] Naam ki spelling confirm karo: logo me **Karthikeyan**, kuch AI posters me Kartikeyan / Kartikayan likha hai.
- [ ] Car course ki fee daalo (`index.html`, "Call for fee" ki jagah). 2-wheeler ₹2,999 sirf ek image se liya gaya hai, confirm karo.
- [ ] Email / timing ho to `js/config.js` me daalo.
- [ ] Tamil text kisi Tamil bolne wale se ek baar padhwa lo.
- [ ] `women.jpg` AI photo hai. Asli students/staff ki photo mile to badal do.
- [ ] Driving tips ki images web se li gayi hain (kuch par watermark hai). Apni ya licensed images se badalna behtar hai.
- [ ] `index.html` me `<meta name="robots" content="noindex, nofollow">` wali line delete karo, tab Google site ko index karega.
- [ ] Live domain milne par `og:image` jodo (`images/poster-square.jpg` use ho sakti hai).
- [ ] Apna domain Vercel dashboard me jodo (Project → Settings → Domains).

## Deploy

```bash
vercel deploy --prod --yes
```

GitHub se connect hone par har `git push` par Vercel apne aap naya version live kar dega.
