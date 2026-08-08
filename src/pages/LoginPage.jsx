import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BookOpen, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export function LoginPage() {
  const [email, setEmail] = useState("priya.sharma@example.com");
  const [password, setPassword] = useState("password123");
  const [role, setRole] = useState("student");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, role);
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="py-16 bg-slate-50 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-4 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-md group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-black text-2xl text-slate-900">ExamVault</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight pt-2">
            Welcome Back
          </h1>
          <p className="text-xs text-slate-500">Sign in to access your purchased study notes and dashboard.</p>
        </div>

        {/* Quick Role Switch for Demo Convenience */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => { setRole("student"); setEmail("priya.sharma@example.com"); }}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
              role === "student" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"
            }`}
          >
            Student Account
          </button>
          <button
            type="button"
            onClick={() => { setRole("admin"); setEmail("admin@examvault.in"); }}
            className={`flex-1 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1 transition-all ${
              role === "admin" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-500"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Admin Portal
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">Password</label>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Demo mode: Any password works!"); }} className="text-[11px] font-semibold text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Sign In to ExamVault</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Don't have an account?{" "}
          <Link to="/signup" className="font-bold text-blue-600 hover:underline">
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
}
