# Karthikeyan Driving School — landing page

Keelkattalai, Chennai. Static site: `index.html` ko browser me kholo (koi build ya install nahi).
Do bhasha: **English** aur **தமிழ்** (header me EN / தமிழ் toggle). Pehle kaun si bhasha dikhe, wo `js/config.js` me `defaultLang` se set hota hai.

## Kya kahan badalna hai

| Cheez | File |
|---|---|
| Naam (English + Tamil), phone numbers, WhatsApp, address, landmark, Google Maps link + rating, email, timing, social links | `js/config.js` |
| Headings, services, courses, prices, FAQ, tips, YouTube videos (English text HTML me, Tamil `data-ta="..."` me) | `index.html` |
| Colors, fonts, spacing | `css/styles.css` ke upar `:root { ... }` |
| Logo, car, photos | `images/` (neeche list) |
| Security headers, caching | `vercel.json` |

`email` aur `hours` config me khali hain, isliye site par dikhte nahi. Bharte hi dikhne lagenge.

**WhatsApp number:** `js/config.js` me `whatsapp` (country code + number, sirf digits). Abhi `919043479878` hai. Har WhatsApp button aur enquiry form isi par jaata hai. Enquiry form kuch save nahi karta, sirf WhatsApp message khol deta hai.

## Images (`images/`)

| File | Kahan se aayi / kahan use hoti hai |
|---|---|
| `logo.jpg`, `car-red.jpg` | Square yellow poster se crop. Header, footer, hero |
| `poster-*.jpg`, `office.jpg`, `women-street.jpg` | Gallery section (`#gallery`), click par bada khulta hai. `poster-square.jpg` social share image ke liye bhi kaam aayegi |
| `poster-services.jpg` | Chhoti 159x318 poster (RTO services / LLR / LMV / motorcycle) ko 768x1376 me dobara banaya gaya: asli hi-res logo, traffic light aur car (square poster se) + wahi text. Asli badi poster mile to isi naam se badal do |
| `women.jpg` | AI se bani photo (`women-street.jpg`) ka crop. "For women" section |
| `tip-*.jpg` | Driving tips section (seating, steering, pedals, gears, hand brake, mirrors, road signs) |
| `favicon.svg` | Browser tab icon |

## YouTube videos

`index.html` ke `#videos` section me 3 videos hain (school ke apne channel ke). Video badalne ke liye `data-yt="VIDEO_ID"`, `href` aur thumbnail ka `src` (`https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg`) badlo. Player sirf click par load hota hai, isliye page tez rehta hai.

## Google rating

`js/config.js` me `googleUrl` (Google Maps listing) aur `googleRating` (abhi 4.8) hain. Rating badalne par yahan update karo, hero aur contact section dono me apne aap badal jayegi.

## Go-live checklist

- [ ] WhatsApp number confirm karo (`js/config.js`).
- [ ] Naam ki spelling confirm karo: logo me **Karthikeyan**, kuch AI posters me Kartikeyan / Kartikayan likha hai. Gallery me `poster-confidence.jpg` (Kartikayan) aur `women-street.jpg` (Kartikeyan) me galat spelling hai, theek karwa lo ya hata do.
- [ ] Gallery ke AI posters me kuch Tamil lines adhoori / galat hain (jaise ladies poster ki ek line). Padhwa kar theek karwa lo.
- [ ] Car course ki fee daalo (`index.html`, "Call for fee" ki jagah). 2-wheeler ₹2,999 sirf ek image se liya gaya hai, confirm karo.
- [ ] Email / timing ho to `js/config.js` me daalo.
- [ ] Tamil text kisi Tamil bolne wale se ek baar padhwa lo.
- [ ] `women.jpg` AI photo hai. Asli students/staff ki photo mile to badal do.
- [ ] Driving tips ki images web se li gayi hain (kuch par watermark hai). Apni ya licensed images se badalna behtar hai.
- [ ] `index.html` me `<meta name="robots" content="noindex, nofollow">` wali line delete karo, tab Google site ko index karega.
- [x] Link preview (WhatsApp/Facebook): `og:image` = `images/poster-square.jpg`, address `karthikeyan-driving-school.vercel.app`. Naya address share karo, WhatsApp purane link ka preview yaad rakhta hai.
- [ ] Apna domain (jaise `karthikeyandrivingschool.in`) kharido aur Vercel me jodo (Project → Settings → Domains). Phir `index.html` me `canonical` / `og:url` / `og:image` aur `js/config.js` ka `url` naye domain se badal do.

## Site addresses

- Main: https://karthikeyan-driving-school.vercel.app
- Purana (abhi bhi chalta hai): https://driving-school-pi-black.vercel.app

## Deploy

```bash
vercel deploy --prod --yes
```

GitHub se connect hone par har `git push` par Vercel apne aap naya version live kar dega.

