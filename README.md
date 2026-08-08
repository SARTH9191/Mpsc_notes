# 📚 ExamVault - Digital Exam Notes Marketplace

**ExamVault** is a modern, high-performance web platform designed for Maharashtra competitive exam aspirants (MPSC, Police Bharti, Talathi Bharti, UPSC, SSC, Banking, and Saral Seva). It provides exam-focused PDF notes, formula mind maps, interactive sample previews, instant downloads, student dashboards, and a complete administrative control suite.

---

## 🔥 Key Features

- **Full Mobile Responsiveness**: Designed according to strict mobile specs (320px–430px mobile, 768px–1024px tablet, 1280px+ desktop).
- **Bilingual Support (मराठी | English)**: Instant language switching across all pages with zero layout shift.
- **Top Discount Announcement Bar**: Sticky top bar with smooth right-to-left marquee ticker and live **"Price Increases In"** countdown timer.
- **Full-Width High-Contrast Header Navbar**: Edge-to-edge layout with enlarged typography, quick search drawer, and role mode switch.
- **Digital Notes Marketplace**: Filter notes by Exam Category, Subject, Price Range, and Rating.
- **Interactive PDF Sample Viewer**: Sample preview modal with watermark overlay protection.
- **Student Dashboard**: Track purchased notes, instant PDF downloads, and profile information.
- **Comprehensive Admin Control Suite**:
  - Dashboard analytics & revenue trend graphs (Recharts).
  - Study materials & note package manager (Add / Edit / Delete).
  - Order transaction history and payment logs.
  - Category manager & user management.
  - Direct sponsor advertisement campaign manager with live impression & CTR metrics.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Glassmorphism UI Design System
- **Icons**: Lucide React Icons
- **Routing**: React Router DOM v7
- **Analytics & Charts**: Recharts
- **Confetti Animation**: Canvas Confetti

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/examvault-notes-platform.git
   cd examvault-notes-platform
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```
src/
├── assets/          # High-resolution academic background & hero images
├── components/      # UI components (Header, Footer, NoteCard, AdBanner, Modals)
│   ├── common/      # Reusable UI controls & AnnouncementBar
│   ├── home/        # Section components for Homepage
│   └── pdf/         # Interactive PDF Sample Preview Modal
├── context/         # React Context API (Auth, Data, Language i18n)
├── i18n/            # Translations (en.js, mr.js)
├── layouts/         # Layout Wrappers (Root, Dashboard, Admin)
└── pages/           # Page Views (Home, Notes, NoteDetail, Admin Suite)
```

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
