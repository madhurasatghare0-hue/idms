import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";

const statCards = [
  { label: "Total Voters",     value: "2,84,120", color: "text-orange-600", sub: "Registered in constituency", subColor: "text-stone-400" },
  { label: "Volunteers",       value: "1,248",    color: "text-green-600",  sub: "+84 joined this month",      subColor: "text-green-500" },
  { label: "Events Planned",   value: "36",       color: "text-blue-600",   sub: "Next 30 days",               subColor: "text-blue-400"  },
  { label: "Digital Reach",    value: "1.2L",     color: "text-purple-600", sub: "Across all platforms",       subColor: "text-purple-400"},
];

const engagementData = [
  { month: "Jan", reach: 18000 },
  { month: "Feb", reach: 24000 },
  { month: "Mar", reach: 31000 },
  { month: "Apr", reach: 28000 },
  { month: "May", reach: 42000 },
  { month: "Jun", reach: 38000 },
];

const boothData = [
  { booth: "Booth 1", voters: 1240 },
  { booth: "Booth 2", voters: 980  },
  { booth: "Booth 3", voters: 1480 },
  { booth: "Booth 4", voters: 760  },
  { booth: "Booth 5", voters: 1120 },
];

const events = [
  { id: "EVT001", name: "Jan Sabha — Virar West",  type: "Public Meeting", volunteers: 24, date: "15 Jun 2025", status: "Upcoming"   },
  { id: "EVT002", name: "Door-to-Door Campaign",    type: "Campaign",       volunteers: 86, date: "12 Jun 2025", status: "Active"     },
  { id: "EVT003", name: "Youth Voter Registration", type: "Registration",   volunteers: 18, date: "10 Jun 2025", status: "Completed"  },
  { id: "EVT004", name: "Booth Awareness Drive",    type: "Awareness",      volunteers: 42, date: "08 Jun 2025", status: "Completed"  },
];

const typeStyle   = { "Public Meeting": "bg-blue-50 text-blue-600", Campaign: "bg-orange-50 text-orange-600", Registration: "bg-purple-50 text-purple-600", Awareness: "bg-green-50 text-green-700" };
const statusStyle = { Upcoming: "bg-yellow-50 text-yellow-700", Active: "bg-orange-50 text-orange-600", Completed: "bg-green-50 text-green-700" };

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

        {/* Digital reach area chart */}
        <div className="bg-white rounded-2xl p-5 border border-orange-100">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-stone-800">Digital reach trend</p>
            <span className="text-[11px] text-orange-400">Last 6 months ↗</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={engagementData}>
              <defs>
                <linearGradient id="voterGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#7F77DD" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#7F77DD" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#FFF7ED" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "0.5px solid #FFE4C4" }} formatter={(v) => [v.toLocaleString(), "Reach"]} />
              <Area type="monotone" dataKey="reach" stroke="#7F77DD" strokeWidth={2} fill="url(#voterGrad)" dot={{ r: 3, fill: "#7F77DD" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Booth-wise voter bar chart */}
        <div className="bg-white rounded-2xl p-5 border border-orange-100">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-stone-800">Booth-wise voter count</p>
            <span className="text-[11px] text-orange-400">Top 5 booths ↗</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={boothData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#FFF7ED" />
              <XAxis dataKey="booth" tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "0.5px solid #FFE4C4" }} />
              <Bar dataKey="voters" fill="#EA580C" radius={[4, 4, 0, 0]} name="Voters" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Events table */}
      <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-orange-50">
          <h2 className="text-sm font-medium text-stone-800">Upcoming & recent events</h2>
          <span className="text-[11px] text-orange-400 cursor-pointer">View all ↗</span>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-orange-50">
              {["ID", "Event", "Type", "Volunteers", "Date", "Status"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.map((e, i) => (
              <tr key={e.id} className={`border-b border-orange-50 hover:bg-orange-50/40 transition-colors ${i === events.length - 1 ? "border-b-0" : ""}`}>
                <td className="px-5 py-3 font-medium text-orange-600">{e.id}</td>
                <td className="px-5 py-3 text-stone-700">{e.name}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium ${typeStyle[e.type]}`}>{e.type}</span>
                </td>
                <td className="px-5 py-3 text-stone-600">{e.volunteers} volunteers</td>
                <td className="px-5 py-3 text-stone-400">{e.date}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium ${statusStyle[e.status]}`}>{e.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}