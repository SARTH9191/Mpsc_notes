import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { useLanguage } from "../../context/LanguageContext";
import { AnnouncementBar } from "./AnnouncementBar";
import { 
  BookOpen, 
  Search, 
  User, 
  ShieldCheck, 
  Menu, 
  X, 
  Globe,
  SlidersHorizontal
} from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const { user, logout, switchRole, isAdmin } = useAuth();
  const { language, setLanguage, toggleLanguage, t, isMarathi } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/notes?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const isCurrent = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="sticky top-0 z-40 w-full shadow-2xl">
      {/* Main Navbar Header with Left-Shifted Navigation Links */}
      <header className="w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Left Group: Logo & Brand + Shifted Navigation Links */}
          <div className="flex items-center gap-6 lg:gap-8 min-w-0">
            {/* Logo & Brand */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5.5 h-5.5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-blue-300 transition-colors whitespace-nowrap" style={{ whiteSpace: 'nowrap' }}>
                    ExamVault
                  </span>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30 whitespace-nowrap" style={{ whiteSpace: 'nowrap' }}>
                    MH Demo
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium tracking-wide hidden xl:block whitespace-nowrap" style={{ whiteSpace: 'nowrap' }}>
                  {t("brandTagline")}
                </p>
              </div>
            </Link>

            {/* Desktop & Laptop Navigation Links Shifted Towards Left */}
            <nav className="hidden md:flex items-center gap-1.5 lg:gap-2.5 xl:gap-3 shrink-0">
              <Link
                to="/"
                style={{ whiteSpace: 'nowrap' }}
                className={`px-3 lg:px-4 py-2 rounded-xl text-sm lg:text-base font-extrabold shrink-0 inline-flex items-center justify-center transition-all ${
                  isCurrent("/") && location.pathname === "/"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-200 hover:text-white hover:bg-slate-800/80"
                }`}
              >
                {t("navHome")}
              </Link>
              <Link
                to="/exams"
                style={{ whiteSpace: 'nowrap' }}
                className={`px-3 lg:px-4 py-2 rounded-xl text-sm lg:text-base font-extrabold shrink-0 inline-flex items-center justify-center transition-all ${
                  isCurrent("/exams")
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-200 hover:text-white hover:bg-slate-800/80"
                }`}
              >
                {t("navExams")}
              </Link>
              <Link
                to="/notes"
                style={{ whiteSpace: 'nowrap' }}
                className={`px-3 lg:px-4 py-2 rounded-xl text-sm lg:text-base font-extrabold shrink-0 inline-flex items-center justify-center transition-all ${
                  isCurrent("/notes")
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-200 hover:text-white hover:bg-slate-800/80"
                }`}
              >
                {t("navNotes")}
              </Link>
              <Link
                to="/about"
                style={{ whiteSpace: 'nowrap' }}
                className={`px-3 lg:px-4 py-2 rounded-xl text-sm lg:text-base font-extrabold shrink-0 inline-flex items-center justify-center transition-all ${
                  isCurrent("/about")
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-200 hover:text-white hover:bg-slate-800/80"
                }`}
              >
                {t("navAbout")}
              </Link>
              <Link
                to="/contact"
                style={{ whiteSpace: 'nowrap' }}
                className={`px-3 lg:px-4 py-2 rounded-xl text-sm lg:text-base font-extrabold shrink-0 inline-flex items-center justify-center transition-all ${
                  isCurrent("/contact")
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-200 hover:text-white hover:bg-slate-800/80"
                }`}
              >
                {t("navContact")}
              </Link>
            </nav>
          </div>

          {/* Right Group: Search, Language, Role Switcher, Account */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Quick Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-slate-200 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-2 text-xs sm:text-sm font-semibold border border-slate-700 bg-slate-900 min-h-[40px] justify-center shrink-0"
              title="Search"
            >
              <Search className="w-4 h-4 text-blue-400" />
              <span className="hidden xl:inline text-xs sm:text-sm text-slate-300 font-bold" style={{ whiteSpace: 'nowrap' }}>Search...</span>
            </button>

            {/* Language Switcher EN | मराठी */}
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-700 text-xs sm:text-sm font-bold shadow-inner shrink-0">
              <button
                onClick={() => setLanguage("en")}
                style={{ whiteSpace: 'nowrap' }}
                className={`px-2.5 sm:px-3 py-1 rounded-lg transition-all shrink-0 ${
                  language === "en" ? "bg-blue-600 text-white shadow-sm font-black" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                EN
              </button>
              <span className="text-slate-600 px-0.5 font-bold">|</span>
              <button
                onClick={() => setLanguage("mr")}
                style={{ whiteSpace: 'nowrap' }}
                className={`px-2.5 sm:px-3 py-1 rounded-lg transition-all shrink-0 ${
                  language === "mr" ? "bg-blue-600 text-white shadow-sm font-black" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                मराठी
              </button>
            </div>

            {/* Role Mode Switch (Laptop/Desktop) */}
            <div className="hidden xl:flex items-center bg-slate-900 p-1 rounded-xl border border-slate-700 text-xs sm:text-sm shrink-0">
              <button
                onClick={() => switchRole("student")}
                style={{ whiteSpace: 'nowrap' }}
                className={`px-3 py-1 rounded-lg font-bold transition-all shrink-0 ${
                  !isAdmin ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {t("studentMode")}
              </button>
              <button
                onClick={() => switchRole("admin")}
                style={{ whiteSpace: 'nowrap' }}
                className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1 transition-all shrink-0 ${
                  isAdmin ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                {t("adminPanel")}
              </button>
            </div>

            {/* User Account / Auth (Laptop/Desktop) */}
            {user ? (
              <Link
                to={isAdmin ? "/admin" : "/dashboard"}
                style={{ whiteSpace: 'nowrap' }}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs sm:text-sm font-bold transition-colors shrink-0"
              >
                <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0">
                  {user.avatar || "U"}
                </div>
                <span className="hidden xl:inline max-w-[110px] truncate text-slate-200">{user.name}</span>
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <Link
                  to="/login"
                  style={{ whiteSpace: 'nowrap' }}
                  className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors shrink-0"
                >
                  {t("login")}
                </Link>
                <Link
                  to="/signup"
                  style={{ whiteSpace: 'nowrap' }}
                  className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all shrink-0"
                >
                  {t("signup")}
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button ☰ */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-700 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>

          </div>
        </div>

        {/* Quick Search Drawer */}
        {searchOpen && (
          <div className="border-t border-slate-800 bg-slate-900/95 px-4 sm:px-6 py-3.5 animate-fade-in shadow-xl">
            <form onSubmit={handleSearchSubmit} className="w-full max-w-3xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4.5 h-4.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm font-semibold min-h-[44px]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-colors min-h-[44px]"
              >
                {t("searchBtn")}
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Discount Announcement Bar Positioned Below Navbar */}
      <AnnouncementBar />

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-6 animate-fade-in">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-base">
                  EV
                </div>
                <span className="font-black text-xl text-white">ExamVault</span>
              </Link>

              {/* Language Switcher in Mobile Drawer */}
              <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-black">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1.5 rounded-lg ${language === "en" ? "bg-blue-600 text-white" : "text-slate-400"}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("mr")}
                  className={`px-3 py-1.5 rounded-lg ${language === "mr" ? "bg-blue-600 text-white" : "text-slate-400"}`}
                >
                  मराठी
                </button>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 min-w-[40px] min-h-[40px] flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-2 mt-6">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-2xl text-slate-100 font-extrabold text-base hover:bg-slate-800"
              >
                {t("navHome")}
              </Link>
              <Link
                to="/exams"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-2xl text-slate-100 font-extrabold text-base hover:bg-slate-800"
              >
                {t("navExams")}
              </Link>
              <Link
                to="/notes"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-2xl text-slate-100 font-extrabold text-base hover:bg-slate-800"
              >
                {t("navNotes")}
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-2xl text-slate-100 font-extrabold text-base hover:bg-slate-800"
              >
                {t("navAbout")}
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-2xl text-slate-100 font-extrabold text-base hover:bg-slate-800"
              >
                {t("navContact")}
              </Link>
            </nav>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-800">
            <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs">
              <button
                onClick={() => { switchRole("student"); setMobileMenuOpen(false); }}
                className={`flex-1 py-2.5 rounded-xl font-extrabold text-center ${!isAdmin ? "bg-blue-600 text-white" : "text-slate-400"}`}
              >
                {t("studentMode")}
              </button>
              <button
                onClick={() => { switchRole("admin"); setMobileMenuOpen(false); }}
                className={`flex-1 py-2.5 rounded-xl font-extrabold text-center ${isAdmin ? "bg-indigo-600 text-white" : "text-slate-400"}`}
              >
                {t("adminPanel")}
              </button>
            </div>

            {user ? (
              <div className="flex flex-col gap-2">
                <Link
                  to={isAdmin ? "/admin" : "/dashboard"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 bg-blue-600 text-white font-extrabold text-sm rounded-2xl text-center shadow-lg"
                >
                  {isAdmin ? "Admin Console" : t("welcomeBack")}
                </Link>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="w-full py-3.5 bg-slate-900 text-slate-300 border border-slate-800 font-bold rounded-2xl text-center"
                >
                  {t("signOut")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3.5 bg-slate-900 border border-slate-800 text-slate-200 font-extrabold rounded-2xl text-center"
                >
                  {t("login")}
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3.5 bg-blue-600 text-white font-extrabold rounded-2xl text-center shadow-md shadow-blue-600/30"
                >
                  {t("signup")}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
