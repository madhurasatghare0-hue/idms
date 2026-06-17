// src/pages/Communication/Dashboard.jsx
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const statCards = [
  { label: "Total Sent",      value: "84,291", color: "text-orange-600", sub: "All channels combined",  subColor: "text-stone-400" },
  { label: "SMS Sent",        value: "52,140", color: "text-blue-600",   sub: "+8% vs last month",      subColor: "text-blue-400"  },
  { label: "WhatsApp Sent",   value: "24,680", color: "text-green-600",  sub: "92% delivery rate",      subColor: "text-green-500" },
  { label: "Emails Sent",     value: "7,471",  color: "text-purple-600", sub: "68% open rate",          subColor: "text-purple-400"},
];

const channelData = [
  { name: "SMS",      value: 52140, color: "#378ADD" },
  { name: "WhatsApp", value: 24680, color: "#1D9E75" },
  { name: "Email",    value: 7471,  color: "#7F77DD" },
];

const weeklyData = [
  { day: "Mon", sms: 8200, whatsapp: 3800, email: 1200 },
  { day: "Tue", sms: 7400, whatsapp: 4200, email: 980  },
  { day: "Wed", sms: 9100, whatsapp: 3600, email: 1400 },
  { day: "Thu", sms: 6800, whatsapp: 4800, email: 1100 },
  { day: "Fri", sms: 8600, whatsapp: 3900, email: 1300 },
  { day: "Sat", sms: 5400, whatsapp: 2800, email: 740  },
  { day: "Sun", sms: 3200, whatsapp: 1800, email: 420  },
];

const campaigns = [
  { id: "CMP001", name: "Flood Alert — Virar",    channel: "SMS",      sent: "12,400", status: "Completed", date: "10 Jun 2025" },
  { id: "CMP002", name: "Vaccination Drive",       channel: "WhatsApp", sent: "8,200",  status: "Active",    date: "09 Jun 2025" },
  { id: "CMP003", name: "Budget Announcement",     channel: "Email",    sent: "3,100",  status: "Completed", date: "08 Jun 2025" },
  { id: "CMP004", name: "Road Work Notice",        channel: "SMS",      sent: "6,800",  status: "Active",    date: "07 Jun 2025" },
];

const channelStyle = {
  SMS:      "bg-blue-50 text-blue-600",
  WhatsApp: "bg-green-50 text-green-700",
  Email:    "bg-purple-50 text-purple-600",
};

const statusStyle = {
  Active:    "bg-orange-50 text-orange-600",
  Completed: "bg-green-50 text-green-700",
  Draft:     "bg-stone-100 text-stone-500",
};

export default function Dashboard() {
  return (
    <div className="space-y-5">

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-orange-100 hover:border-orange-200 transition-colors">
            <p className="text-xs text-stone-400 mb-2">{s.label}</p>
            <h2 className={`text-3xl font-semibold ${s.color}`}>{s.value}</h2>
            <p className={`text-[11px] mt-2 ${s.subColor}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Weekly bar chart */}
        <div className="bg-white rounded-2xl p-5 border border-orange-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-stone-800">Weekly messages by channel</p>
            <span className="text-[11px] text-orange-400">This week ↗</span>
          </div>
          <div className="flex gap-4 mb-3">
            {[["#378ADD","SMS"],["#1D9E75","WhatsApp"],["#7F77DD","Email"]].map(([c,l]) => (
              <span key={l} className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: c }} />
                {l}
              </span>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData} barSize={10}>
              <CartesianGrid strokeDasharray="3 3" stroke="#FFF7ED" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "0.5px solid #FFE4C4" }} />
              <Bar dataKey="sms"      fill="#378ADD" radius={[4, 4, 0, 0]} name="SMS"      />
              <Bar dataKey="whatsapp" fill="#1D9E75" radius={[4, 4, 0, 0]} name="WhatsApp" />
              <Bar dataKey="email"    fill="#7F77DD" radius={[4, 4, 0, 0]} name="Email"    />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Channel distribution pie */}
        <div className="bg-white rounded-2xl p-5 border border-orange-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-stone-800">Channel distribution</p>
            <span className="text-[11px] text-orange-400">This month ↗</span>
          </div>
          <div className="flex gap-4 mb-3">
            {channelData.map((d) => (
              <span key={d.name} className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: d.color }} />
                {d.name}
              </span>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={channelData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {channelData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "0.5px solid #FFE4C4" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Campaigns table */}
      <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-orange-50">
          <h2 className="text-sm font-medium text-stone-800">Recent campaigns</h2>
          <span className="text-[11px] text-orange-400 cursor-pointer">View all ↗</span>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-orange-50">
              {["ID", "Campaign", "Channel", "Sent", "Status", "Date"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, i) => (
              <tr key={c.id} className={`border-b border-orange-50 hover:bg-orange-50/40 transition-colors ${i === campaigns.length - 1 ? "border-b-0" : ""}`}>
                <td className="px-5 py-3 font-medium text-orange-600">{c.id}</td>
                <td className="px-5 py-3 text-stone-700">{c.name}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium ${channelStyle[c.channel]}`}>{c.channel}</span>
                </td>
                <td className="px-5 py-3 text-stone-600 font-medium">{c.sent}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium ${statusStyle[c.status]}`}>{c.status}</span>
                </td>
                <td className="px-5 py-3 text-stone-400">{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}