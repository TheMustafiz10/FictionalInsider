# FictionalInsider


An original mobile-first concept for scanning **fictional** disclosed-insider activity. This is a prototype — **not an investing tool**, and it does not display real market data.

---

## Project Overview

Retail users who want to understand disclosed insider activity often face dense, desktop-oriented filing pages that are difficult to scan on a phone. This app demonstrates a compact mobile flow for:

- scanning a quick snapshot of notable fictional activity,
- finding a specific transaction with search and filters,
- understanding one mock filing's details in seconds.

The goal is **clarity and speed on a small screen**, not investment guidance.

---

## Concept and Data Statement

- This is an **original mobile concept** inspired by the broad insider-activity product category represented by StockInsider.io.
- **StockInsider.io was not used as a data, copy, or UI source.** No screens, wording, layouts, colors, transaction values, or datasets were copied.
- **All data is local fictional mock/demo data.** Every company, ticker, insider name, value, date, and signal is invented for demonstration.
- The app makes **no network or API calls**, contains **no live filing data**, and does not scrape or download any external content.
- Safe summary: *Original mobile concept inspired by the broad insider-activity product category; all displayed content is fictional mock/demo data.*

---

## Screens and Features

The app consists of exactly **three connected screens**.

### 1. Market Pulse (Home) — `src/app/index.tsx`
- Header with a **"Fictional demo data"** badge.
- Search entry reading *"Search ticker or company"* that opens the Screener.
- **Three summary cards** derived from the local array:
  - Transactions today (count)
  - Purchase value (sum of purchases)
  - Sale value (sum of sales)
- **Top Signals Today** — three fictional signal chips.
- **Latest Activity** — four latest trade cards with a **"View all"** action to open the Screener.

### 2. Latest Trades / Screener — `src/app/screener.tsx`
- Case-insensitive **search** matching ticker or company name.
- **Three independent filter groups** (chips):
  - Transaction type: All / Purchases / Sales
  - Insider role: All roles / CEO / CFO / Director
  - Value threshold: Any / $100K+ / $500K+ / $1M+
- **Result count** line (e.g., *"6 results"*).
- **Empty state** with an actionable **"Clear filters"** button.
- Tapping any card opens the Details screen.

### 3. Trade Details — `src/app/details/[id].tsx`
- Back button (native header).
- Company header with ticker, sector, and a **"FICTIONAL DEMO DATA"** badge.
- Prominent **signal card** (e.g., *"Large CEO Purchase"* with value).
- **Metrics grid**: insider, transaction code, shares, price per share, total value, transaction date, filed date.
- **Mock 7-day activity chart** built from local numeric data.
- **"Why this matters"** education block (fictional, non-advisory).
- Required **disclaimer**:

  > This prototype uses mock data for demonstration only. Insider-trading filings are public disclosures and do not constitute investment advice. Past activity does not guarantee future stock performance.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Expo (SDK 55) |
| Runtime | React Native |
| Language | TypeScript |
| Navigation | Expo Router (file-based, stack) |
| Icons | Unicode arrows (↑ / ↓) — no icon library required |
| Chart | Plain React Native `View` bars (no SVG dependency) |
| State | React `useState` + `useMemo` (no global state library) |

---

## Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- For device testing: **Expo Go** app (Android / iOS)
- For emulator testing: Android Studio (optional)

### Install and Run

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd FictionalInsider

# 2. Install dependencies
npm install

```

# 3. Start the development server
```
npx expo start

```


## Mobile Design Decisions

The UI was designed specifically for small screens and quick scanning. Key decisions:

- **High scanability** — each trade card follows the same predictable vertical rhythm:
  `ticker → company → value → insider → time`. Users can scan a list in seconds without re-reading structure each time.
- **Filter chips instead of dropdowns** — one tap per filter, visible selection state, and chips wrap on narrow screens so no option is hidden or clipped.
- **Text + color + arrow for transaction semantics** — Purchase is shown as `↑ Purchase` in green, Sale as `↓ Sale` in red. Meaning is conveyed by three signals (text, icon, color), not color alone, so the UI remains usable for color-blind users.
- **8-point spacing rhythm** — spacing uses `8 / 12 / 16 / 20 / 24 px`, with 14–18 px corner radii and subtle borders instead of heavy shadows.
- **Flexible widths** — no fixed card widths. Long company names truncate cleanly (`numberOfLines={1}`) instead of breaking the layout on narrow devices.
- **Actionable empty states** — the Screener's no-results view offers a one-tap **Clear filters** button so the user is never stuck.
- **Fictional-data signaling** — a *Fictional demo data* badge is visible on Home, and a *FICTIONAL DEMO DATA* badge is visible on Details, so the prototype can never be mistaken for live market information.

---

## Known Limitations

This prototype is intentionally small and self-contained. It does **not** attempt to be a real financial product.

- **Static local data only** — all trades live in [`src/data/mockTrades.ts`](src/data/mockTrades.ts).
- **No live filings** — no SEC feed, no market API, no scraping, no downloaded datasets.
- **No backend** — no authentication, portfolio, alerts, watchlists, or server component.
- **No persistence** — filter and search state reset when the app reloads.
- **Not investment advice** — the app is a UI prototype only and makes no claims about any real security.




## AI-Use Disclosure

AI tools were used as development assistants during this project. They helped with planning, clarifying technical patterns, and drafting supporting text. All code and design decisions were independently reviewed, edited, tested, and can be explained by the author.

| Tool | How it was used |
|---|---|
| **Perplexity AI** | Used to turn the assignment brief into a planning checklist and to clarify the overall project scope and requirement mapping before implementation began. |
| **DeepSeek** | Used to (1) generate the initial structure of the local fictional mock data array, (2) draft the README sections, and (3) propose initial StyleSheet definitions and design tokens for the three screens. |

**Scope of review:** Every suggestion from these tools was reviewed line-by-line, adapted to this specific project's requirements, and tested in the running app. Mock trade records were verified to be fully fictional and internally consistent. Styles were adjusted to match the mobile design decisions documented above. README sections were rewritten and fact-checked against the assignment brief before being committed.

**What was not AI-generated:** The final architecture, file organization, filter logic, navigation flow, validation against the test checklist, and all bug fixes were performed by the author.

**Declaration:** No AI-generated code, content, or design was submitted without independent review. The author can explain every submitted file and every decision made in it.


