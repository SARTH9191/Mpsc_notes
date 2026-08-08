import React from "react";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Megaphone, MousePointerClick, Eye, DollarSign, Percent } from "lucide-react";

export function AdminAnalyticsPage() {
  const analyticsData = [
    { month: "Jan", impressions: 180000, clicks: 1240, ctr: 0.69, revenue: 2750 },
    { month: "Feb", impressions: 210000, clicks: 1480, ctr: 0.70, revenue: 3120 },
    { month: "Mar", impressions: 240000, clicks: 1690, ctr: 0.70, revenue: 3680 },
    { month: "Apr", impressions: 280000, clicks: 1950, ctr: 0.70, revenue: 4200 },
    { month: "May", impressions: 290000, clicks: 2060, ctr: 0.71, revenue: 4700 }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
        <h2 className="text-xl font-bold text-white">Advertising Revenue & Campaign Analytics</h2>
        <p className="text-xs text-slate-400 mt-0.5">Track impressions, CTR, click conversions, and ad network earnings.</p>
      </div>

      {/* Required Spec Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Ad Revenue</span>
          <div className="text-2xl font-black text-emerald-400">₹18,450</div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Active Ads</span>
          <div className="text-2xl font-black text-white">12</div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Impressions</span>
          <div className="text-2xl font-black text-blue-400">1.2M</div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Total Clicks</span>
          <div className="text-2xl font-black text-amber-400">8,420</div>
        </div>

        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Avg CTR</span>
          <div className="text-2xl font-black text-indigo-400">0.70%</div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Impressions & Clicks */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4">
          <h3 className="font-bold text-white text-sm">Monthly Impressions & Clicks</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="clicks" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ad Revenue Growth */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4">
          <h3 className="font-bold text-white text-sm">Advertising Revenue Growth (₹)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorAdRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorAdRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
