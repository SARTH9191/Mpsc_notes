import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { 
  BookOpen, 
  Download, 
  ShoppingBag, 
  CheckCircle2, 
  User, 
  LogOut 
} from "lucide-react";

export function DashboardOverview() {
  const { notes, purchasedNoteIds } = useData();
  const { user } = useAuth();
  const { t, isMarathi } = useLanguage();
  const navigate = useNavigate();

  const myPurchasedNotes = notes.filter((n) => purchasedNoteIds.includes(n.id));
  const totalSpent = myPurchasedNotes.reduce((acc, n) => acc + n.price, 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">{t("myPurchasedNotes")}</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{myPurchasedNotes.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">{t("downloads")}</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{myPurchasedNotes.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
            <Download className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">{isMarathi ? "एकूण खर्च" : "Total Spent"}</span>
            <div className="text-2xl font-black text-slate-900 mt-1">₹{totalSpent}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">{t("myPurchasedNotes")}</h2>
          <Link to="/dashboard/purchases" className="text-xs font-bold text-blue-600 hover:underline">
            {t("viewAllExams")} ({myPurchasedNotes.length})
          </Link>
        </div>

        {myPurchasedNotes.length > 0 ? (
          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5">{isMarathi ? "नोट्सचे नाव" : "Note Title"}</th>
                  <th className="p-3.5">{isMarathi ? "विषय" : "Subject"}</th>
                  <th className="p-3.5">{isMarathi ? "रक्कम" : "Amount"}</th>
                  <th className="p-3.5">{isMarathi ? "स्थिती" : "Status"}</th>
                  <th className="p-3.5 text-right">{isMarathi ? "कृती" : "Action"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {myPurchasedNotes.map((note) => {
                  const title = isMarathi && note.titleMr ? note.titleMr : note.title;
                  const subject = isMarathi && note.subjectMr ? note.subjectMr : note.subject;
                  return (
                    <tr key={note.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 max-w-[220px] truncate">{title}</td>
                      <td className="p-3.5 text-slate-600">{subject}</td>
                      <td className="p-3.5 font-bold text-slate-900">₹{note.price}</td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {isMarathi ? "पूर्ण" : "Paid"}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => navigate(`/download/${note.id}`)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs transition-colors inline-flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" /> Download
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">{t("noNotesFound")}</h3>
            <Link to="/notes" className="inline-block px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl">
              {t("browseAllNotes")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export function DashboardPurchases() {
  const { notes, purchasedNoteIds } = useData();
  const { t, isMarathi } = useLanguage();
  const navigate = useNavigate();

  const myNotes = notes.filter((n) => purchasedNoteIds.includes(n.id));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">{t("myPurchasedNotes")}</h2>
        <p className="text-xs text-slate-500 mt-1">{isMarathi ? "तुमच्या अमर्याद प्रवेशासह खरेदी केलेल्या नोट्स." : "Access and download all your unlocked competitive exam study materials."}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myNotes.map((note) => {
          const title = isMarathi && note.titleMr ? note.titleMr : note.title;
          return (
            <div key={note.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    {note.examName || note.subject}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {t("purchasedVerified")}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">{title}</h3>
                <p className="text-xs text-slate-500 mt-1">{note.pageCount} Pages • {note.language}</p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-900">₹{note.price}</span>
                <button
                  onClick={() => navigate(`/download/${note.id}`)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t("downloadNotesPdf")}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DashboardDownloads() {
  return <DashboardPurchases />;
}

export function DashboardProfile() {
  const { user } = useAuth();
  const { isMarathi } = useLanguage();

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">{isMarathi ? "विद्यार्थी प्रोफाईल" : "Student Profile"}</h2>
        <p className="text-xs text-slate-500 mt-1">{isMarathi ? "तुमची संपर्क माहिती व खाते तपशील." : "Manage your account information and contact details."}</p>
      </div>

      <div className="space-y-4 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-medium text-slate-700">
        <div>
          <label className="block text-slate-400 text-[11px] mb-1">{isMarathi ? "पूर्ण नाव" : "Full Name"}</label>
          <div className="p-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-900">
            {user?.name || "प्रिया शर्मा"}
          </div>
        </div>

        <div>
          <label className="block text-slate-400 text-[11px] mb-1">{isMarathi ? "ईमेल पत्ता" : "Email Address"}</label>
          <div className="p-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-900">
            {user?.email || "priya.sharma@example.com"}
          </div>
        </div>

        <div>
          <label className="block text-slate-400 text-[11px] mb-1">{isMarathi ? "मोबाईल नंबर" : "Mobile Phone"}</label>
          <div className="p-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-900">
            {user?.mobile || "+91 98230 11234"}
          </div>
        </div>
      </div>
    </div>
  );
}
