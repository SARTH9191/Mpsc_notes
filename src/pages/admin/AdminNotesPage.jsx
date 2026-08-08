import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  FileText, 
  X, 
  Upload, 
  CheckCircle2 
} from "lucide-react";
import { PDFPreviewModal } from "../../components/pdf/PDFPreviewModal";

export function AdminNotesPage() {
  const { notes, exams, addNote, editNote, deleteNote } = useData();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [previewNote, setPreviewNote] = useState(null);
  const [editingNote, setEditingNote] = useState(null);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formExam, setFormExam] = useState("mpsc");
  const [formSubject, setFormSubject] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formPrice, setFormPrice] = useState(299);
  const [formOriginalPrice, setFormOriginalPrice] = useState(499);
  const [formPages, setFormPages] = useState(150);
  const [formLanguage, setFormLanguage] = useState("English");
  const [formPdfFileName, setFormPdfFileName] = useState("");
  const [formCoverFileName, setFormCoverFileName] = useState("");

  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.subject.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingNote(null);
    setFormTitle("");
    setFormExam("mpsc");
    setFormSubject("");
    setFormDescription("");
    setFormPrice(299);
    setFormOriginalPrice(499);
    setFormPages(150);
    setFormLanguage("English");
    setFormPdfFileName("");
    setFormCoverFileName("");
    setModalOpen(true);
  };

  const handleOpenEdit = (n) => {
    setEditingNote(n);
    setFormTitle(n.title);
    setFormExam(n.examId || "mpsc");
    setFormSubject(n.subject);
    setFormDescription(n.description);
    setFormPrice(n.price);
    setFormOriginalPrice(n.originalPrice || n.price * 1.5);
    setFormPages(n.pageCount);
    setFormLanguage(n.language);
    setFormPdfFileName(`${n.id}.pdf`);
    setFormCoverFileName("cover.png");
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const examObj = exams.find((ex) => ex.id === formExam);
    const noteData = {
      id: editingNote ? editingNote.id : `note-${Date.now()}`,
      title: formTitle,
      examId: formExam,
      examName: examObj ? examObj.shortName : "MPSC",
      subject: formSubject,
      description: formDescription,
      price: Number(formPrice),
      originalPrice: Number(formOriginalPrice),
      pageCount: Number(formPages),
      language: formLanguage,
      fileSize: "14.5 MB",
      format: "PDF",
      rating: editingNote ? editingNote.rating : 4.8,
      totalReviews: editingNote ? editingNote.totalReviews : 1,
      coverBg: editingNote ? editingNote.coverBg : "from-blue-600 to-indigo-800"
    };

    if (editingNote) {
      editNote(noteData);
    } else {
      addNote(noteData);
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Study Materials Management</h2>
          <p className="text-sm text-slate-300 font-semibold mt-1">Add, edit, or remove exam notes and upload PDF digital packages.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 min-h-[48px]"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Note</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Filter notes by title or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-sm font-bold text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[48px]"
        />
      </div>

      {/* Desktop Table View (>= md) with Larger Font Sizes */}
      <div className="hidden md:block bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-200">
            <thead className="bg-slate-950 text-slate-300 font-black uppercase tracking-wider text-xs border-b border-slate-800">
              <tr>
                <th className="p-4">Note Title</th>
                <th className="p-4">Category / Exam</th>
                <th className="p-4">Price</th>
                <th className="p-4">Sales</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredNotes.map((n) => (
                <tr key={n.id} className="hover:bg-slate-800/60 font-semibold">
                  <td className="p-4 font-extrabold text-white max-w-[280px] truncate">{n.title}</td>
                  <td className="p-4">
                    <span className="bg-slate-800 text-indigo-300 px-3 py-1 rounded-lg text-xs font-black border border-slate-700">
                      {n.examName || n.examId}
                    </span>
                  </td>
                  <td className="p-4 font-black text-white text-base">₹{n.price}</td>
                  <td className="p-4 font-mono font-bold text-slate-300">{n.totalReviews * 3 + 12}</td>
                  <td className="p-4">
                    <span className="bg-emerald-950 text-emerald-400 px-3 py-1 rounded-lg text-xs font-black border border-emerald-800">
                      Active
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => setPreviewNote(n)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
                        title="Preview Sample"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(n)}
                        className="p-2 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 transition-colors"
                        title="Edit Note"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteNote(n.id)}
                        className="p-2 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 transition-colors"
                        title="Delete Note"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Responsive Cards View (< md) */}
      <div className="md:hidden space-y-4">
        {filteredNotes.map((n) => (
          <div key={n.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3.5 shadow-lg">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider bg-slate-800 text-indigo-300 px-2.5 py-1 rounded-lg border border-slate-700">
                  {n.examName || n.examId}
                </span>
                <h4 className="font-extrabold text-white text-base mt-2">{n.title}</h4>
              </div>
              <span className="bg-emerald-950 text-emerald-400 px-2.5 py-1 rounded-lg text-xs font-black border border-emerald-800 shrink-0">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-slate-300 border-t border-b border-slate-800/80 py-2.5">
              <div>
                <span className="text-slate-400 block text-xs font-bold">Price</span>
                <strong className="text-white font-black text-base">₹{n.price}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-xs font-bold">Sales</span>
                <strong className="text-slate-200 font-mono font-bold">{n.totalReviews * 3 + 12}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-xs font-bold">Pages</span>
                <strong className="text-slate-200 font-bold">{n.pageCount}</strong>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                onClick={() => setPreviewNote(n)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-extrabold flex items-center gap-1.5 min-h-[44px]"
              >
                <Eye className="w-4 h-4" /> Preview
              </button>
              <button
                onClick={() => handleOpenEdit(n)}
                className="px-4 py-2.5 rounded-xl bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-extrabold flex items-center gap-1.5 min-h-[44px]"
              >
                <Edit3 className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => deleteNote(n.id)}
                className="px-4 py-2.5 rounded-xl bg-rose-950 text-rose-300 border border-rose-800 text-xs font-extrabold flex items-center gap-1.5 min-h-[44px]"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl p-7 space-y-5 text-white shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-extrabold text-lg sm:text-xl">{editingNote ? "Edit Note Package" : "Add New Note Package"}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div>
                <label className="block text-slate-300 mb-1.5 font-extrabold">Title (Marathi / English)</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. MPSC GS Complete Revision Notes 2026"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold focus:ring-2 focus:ring-indigo-500 text-sm min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1.5 font-extrabold">Target Exam Category</label>
                  <select
                    value={formExam}
                    onChange={(e) => setFormExam(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold focus:ring-2 focus:ring-indigo-500 text-sm min-h-[44px]"
                  >
                    {exams.map((ex) => (
                      <option key={ex.id} value={ex.id}>{ex.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1.5 font-extrabold">Subject / Field</label>
                  <input
                    type="text"
                    required
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    placeholder="e.g. Polity & History"
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold focus:ring-2 focus:ring-indigo-500 text-sm min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1.5 font-extrabold">Detailed Description</label>
                <textarea
                  rows={3}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Comprehensive coverage details..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1.5 font-extrabold">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-extrabold text-sm min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1.5 font-extrabold">Original (₹)</label>
                  <input
                    type="number"
                    required
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-extrabold text-sm min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1.5 font-extrabold">Page Count</label>
                  <input
                    type="number"
                    required
                    value={formPages}
                    onChange={(e) => setFormPages(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-extrabold text-sm min-h-[44px]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-800 text-slate-300 font-extrabold rounded-xl text-sm min-h-[44px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 text-white font-black rounded-xl shadow-lg shadow-indigo-600/30 text-sm min-h-[44px]"
                >
                  Save Note Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PDF Sample Viewer Modal */}
      {previewNote && (
        <PDFPreviewModal
          note={previewNote}
          isOpen={!!previewNote}
          onClose={() => setPreviewNote(null)}
        />
      )}
    </div>
  );
}
