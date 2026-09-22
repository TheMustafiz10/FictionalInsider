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
npx expo start
