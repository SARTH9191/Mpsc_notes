import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Lock, 
  ShoppingCart,
  FileText
} from "lucide-react";

export function PDFPreviewModal({ note, isOpen, onClose }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(100);
  const { t, isMarathi } = useLanguage();
  const navigate = useNavigate();

  if (!isOpen || !note) return null;

  const title = isMarathi && note.titleMr ? note.titleMr : note.title;
  const examName = isMarathi && note.examNameMr ? note.examNameMr : note.examName || note.subject;

  const samplePages = note.samplePages || [];
  const totalSamplePages = samplePages.length || 1;
  const currentPage = samplePages[currentPageIndex] || {
    pageNumber: currentPageIndex + 1,
    title: `${title} - नमुना पृष्ठ ${currentPageIndex + 1}`,
    section: "अभ्यास घटक नमुना",
    content: [
      "• उच्च गुणवत्तेचे संकल्पना स्पष्टीकरण आणि गुणकारी संक्षिप्त मांडणी.",
      "• विषयानुरूप माइंड मॅप्स व मागील वर्षांच्या प्रश्नांचे स्वरूप."
    ]
  };

  const handleNext = () => {
    if (currentPageIndex < totalSamplePages - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 15, 160));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 15, 75));
  };

  const handleBuyNow = () => {
    onClose();
    navigate(`/checkout/${note.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Top Toolbar */}
        <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-semibold truncate max-w-xs sm:max-w-md">{title}</h3>
              <p className="text-[11px] text-slate-400">नोट्स पूर्ववलोकन मोड • {examName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800 text-slate-300">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 75}
                className="p-1 hover:text-white disabled:opacity-40"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs px-2 font-mono text-slate-400">{zoomLevel}%</span>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 160}
                className="p-1 hover:text-white disabled:opacity-40"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              {zoomLevel !== 100 && (
                <button onClick={() => setZoomLevel(100)} className="p-1 hover:text-white border-l border-slate-800 ml-1 pl-1" title="Reset Zoom">
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Document Viewer Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-950/60 flex flex-col items-center">
          
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
            className="watermark-overlay transition-transform duration-200 w-full max-w-2xl bg-white text-slate-900 rounded-xl p-6 sm:p-10 shadow-2xl border border-slate-300 min-h-[520px] flex flex-col justify-between"
          >
            <div>
              {/* Document Header */}
              <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3 mb-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">ExamVault Certified Notes</span>
                  <h4 className="font-extrabold text-base sm:text-lg text-slate-900">{currentPage.title}</h4>
                </div>
                <div className="text-right text-xs text-slate-500 font-mono">
                  नमुना पृष्ठ {currentPageIndex + 1} / {totalSamplePages}
                </div>
              </div>

              {/* Document Sub-section */}
              <div className="mb-4">
                <span className="inline-block px-2.5 py-1 rounded bg-slate-100 font-semibold text-xs text-slate-700 mb-3 border border-slate-200">
                  {currentPage.section || "अभ्यास घटक"}
                </span>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {currentPage.content && currentPage.content.map((point, idx) => (
                    <li key={idx} className="bg-slate-50/80 p-3 rounded-lg border border-slate-200/80">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sample Notes Visual Diagram */}
              <div className="my-6 p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs space-y-2">
                <div className="font-bold text-blue-900 flex items-center justify-between">
                  <span>📌 गुणकारी रिव्हिजन संच</span>
                  <span className="text-[10px] text-blue-600 uppercase font-mono">ExamVault verified</span>
                </div>
                <div className="grid grid-cols-2 gap-2 font-sans text-slate-700">
                  <div className="bg-white p-2 rounded border border-blue-100">
                    <span className="font-semibold text-slate-900">एकूण पृष्ठे:</span> {note.pageCount} Pages
                  </div>
                  <div className="bg-white p-2 rounded border border-blue-100">
                    <span className="font-semibold text-slate-900">स्वरूप:</span> Searchable PDF
                  </div>
                  <div className="bg-white p-2 rounded border border-blue-100">
                    <span className="font-semibold text-slate-900">भाषा:</span> {note.language}
                  </div>
                  <div className="bg-white p-2 rounded border border-blue-100">
                    <span className="font-semibold text-slate-900">प्रवेश:</span> Lifetime Download
                  </div>
                </div>
              </div>
            </div>

            {/* Document Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>ExamVault - {examName}</span>
              <span className="text-red-500 font-bold uppercase tracking-wider">★ नमुना पूर्ववलोकन फक्त ★</span>
            </div>
          </div>

        </div>

        {/* Modal Bottom Controls & Buy Prompt */}
        <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentPageIndex === 0}
              className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40 transition-colors flex items-center gap-1 text-xs font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>मागील</span>
            </button>

            <span className="text-xs text-slate-400 font-medium font-mono px-2">
              पृष्ठ <span className="text-white font-bold">{currentPageIndex + 1}</span> / {totalSamplePages}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPageIndex === totalSamplePages - 1}
              className="p-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40 transition-colors flex items-center gap-1 text-xs font-semibold"
            >
              <span>पुढील</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-amber-400 bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-800/40">
              <Lock className="w-3.5 h-3.5" />
              <span>संपूर्ण {note.pageCount} पृष्ठे अनलॉक करण्यासाठी खरेदी करा</span>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{t("buyNow")} – ₹{note.price}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
