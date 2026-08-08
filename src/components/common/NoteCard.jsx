import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { Star, Eye, ShoppingCart, FileText, Award, Flame } from "lucide-react";
import { PDFPreviewModal } from "../pdf/PDFPreviewModal";

export function NoteCard({ note }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const { t, isMarathi } = useLanguage();
  const navigate = useNavigate();

  if (!note) return null;

  const title = isMarathi && note.titleMr ? note.titleMr : note.title;
  const examName = isMarathi && note.examNameMr ? note.examNameMr : note.examName || note.examId;
  const subject = isMarathi && note.subjectMr ? note.subjectMr : note.subject;
  const description = isMarathi && note.description ? note.description : note.descriptionEn || note.description;

  return (
    <>
      <div className="group relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
        <div>
          {/* Card Top Cover Banner */}
          <div className={`relative h-44 p-5 bg-gradient-to-br ${note.coverBg || "from-blue-600 to-indigo-800"} text-white flex flex-col justify-between overflow-hidden`}>
            {/* Subtle background glow */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
            
            <div className="flex items-start justify-between gap-2 relative z-10">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md text-white border border-white/20">
                {examName}
              </span>

              {/* 50% OFF Discount Sale Badge required by Section 17 of PDF */}
              {note.hasDiscountBadge ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md shadow-md animate-pulse">
                  <Flame className="w-3 h-3 text-amber-900 fill-amber-900" />
                  <span>50% OFF</span>
                </span>
              ) : note.isBestseller ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase bg-amber-400 text-slate-900 px-2 py-0.5 rounded shadow-sm">
                  <Award className="w-3 h-3" /> {t("bestseller")}
                </span>
              ) : null}
            </div>

            <div className="relative z-10 mt-auto">
              <span className="text-xs font-semibold text-blue-200 block truncate mb-1">
                {subject}
              </span>
              <h3 className="font-bold text-base leading-snug line-clamp-2 text-white group-hover:text-blue-100 transition-colors">
                {title}
              </h3>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5 space-y-3">
            {/* Meta info badges */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>{note.pageCount} {t("pages")}</span>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-amber-700 font-semibold border border-amber-100">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{note.rating}</span>
                <span className="text-[10px] text-slate-400 font-normal">({note.totalReviews})</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {description}
            </p>

            {/* Price section with 50% OFF visual */}
            <div className="pt-2 flex items-baseline gap-2 border-t border-slate-100">
              <span className="text-xl font-extrabold text-slate-900">₹{note.price}</span>
              {note.originalPrice && note.originalPrice > note.price && (
                <>
                  <span className="text-xs text-slate-400 line-through">₹{note.originalPrice}</span>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-200">
                    50% OFF
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Card Actions */}
        <div className="p-5 pt-0 grid grid-cols-2 gap-2">
          <button
            onClick={() => setPreviewOpen(true)}
            className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
          >
            <Eye className="w-3.5 h-3.5 text-slate-600" />
            <span>{t("preview")}</span>
          </button>
          
          <button
            onClick={() => navigate(`/checkout/${note.id}`)}
            className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-1.5"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{t("buyNow")}</span>
          </button>
        </div>
      </div>

      {/* PDF Sample Modal */}
      <PDFPreviewModal
        note={note}
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </>
  );
}
