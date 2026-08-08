import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Download, 
  User, 
  LogOut, 
  BookOpen
} from "lucide-react";

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isMarathi } = useLanguage();

  const navItems = [
    { label: isMarathi ? "थोडक्यात" : "Overview", path: "/dashboard", exact: true, icon: LayoutDashboard },
    { label: isMarathi ? "माझ्या खरेदी" : "My Purchases", path: "/dashboard/purchases", icon: ShoppingBag },
    { label: isMarathi ? "डाउनलोड्स" : "Downloads", path: "/dashboard/downloads", icon: Download },
    { label: isMarathi ? "प्रोफाईल" : "My Profile", path: "/dashboard/profile", icon: User },
  ];

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-6 sm:py-8 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header Bar */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white text-lg sm:text-xl font-black flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
              {user?.avatar || "PS"}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-2xl font-extrabold text-white">
                  {isMarathi ? "पुन्हा स्वागत आहे" : "Welcome back"}, {user?.name || "Student"} 👋
                </h1>
                <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded uppercase">
                  Aspirant
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {isMarathi ? "तुमच्या खरेदी केलेल्या नोट्स व परीक्षा साहित्य येथे पहा." : "Access your purchased competitive exam notes and track your study materials."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/notes"
              className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              <BookOpen className="w-4 h-4" />
              <span>{isMarathi ? "नोट्स शोधा" : "Browse Notes"}</span>
            </Link>
          </div>
        </div>

        {/* Mobile Horizontal Sub-Navigation Tab Bar (Section 20 of PDF Spec) */}
        <div className="lg:hidden mb-6 flex overflow-x-auto pb-2 gap-2 scrollbar-none border-b border-slate-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all min-h-[44px] ${
                  active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-white text-slate-700 border border-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Sidebar + Main Outlet Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Sidebar Column */}
          <div className="hidden lg:block lg:col-span-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1 sticky top-24">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
              Student Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="pt-4 border-t border-slate-100 mt-4">
              <button
                onClick={() => { logout(); navigate("/"); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors min-h-[44px]"
              >
                <LogOut className="w-4 h-4" />
                <span>{isMarathi ? "साइन आउट" : "Sign Out"}</span>
              </button>
            </div>
          </div>

          {/* Main Dashboard Sub-Page Content */}
          <div className="lg:col-span-9 bg-white p-5 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <Outlet />
          </div>

        </div>

      </div>
    </div>
  );
}
