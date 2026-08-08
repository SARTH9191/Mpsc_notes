import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { Search, ShoppingBag, Eye } from "lucide-react";

export function AdminOrdersPage() {
  const { orders } = useData();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewOrder, setViewOrder] = useState(null);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.noteTitle.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Order Management</h2>
          <p className="text-sm text-slate-300 font-semibold mt-1">Track purchase history, transactions, and download fulfillment.</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-extrabold text-slate-200 min-h-[48px]"
          >
            <option value="all">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by Order ID, Customer name or Note title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-sm font-bold text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[48px]"
        />
      </div>

      {/* Desktop Table View (>= md) with Larger Fonts */}
      <div className="hidden md:block bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-200">
            <thead className="bg-slate-950 text-slate-300 font-black uppercase tracking-wider text-xs border-b border-slate-800">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Study Material</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Method</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-800/60 font-semibold">
                  <td className="p-4 font-mono font-black text-indigo-400">{o.id}</td>
                  <td className="p-4">
                    <div className="font-extrabold text-white">{o.customerName}</div>
                    <div className="text-xs text-slate-400">{o.customerEmail}</div>
                  </td>
                  <td className="p-4 font-bold max-w-[240px] truncate text-slate-200">{o.noteTitle}</td>
                  <td className="p-4 font-black text-white text-base">₹{o.amount}</td>
                  <td className="p-4 text-slate-300 font-bold">{o.paymentMethod}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-black ${
                        o.status === "Paid"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : o.status === "Pending"
                          ? "bg-amber-950 text-amber-400 border border-amber-800"
                          : "bg-rose-950 text-rose-400 border border-rose-800"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 font-mono text-xs font-bold">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Responsive Order Cards View (< md) */}
      <div className="md:hidden space-y-4">
        {filteredOrders.map((o) => (
          <div key={o.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3.5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-black text-indigo-400">{o.id}</span>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-black ${
                  o.status === "Paid"
                    ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                    : o.status === "Pending"
                    ? "bg-amber-950 text-amber-400 border border-amber-800"
                    : "bg-rose-950 text-rose-400 border border-rose-800"
                }`}
              >
                {o.status}
              </span>
            </div>

            <div>
              <h4 className="font-extrabold text-white text-base">{o.customerName}</h4>
              <p className="text-sm text-slate-300 mt-1 font-semibold">{o.noteTitle}</p>
            </div>

            <div className="flex items-center justify-between text-sm text-slate-300 border-t border-b border-slate-800/80 py-2.5">
              <div>
                <span className="text-slate-400 block text-xs font-bold">Amount</span>
                <strong className="text-white font-black text-base">₹{o.amount}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-xs font-bold">Payment</span>
                <strong className="text-slate-200 font-bold">{o.paymentMethod}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-xs font-bold">Date</span>
                <strong className="text-slate-300 text-xs font-mono font-bold">{o.date}</strong>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setViewOrder(o)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-extrabold flex items-center gap-1.5 min-h-[44px]"
              >
                <Eye className="w-4 h-4" /> View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Details Modal */}
      {viewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-7 space-y-5 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-black text-lg">Order Details ({viewOrder.id})</h3>
              <button onClick={() => setViewOrder(null)} className="text-slate-400 hover:text-white p-1">✕</button>
            </div>

            <div className="space-y-3 text-sm text-slate-200 font-semibold">
              <div className="flex justify-between">
                <span className="text-slate-400">Customer Name:</span>
                <strong className="text-white font-black">{viewOrder.customerName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Customer Email:</span>
                <strong className="text-white">{viewOrder.customerEmail}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Item Title:</span>
                <strong className="text-white text-right max-w-[220px] truncate">{viewOrder.noteTitle}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Amount:</span>
                <strong className="text-emerald-400 font-black text-base">₹{viewOrder.amount}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Method:</span>
                <strong className="text-white">{viewOrder.paymentMethod}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Transaction Status:</span>
                <span className="text-emerald-400 font-black">{viewOrder.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Order Date:</span>
                <span className="font-mono text-slate-300 font-bold">{viewOrder.date}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setViewOrder(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-extrabold rounded-xl text-sm min-h-[44px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
