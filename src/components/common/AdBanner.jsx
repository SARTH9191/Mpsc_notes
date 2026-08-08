import React from "react";
import { useLocation } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { useLanguage } from "../../context/LanguageContext";
import { ExternalLink, Sparkles } from "lucide-react";

export function AdBanner({ placement, className = "" }) {
  const location = useLocation();
  const { advertisements } = useData();
  const { isMarathi } = useLanguage();

  // Strict Restriction Check: DO NOT show ads on Checkout, Payment, Download, Auth, or Admin routes!
  const forbiddenPaths = [
    "/checkout",
    "/payment",
    "/payment-success",
    "/download",
    "/login",
    "/signup",
    "/admin"
  ];

  const isForbidden = forbiddenPaths.some((path) => location.pathname.startsWith(path));
  if (isForbidden) return null;

  const matchingAds = advertisements.filter(
    (ad) => ad.placement === placement && ad.status === "Active"
  );

  if (!matchingAds || matchingAds.length === 0) return null;

  const ad = matchingAds[0];

  return (
    <div
      className={`relative group overflow-hidden rounded-2xl border border-amber-200/60 bg-gradient-to-r from-amber-50 via-orange-50/50 to-amber-50/80 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-200">
          <Sparkles className="w-3 h-3 text-amber-600" />
          {isMarathi ? "जाहिरात" : "Sponsored"}
        </span>
        <span className="text-[10px] text-amber-600/70 font-medium">{ad.advertiser || "ExamVault Network"}</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        {ad.bannerImage && (
          <div className="w-full sm:w-36 h-24 sm:h-24 shrink-0 rounded-xl overflow-hidden bg-slate-200 border border-amber-200/50">
            <img
              src={ad.bannerImage}
              alt={ad.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="flex-1 min-w-0 text-left">
          <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-amber-900 transition-colors">
            {ad.title}
          </h4>
          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
            {ad.description}
          </p>
        </div>

        <a
          href={ad.targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
        >
          <span>{isMarathi ? "अधिक माहिती" : "Learn More"}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
