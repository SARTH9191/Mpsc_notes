import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Building2, 
  ArrowLeft, 
  Loader2,
  AlertCircle
} from "lucide-react";

export function CheckoutPage() {
  const { noteId } = useParams();
  const { notes, processPurchase } = useData();
  const { user } = useAuth();
  const { t, isMarathi } = useLanguage();
  const navigate = useNavigate();

  const note = notes.find((n) => n.id === noteId);

  const [fullName, setFullName] = useState(user?.name || "प्रिया शर्मा");
  const [email, setEmail] = useState(user?.email || "priya.sharma@example.com");
  const [mobile, setMobile] = useState(user?.mobile || "+91 98230 11234");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!note) {
    return (
      <div className="py-20 text-center bg-slate-50 min-h-screen">
        <h2 className="text-2xl font-bold text-slate-900">Note Not Found</h2>
        <Link to="/notes" className="mt-4 inline-block px-5 py-2 bg-blue-600 text-white rounded-xl">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const originalPrice = note.originalPrice || note.price * 2;
  const discount = originalPrice - note.price;
  const title = isMarathi && note.titleMr ? note.titleMr : note.title;

  const handlePay = (e) => {
    e.preventDefault();
    if (!fullName || !email || !mobile) {
      setErrorMsg(isMarathi ? "कृपया सर्व माहिती भरा." : "Please fill in all customer details.");
      return;
    }

    setErrorMsg("");
    setIsProcessing(true);

    setTimeout(() => {
      const order = processPurchase({
        note,
        customerName: fullName,
        customerEmail: email,
        customerMobile: mobile,
        paymentMethod
      });

      setIsProcessing(false);
      navigate("/payment-success", { state: { order, note } });
    }, 1500);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen bg-dots-slate">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link to={`/notes/${note.id}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 mb-6">
          <ArrowLeft className="w-4 h-4" /> {isMarathi ? "मागे जा" : "Back to Note Details"}
        </Link>

        {/* Page Title */}
        <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isMarathi ? "तुमची ऑर्डर पूर्ण करा" : t("checkoutTitle")}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {isMarathi ? "ऑर्डर तपशील भरा व सुरक्षीत पेमेंट करा." : "Complete your order to receive instant PDF download access."}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Demo Encryption
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {errorMsg}
          </div>
        )}

        <form onSubmit={handlePay} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Customer Details & Payment Selector */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Customer Details */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                {isMarathi ? "ग्राहकाची माहिती" : t("customerInfo")}
              </h2>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t("fullName")}</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">{t("email")}</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">{t("mobile")}</label>
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                {isMarathi ? "पेमेंट पद्धत" : t("selectPayment")}
              </h2>

              <div className="space-y-2.5 pt-2">
                <label
                  onClick={() => setPaymentMethod("UPI")}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "UPI"
                      ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">UPI Instant Payment</h4>
                      <p className="text-[11px] text-slate-500">Google Pay, PhonePe, Paytm, BHIM</p>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === "UPI"} readOnly className="text-blue-600" />
                </label>

                <label
                  onClick={() => setPaymentMethod("Card")}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "Card"
                      ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">Credit / Debit Card</h4>
                      <p className="text-[11px] text-slate-500">Visa, Mastercard, RuPay, Maestro</p>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === "Card"} readOnly className="text-blue-600" />
                </label>

                <label
                  onClick={() => setPaymentMethod("Net Banking")}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === "Net Banking"
                      ? "border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-violet-50 text-violet-600 border border-violet-100 flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">Net Banking</h4>
                      <p className="text-[11px] text-slate-500">SBI, HDFC, ICICI, Axis Bank</p>
                    </div>
                  </div>
                  <input type="radio" checked={paymentMethod === "Net Banking"} readOnly className="text-blue-600" />
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 sticky top-24">
            <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              {isMarathi ? "ऑर्डरचा तपशील" : t("orderSummary")}
            </h2>

            <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="w-10 h-12 rounded bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                PDF
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 text-xs truncate">{title}</h4>
                <p className="text-[11px] text-slate-500">{note.examName || note.subject} • {note.pageCount} Pages</p>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-b border-slate-100 py-3 text-slate-600 font-medium">
              <div className="flex justify-between">
                <span>{isMarathi ? "मूलभूत किंमत" : "Original Price"}</span>
                <span className="line-through text-slate-400">₹{originalPrice}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>{isMarathi ? "५०% सवलत सूट" : "50% Discount"}</span>
                <span>- ₹{discount}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-100 text-sm font-extrabold text-slate-900">
                <span>{isMarathi ? "एकूण देय रक्कम" : t("finalPrice")}</span>
                <span className="text-blue-600">₹{note.price}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{isMarathi ? "पेमेंट प्रक्रिया सुरू आहे..." : t("processingPayment")}</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>₹{note.price} {isMarathi ? "पेमेंट करा" : "Pay Now"}</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-slate-400 text-center leading-relaxed">
              {isMarathi ? "सुरक्षित ५०% सवलत पेमेंट सिम्युलेशन." : "By clicking Pay, you agree to ExamVault terms."}
            </p>
          </div>

        </form>

      </div>
    </div>
  );
}
