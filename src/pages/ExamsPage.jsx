import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import { AdBanner } from "../components/common/AdBanner";
import { 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Building2, 
  Train, 
  ShieldCheck, 
  Atom, 
  HeartPulse, 
  ArrowRight,
  GraduationCap,
  Cpu
} from "lucide-react";

export function ExamsPage() {
  const { exams } = useData();
  const navigate = useNavigate();

  const iconMap = {
    BookOpen,
    Award,
    CheckCircle2,
    Building2,
    Train,
    ShieldCheck,
    Atom,
    HeartPulse,
    GraduationCap,
    Cpu
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Catalog & Categories
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mt-2 tracking-tight">
            Explore Competitive Exams
          </h1>
          <p className="text-base text-slate-600 mt-2 max-w-2xl">
            Select your exam to discover targeted revision materials, topic-wise formula sheets, and handwritten topper notes.
          </p>
        </div>

        {/* Ad Placement */}
        <div className="mb-10">
          <AdBanner placement="exam_top" />
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {exams.map((exam) => {
            const IconComponent = iconMap[exam.iconName] || BookOpen;
            return (
              <div
                key={exam.id}
                onClick={() => navigate(`/exams/${exam.id}`)}
                className="group cursor-pointer bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${exam.bgColor || "bg-blue-50 text-blue-700 border-blue-200"} border shadow-sm group-hover:scale-105 transition-transform`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                      {exam.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {exam.name}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 mt-1 mb-3">{exam.shortName} Exam Preparation</p>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {exam.description}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-500">
                    <span className="text-slate-900 font-extrabold text-sm">{exam.notesCount}</span> Available Notes
                  </div>

                  <button className="px-4 py-2 bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1">
                    <span>View Notes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Middle Ad Placement */}
        <div className="mt-12">
          <AdBanner placement="exam_middle" />
        </div>

      </div>
    </div>
  );
}
