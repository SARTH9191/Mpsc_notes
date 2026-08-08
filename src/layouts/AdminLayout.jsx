import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  LayoutDashboard, 
  BookOpen, 
  FolderTree, 
  ShoppingBag, 
  Users, 
  CreditCard, 
  Megaphone, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ArrowLeft,
  ShieldCheck,
  Bell
} from "lucide-react";

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, switchRole, logout } = useAuth();

  const navItems = [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Manage Notes", path: "/admin/notes", icon: BookOpen },
    { label: "Exam Categories", path: "/admin/categories", icon: FolderTree },
    { label: "Orders History", path: "/admin/orders", icon: ShoppingBag },
    { label: "User Management", path: "/admin/users", icon: Users },
    { label: "Payment Logs", path: "/admin/payments", icon: CreditCard },
    { label: "Ad System", path: "/admin/advertisements", icon: Megaphone },
    { label: "Ad Analytics", path: "/admin/analytics", icon: BarChart3 },
    { label: "System Settings", path: "/admin/settings", icon: Settings },
  ];

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans text-base">
      {/* Desktop Sidebar with Increased Font Sizes & Width */}
      <aside className="hidden lg:flex w-72 bg-slate-900 border-r border-slate-800 flex-col justify-between p-5 shrink-0 fixed inset-y-0 left-0 z-30">
        <div>
          {/* Admin Header Branding */}
          <div className="pb-6 mb-4 border-b border-slate-800 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-600/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="font-black text-xl tracking-tight text-white block leading-tight">
                  ExamVault
                </span>
                <span className="text-xs text-indigo-400 font-extrabold uppercase tracking-wider">
                  Admin Console
                </span>
              </div>
            </Link>
          </div>

          {/* Nav Items with Larger Font Sizes */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-extrabold transition-all ${
                    active
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/90"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Controls */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => { switchRole("student"); navigate("/"); }}
            className="w-full py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold transition-colors flex items-center justify-center gap-2 border border-slate-700 min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Switch to Student Site</span>
          </button>

          <div className="flex items-center justify-between pt-2 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-extrabold flex items-center justify-center text-xs">
                {user?.avatar || "AD"}
              </div>
              <div className="truncate max-w-[120px]">
                <span className="block text-white font-extrabold text-xs truncate">{user?.name || "Admin"}</span>
                <span className="block text-[11px] text-slate-400">Super Admin</span>
              </div>
            </div>
            <button
              onClick={() => { logout(); navigate("/login"); }}
              className="p-2 rounded-lg hover:bg-slate-800 text-rose-400"
              title="Logout"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        
        {/* Admin Top Header Bar */}
        <header className="h-18 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-800 border border-slate-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Menu className="w-6 h-6" />
            </button>

            <h1 className="text-base sm:text-xl font-extrabold text-white tracking-tight">
              Control Panel Overview
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 relative border border-slate-700">
              <Bell className="w-5 h-5" />
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 absolute top-2 right-2 border-2 border-slate-900" />
            </button>

            <button
              onClick={() => { switchRole("student"); navigate("/"); }}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold text-xs hover:bg-indigo-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Exit Admin</span>
            </button>
          </div>
        </header>

        {/* Page Outlet */}
        <main className="p-4 sm:p-8 flex-1">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-950/80 backdrop-blur-sm flex">
          <div className="w-72 bg-slate-900 p-5 flex flex-col justify-between border-r border-slate-800 animate-fade-in h-full overflow-y-auto">
            <div>
              <div className="pb-4 mb-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold">
                    EV
                  </div>
                  <span className="font-black text-xl text-white">Admin Console</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-extrabold transition-all ${
                        active
                          ? "bg-indigo-600 text-white shadow-md"
                          : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <button
                onClick={() => { switchRole("student"); setSidebarOpen(false); navigate("/"); }}
                className="w-full py-3 bg-slate-800 text-slate-200 font-extrabold text-sm rounded-xl border border-slate-700 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Exit Admin</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
