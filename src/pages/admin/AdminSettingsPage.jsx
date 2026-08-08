import React, { useState } from "react";
import { Settings, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export function AdminSettingsPage() {
  const [adSenseEnabled, setAdSenseEnabled] = useState(false);
  const [directAdsEnabled, setDirectAdsEnabled] = useState(true);
  const [edCoAdsEnabled, setEdCoAdsEnabled] = useState(true);
  const [affiliateAdsEnabled, setAffiliateAdsEnabled] = useState(true);

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
        <h2 className="text-xl font-bold text-white">System & Ad Network Architecture Settings</h2>
        <p className="text-xs text-slate-400 mt-0.5">Configure platform settings, payment gateways, and ad network provider integrations.</p>
      </div>

      {/* Ad Network Provider Architecture Config */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-6 text-xs">
        <div>
          <h3 className="font-bold text-white text-base flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Ad Network Support & Integrations
          </h3>
          <p className="text-slate-400 mt-1">
            ExamVault's advertising component is modularly built to seamlessly switch between or combine multiple ad networks.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          {/* Direct Sponsored Banners */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <h4 className="font-bold text-white text-sm">Direct Sponsored Banners</h4>
              <p className="text-slate-400">Custom client campaigns managed via Admin Ad System.</p>
            </div>
            <input
              type="checkbox"
              checked={directAdsEnabled}
              onChange={(e) => setDirectAdsEnabled(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded"
            />
          </div>

          {/* Education Company Ads */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <h4 className="font-bold text-white text-sm">Education-Company Advertisements</h4>
              <p className="text-slate-400">Coaching institute test series and prep material promos.</p>
            </div>
            <input
              type="checkbox"
              checked={edCoAdsEnabled}
              onChange={(e) => setEdCoAdsEnabled(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded"
            />
          </div>

          {/* Affiliate Advertisements */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <h4 className="font-bold text-white text-sm">Affiliate Advertisements</h4>
              <p className="text-slate-400">Exam tablets, stationary, and e-ink book reader affiliate links.</p>
            </div>
            <input
              type="checkbox"
              checked={affiliateAdsEnabled}
              onChange={(e) => setAffiliateAdsEnabled(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded"
            />
          </div>

          {/* Google AdSense */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-white text-sm">Google AdSense Integration</h4>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                  Future Ready
                </span>
              </div>
              <p className="text-slate-400">Automatic responsive banner slots powered by Google AdSense script tags.</p>
            </div>
            <input
              type="checkbox"
              checked={adSenseEnabled}
              onChange={(e) => setAdSenseEnabled(e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded"
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-indigo-300 font-medium">
          <span className="font-bold">Architectural Note:</span> All current ad banners are powered by simulated mock campaigns with realistic impressions, CTR, and click counts as required by the client demo specification.
        </div>
      </div>
    </div>
  );
}
