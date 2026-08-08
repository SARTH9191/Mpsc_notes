import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { Plus, Edit3, Trash2, Power, Eye, Megaphone, X, ExternalLink } from "lucide-react";

export function AdminAdManagementPage() {
  const { advertisements, addAdvertisement, editAdvertisement, toggleAdStatus, deleteAdvertisement } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState(null);

  // Form State
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [placement, setPlacement] = useState("home_top");
  const [startDate, setStartDate] = useState("2026-01-01");
  const [endDate, setEndDate] = useState("2026-12-31");
  const [status, setStatus] = useState("Active");
  const [advertiser, setAdvertiser] = useState("TestPrep Academy");

  const handleOpenAdd = () => {
    setEditingAd(null);
    setName("");
    setTitle("");
    setDescription("");
    setBannerImage("https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80");
    setTargetUrl("https://example.com/ad");
    setPlacement("home_top");
    setStartDate("2026-01-01");
    setEndDate("2026-12-31");
    setStatus("Active");
    setAdvertiser("TestPrep Academy");
    setModalOpen(true);
  };

  const handleOpenEdit = (ad) => {
    setEditingAd(ad);
    setName(ad.name);
    setTitle(ad.title);
    setDescription(ad.description);
    setBannerImage(ad.bannerImage);
    setTargetUrl(ad.targetUrl);
    setPlacement(ad.placement);
    setStartDate(ad.startDate);
    setEndDate(ad.endDate);
    setStatus(ad.status);
    setAdvertiser(ad.advertiser || "TestPrep Academy");
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const adData = {
      id: editingAd ? editingAd.id : `ad-${Date.now()}`,
      name,
      title,
      description,
      bannerImage,
      targetUrl,
      placement,
      startDate,
      endDate,
      status,
      advertiser,
      impressions: editingAd ? editingAd.impressions : 0,
      clicks: editingAd ? editingAd.clicks : 0,
      ctr: editingAd ? editingAd.ctr : "0.00%"
    };

    if (editingAd) {
      editAdvertisement(adData);
    } else {
      addAdvertisement(adData);
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Advertisement System Manager</h2>
          <p className="text-sm text-slate-300 font-semibold mt-1">Manage direct sponsors, banner placements, and campaign statuses.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-3 bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 min-h-[48px]"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Campaign</span>
        </button>
      </div>

      {/* Desktop Ads Table (>= md) with Larger Font Sizes */}
      <div className="hidden md:block bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-200">
            <thead className="bg-slate-950 text-slate-300 font-black uppercase tracking-wider text-xs border-b border-slate-800">
              <tr>
                <th className="p-4">Campaign Name</th>
                <th className="p-4">Placement</th>
                <th className="p-4">Status</th>
                <th className="p-4">Dates</th>
                <th className="p-4">Impressions</th>
                <th className="p-4">Clicks</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {advertisements.map((ad) => (
                <tr key={ad.id} className="hover:bg-slate-800/60 font-semibold">
                  <td className="p-4 font-extrabold text-white max-w-[220px] truncate">
                    <div className="text-base">{ad.name}</div>
                    <div className="text-xs text-amber-400 font-mono font-bold truncate">{ad.title}</div>
                  </td>
                  <td className="p-4 font-mono text-slate-300">
                    <span className="bg-slate-800 text-slate-200 px-3 py-1 rounded-lg text-xs font-black border border-slate-700">
                      {ad.placement}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-black ${
                        ad.status === "Active"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : ad.status === "Paused"
                          ? "bg-amber-950 text-amber-400 border border-amber-800"
                          : ad.status === "Scheduled"
                          ? "bg-blue-950 text-blue-400 border border-blue-800"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {ad.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300 font-mono text-xs font-bold">
                    {ad.startDate} ~ {ad.endDate}
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-200 text-base">{ad.impressions?.toLocaleString()}</td>
                  <td className="p-4 font-mono font-bold text-amber-300 text-base">{ad.clicks?.toLocaleString()}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => toggleAdStatus(ad.id)}
                        className={`p-2 rounded-xl border transition-colors ${
                          ad.status === "Active"
                            ? "bg-emerald-950 text-emerald-400 border-emerald-800 hover:bg-emerald-900"
                            : "bg-amber-950 text-amber-400 border-amber-800 hover:bg-amber-900"
                        }`}
                        title="Toggle Status"
                      >
                        <Power className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(ad)}
                        className="p-2 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 transition-colors"
                        title="Edit Campaign"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteAdvertisement(ad.id)}
                        className="p-2 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800 transition-colors"
                        title="Delete Campaign"
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

      {/* Mobile Responsive Ad Cards View (< md) */}
      <div className="md:hidden space-y-4">
        {advertisements.map((ad) => (
          <div key={ad.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3.5 shadow-lg">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="bg-slate-800 text-amber-400 px-2.5 py-1 rounded-lg text-xs font-mono font-bold border border-slate-700">
                  {ad.placement}
                </span>
                <h4 className="font-extrabold text-white text-base mt-2">{ad.name}</h4>
                <p className="text-xs text-slate-300 font-semibold">{ad.title}</p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-black shrink-0 ${
                  ad.status === "Active"
                    ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                    : ad.status === "Paused"
                    ? "bg-amber-950 text-amber-400 border border-amber-800"
                    : "bg-slate-800 text-slate-400 border border-slate-700"
                }`}
              >
                {ad.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-slate-300 border-t border-b border-slate-800/80 py-2.5">
              <div>
                <span className="text-slate-400 block text-xs font-bold">Impressions</span>
                <strong className="text-white font-mono font-bold">{ad.impressions?.toLocaleString()}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-xs font-bold">Clicks</span>
                <strong className="text-amber-300 font-mono font-bold">{ad.clicks?.toLocaleString()}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-xs font-bold">CTR</span>
                <strong className="text-emerald-400 font-mono font-bold">{ad.ctr || "0.0%"}</strong>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                onClick={() => toggleAdStatus(ad.id)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-extrabold flex items-center gap-1.5 min-h-[44px]"
              >
                <Power className="w-4 h-4" /> Toggle
              </button>
              <button
                onClick={() => handleOpenEdit(ad)}
                className="px-3.5 py-2 rounded-xl bg-amber-950 text-amber-300 border border-amber-800 text-xs font-extrabold flex items-center gap-1.5 min-h-[44px]"
              >
                <Edit3 className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => deleteAdvertisement(ad.id)}
                className="px-3.5 py-2 rounded-xl bg-rose-950 text-rose-300 border border-rose-800 text-xs font-extrabold flex items-center gap-1.5 min-h-[44px]"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl p-7 space-y-5 text-white shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-extrabold text-lg sm:text-xl">{editingAd ? "Edit Ad Campaign" : "New Ad Campaign"}</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white p-1">✕</button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div>
                <label className="block text-slate-300 mb-1.5 font-extrabold">Campaign Identifier</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. MPSC Special Offer 2026"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold text-sm min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1.5 font-extrabold">Ad Headline Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Join Special Test Series"
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold text-sm min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1.5 font-extrabold">Placement Slot</label>
                  <select
                    value={placement}
                    onChange={(e) => setPlacement(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold text-sm min-h-[44px]"
                  >
                    <option value="home_top">Home Top Banner</option>
                    <option value="home_middle">Home Middle Section</option>
                    <option value="notes_sidebar">Notes Marketplace Sidebar</option>
                    <option value="notes_between">Notes Feed In-between</option>
                    <option value="note_detail_subtle">Note Detail Page Banner</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1.5 font-extrabold">Body Description</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1.5 font-extrabold">Target Redirect URL</label>
                  <input
                    type="text"
                    required
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-sm min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1.5 font-extrabold">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold text-sm min-h-[44px]"
                  >
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Expired">Expired</option>
                  </select>
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
                  className="px-6 py-2.5 bg-amber-600 text-white font-black rounded-xl shadow-lg text-sm min-h-[44px]"
                >
                  Save Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
