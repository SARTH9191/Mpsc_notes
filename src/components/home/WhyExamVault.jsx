import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import bgAsset from "../../assets/why-examvault-bg.png";
import { Target, Zap, RotateCcw, Wallet } from "lucide-react";

export function WhyExamVault() {
  const { t } = useLanguage();

  const features = [
    {
      title: t("feature1Title"),
      description: t("feature1Desc"),
      icon: Target,
      color: "bg-blue-500/20 text-blue-400 border-blue-400/30"
    },
    {
      title: t("feature2Title"),
      description: t("feature2Desc"),
      icon: Zap,
      color: "bg-amber-500/20 text-amber-400 border-amber-400/30"
    },
    {
      title: t("feature3Title"),
      description: t("feature3Desc"),
      icon: RotateCcw,
      color: "bg-indigo-500/20 text-indigo-400 border-indigo-400/30"
    },
    {
      title: t("feature4Title"),
      description: t("feature4Desc"),
      icon: Wallet,
      color: "bg-emerald-500/20 text-emerald-400 border-emerald-400/30"
    }
  ];

  return (
    <section 
      className="relative py-16 text-white border-b border-slate-800 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${bgAsset})` }}
    >
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/90 px-3 py-1 rounded-full border border-blue-800/60">
          The ExamVault Advantage
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight drop-shadow-md">
          {t("whyTitle")}
        </h2>
        <p className="text-sm text-slate-300 mt-2 max-w-2xl mx-auto">
          {t("whySub")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 hover:border-slate-600 transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${item.color} border flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
