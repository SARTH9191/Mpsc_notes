import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { DiscountBadge } from "../common/DiscountBadge";
import heroBgAsset from "../../assets/hero-bg.jpg";
import { 
  ArrowRight, 
  Sparkles, 
  FileCheck2, 
  Layers, 
  CheckCircle2,
  BookOpen,
  Award,
  GraduationCap
} from "lucide-react";

export function Hero() {
  const { t, isMarathi } = useLanguage();

  return (
    <section 
      className="relative overflow-hidden text-white pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-16 border-b border-slate-800 bg-cover bg-center bg-no-repeat shadow-2xl min-h-[480px]"
      style={{ backgroundImage: `url(${heroBgAsset})` }}
    >
      {/* Minimal Light Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/35 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Text Column inside a Compact Height Glass Card */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4 text-center lg:text-left bg-slate-950/65 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-700/70 shadow-2xl">
            
            {/* Top Badge + Animated Floating 50% OFF Badge Container */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/90 border border-blue-600/80 text-blue-300 text-[11px] sm:text-xs font-bold shadow-md">
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span>{t("heroBadge")}</span>
              </div>

              {/* Animated Floating 50% OFF Badge */}
              <DiscountBadge />
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15] drop-shadow-xl">
              {t("heroHeadingStart")}
              <span className="bg-gradient-to-r from-blue-300 via-indigo-200 to-amber-300 bg-clip-text text-transparent block mt-0.5">
                {t("heroHeadingHighlight")}
              </span>
            </h1>

            <p className="text-xs sm:text-sm lg:text-base text-slate-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-semibold drop-shadow-md">
              {t("heroDesc")}
            </p>

            {/* CTAs */}
            <div className="pt-1 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Link
                to="/notes"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-600/40 transition-all flex items-center justify-center gap-2 group min-h-[42px]"
              >
                <span>{t("exploreNotes")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/exams"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-bold text-xs sm:text-sm border border-slate-600 backdrop-blur-md transition-all text-center min-h-[42px]"
              >
                {t("browseExams")}
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-3.5 grid grid-cols-2 sm:grid-cols-4 gap-2 border-t border-slate-700/80 text-[11px] text-slate-200 font-bold">
              <div className="flex items-center gap-1.5 justify-center lg:justify-start bg-slate-900/70 p-2 rounded-xl border border-slate-700/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t("heroStat3")}</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start bg-slate-900/70 p-2 rounded-xl border border-slate-700/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t("heroStat4")}</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start bg-slate-900/70 p-2 rounded-xl border border-slate-700/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>TCS / IBPS पॅटर्न</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start bg-slate-900/70 p-2 rounded-xl border border-slate-700/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>आजीवन नावनोंदणी</span>
              </div>
            </div>

          </div>

          {/* Right Column with Translucent Glass Preview Card */}
          <div className="lg:col-span-5 relative flex justify-center py-2">
            <div className="relative w-full max-w-md">
              
              {/* Translucent Glass Frame */}
              <div className="bg-slate-950/45 backdrop-blur-md p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-700/80 shadow-2xl space-y-3 hover:bg-slate-950/65 transition-colors">
                
                <div className="flex items-center justify-between border-b border-slate-700/70 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-xs sm:text-sm">ExamVault MH Center</h4>
                      <p className="text-[10px] text-slate-200 font-medium">महाराष्ट्रातील स्पर्धा परीक्षांसाठी परिपूर्ण</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-950/95 text-emerald-300 text-[9px] font-black border border-emerald-600 shadow-md">
                    50% OFF SALE
                  </span>
                </div>

                {/* Translucent Note Item Chips */}
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-700/70 flex items-center justify-between shadow-md">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/30 text-blue-300 flex items-center justify-center font-black text-[11px] shadow-inner">
                        MPSC
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-white">MPSC सामान्य अध्ययन २०२६</p>
                        <p className="text-[9px] text-slate-300 font-medium">२१० पृष्ठे • मराठी नोट्स</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-black text-blue-400 block">₹249</span>
                      <span className="text-[9px] text-slate-400 line-through">₹499</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-700/70 flex items-center justify-between shadow-md">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-rose-500/30 text-rose-300 flex items-center justify-center font-black text-[11px] shadow-inner">
                        पोलीस
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-white">पोलीस भरती सामान्य ज्ञान</p>
                        <p className="text-[9px] text-slate-300 font-medium">१६० पृष्ठे • सराव संच</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-black text-rose-400 block">₹199</span>
                      <span className="text-[9px] text-slate-400 line-through">₹399</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-700/70 flex items-center justify-between shadow-md">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/30 text-amber-300 flex items-center justify-center font-black text-[11px] shadow-inner">
                        तलाठी
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-white">तलाठी भरती मराठी व्याकरण</p>
                        <p className="text-[9px] text-slate-300 font-medium">TCS पॅटर्न • शब्दसंग्रह</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-black text-amber-400 block">₹249</span>
                      <span className="text-[9px] text-slate-400 line-through">₹499</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Compact Floating Stat Card (Top Right) */}
              <div className="absolute -top-3 -right-3 bg-slate-950/95 border border-slate-700 p-2 sm:p-2.5 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-2 animate-float-bob z-20">
                <div className="w-6.5 h-6.5 rounded-lg bg-amber-500/30 text-amber-300 flex items-center justify-center font-bold shrink-0">
                  <FileCheck2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold text-white leading-tight">५००+ नोट्स उपलब्ध</div>
                  <div className="text-[8.5px] text-slate-300 font-medium leading-tight">शोधा व डाउनलोड करा</div>
                </div>
              </div>

              {/* Compact Floating Stat Card (Bottom Left) */}
              <div className="absolute -bottom-3 -left-3 bg-slate-950/95 border border-slate-700 p-2 sm:p-2.5 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-2 animate-float-bob [animation-delay:1.5s] z-20">
                <div className="w-6.5 h-6.5 rounded-lg bg-blue-500/30 text-blue-300 flex items-center justify-center font-bold shrink-0">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold text-white leading-tight">MPSC, पोलीस, तलाठी</div>
                  <div className="text-[8.5px] text-slate-300 font-medium leading-tight">विशेष अभ्यास सामग्री</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
