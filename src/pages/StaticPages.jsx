import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MapPin, ShieldCheck, HelpCircle, FileText, AlertCircle, ArrowLeft } from "lucide-react";
import { FAQAccordion } from "../components/home/FAQAccordion";

export function AboutPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            About ExamVault
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-2 tracking-tight">
            Empowering Aspirants Across India
          </h1>
          <p className="text-base text-slate-600 mt-2 leading-relaxed">
            ExamVault is a dedicated digital notes marketplace built to simplify competitive exam preparation for MPSC, UPSC, SSC, Banking, and Entrance examinations.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900">Our Mission</h2>
          <p>
            Competitive exams require smart revision. Standard textbooks are often thousands of pages long and lack concise topic summaries. At ExamVault, we partner with subject matter experts, exam toppers, and senior educators to curate high-retention handwritten & digitized PDF notes.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-2">Why Digital Notes?</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>Instant access anytime on mobile, tablet, or laptop.</li>
            <li>Interactive sample preview before committing to purchase.</li>
            <li>Searchable text format allowing rapid keyword lookup during last-minute revision.</li>
            <li>Student-friendly pricing without expensive shipping fees.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Support & Help
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-2 tracking-tight">
            Contact ExamVault Team
          </h1>
          <p className="text-base text-slate-600 mt-2">
            Have questions about your purchase or need help downloading notes? We are here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 text-sm">Email Support</h3>
            <p className="text-xs text-slate-500 mt-1">support@examvault.in</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <Phone className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 text-sm">Helpline</h3>
            <p className="text-xs text-slate-500 mt-1">+91 98000 12345</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <MapPin className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 text-sm">Headquarters</h3>
            <p className="text-xs text-slate-500 mt-1">Pune, Maharashtra, India</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <FAQAccordion />
    </div>
  );
}

export function PrivacyPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-black text-slate-900">Privacy Policy</h1>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs text-slate-600 leading-relaxed">
          <p>This Privacy Policy describes how ExamVault collects, uses, and protects your personal information when you use our website.</p>
          <h3 className="font-bold text-slate-900 text-sm">1. Information We Collect</h3>
          <p>We collect student names, email addresses, and mobile numbers provided during checkout or account registration solely for order processing and PDF delivery.</p>
          <h3 className="font-bold text-slate-900 text-sm">2. Data Security</h3>
          <p>We implement SSL encryption and strict data access controls to protect user data from unauthorized access.</p>
        </div>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-black text-slate-900">Terms & Conditions</h1>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs text-slate-600 leading-relaxed">
          <p>Welcome to ExamVault. By accessing or purchasing study materials from this website, you agree to these terms.</p>
          <h3 className="font-bold text-slate-900 text-sm">1. License & Copyright</h3>
          <p>Purchased PDF study notes are licensed exclusively for personal educational use by the buyer. Resale, redistribution, or public sharing of PDF files is strictly prohibited.</p>
        </div>
      </div>
    </div>
  );
}

export function RefundPolicyPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-black text-slate-900">Refund Policy</h1>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs text-slate-600 leading-relaxed">
          <p>We strive to provide accurate sample previews for all competitive exam notes.</p>
          <h3 className="font-bold text-slate-900 text-sm">48-Hour Satisfaction Guarantee</h3>
          <p>If you encounter technical issues downloading your PDF file or if the content differs significantly from the sample preview, contact support within 48 hours for resolution or refund.</p>
        </div>
      </div>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="py-24 bg-slate-50 min-h-screen flex items-center justify-center text-center px-4">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto border border-rose-200 font-mono text-2xl font-black">
          404
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Page Not Found</h1>
          <p className="text-xs text-slate-500 mt-1">The page or route you are looking for does not exist.</p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home Page
        </Link>
      </div>
    </div>
  );
}
