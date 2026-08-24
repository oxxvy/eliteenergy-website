# Legal information required before publishing

The three legal pages are written and wired up, but they deliberately state **no
facts about your company that I could not verify from this project**. Everything
below has to come from you. Until it does, the pages hide those blocks rather
than show placeholder text.

All values live in one file: **`legal-config.js`**. Replace `null` with a real
string and the matching block appears.

---

## 1. Blocking — do not publish without these

| Config key | What it is | What happens while it is `null` |
|---|---|---|
| `entityName` | Registered legal name of the operator | Pages refer only to "EliteEnergy" and claim no corporate identity |
| `governingLaw` | Governing law + courts, e.g. "England and Wales" | The clause renders without naming a jurisdiction — weak protection |
| `supportTelegram` | Your real Telegram support URL | Wording stays generic, no link is rendered |
| `botUrl` | Your real Telegram bot URL | "Open bot" buttons fall back to the landing page |
| `siteUrl` | Live domain, used for canonical + og:url | Defaults to the example domain `eliteenergy.example` |

`contactEmail` is not strictly blocking, but consumer law in most jurisdictions
expects a contact method that is not a chat app. Strongly recommended.

## 2. Recommended

| Config key | What it is |
|---|---|
| `registeredAddress` | Business address, required for consumer disclosure in many jurisdictions |
| `registrationNumber` | Company/registration number and the register it sits in |
| `privacyEmail` | Dedicated data-protection contact (falls back to `contactEmail`) |
| `dataRetention` | How long order/account records are kept, e.g. "24 months after your last order" |

## 3. Facts about the running system I could not verify

I only had the marketing landing page in this project — no bot source, no
backend, no database schema, no analytics configuration. **Confirm each of these
against the real implementation** and set the flag accordingly.

| Config key | Question to answer |
|---|---|
| `usesCookies` | Does the website set any cookie or non-essential storage? |
| `usesAnalytics` + `analyticsProvider` | Is any analytics running on the site? |
| `logsIpAddresses` | Does the bot or site log IPs / device information? |
| `offersApi` | Is the developer API actually live for third parties? |
| `dataRetention` | What is the real retention period? |

Also confirm, and tell me if any of it is wrong so I can correct the text:

- **What the bot stores.** The Privacy Policy currently describes: Telegram user
  ID and username, TRON addresses you submit, deposit address and balance, order
  records (amount, price, timestamp, transaction hash), and support messages.
  That is the minimum the described product needs to function — but it is
  inferred, not read from your database.
- **Refunds.** The landing page states failed orders are refunded automatically.
  The Terms restate that. Confirm the actual trigger, the actual timeframe, and
  whether refunds go to balance or on-chain.
- **Delivery time.** The landing page advertises under 10 seconds. The legal
  pages deliberately do **not** guarantee any delivery time — they say orders
  are normally processed within seconds and that timing depends on the TRON
  network. Do not upgrade this to a guarantee unless you can honour it.
- **Cancellation.** The Terms say an order cannot be cancelled once submitted
  on-chain. Confirm whether the bot offers any cancellation window before that.
- **Age limit.** The Terms set 18. Change it if your jurisdiction differs.

## 4. Marketing claims that are your responsibility

These appear on the landing page and are repeated nowhere in the legal pages, on
purpose. If they are not substantiated, they are the most likely source of a
consumer-protection complaint:

- "10K+ active users"
- "10M+ energy delegated"
- "99.99% order success rate"
- "Under 10s average delivery"
- 4.9 rating and the six testimonials (still placeholder copy I wrote)

## 5. Deployment note

The pages are `terms.dc.html`, `privacy.dc.html` and `risk-disclosure.dc.html`,
and the landing page footer links to them relatively. If you want the URLs
`/terms`, `/privacy`, `/risk-disclosure`, rename or route them at deploy and
update the three `href`s in the landing page footer plus the cross-links at the
bottom of each legal page.

## 6. Finally

I am not a lawyer and these documents are not legal advice. They are a
professionally structured, honest starting point drafted around what this
product actually does. Have a qualified lawyer in your operating jurisdiction
review them before you publish — particularly the limitation of liability,
governing law, and refund clauses.
