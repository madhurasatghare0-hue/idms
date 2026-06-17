// src/pages/Funds/Dashboard.jsx
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
  AreaChart, Area
} from "recharts";

const statCards = [
  { label: "Total Budget",    value: "₹48.5Cr", color: "text-orange-600", sub: "FY 2024–25",          subColor: "text-stone-400"  },
  { label: "Allocated",       value: "₹36.2Cr", color: "text-blue-600",   sub: "74.6% of total",      subColor: "text-blue-400"   },
  { label: "Utilized",        value: "₹28.9Cr", color: "text-green-600",  sub: "79.8% of allocated",  subColor: "text-green-500"  },
  { label: "Remaining",       value: "₹7.3Cr",  color: "text-red-500",    sub: "To be utilized",      subColor: "text-red-400"    },
];

const deptData = [
  { dept: "Roads",      allocated: 12.5, utilized: 10.2 },
  { dept: "Water",      allocated: 8.3,  utilized: 7.1  },
  { dept: "Health",     allocated: 6.8,  utilized: 5.4  },
  { dept: "Education",  allocated: 5.2,  utilized: 4.8  },
  { dept: "Power",      allocated: 3.4,  utilized: 1.4  },
];

const trendData = [
  { month: "Jan", amount: 3.2 },
  { month: "Feb", amount: 4.1 },
  { month: "Mar", amount: 5.8 },
  { month: "Apr", amount: 4.5 },
  { month: "May", amount: 6.2 },
  { month: "Jun", amount: 5.1 },
];

const projects = [
  { id: "PRJ001", name: "Virar Road Widening",   dept: "Roads",     budget: "₹4.2Cr", used: "₹3.1Cr", status: "In Progress" },
  { id: "PRJ002", name: "Water Pipeline Phase 2", dept: "Water",     budget: "₹2.8Cr", used: "₹2.8Cr", status: "Completed"   },
  { id: "PRJ003", name: "School Renovation",      dept: "Education", budget: "₹1.5Cr", used: "₹0.9Cr", status: "In Progress" },
  { id: "PRJ004", name: "Solar Street Lights",    dept: "Power",     budget: "₹0.8Cr", used: "₹0.2Cr", status: "Pending"     },
];

const statusStyle = {
  "In Progress": "bg-yellow-50 text-yellow-700",
  Completed:     "bg-green-50 text-green-700",
  Pending:       "bg-red-50 text-red-600",
};

export default function Dashboard() {
  return (
    <div className="space-y-5">

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-5 border border-orange-100 hover:border-orange-200 transition-colors"
          >
            <p className="text-xs text-stone-400 mb-2">{s.label}</p>
            <h2 className={`text-3xl font-semibold ${s.color}`}>{s.value}</h2>
            <p className={`text-[11px] mt-2 ${s.subColor}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Department bar chart */}
        <div className="bg-white rounded-2xl p-5 border border-orange-100">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-stone-800">Department-wise allocation vs utilization</p>
            <span className="text-[11px] text-orange-400">in Crores ↗</span>
          </div>
          <div className="flex gap-4 mb-3">
            {[["#EA580C", "Allocated"], ["#86EFAC", "Utilized"]].map(([c, l]) => (
              <span key={l} className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: c }} />
                {l}
              </span>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={deptData} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#FFF7ED" />
              <XAxis dataKey="dept" tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} unit="Cr" />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "0.5px solid #FFE4C4" }} />
              <Bar dataKey="allocated" fill="#EA580C" radius={[4, 4, 0, 0]} name="Allocated" />
              <Bar dataKey="utilized"  fill="#86EFAC" radius={[4, 4, 0, 0]} name="Utilized"  />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly spend area chart */}
        <div className="bg-white rounded-2xl p-5 border border-orange-100">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-stone-800">Monthly expenditure trend</p>
            <span className="text-[11px] text-orange-400 cursor-pointer">Last 6 months ↗</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="fundGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#EA580C" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#EA580C" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#FFF7ED" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} unit="Cr" />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "0.5px solid #FFE4C4" }} formatter={(v) => [`₹${v}Cr`, "Spent"]} />
              <Area type="monotone" dataKey="amount" stroke="#EA580C" strokeWidth={2} fill="url(#fundGrad)" dot={{ r: 3, fill: "#EA580C" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Projects table */}
      <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-orange-50">
          <h2 className="text-sm font-medium text-stone-800">Active projects</h2>
          <span className="text-[11px] text-orange-400 cursor-pointer">View all ↗</span>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-orange-50">
              {["ID", "Project", "Department", "Budget", "Utilized", "Status"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <tr key={p.id} className={`border-b border-orange-50 hover:bg-orange-50/40 transition-colors ${i === projects.length - 1 ? "border-b-0" : ""}`}>
                <td className="px-5 py-3 font-medium text-orange-600">{p.id}</td>
                <td className="px-5 py-3 text-stone-700">{p.name}</td>
                <td className="px-5 py-3 text-stone-500">{p.dept}</td>
                <td className="px-5 py-3 font-medium text-stone-700">{p.budget}</td>
                <td className="px-5 py-3 text-green-600 font-medium">{p.used}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium ${statusStyle[p.status]}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}