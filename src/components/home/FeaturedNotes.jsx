import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { useLanguage } from "../../context/LanguageContext";
import { NoteCard } from "../common/NoteCard";
import bgAsset from "../../assets/featured-notes-bg.png";
import { ArrowRight, Flame } from "lucide-react";

export function FeaturedNotes() {
  const { notes } = useData();
  const { t } = useLanguage();

  return (
    <section 
      className="relative py-16 text-white border-b border-slate-800 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${bgAsset})` }}
    >
      {/* Dark overlay for clean presentation */}
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-950/90 px-3 py-1 rounded-full border border-amber-700/80">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ५०% सवलत चालू आहे
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight drop-shadow-md">
              {t("featuredNotesTitle")}
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              {t("featuredNotesSub")}
            </p>
          </div>
          <Link
            to="/notes"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors group"
          >
            <span>{t("exploreMarketplace")} ({notes.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {notes.slice(0, 6).map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>

      </div>
    </section>
  );
}
