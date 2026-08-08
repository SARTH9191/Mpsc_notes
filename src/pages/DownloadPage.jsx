import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";
import { 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft,
  BookOpen,
  Info
} from "lucide-react";

export function DownloadPage() {
  const { noteId } = useParams();
  const { notes, isPurchased } = useData();
  const { t, isMarathi } = useLanguage();
  const [downloading, setDownloading] = useState(false);
  const [downloadCompleted, setDownloadCompleted] = useState(false);

  const note = notes.find((n) => n.id === noteId) || notes[0];
  const title = isMarathi && note.titleMr ? note.titleMr : note.title;

  const handleDownloadPDF = () => {
    setDownloading(true);

    setTimeout(() => {
      const content = `ExamVault Digital Study Notes\nTitle: ${title}\nExam: ${note.examName || note.examId}\nSubject: ${note.subject}\nPages: ${note.pageCount}\n\nDisclaimer: This is a demo study material generated for client presentation.`;
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${note.id}-ExamVault-Notes.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloading(false);
      setDownloadCompleted(true);
    }, 1000);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen bg-dots-slate">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link to="/dashboard/purchases" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 mb-6">
          <ArrowLeft className="w-4 h-4" /> {isMarathi ? "माझ्या खरेदींकडे जा" : "Back to My Purchases"}
        </Link>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm text-center space-y-6">
          
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100 shadow-sm">
            <BookOpen className="w-8 h-8" />
          </div>

          <div>
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {t("purchasedVerified")}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
              {t("notesReady")}
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-lg mx-auto">
              {isMarathi ? "तुमची उच्च क्षमतेची डिजिटल अभ्यास साहित्य पीडीएफ फाईल डाउनलोड करण्यासाठी खालील बटणावर क्लिक करा." : "Click the button below to save your high-resolution digital study material."}
            </p>
          </div>

          {/* Details Card */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 max-w-xl mx-auto text-left space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md">
                PDF
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">{title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{note.examName || note.subject} • {note.pageCount} Pages • {note.language}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200 text-xs">
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-400 block mb-0.5">{isMarathi ? "प्रवेश प्रकार" : "Access Type"}</span>
                <strong className="text-slate-900 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {isMarathi ? "आजीवन अमर्याद" : "Lifetime Unlimited"}
                </strong>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <span className="text-slate-400 block mb-0.5">{isMarathi ? "स्वरूप" : "Format"}</span>
                <strong className="text-slate-900 font-bold">Searchable PDF</strong>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="max-w-md mx-auto space-y-3">
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base rounded-2xl shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Download className={`w-5 h-5 ${downloading ? "animate-bounce" : ""}`} />
              <span>{downloading ? (isMarathi ? "पीडीएफ तयार होत आहे..." : "Preparing PDF Download...") : t("downloadPdfFile")}</span>
            </button>

            {downloadCompleted && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t("downloadStarted")}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Demo PDF Content • Clean download simulation for client presentation.</span>
          </div>

        </div>

      </div>
    </div>
  );
}
