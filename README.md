# UniSwap – Campus Marketplace

> **Tagline:** *Your Campus. Your Marketplace. Your UniSwap.*  
> **Pilot Campus:** MIT Academy of Engineering (MITAOE), Alandi (D.), Pune - 412105, Maharashtra  
> **Project Context:** Prototype developed for the **Wadhwani Foundation Venture Viability** presentation.

---

## 📌 Executive Summary

**UniSwap** is a verified, student-to-student campus marketplace created to tackle the cycle of academic waste and heavy semester expenses. Every year, college students spend thousands of rupees on syllabus textbooks, scientific calculators, drafting sets, and lab coats only to discard them or let them sit idle in hostel lockers after final exams.

UniSwap connects students within the **MIT Academy of Engineering** campus so they can:
1. **Buy** affordable second-hand study materials at peer-to-peer rates.
2. **Sell** unused textbooks, electronics, and drafting equipment.
3. **Exchange (Barter)** academic resources directly between batches.
4. **Donate** useful items for free (₹0) to junior peers in need.

---

## 🎨 Design Identity & Aesthetics

UniSwap is designed with a **modern editorial e-commerce aesthetic**, moving far away from generic SaaS templates and AI placeholders:

* **Colour Palette:**
  * **Deep Burgundy:** `#A51E2B` (Primary brand accent & key buttons)
  * **Warm Coral / Orange:** `#EF6938` (Secondary accent & highlights)
  * **Off-White Background:** `#F8F6F2` (Warm, editorial surface)
  * **Pure White:** `#FFFFFF` (Card surfaces)
  * **Dark Charcoal:** `#242321` (High-contrast typography)
  * **Muted Grey:** `#85817C` (Metadata & descriptions)
  * **Soft Sage Green:** `#E8EFE8` (Free donation & verified badges)
  * **Light Warm Border:** `#E9E3DC` (Subtle division lines)
* **Typography:**
  * **Headings:** Manrope (Clean, geometric, modern sans)
  * **Body:** DM Sans (High legibility, warm spacing)
* **Tactile Micro-interactions:**
  * Framer Motion floating product showcases
  * Interactive live listing preview card
  * Celebratory request & publish feedback
  * Lucide React icons throughout (no emoji-based primary icons)

---

## 🚀 Key Functional Pages & Flows

### 1. Impressive Editorial Homepage (`/`)
* **Hero Section:** High-contrast headline *"Your campus has it. Someone else needs it."* with prominent search bar, quick category chips, and floating overlapping product compositions.
* **Category Section:** Interactive cards for *Books & Notes*, *Electronics*, *Lab Equipment*, *Stationery*, and *Other Supplies*.
* **Featured Listings:** Realistic campus sample products (Engineering Mathematics, Scientific Calculator fx-991EX, Lab Coat & Kit, Engineering Drawing Set, C++ Handwritten Notes, USB Drive, Engineering Physics, Over-Ear Headphones).
* **How It Works:** 3-step campus flow (*Discover*, *Connect*, *Exchange*) with designated MITAOE campus meetup hotspots.
* **Mission & Impact:** Circular campus economics showcase, student savings metrics, and e-waste prevention counters.

### 2. Comprehensive Marketplace (`/marketplace`)
* **Real-time Keyword Search:** Instant search across titles, descriptions, authors, and departments.
* **Category Filters:** Books & Notes, Electronics, Lab Equipment, Stationery, Other Supplies.
* **Price Filtering:** Price range slider plus quick presets (Free, Under ₹150, ₹150–₹300, ₹300–₹500, ₹500+).
* **Condition Filters:** Brand New, Like New, Good, Fair.
* **Listing Type Filters:** For Sale, For Exchange, Free Donation.
* **Sorting Options:** Recently Added, Price: Low to High, Price: High to Low, Most Popular.
* **Active Filter Chips:** Quick removal pills and 1-click "Reset All" functionality.

### 3. Product Details Page (`/item/:id`)
* High-resolution image view with condition assessment box.
* Dynamic actions: **Request to Buy**, **Request Exchange**, or **Claim Free Donation**.
* Dedicated Seller Profile card with student year, department, and campus trust rating.
* **Campus Hand-off Box:** Highlights verified campus hand-off spots (Central Library 1st Floor, Nescafe Canteen, Main Foyer, Mechanical Porch, Gate 1).
* Related items from the same category.
* 1-Click Link Sharing with clipboard confirmation.

### 4. Interactive Campus Request Modal
* Select from official MITAOE meetup spots.
* Propose day & time (e.g. *"Tomorrow during Lunch Break 1:15 PM"*).
* Specify barter item if listing is an Exchange.
* Submitting persists the request in local storage and alerts the seller under their dashboard.

### 5. Sell / Donate / Exchange Studio (`/sell`)
* Listing type selector (*Sell* with custom price, *Exchange* with barter requirement, *Donate* auto-locked to ₹0).
* Live preview card that updates in real-time as the student types.
* Device image file upload (Base64 FileReader preview) + preset sample image picker for instantaneous demo testing.
* Form validation with instant error feedback.
* Instant publish: newly listed items immediately show up in Browse Items and under the user's dashboard!

### 6. Student Authentication (`/login`)
* MITAOE student email login (`@mitaoe.ac.in`).
* **1-Click Demo Login:** Switch instantly between student personas (Rohan Sharma - Computer Engg, Ananya Deshmukh - ENTC).
* Transparent prototype disclaimer explaining simulated verification.

### 7. Student Dashboard (`/profile`)
* **My Listings:** View all items published by the logged-in student with live delete option.
* **Saved Items:** Quick access to bookmarked favourites.
* **Item Requests Sent & Received:** Accept or decline incoming purchase and trade offers.
* **Edit Profile:** Update department, phone/WhatsApp number, and preferred campus meetup spot.

---

## 🛠️ Technology Stack

* **Frontend Framework:** React 18 + TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS (Custom color theme & font configuration)
* **Icons:** Lucide React
* **Animations:** Framer Motion & Canvas Confetti
* **Routing:** React Router v6
* **State & Persistence:** React Context API + LocalStorage (Offline-first, 0 external API dependencies, fully resilient across refreshes)

---

## ⚡ How to Run Locally

### Prerequisites
* **Node.js** (v18 or v20+ recommended)
* **npm**

### Step-by-Step Setup

1. **Clone or Navigate to the project root:**
   ```bash
   cd UniSwap
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

4. **Build for Production:**
   ```bash
   npm run build
   ```
   Generates an optimized, production-ready static bundle in the `/dist` directory.

---

## 🏫 Campus Prototype Highlights for Evaluators

* **Preloaded Demo Data:** The application launches immediately populated with 12 authentic MITAOE listings, sample requests, and user profiles.
* **No Broken Links or Placeholders:** Every button, filter, card, and modal is functional.
* **Offline-Ready:** All transactions, listing additions, deletions, and status changes persist in `localStorage` so you can refresh without losing demo state.
* **Safety By Design:** No payment gateway credentials required — explicitly follows the peer-to-peer on-campus inspection model.
