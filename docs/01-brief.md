# 01 — Project Brief

## The business

Yazh Drapings pre-pleats sarees. A customer hands over a saree; it comes back with the pleats
set, pressed, and secured so it can be worn in under a minute instead of the usual fifteen.

The name comes from the **yazh** (யாழ்), the ancient Tamil harp — an instrument of parallel
strings. A pleated saree is the same shape: parallel folds, evenly spaced, catching light on
one edge and shadow on the other. That's the whole visual idea of the brand.

## Services

| Service | What it is | Typical price (confirm before launch) |
|---|---|---|
| **Pre-pleating — cotton, georgette, chiffon** | Pleats set and pressed, tacked at the waist | ₹250 |
| **Pre-pleating — silk, Kanjivaram, tissue** | Heavier fabric, needs steam and a slower set | ₹500 |
| **Fall & pico** | Fall stitched, edges piped | ₹200 |
| **Kuchu / tassels** | Hand-knotted pallu tassels, choice of thread and bead | ₹400 – ₹900 |
| **Ready-to-wear conversion** | Saree stitched into a step-in, zip-fastened drape | ₹1,200 |
| **Bridal / occasion package** | Pleating, fall & pico, kuchu, garment bag, on-time delivery | ₹1,800 |
| **Pickup & delivery (Chennai)** | Doorstep both ways | ₹80, free above ₹800 |
| **Courier (rest of Tamil Nadu)** | Insured two-way | At actuals |

> ⚠️ **`PLACEHOLDER` — every price in this table is invented.** Replace with the client's real
> card before the site goes live, and keep them in one file (`src/data/services.ts`) so they're
> changed in exactly one place.
>
> Note the shape: kuchu is a **range** (₹400–₹900) and pickup is **conditional** (₹80, free above
> ₹800). Both need the `Price` type in `04-architecture.md`, not a bare number. The last two rows —
> pickup and courier — are `Charge`s, not `Service`s: they have no turnaround, no `/services` block,
> and must not appear in the service dropdown on `/book`.

## Who's buying

**1. The wedding-season guest.** 25–45, works, has four functions in three weeks and a saree for
each. Doesn't want to spend twenty minutes pinning pleats at 6am. Decides on Instagram, books on
WhatsApp. This is the volume customer.

**2. The bride and her family.** High value, low volume, extremely anxious about timing and about
handing over an expensive Kanjivaram to a stranger. Needs to see proof of care — real photographs
of real work, a named person, a phone number that gets answered.

**3. The occasional wearer.** Owns three sarees, wears one a year, genuinely cannot pleat. Needs
the process explained plainly with no jargon.

**4. The NRI daughter.** Booking on behalf of a mother in Chennai, paying from abroad, comparing
against nothing because there's no obvious competitor online. Needs clear pricing and a form that
works without a local phone number.

## What the site must do

In priority order:

1. **Get a WhatsApp message sent.** Everything else is secondary. The button follows the user down
   every page.
2. **Make handing over an expensive saree feel safe.** Real photos, a real face, a stated
   turnaround, a stated damage policy.
3. **Explain the process** so a first-timer knows what happens between drop-off and delivery.
4. **State prices openly.** Hiding the price card loses the price-sensitive volume customer, who
   then never messages at all.
5. **Rank for local search** — "saree pre pleating Chennai", "ready to wear saree pleating near me".

## What it must not do

- No stock photography of models in sarees. It reads as a template instantly and undermines point 2.
  Use photographs of actual finished work — the pleats, the fold stack, the pressed pallu.
- No carousel hero. No "Welcome to our website".
- No login, no cart, no payment gateway in v1. Payment happens on WhatsApp or delivery.
- No chatbot widget.

## Voice

Warm, precise, unhurried. The voice of someone who has handled ten thousand sarees and is not
impressed by yours, but will treat it carefully anyway.

Write short sentences. Name the fabric, name the count, name the day it comes back. Specificity is
the entire trust strategy: *"Nine pleats, set overnight, back to you Thursday"* does more work than
any adjective.

Avoid: *premium, luxurious, elegance redefined, one-stop solution, hassle-free, we strive to.*

## Success measures

| Metric | Target at 3 months |
|---|---|
| WhatsApp clicks / sessions | ≥ 8% |
| Booking form submissions | ≥ 40 / month |
| Mobile Lighthouse performance | ≥ 90 |
| Rank for "saree pre pleating Chennai" | Top 3 |
| Bounce on `/services` | < 45% |
