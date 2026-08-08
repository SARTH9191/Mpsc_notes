import React from "react";
import { useData } from "../../context/DataContext";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { DollarSign, ShoppingBag, Users, BookOpen, TrendingUp, CheckCircle2 } from "lucide-react";

export function AdminDashboardPage() {
  const { notes, orders, users, advertisements } = useData();

  const totalRevenue = orders.reduce((acc, o) => (o.status === "Paid" ? acc + o.amount : acc), 124850);
  const totalOrdersCount = orders.length + 418;
  const totalUsersCount = users.length + 3832;
  const totalNotesCount = notes.length + 114;

  const chartData = [
    { name: "Mon", revenue: 14200, orders: 48 },
    { name: "Tue", revenue: 18500, orders: 62 },
    { name: "Wed", revenue: 16800, orders: 55 },
    { name: "Thu", revenue: 22400, orders: 74 },
    { name: "Fri", revenue: 19600, orders: 68 },
    { name: "Sat", revenue: 25800, orders: 88 },
    { name: "Sun", revenue: 27550, orders: 95 }
  ];

  const topNotesData = [
    { name: "MPSC GS", sales: 428 },
    { name: "UPSC Polity", sales: 612 },
    { name: "SSC Maths", sales: 389 },
    { name: "NEET Bio", sales: 890 },
    { name: "Police GK", sales: 512 }
  ];

  return (
    <div className="space-y-8">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-sm font-extrabold uppercase tracking-wider">Total Revenue</span>
            <DollarSign className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white">₹{totalRevenue.toLocaleString()}</div>
          <div className="text-xs sm:text-sm text-emerald-400 font-bold flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" /> +14.2% from last week
          </div>
        </div>

        <div className="bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-sm font-extrabold uppercase tracking-wider">Total Orders</span>
            <ShoppingBag className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white">{totalOrdersCount}</div>
          <div className="text-xs sm:text-sm text-blue-400 font-bold">98.4% payment conversion</div>
        </div>

        <div className="bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-sm font-extrabold uppercase tracking-wider">Registered Users</span>
            <Users className="w-6 h-6 text-indigo-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white">{totalUsersCount.toLocaleString()}</div>
          <div className="text-xs sm:text-sm text-indigo-400 font-bold">+124 new students today</div>
        </div>

        <div className="bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-sm font-extrabold uppercase tracking-wider">Active Notes</span>
            <BookOpen className="w-6 h-6 text-amber-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white">{totalNotesCount}</div>
          <div className="text-xs sm:text-sm text-amber-400 font-bold">10 Exam Categories</div>
        </div>
      </div>

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Revenue Trend Area Chart */}
        <div className="lg:col-span-7 bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-white text-lg sm:text-xl">Weekly Revenue & Order Trends</h3>
            <span className="text-xs sm:text-sm text-slate-400 font-mono font-bold">Last 7 Days</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={13} />
                <YAxis stroke="#94a3b8" fontSize={13} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Selling Notes Bar Chart */}
        <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-5">
          <h3 className="font-black text-white text-lg sm:text-xl">Top-Selling Study Materials</h3>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topNotesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} interval={0} />
                <YAxis stroke="#94a3b8" fontSize={13} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '14px', fontWeight: 'bold' }}
                />
                <Bar dataKey="sales" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recent Orders Log Table */}
      <div className="bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-5">
        <h3 className="font-black text-white text-lg sm:text-xl">Recent Transactions Log</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-200">
            <thead className="bg-slate-950 text-slate-300 font-black uppercase tracking-wider text-xs border-b border-slate-800">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Study Note Title</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.slice(0, 5).map((o) => (
                <tr key={o.id} className="hover:bg-slate-800/60 font-semibold">
                  <td className="p-4 font-mono font-bold text-indigo-400">{o.id}</td>
                  <td className="p-4 text-white font-bold">{o.customerName}</td>
                  <td className="p-4 text-slate-300 max-w-[220px] truncate">{o.noteTitle}</td>
                  <td className="p-4 font-bold text-white">₹{o.amount}</td>
                  <td className="p-4">
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded-md text-xs font-black">
                      {o.status}
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
