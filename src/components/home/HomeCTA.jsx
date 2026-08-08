import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { DiscountBadge } from "../common/DiscountBadge";
import bgAsset from "../../assets/why-examvault-bg.png";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

export function HomeCTA() {
  const { t, isMarathi } = useLanguage();

  return (
    <section 
      className="relative py-16 sm:py-20 text-white overflow-hidden border-t border-b border-slate-800 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgAsset})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-slate-950/85 to-indigo-950/90 backdrop-blur-xs pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        
        <div className="flex justify-center">
          <DiscountBadge compact />
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-md">
          {isMarathi ? "तुमच्या परीक्षेची तयारी सुरू करण्यास तयार आहात?" : "Ready to Start Your Preparation?"}
        </h2>

        <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed font-medium">
          {isMarathi 
            ? "आजच योग्य नोट्स निवडा आणि तुमच्या तयारीला नवी दिशा द्या. ५०% सवलतीसह पीडीएफ त्वरित डाउनलोड करा."
            : "Select the right exam notes today and prepare smarter with instant 50% OFF digital PDF access."}
        </p>

        <div className="pt-2 flex items-center justify-center gap-4">
          <Link
            to="/notes"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-blue-600/40 transition-all flex items-center gap-2 group"
          >
            <BookOpen className="w-5 h-5" />
            <span>{t("exploreNotes")}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
