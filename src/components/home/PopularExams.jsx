import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { useLanguage } from "../../context/LanguageContext";
import bgAsset from "../../assets/popular-exams-bg.png";
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

export function PopularExams() {
  const { exams } = useData();
  const { t, isMarathi } = useLanguage();
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
    <section 
      className="relative py-16 text-white border-b border-slate-800 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${bgAsset})` }}
    >
      {/* Semi-transparent Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950/85 backdrop-blur-xs pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/90 px-3 py-1 rounded-full border border-blue-800/80">
              {isMarathi ? "परीक्षा प्रकार" : "Exam Categories"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight drop-shadow-md">
              {t("popularExamsTitle")}
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              {t("popularExamsSub")}
            </p>
          </div>
          <Link
            to="/exams"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors group"
          >
            <span>{t("viewAllExams")} ({exams.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {exams.slice(0, 8).map((exam) => {
            const IconComponent = iconMap[exam.iconName] || BookOpen;
            return (
              <div
                key={exam.id}
                onClick={() => navigate(`/exams/${exam.id}`)}
                className="group relative cursor-pointer bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700/80 shadow-md hover:border-blue-500/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${exam.bgColor || "bg-blue-500/20 text-blue-400 border-blue-500/30"} border shadow-sm group-hover:scale-105 transition-transform`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {exam.badge && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {exam.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {isMarathi && exam.nameMr ? exam.nameMr : exam.name}
                  </h3>
                  <p className="text-xs font-semibold text-blue-400 mt-1 mb-2">{exam.shortName}</p>
                  
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {exam.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-400">
                    <strong className="text-white font-bold">{exam.notesCount}</strong> {t("availableNotes")}
                  </span>
                  <span className="font-bold text-blue-400 group-hover:underline flex items-center gap-1">
                    {t("explore")} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
