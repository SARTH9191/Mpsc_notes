import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Sparkles, Flame } from "lucide-react";

export function DiscountBadge({ className = "", compact = false }) {
  const { isMarathi } = useLanguage();

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-black text-xs shadow-md shadow-amber-500/20 border border-amber-300/40 animate-float-bob ${className}`}>
        <Flame className="w-3.5 h-3.5 fill-amber-200 text-amber-200 animate-pulse" />
        <span>50% OFF</span>
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white font-extrabold text-xs shadow-xl shadow-amber-500/25 border border-amber-300/50 animate-float-bob z-10 ${className}`}>
      <div className="w-7 h-7 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shrink-0">
        <Flame className="w-4 h-4 fill-amber-100 text-amber-100" />
      </div>
      <div>
        <div className="flex items-center gap-1">
          <span className="font-black text-sm tracking-tight text-white uppercase">50% OFF</span>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-bold">मर्यादित वेळ</span>
        </div>
        <div className="text-[11px] text-amber-100 font-medium">
          {isMarathi ? "आजच खरेदी करा!" : "Limited Time Offer!"}
        </div>
      </div>
    </div>
  );
}
