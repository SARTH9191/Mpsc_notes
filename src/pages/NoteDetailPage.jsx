import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";
import { PDFPreviewModal } from "../components/pdf/PDFPreviewModal";
import { AdBanner } from "../components/common/AdBanner";
import { 
  Star, 
  Eye, 
  ShoppingCart, 
  FileText, 
  CheckCircle2, 
  Award, 
  ArrowLeft, 
  BookOpen,
  Flame,
  Lock
} from "lucide-react";

export function NoteDetailPage() {
  const { noteId } = useParams();
  const { notes, isPurchased } = useData();
  const { t, isMarathi } = useLanguage();
  const [previewOpen, setPreviewOpen] = useState(false);
  const navigate = useNavigate();

  const note = notes.find((n) => n.id === noteId);
  const userHasPurchased = note ? isPurchased(note.id) : false;

  if (!note) {
    return (
      <div className="py-20 text-center bg-slate-50 min-h-screen">
        <h2 className="text-2xl font-bold text-slate-900">Note Not Found</h2>
        <Link to="/notes" className="inline-block mt-4 px-5 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const title = isMarathi && note.titleMr ? note.titleMr : note.title;
  const examName = isMarathi && note.examNameMr ? note.examNameMr : note.examName || note.examId;
  const subject = isMarathi && note.subjectMr ? note.subjectMr : note.subject;
  const description = isMarathi && note.description ? note.description : note.descriptionEn || note.description;

  return (
    <div className="py-10 pb-28 md:pb-12 bg-slate-50 min-h-screen bg-dots-slate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link to="/notes" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 mb-6">
          <ArrowLeft className="w-4 h-4" /> {isMarathi ? "मागे जा" : "Back to Notes Marketplace"}
        </Link>

        {/* Top Product Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: Large Document Cover / Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className={`relative h-96 sm:h-[420px] rounded-2xl p-8 bg-gradient-to-br ${note.coverBg || "from-blue-600 to-indigo-800"} text-white flex flex-col justify-between shadow-xl overflow-hidden`}>
              <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              
              <div className="flex items-start justify-between gap-2 relative z-10">
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-white border border-white/20">
                  {examName}
                </span>

                {note.hasDiscountBadge ? (
                  <span className="inline-flex items-center gap-1 text-xs font-black uppercase bg-amber-400 text-slate-950 px-3 py-1 rounded-md shadow-md animate-pulse">
                    <Flame className="w-3.5 h-3.5 fill-amber-950" /> 50% OFF
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold uppercase bg-amber-400 text-slate-900 px-2.5 py-1 rounded-md shadow-md">
                    <Award className="w-3.5 h-3.5" /> Bestseller
                  </span>
                )}
              </div>

              <div className="relative z-10">
                <span className="text-xs font-semibold text-blue-200 block mb-2">{subject}</span>
                <h1 className="text-xl sm:text-3xl font-extrabold text-white leading-snug">
                  {title}
                </h1>
                <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between text-xs text-blue-100">
                  <span>{note.pageCount} {t("pages")}</span>
                  <span>{note.language}</span>
                  <span>Searchable PDF</span>
                </div>
              </div>
            </div>

            {/* Quick Preview Trigger */}
            <button
              onClick={() => setPreviewOpen(true)}
              className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 border border-slate-800"
            >
              <Eye className="w-4 h-4 text-blue-400" />
              <span>{t("previewNotes")} ({note.samplePages?.length || 3} {isMarathi ? "पृष्ठे" : "Pages"})</span>
            </button>
          </div>

          {/* RIGHT: Product Details & Price */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                  {subject}
                </span>
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-md text-amber-700 font-bold text-xs border border-amber-100">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{note.rating}</span>
                  <span className="text-slate-400 font-normal">({note.totalReviews})</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                {description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-1">{isMarathi ? "एकूण पृष्ठे" : "Total Pages"}</span>
                  <strong className="text-slate-900 text-sm font-bold">{note.pageCount} Pages</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-1">{isMarathi ? "भाषा" : "Language"}</span>
                  <strong className="text-slate-900 text-sm font-bold">{note.language}</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-1">{isMarathi ? "स्वरूप" : "Format"}</span>
                  <strong className="text-slate-900 text-sm font-bold">Searchable PDF</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-1">{isMarathi ? "फाईल साईज" : "File Size"}</span>
                  <strong className="text-slate-900 text-sm font-bold">{note.fileSize || "15 MB"}</strong>
                </div>
              </div>

              {/* Price Display with 50% OFF */}
              <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 font-semibold block">{t("specialPrice")}</span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-3xl font-black text-slate-900">₹{note.price}</span>
                    {note.originalPrice && note.originalPrice > note.price && (
                      <>
                        <span className="text-sm text-slate-400 line-through">₹{note.originalPrice}</span>
                        <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300">
                          50% OFF (बचत ₹{note.originalPrice - note.price})
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {userHasPurchased && (
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {isMarathi ? "खरेदी पूर्ण" : "Purchased"}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setPreviewOpen(true)}
                  className="w-full py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-300 min-h-[48px]"
                >
                  <Eye className="w-4 h-4 text-slate-600" />
                  <span>{t("previewNotes")}</span>
                </button>

                {userHasPurchased ? (
                  <button
                    onClick={() => navigate(`/download/${note.id}`)}
                    className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 min-h-[48px]"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{t("downloadNotesPdf")}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/checkout/${note.id}`)}
                    className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 min-h-[48px]"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{t("buyNow")} – ₹{note.price}</span>
                  </button>
                )}
              </div>

              {/* Benefits Checklist */}
              <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600 font-semibold">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t("instantDownload")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t("securePayment")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t("lifetimeAccess")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t("mobileFriendly")}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Subtle Ad */}
        <div className="my-8">
          <AdBanner placement="note_detail_subtle" />
        </div>

        {/* What's Included */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-4">
              {t("whatsIncluded")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" /> {isMarathi ? "संपूर्ण अभ्यासक्रम" : "Complete Syllabus"}
                </h4>
                <p className="text-xs text-slate-600 mt-1">{isMarathi ? "नवीनतम परीक्षेच्या पद्धतीनुसार संपूर्ण घटक." : "100% aligned with latest exam notification."}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" /> {isMarathi ? "विषयानुसार नोट्स" : "Topic-wise Notes"}
                </h4>
                <p className="text-xs text-slate-600 mt-1">{isMarathi ? "अनुक्रमे मांडणी, स्पष्ट मुख्य मुद्दे व तक्ते." : "Organized sequentially with clear headings."}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" /> {isMarathi ? "महत्त्वाचे सूत्र संग्रह" : "Formulas & Mind Maps"}
                </h4>
                <p className="text-xs text-slate-600 mt-1">{isMarathi ? "वेगाने उजळणी करण्यासाठी शॉर्टकट ट्रिक्स." : "High-yield derivation tricks & formula maps."}</p>
              </div>
            </div>
          </div>

          {note.syllabusTopics && (
            <div className="pt-6 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-base mb-3">{t("coveredTopics")}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                {note.syllabusTopics.map((topic, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-blue-50/50 border border-blue-100 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* PDF Modal */}
      <PDFPreviewModal
        note={note}
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />

      {/* Mobile-Only Sticky Bottom Buy Bar (Section 15 of PDF Specification) */}
      {!userHasPurchased && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-3.5 bg-slate-950/95 border-t border-slate-800 backdrop-blur-lg z-40 flex items-center justify-between gap-3 shadow-2xl animate-fade-in">
          <div>
            <span className="text-[10px] text-slate-400 font-medium block">विशेष सवलत मूल्य</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-white">₹{note.price}</span>
              {note.originalPrice && (
                <span className="text-xs text-slate-400 line-through">₹{note.originalPrice}</span>
              )}
            </div>
          </div>

          <button
            onClick={() => navigate(`/checkout/${note.id}`)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 min-h-[44px]"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{t("buyNow")}</span>
          </button>
        </div>
      )}
    </div>
  );
}
