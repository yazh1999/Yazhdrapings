# 06 — Production

Everything between "the build is finished" and "the business is running on it."

The site is small; the risk is not in the code. It is in a lost booking, an unanswered WhatsApp
message, a domain that expires, and a privacy notice that was never written. This document is the
runbook for those.

---

## 1. Before anything is deployed

These are procurement and paperwork, not engineering, and they have lead times measured in days.
Start them the week Phase 1 starts, not the week of launch.

| Item | Who | Lead time | Notes |
|---|---|---|---|
| Domain `yazhdrapings.com` | You | Same day | Register for 2+ years. **Enable auto-renew and WHOIS privacy.** An expired domain is the single most damaging outage possible. |
| Business email on the domain | You | Same day | Google Workspace or Zoho Mail. `orders@`, `hello@`. Needed before Resend can be verified. |
| Resend account + domain verification | You | Up to 48 hrs | DNS propagation for SPF/DKIM. **Start this early** — it is the most common launch-day blocker. |
| Google Analytics 4 property | You | Same day | Get `G-XXXXXXXXXX` before the consent banner is built. |
| Google Search Console | You | Same day | Verify by DNS TXT, same as the domain. |
| Google Business Profile | Client | **1–2 weeks** | Postcard verification to the studio address. Per `04-architecture.md` this drives more month-one traffic than the site. Start it first. |
| WhatsApp Business number | Client | Same day | Must be the number in `NEXT_PUBLIC_WHATSAPP_NUMBER`, and it must be a phone someone actually watches. |
| Real prices, signed off | Client | — | Blocking. |
| Care policy and damage terms, signed off | Client | — | Blocking. In writing. |
| Three real testimonials with consent | Client | — | Blocking, or the section is cut. |
| Photography per the `05-roadmap.md` brief | Client | 1–2 weeks | Blocking for `/gallery` and `/how-it-works`. |

> **The critical path to launch is Google Business Profile verification and Resend DNS, not code.**
> Both are waiting-on-someone-else, and both are invisible until you need them.

---

## 2. Environment variables

Set all of these in Vercel → Settings → Environment Variables, for **Production**, **Preview** and
**Development** separately. The full table is in the root `README.md`.

**Rules that matter:**

- `NEXT_PUBLIC_*` is compiled into the browser bundle and is public. `RESEND_API_KEY` must never
  carry that prefix. Check this before the first deploy — a leaked key is a rotation and an
  incident, not a fix.
- **Preview deployments must not use production analytics or the production booking inbox.** Point
  Preview at a separate `BOOKING_INBOX` (e.g. `bookings-test@`) and leave `NEXT_PUBLIC_GA_ID` unset,
  or every test submission and every preview page view pollutes real data.
- Changing an env var does **not** rebuild the site. Redeploy after any change, or the old value
  stays baked into the bundle.
- Keep a copy of the full set in a password manager the client can reach. If you are hit by a bus,
  the business should not lose its website.

---

## 3. Deploying

Vercel, Git-connected. Push to `main` → production; every PR gets a preview URL.

```bash
# From app/ — run all three green before pushing to main.
npm run lint
npx tsc --noEmit
npm run build
```

**Branch protection.** Once the client is live, require a PR into `main`. The point is not process
for its own sake — it is that every change gets a preview URL to check on a phone before it reaches
a customer.

### Domain configuration

1. Add `yazhdrapings.com` and `www.yazhdrapings.com` in Vercel → Domains.
2. Set the apex as primary, and `www` to **redirect** to it (308).
3. At the registrar, point the records Vercel gives you. Prefer nameserver delegation if the client
   has no other DNS needs; use A/CNAME records if email is already configured elsewhere — and if so,
   **verify the MX records survive the change.** Breaking the client's email while pointing a domain
   is a classic and very bad launch-day mistake.
4. Confirm HTTPS is issued and forced, and that `http://` and `www` both land on the apex over TLS.

### Rollback

Vercel → Deployments → the last known-good build → **Promote to Production**. Roughly 30 seconds,
no rebuild. Know this path *before* you need it. If a bad deploy goes out, promote first and debug
after — do not fix forward under pressure.

---

## 4. Pre-launch verification

Run this on a **real mid-range Android phone on mobile data**, not a desktop emulator on office
wifi. That device on that connection is over 80% of the audience.

**The money path — test it end to end, in order:**

1. Load the home page cold. Time to first meaningful paint should feel instant; the hero is CSS.
2. Tap the WhatsApp bar. Does WhatsApp open, to the right number, with the message pre-filled?
3. Go back. Tap a service card's WhatsApp CTA. Is the service name in the message?
4. Fill and submit the booking form. **Does it land in the inbox?** Check spam. Check the reply-to.
5. Submit it again — is the rate limit doing something sane rather than 500ing?
6. Turn JavaScript off. Submit again. Does it still work?
7. Have the client reply to that booking on WhatsApp, on their phone. The whole loop, once, for real,
   before a customer does it.

**Then the rest:**

