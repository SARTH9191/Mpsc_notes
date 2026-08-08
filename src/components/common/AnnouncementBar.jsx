import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Flame, Timer, Sparkles } from "lucide-react";

export function AnnouncementBar() {
  const { isMarathi } = useLanguage();

  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 14,
    seconds: 35
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 2, minutes: 30, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, "0");

  const ContentUnit = () => (
    <div className="flex items-center space-x-8 shrink-0 font-extrabold text-xs sm:text-sm">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black text-[11px] uppercase shadow-sm animate-pulse">
          <Flame className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
          <span>50% OFF</span>
        </span>
        <span className="text-white drop-shadow-sm">
          {isMarathi 
            ? "विशेष सवलत! MPSC, पोलीस भरती, तलाठी व सरळ सेवा परीक्षांच्या सर्व नोट्सवर ५०% सूट चालू आहे!" 
            : "Special Discount! 50% OFF on all MPSC, Police Bharti, Talathi & Saral Seva PDF Notes!"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 font-bold text-amber-200 bg-slate-950/70 px-3 py-0.5 rounded-lg border border-amber-400/40 shadow-inner">
          <Timer className="w-3.5 h-3.5 text-amber-300 animate-spin [animation-duration:8s]" />
          <span className="text-[11px] uppercase text-slate-200">
            {isMarathi ? "किंमत वाढण्यास शिल्लक वेळ:" : "Price Increases In:"}
          </span>
          <div className="font-mono text-white text-xs font-black tracking-wider flex items-center gap-0.5">
            <span className="bg-amber-500/30 px-1 rounded text-amber-300">{formatNumber(timeLeft.hours)}h</span>
            <span>:</span>
            <span className="bg-amber-500/30 px-1 rounded text-amber-300">{formatNumber(timeLeft.minutes)}m</span>
            <span>:</span>
            <span className="bg-rose-500/40 px-1 rounded text-rose-300 animate-pulse">{formatNumber(timeLeft.seconds)}s</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pr-8">
        <span className="inline-flex items-center gap-1 bg-emerald-400 text-slate-950 px-2 py-0.5 rounded font-black text-[11px] uppercase shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-slate-950" />
          <span>INSTANT DOWNLOAD</span>
        </span>
        <span className="text-slate-100">
          {isMarathi 
            ? "पेमेंट पूर्ण होताच लगेच पीडीएफ डाउनलोड पर्याय अनलॉक होतो!" 
            : "Instant searchable PDF download unlocked right after checkout!"}
        </span>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-700 text-white py-2 border-b border-amber-500/40 relative z-30 overflow-hidden shadow-md">
      <div className="w-full overflow-hidden">
        {/* Seamless Gapless Infinite Marquee Loop */}
        <div className="animate-marquee-infinite flex">
          <ContentUnit />
          <ContentUnit />
        </div>
      </div>
    </div>
  );
}
