// src/pages/Grievance/Dashboard.jsx
import {
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie
} from "recharts";

const trendData = [
  { month: "Jan", received: 210, resolved: 180 },
  { month: "Feb", received: 185, resolved: 160 },
  { month: "Mar", received: 240, resolved: 210 },
  { month: "Apr", received: 195, resolved: 175 },
  { month: "May", received: 260, resolved: 240 },
  { month: "Jun", received: 230, resolved: 210 },
];

const deptData = [
  { name: "Roads", value: 38, color: "#EA580C" },
  { name: "Water", value: 25, color: "#FB923C" },
  { name: "Power", value: 22, color: "#FDBA74" },
  { name: "Other", value: 15, color: "#FED7AA" },
];

const complaints = [
  { id: "GRV001", citizen: "Rahul Patil",  category: "Roads",       status: "Pending",     priority: "High",   date: "12 Jun 2025" },
  { id: "GRV002", citizen: "Sneha Shah",   category: "Water",       status: "Resolved",    priority: "Medium", date: "11 Jun 2025" },
  { id: "GRV003", citizen: "Amit Kumar",   category: "Electricity", status: "In Progress", priority: "Low",    date: "10 Jun 2025" },
  { id: "GRV004", citizen: "Priya Desai",  category: "Sanitation",  status: "Pending",     priority: "High",   date: "10 Jun 2025" },
];

const statusStyle = {
  Pending:       "bg-red-50 text-red-600",
  Resolved:      "bg-green-50 text-green-700",
  "In Progress": "bg-yellow-50 text-yellow-700",
};

const priorityStyle = {
  High:   "bg-orange-100 text-orange-700",
  Medium: "bg-orange-50 text-orange-500",
  Low:    "bg-stone-100 text-stone-500",
};

const statCards = [
  { label: "Total Complaints", value: "1,542", color: "text-orange-600", sub: "+12% this month",    subColor: "text-green-600" },
  { label: "Pending",          value: "125",   color: "text-red-500",    sub: "8 new today",         subColor: "text-red-400"   },
  { label: "In Progress",      value: "84",    color: "text-yellow-500", sub: "No change",           subColor: "text-stone-400" },
  { label: "Resolved",         value: "1,333", color: "text-green-600",  sub: "86% resolution rate", subColor: "text-green-500" },
];

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

        {/* Line chart */}
        <div className="bg-white rounded-2xl p-5 border border-orange-100">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium text-stone-800">Complaint trend</p>
            <span className="text-[11px] text-orange-400 cursor-pointer">Last 6 months ↗</span>
          </div>
          <div className="flex gap-4 mb-3">
            {[["#EA580C", "Received"], ["#16A34A", "Resolved"]].map(([c, l]) => (
              <span key={l} className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: c }} />
                {l}
              </span>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#FFF7ED" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "0.5px solid #FFE4C4" }} />
              <Line type="monotone" dataKey="received" stroke="#EA580C" strokeWidth={2} dot={{ r: 3, fill: "#EA580C" }} name="Received" />
              <Line type="monotone" dataKey="resolved" stroke="#16A34A" strokeWidth={2} strokeDasharray="4 3" dot={{ r: 3, fill: "#16A34A" }} name="Resolved" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="bg-white rounded-2xl p-5 border border-orange-100">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium text-stone-800">Department distribution</p>
            <span className="text-[11px] text-orange-400 cursor-pointer">View all ↗</span>
          </div>
          <div className="flex gap-3 flex-wrap mb-3">
            {deptData.map((d) => (
              <span key={d.name} className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: d.color }} />
                {d.name} {d.value}%
              </span>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={deptData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {deptData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "0.5px solid #FFE4C4" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent complaints table */}
      <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-orange-50">
          <h2 className="text-sm font-medium text-stone-800">Recent complaints</h2>
          <span className="text-[11px] text-orange-400 cursor-pointer">View all ↗</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-orange-50">
                {["ID", "Citizen", "Category", "Status", "Priority", "Date"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {complaints.map((c, i) => (
                <tr
                  key={c.id}
                  className={`border-b border-orange-50 hover:bg-orange-50/40 transition-colors ${i === complaints.length - 1 ? "border-b-0" : ""}`}
                >
                  <td className="px-5 py-3 font-medium text-orange-600">{c.id}</td>
                  <td className="px-5 py-3 text-stone-700">{c.citizen}</td>
                  <td className="px-5 py-3 text-stone-500">{c.category}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium ${statusStyle[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium ${priorityStyle[c.priority]}`}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-stone-400">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}