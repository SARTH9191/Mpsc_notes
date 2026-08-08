import React from "react";
import { useData } from "../../context/DataContext";
import { Users, ShieldCheck, CreditCard } from "lucide-react";

export function AdminUsersPage() {
  const { users } = useData();

  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <h2 className="text-xl sm:text-2xl font-black text-white">Registered Student Users</h2>
        <p className="text-sm text-slate-300 font-semibold mt-1">Manage user accounts, view total purchases, and account activity.</p>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-200">
            <thead className="bg-slate-950 text-slate-300 font-black uppercase tracking-wider text-xs border-b border-slate-800">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Purchases</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/60 font-semibold">
                  <td className="p-4 font-extrabold text-white flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow">
                      {u.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-base">{u.name}</span>
                    {u.role === "admin" && (
                      <span className="text-[10px] uppercase font-black bg-indigo-950 text-indigo-400 border border-indigo-800 px-2 py-0.5 rounded-md">
                        Admin
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-slate-300 font-medium">{u.email}</td>
                  <td className="p-4 font-black text-white">{u.purchasesCount} Notes</td>
                  <td className="p-4 font-black text-emerald-400 text-base">₹{u.totalSpent}</td>
                  <td className="p-4 text-slate-400 font-mono text-xs font-bold">{u.joinedDate}</td>
                  <td className="p-4">
                    <span className="bg-emerald-950 text-emerald-400 px-3 py-1 rounded-lg text-xs font-black border border-emerald-800">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function AdminPaymentsPage() {
  const { orders } = useData();

  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <h2 className="text-xl sm:text-2xl font-black text-white">Payment Gateway Logs</h2>
        <p className="text-sm text-slate-300 font-semibold mt-1">Real-time payment audit trails, UPI transactions, and Razorpay logs.</p>
      </div>

      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-200">
            <thead className="bg-slate-950 text-slate-300 font-black uppercase tracking-wider text-xs border-b border-slate-800">
              <tr>
                <th className="p-4">Txn ID</th>
                <th className="p-4">User</th>
                <th className="p-4">Item Title</th>
                <th className="p-4">Method</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-800/60 font-semibold">
                  <td className="p-4 font-mono font-bold text-indigo-400">TXN-{o.id.replace("EV-", "")}</td>
                  <td className="p-4 text-white font-bold">{o.customerName}</td>
                  <td className="p-4 text-slate-300 max-w-[200px] truncate">{o.noteTitle}</td>
                  <td className="p-4 font-bold text-slate-300">{o.paymentMethod}</td>
                  <td className="p-4 font-black text-white text-base">₹{o.amount}</td>
                  <td className="p-4">
                    <span className="bg-emerald-950 text-emerald-400 px-3 py-1 rounded-lg text-xs font-black border border-emerald-800">
                      Success
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
