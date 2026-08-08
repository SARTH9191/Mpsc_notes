import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";
import { NoteCard } from "../components/common/NoteCard";
import { AdBanner } from "../components/common/AdBanner";
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  X, 
  BookOpen, 
  RotateCcw,
  Check
} from "lucide-react";

export function NotesPage() {
  const { notes, exams } = useData();
  const { t, isMarathi } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedExam, setSelectedExam] = useState(searchParams.get("exam") || "all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const s = searchParams.get("search");
    if (s) setSearchQuery(s);
  }, [searchParams]);

  const subjects = useMemo(() => {
    const set = new Set();
    notes.forEach((n) => {
      const sub = isMarathi && n.subjectMr ? n.subjectMr : n.subject;
      if (sub) set.add(sub);
    });
    return Array.from(set);
  }, [notes, isMarathi]);

  const filteredNotes = useMemo(() => {
    return notes
      .filter((note) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const title = (isMarathi && note.titleMr ? note.titleMr : note.title).toLowerCase();
          const exam = (note.examName || note.examId).toLowerCase();
          const subject = (isMarathi && note.subjectMr ? note.subjectMr : note.subject).toLowerCase();
          if (!title.includes(q) && !exam.includes(q) && !subject.includes(q)) return false;
        }

        if (selectedExam !== "all") {
          if (note.examId !== selectedExam && !note.examName?.toLowerCase().includes(selectedExam.toLowerCase())) {
            return false;
          }
        }

        if (selectedSubject !== "all") {
          const sub = isMarathi && note.subjectMr ? note.subjectMr : note.subject;
          if (sub !== selectedSubject && note.subject !== selectedSubject) return false;
        }

        if (priceRange === "under250" && note.price >= 250) return false;
        if (priceRange === "250-350" && (note.price < 250 || note.price > 350)) return false;
        if (priceRange === "350plus" && note.price <= 350) return false;

        if (ratingFilter === "4.8plus" && note.rating < 4.8) return false;
        if (ratingFilter === "4.9plus" && note.rating < 4.9) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "popular") return b.totalReviews - a.totalReviews;
        if (sortBy === "newest") return b.id.localeCompare(a.id);
        if (sortBy === "priceAsc") return a.price - b.price;
        if (sortBy === "priceDesc") return b.price - a.price;
        return 0;
      });
  }, [notes, searchQuery, selectedExam, selectedSubject, priceRange, ratingFilter, sortBy, isMarathi]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedExam("all");
    setSelectedSubject("all");
    setPriceRange("all");
    setRatingFilter("all");
    setSortBy("popular");
    setSearchParams({});
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen bg-dots-slate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Marketplace Header */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {isMarathi ? "डिजिटल नोट्स बाजारपेठ" : "Digital Notes Marketplace"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-2 tracking-tight">
            {t("marketplaceTitle")}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {t("marketplaceSub")}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 absolute left-4 text-slate-400" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm font-semibold"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 sticky top-24">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                <Filter className="w-4 h-4 text-blue-600" />
                <span>{isMarathi ? "फिल्टर्स" : "Filters"}</span>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" /> {t("resetFilters")}
              </button>
            </div>

            {/* Filter by Exam */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {t("filterExam")}
              </label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{t("allExams")} ({exams.length})</option>
                {exams.map((e) => (
                  <option key={e.id} value={e.id}>
                    {isMarathi && e.nameMr ? e.nameMr : e.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Subject */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {t("filterSubject")}
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{t("allSubjects")}</option>
                {subjects.map((sub, idx) => (
                  <option key={idx} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Price */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {t("filterPrice")}
              </label>
              <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                <label className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-slate-50">
                  <input
                    type="radio"
                    name="price"
                    value="all"
                    checked={priceRange === "all"}
                    onChange={() => setPriceRange("all")}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{t("allPrices")}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-slate-50">
                  <input
                    type="radio"
                    name="price"
                    value="under250"
                    checked={priceRange === "under250"}
                    onChange={() => setPriceRange("under250")}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{t("under250")}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-slate-50">
                  <input
                    type="radio"
                    name="price"
                    value="250-350"
                    checked={priceRange === "250-350"}
                    onChange={() => setPriceRange("250-350")}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{t("between250350")}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-slate-50">
                  <input
                    type="radio"
                    name="price"
                    value="350plus"
                    checked={priceRange === "350plus"}
                    onChange={() => setPriceRange("350plus")}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{t("above350")}</span>
                </label>
              </div>
            </div>

            {/* Sidebar Ad Banner */}
            <div className="pt-2">
              <AdBanner placement="notes_sidebar" />
            </div>
          </aside>

          {/* Main Results Section */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Sorting & Filter Trigger Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <span>{isMarathi ? "उपलब्ध घटक:" : "Showing"} <strong className="text-slate-900 font-extrabold">{filteredNotes.length}</strong></span>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-2 font-bold text-xs shadow-md shadow-blue-600/20 min-h-[44px]"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>{isMarathi ? "फिल्टर्स" : "Filters"}</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline text-slate-400">{isMarathi ? "क्रमवारी:" : "Sort:"}</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs min-h-[44px]"
                  >
                    <option value="popular">{t("sortPopular")}</option>
                    <option value="newest">{t("sortNewest")}</option>
                    <option value="priceAsc">{t("sortPriceLow")}</option>
                    <option value="priceDesc">{t("sortPriceHigh")}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notes Grid */}
            {filteredNotes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map((note, index) => (
                  <React.Fragment key={note.id}>
                    <NoteCard note={note} />
                    {index === 2 && (
                      <div className="col-span-full py-2">
                        <AdBanner placement="notes_between" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{t("noNotesFound")}</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  {t("noNotesSub")}
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/30 transition-all min-h-[44px]"
                >
                  {t("browseAllNotes")}
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Mobile Filter Modal Bottom Sheet (Section 13 of PDF Spec) */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-950/80 backdrop-blur-sm flex justify-center items-end animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-t-3xl p-6 space-y-5 max-h-[85vh] overflow-y-auto shadow-2xl border-t border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-black text-slate-900 text-base">
                <Filter className="w-5 h-5 text-blue-600" />
                <span>{isMarathi ? "फिल्टर पर्याय" : "Filter Options"}</span>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter by Exam */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {t("filterExam")}
              </label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 min-h-[44px]"
              >
                <option value="all">{t("allExams")} ({exams.length})</option>
                {exams.map((e) => (
                  <option key={e.id} value={e.id}>
                    {isMarathi && e.nameMr ? e.nameMr : e.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Subject */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {t("filterSubject")}
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 min-h-[44px]"
              >
                <option value="all">{t("allSubjects")}</option>
                {subjects.map((sub, idx) => (
                  <option key={idx} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Price */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                {t("filterPrice")}
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setPriceRange("all")}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    priceRange === "all" ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  {t("allPrices")}
                </button>
                <button
                  type="button"
                  onClick={() => setPriceRange("under250")}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    priceRange === "under250" ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  {t("under250")}
                </button>
                <button
                  type="button"
                  onClick={() => setPriceRange("250-350")}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    priceRange === "250-350" ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  {t("between250350")}
                </button>
                <button
                  type="button"
                  onClick={() => setPriceRange("350plus")}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    priceRange === "350plus" ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  {t("above350")}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="w-1/3 py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl min-h-[44px]"
              >
                {t("resetFilters")}
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-2/3 py-3 bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Check className="w-4 h-4" />
                <span>{isMarathi ? "फिल्टर्स लागू करा" : "Apply Filters"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
