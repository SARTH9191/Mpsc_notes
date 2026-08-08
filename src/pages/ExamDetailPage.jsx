import React from "react";
import { useParams, Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { NoteCard } from "../components/common/NoteCard";
import { AdBanner } from "../components/common/AdBanner";
import { ArrowLeft, BookOpen, Layers, Award } from "lucide-react";

export function ExamDetailPage() {
  const { examId } = useParams();
  const { exams, notes } = useData();

  const exam = exams.find((e) => e.id === examId || e.shortName.toLowerCase() === examId?.toLowerCase());
  const examNotes = notes.filter((n) => n.examId === examId || (exam && n.examName?.includes(exam.shortName)));

  if (!exam) {
    return (
      <div className="py-20 text-center bg-slate-50 min-h-screen">
        <h2 className="text-2xl font-bold text-slate-900">Exam Category Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The requested exam category does not exist.</p>
        <Link to="/exams" className="inline-block mt-4 px-5 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl">
          Back to All Exams
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link to="/exams" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Exams
        </Link>

        {/* Hero Header Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-10 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl relative z-10 space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-800/60">
              {exam.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {exam.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {exam.description}
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1 text-blue-300">
                <BookOpen className="w-4 h-4" /> {examNotes.length} Verified Study Notes
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Award className="w-4 h-4" /> Updated for 2026 Syllabus
              </span>
            </div>
          </div>
        </div>

        {/* Top Banner Ad Placement */}
        <div className="mb-10">
          <AdBanner placement="exam_top" />
        </div>

        {/* Notes Grid */}
        <h2 className="text-2xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Study Materials for {exam.shortName}
        </h2>

        {examNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {examNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 text-lg">No notes found for this exam yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Our subject experts are currently uploading new study materials. Check out other competitive exams.
            </p>
            <Link to="/notes" className="inline-block mt-4 px-5 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl">
              Browse Notes Marketplace
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