- [ ] Lighthouse mobile ≥ 90 on all four categories, run against the **production** URL
- [ ] Keyboard-only path through the booking form, focus ring visible at every stop
- [ ] Consent banner: decline, reload, confirm in DevTools that **no GA4 request fires**
- [ ] Every `PLACEHOLDER` gone — `grep -rn "PLACEHOLDER" src/` returns nothing
- [ ] `/sitemap.xml` and `/robots.txt` both resolve and list the right pages
- [ ] OG image renders — check with the WhatsApp link preview, since that is where it will be seen
- [ ] 404, error and loading states all styled
- [ ] Tamil strings proofread by a native reader
- [ ] Page zooms to 200% with no horizontal scroll
- [ ] Test on iOS Safari once — a minority of the traffic, but the bridal segment skews to it

---

## 5. Launch day

In this order:

1. Final production deploy from `main`.
2. Verify the money path on a real phone, on the real domain, one more time.
3. Submit the sitemap in Search Console.
4. Publish the Google Business Profile, with the website link, the real hours and the service area.
5. Put the link in the Instagram bio.
6. **Tell the client the site is live and that WhatsApp will start ringing.** Confirm someone is
   watching it during the hours `/contact` advertises. A missed first customer costs more than any
   bug on this list.

Do not launch on a Friday. Launch on a Tuesday morning, when there is a working week ahead to fix
whatever surfaces.

---

## 6. After launch

### Week one

Check daily: bookings arriving and being answered, GA4 recording `whatsapp_click`, Search Console
for crawl errors, and Vercel logs for Server Action failures. Ask the client directly whether the
enquiries feel real — analytics will not tell you that a customer messaged and got no reply.

### Ongoing

| Cadence | Task |
|---|---|
| Weekly | Booking inbox reconciled against WhatsApp — did anything fall through? |
| Weekly | Vercel logs skimmed for Server Action errors |
| Monthly | The five metrics in `01-brief.md` against their targets |
| Monthly | `npm outdated`; patch security updates |
| Monthly | Add new work to `/gallery` — a stale gallery reads as a dead business |
| Quarterly | Re-verify prices on the site against the client's actual current card |
| Quarterly | Lighthouse re-run; photography is how performance regresses |
| Annually | **Domain and email renewal confirmed.** Diarise it. |

### What to do when the numbers come in

`01-brief.md` sets targets at three months: ≥8% WhatsApp click rate, ≥40 form submissions/month,
top-3 for *saree pre pleating Chennai*, bounce under 45% on `/services`.

- **Traffic but no WhatsApp clicks** → the offer or the price is not landing. Look at `/pricing`
  before touching the design.
- **WhatsApp clicks but no bookings** → the gap is in reply speed on the client's side, not the site.
- **No traffic at all** → it is the Google Business Profile, not the site. That is where the local
  intent actually lands, and it is the highest-leverage thing to fix.

Resist rebuilding anything for at least a month. The Phase 4 list in `05-roadmap.md` is explicitly
gated on real traffic existing, and most of it will turn out to be unnecessary.

---

## 7. Costs

Realistic annual running cost, at this traffic:

| Item | Cost | Notes |
|---|---|---|
| Domain | ~₹1,000/yr | |
| Vercel | ₹0 | Hobby covers this comfortably. **Move to Pro (~$20/mo) if the site is commercial** — check Vercel's current terms, as hobby-tier restrictions on commercial use do change. |
| Resend | ₹0 | Free tier is generous; bookings will not approach it. Confirm the current limit when you sign up. |
| Google Workspace | ~₹1,900/yr | Per mailbox, basic tier. |
| GA4, Search Console, Business Profile | ₹0 | |

**Under ₹5,000/year all-in**, assuming Vercel stays on hobby. Budget for Pro and it is closer to
₹25,000. Tell the client the number before they discover it.

---

## 8. Known risks

| Risk | Likelihood | What it costs | Mitigation |
|---|---|---|---|
| Nobody watches WhatsApp during stated hours | **High** | Every customer | Agree coverage with the client before launch. This is the top risk on the project and it is not technical. |
| Booking email lands in spam | Medium | Silent lost orders | Verify SPF/DKIM; send a test to the real inbox; check weekly for the first month |
| Placeholder facts ship as written | Medium | Legal + trust | `grep PLACEHOLDER` in the quality gate |
| Photography never materialises | Medium | `/gallery` empty | Phase 3 is blocked on it; say so early and often |
| Domain lapses | Low | **Total** | Auto-renew, 2-year registration, diarised check |
| Spam floods the form | Low | Inbox unusable | Honeypot + rate limit already specified |
| Vercel hobby-tier terms enforced | Low | Sudden downtime | Read the current terms; move to Pro if in doubt |

---

## 9. Handover

Before the engagement ends, the client should have, in writing:

- Registrar, Vercel, Resend, Google Workspace and GA4 logins, in a password manager they control
- The env var list, with values
- How to promote a rollback in Vercel (one paragraph, with a screenshot)
- Who to call, and what it costs, for changes after handover
- **Where the prices live** — `src/data/services.ts` — and that they cannot be edited from a CMS
  in v1. If that is unacceptable, the Sanity migration in Phase 4 becomes Phase 3.

The site is not the deliverable. A business that can keep answering its WhatsApp is.
