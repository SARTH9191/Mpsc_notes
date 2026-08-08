import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import confetti from "canvas-confetti";
import { CheckCircle2, Download, ShoppingBag, ShieldCheck } from "lucide-react";

export function PaymentSuccessPage() {
  const location = useLocation();
  const { t, isMarathi } = useLanguage();

  const order = location.state?.order || {
    id: `EV-20260808-${Math.floor(100 + Math.random() * 900)}`,
    noteId: "mpsc-gs-complete",
    noteTitle: isMarathi ? "MPSC सामान्य अध्ययन संपूर्ण नोट्स २०२६" : "MPSC General Studies Complete Revision Notes 2026",
    amount: 249,
    date: new Date().toLocaleString()
  };

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Fallback
    }
  }, []);

  return (
    <div className="py-16 bg-slate-50 min-h-screen flex items-center justify-center bg-dots-slate">
      <div className="max-w-xl w-full mx-4 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6">
        
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-200">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {t("paymentSuccessTitle")}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
            {isMarathi ? "तुमची खरेदी यशस्वीपणे पूर्ण झाली आहे!" : "Your Purchase Has Been Completed!"}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {t("paymentSuccessSub")}
          </p>
        </div>

        {/* Order Info Card */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-3 text-xs">
          <div className="flex justify-between border-b border-slate-200 pb-2.5">
            <span className="text-slate-500">{t("orderId")}:</span>
            <strong className="font-mono text-slate-900 font-bold">{order.id}</strong>
          </div>

          <div className="flex justify-between border-b border-slate-200 pb-2.5">
            <span className="text-slate-500">{isMarathi ? "नोट्सचे नाव:" : "Note Title:"}</span>
            <strong className="text-slate-900 font-bold max-w-[240px] truncate">{order.noteTitle}</strong>
          </div>

          <div className="flex justify-between border-b border-slate-200 pb-2.5">
            <span className="text-slate-500">{t("amountPaid")}:</span>
            <strong className="text-emerald-700 font-extrabold text-sm">₹{order.amount}</strong>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">{isMarathi ? "प्रवेश स्थिती:" : "Access Status:"}</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> {isMarathi ? "आजीवन मोफत प्रवेश" : "Lifetime Unlocked"}
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-3 pt-2">
          <Link
            to={`/download/${order.noteId}`}
            className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{t("downloadNotesPdf")}</span>
          </Link>

          <Link
            to="/dashboard/purchases"
            className="w-full py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-200"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{t("goToPurchases")}</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
