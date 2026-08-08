import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { Plus, Edit3, Trash2, X, FolderTree, BookOpen } from "lucide-react";

export function AdminCategoriesPage() {
  const { exams, addCategory, editCategory, deleteCategory } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);

  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleOpenAdd = () => {
    setEditingCat(null);
    setName("");
    setShortName("");
    setCategory("");
    setDescription("");
    setModalOpen(true);
  };

  const handleOpenEdit = (c) => {
    setEditingCat(c);
    setName(c.name);
    setShortName(c.shortName);
    setCategory(c.category);
    setDescription(c.description);
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const catData = {
      id: editingCat ? editingCat.id : `cat-${Date.now()}`,
      name,
      shortName,
      category: category || "Competitive Exam",
      description,
      notesCount: editingCat ? editingCat.notesCount : 0,
      popularity: 90,
      iconName: "BookOpen"
    };

    if (editingCat) {
      editCategory(catData);
    } else {
      addCategory(catData);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Exam Category Management</h2>
          <p className="text-sm text-slate-300 font-semibold mt-1">Organize study materials into exam groups (MPSC, UPSC, SSC, Banking, etc.).</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 min-h-[48px]"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-200">
            <thead className="bg-slate-950 text-slate-300 font-black uppercase tracking-wider text-xs border-b border-slate-800">
              <tr>
                <th className="p-4">Category Name</th>
                <th className="p-4">Short Code</th>
                <th className="p-4">Exam Field</th>
                <th className="p-4">Notes Total</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {exams.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/60 font-semibold">
                  <td className="p-4 font-extrabold text-white text-base">{c.name}</td>
                  <td className="p-4 font-mono font-bold text-indigo-400">{c.shortName}</td>
                  <td className="p-4 text-slate-300">{c.category || "State Exam"}</td>
                  <td className="p-4 font-black text-white">{c.notesCount || 12} Packages</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => handleOpenEdit(c)}
                        className="p-2 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 transition-colors"
                        title="Edit Category"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteCategory(c.id)}
                        className="p-2 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 transition-colors"
                        title="Delete Category"
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-7 space-y-5 text-white shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-extrabold text-lg sm:text-xl">{editingCat ? "Edit Category" : "Add Exam Category"}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white p-1">✕</button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div>
                <label className="block text-slate-300 mb-1.5 font-extrabold">Exam Category Title</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. MPSC Rajyaseva"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold text-sm min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1.5 font-extrabold">Short Code</label>
                  <input
                    type="text"
                    required
                    value={shortName}
                    onChange={(e) => setShortName(e.target.value)}
                    placeholder="e.g. MPSC"
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono font-bold text-sm min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1.5 font-extrabold">Group / Domain</label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. State Public Commission"
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold text-sm min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1.5 font-extrabold">Overview Description</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief exam overview..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold text-sm"
                />
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
