import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { BookOpen, ShieldCheck, ChevronDown } from "lucide-react";

export function Footer() {
  const { isMarathi } = useLanguage();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (name) => {
    setOpenSection(openSection === name ? null : name);
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-extrabold shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">ExamVault</span>
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-400 max-w-sm">
              {isMarathi 
                ? "महाराष्ट्रातील स्पर्धा परीक्षांसाठी परिपूर्ण डिजिटल नोट्स, मायंड मॅप्स व सराव प्रश्नसंच." 
                : "Your Preparation. Organized. Premium exam-focused study notes, formula mind maps, and digital revision materials for Indian competitive examinations."}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" /> {isMarathi ? "१००% पडताळणी केलेल्या नोट्स" : "100% Verified Notes"}
              </span>
              <span>•</span>
              <span>{isMarathi ? "त्वरित पीडीएफ डाउनलोड" : "Instant PDF Downloads"}</span>
            </div>
          </div>

          {/* Quick Links Column (Collapsible on Mobile) */}
          <div className="border-b border-slate-900 pb-4 md:pb-0 md:border-none">
            <button
              onClick={() => toggleSection("quick")}
              className="w-full flex items-center justify-between md:cursor-default text-white font-semibold text-xs sm:text-sm tracking-wider uppercase mb-2 md:mb-4 text-left"
            >
              <span>{isMarathi ? "जलद लिंक्स" : "Quick Links"}</span>
              <ChevronDown className={`w-4 h-4 md:hidden text-slate-400 transition-transform ${openSection === "quick" ? "rotate-180" : ""}`} />
            </button>
            <ul className={`space-y-2.5 text-xs sm:text-sm ${openSection === "quick" ? "block" : "hidden md:block"}`}>
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">{isMarathi ? "मुख्य पृष्ठ" : "Home"}</Link>
              </li>
              <li>
                <Link to="/exams" className="hover:text-blue-400 transition-colors">{isMarathi ? "परीक्षा पहा" : "Browse Exams"}</Link>
              </li>
              <li>
                <Link to="/notes" className="hover:text-blue-400 transition-colors">{isMarathi ? "नोट्स" : "Notes Marketplace"}</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">{isMarathi ? "आमच्याबद्दल" : "About Us"}</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">{isMarathi ? "संपर्क" : "Contact Support"}</Link>
              </li>
            </ul>
          </div>

          {/* Top Exam Categories (Collapsible on Mobile) */}
          <div className="border-b border-slate-900 pb-4 md:pb-0 md:border-none">
            <button
              onClick={() => toggleSection("exams")}
              className="w-full flex items-center justify-between md:cursor-default text-white font-semibold text-xs sm:text-sm tracking-wider uppercase mb-2 md:mb-4 text-left"
            >
              <span>{isMarathi ? "प्रमुख परीक्षा" : "Popular Exams"}</span>
              <ChevronDown className={`w-4 h-4 md:hidden text-slate-400 transition-transform ${openSection === "exams" ? "rotate-180" : ""}`} />
            </button>
            <ul className={`space-y-2.5 text-xs sm:text-sm ${openSection === "exams" ? "block" : "hidden md:block"}`}>
              <li>
                <Link to="/exams/mpsc" className="hover:text-blue-400 transition-colors">MPSC Rajyaseva</Link>
              </li>
              <li>
                <Link to="/exams/police-bharti" className="hover:text-blue-400 transition-colors">Police Bharti</Link>
              </li>
              <li>
                <Link to="/exams/talathi" className="hover:text-blue-400 transition-colors">Talathi Bharti</Link>
              </li>
              <li>
                <Link to="/exams/upsc" className="hover:text-blue-400 transition-colors">UPSC IAS</Link>
              </li>
              <li>
                <Link to="/exams/ssc" className="hover:text-blue-400 transition-colors">SSC CGL</Link>
              </li>
              <li>
                <Link to="/exams/banking" className="hover:text-blue-400 transition-colors">Banking PO</Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal (Collapsible on Mobile) */}
          <div>
            <button
              onClick={() => toggleSection("legal")}
              className="w-full flex items-center justify-between md:cursor-default text-white font-semibold text-xs sm:text-sm tracking-wider uppercase mb-2 md:mb-4 text-left"
            >
              <span>{isMarathi ? "मदत व कायदेशीर" : "Support & Legal"}</span>
              <ChevronDown className={`w-4 h-4 md:hidden text-slate-400 transition-transform ${openSection === "legal" ? "rotate-180" : ""}`} />
            </button>
            <ul className={`space-y-2.5 text-xs sm:text-sm ${openSection === "legal" ? "block" : "hidden md:block"}`}>
              <li>
                <Link to="/faq" className="hover:text-blue-400 transition-colors">FAQ & Help Center</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-blue-400 transition-colors">Refund & Cancellation</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-indigo-400 text-slate-500 transition-colors flex items-center gap-1 mt-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin Portal
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center md:text-left">
          <p>© 2026 ExamVault. All rights reserved. Professional EdTech Platform.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-slate-400">Privacy</Link>
            <Link to="/terms" className="hover:text-slate-400">Terms</Link>
            <Link to="/refund-policy" className="hover:text-slate-400">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
