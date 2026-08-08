import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import bgAsset from "../../assets/how-it-works-bg.png";
import { Search, Eye, CreditCard, Download } from "lucide-react";

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      step: "01",
      title: t("step1Title"),
      description: t("step1Desc"),
      icon: Search
    },
    {
      step: "02",
      title: t("step2Title"),
      description: t("step2Desc"),
      icon: Eye
    },
    {
      step: "03",
      title: t("step3Title"),
      description: t("step3Desc"),
      icon: CreditCard
    },
    {
      step: "04",
      title: t("step4Title"),
      description: t("step4Desc"),
      icon: Download
    }
  ];

  return (
    <section 
      className="relative py-16 text-white border-b border-slate-800 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${bgAsset})` }}
    >
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950/90 px-3 py-1 rounded-full border border-indigo-800/80">
          सोपी ४-टप्प्यांची प्रक्रिया
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight drop-shadow-md">
          {t("howTitle")}
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-xl mx-auto">
          {t("howSub")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12 text-left relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700/80 shadow-md hover:border-slate-600 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-3xl font-black text-blue-400/40 group-hover:text-blue-400 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-400/30">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
