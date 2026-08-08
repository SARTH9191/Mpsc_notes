import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { BookOpen, Layers, Users, Zap } from "lucide-react";
import bgAsset from "../../assets/trust-stats-bg.png";

export function TrustStats() {
  const { t } = useLanguage();

  const stats = [
    {
      label: t("stat1Label"),
      subtext: t("stat1Sub"),
      detail: t("stat1Detail"),
      icon: BookOpen,
      color: "text-blue-400 bg-blue-500/20 border-blue-400/30"
    },
    {
      label: t("stat2Label"),
      subtext: t("stat2Sub"),
      detail: t("stat2Detail"),
      icon: Layers,
      color: "text-indigo-400 bg-indigo-500/20 border-indigo-400/30"
    },
    {
      label: t("stat3Label"),
      subtext: t("stat3Sub"),
      detail: t("stat3Detail"),
      icon: Users,
      color: "text-emerald-400 bg-emerald-500/20 border-emerald-400/30"
    },
    {
      label: t("stat4Label"),
      subtext: t("stat4Sub"),
      detail: t("stat4Detail"),
      icon: Zap,
      color: "text-amber-400 bg-amber-500/20 border-amber-400/30"
    }
  ];

  return (
    <section 
      className="relative py-16 text-white border-b border-slate-800 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${bgAsset})` }}
    >
      {/* Semi-transparent dark overlay for crisp text readability */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-md text-center hover:bg-slate-900 hover:border-slate-600 hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl ${stat.color} border flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
                  {stat.label}
                </div>
                <div className="text-sm font-bold text-slate-200 mt-1">
                  {stat.subtext}
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">
                  {stat.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
