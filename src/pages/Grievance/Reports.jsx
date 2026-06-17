// src/pages/Grievance/Analytics.jsx
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
  AreaChart, Area,
} from "recharts";
import { TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle, Minus } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const monthlyTrend = [
  { month: "Jan", filed: 98,  resolved: 74,  pending: 24 },
  { month: "Feb", filed: 112, resolved: 89,  pending: 23 },
  { month: "Mar", filed: 134, resolved: 102, pending: 32 },
  { month: "Apr", filed: 121, resolved: 95,  pending: 26 },
  { month: "May", filed: 148, resolved: 118, pending: 30 },
  { month: "Jun", filed: 139, resolved: 109, pending: 30 },
];

const departmentData = [
  { name: "Public Works",   value: 312, color: "#EA580C" },
  { name: "Water Supply",   value: 248, color: "#FB923C" },
  { name: "Health",         value: 187, color: "#FDBA74" },
  { name: "Revenue",        value: 156, color: "#FED7AA" },
  { name: "Education",      value: 134, color: "#FFEDD5" },
  { name: "Other",          value: 98,  color: "#D6D3D1" },
];

const districtBar = [
  { district: "Thane",      High: 42, Medium: 28, Low: 14 },
  { district: "Pune",       High: 38, Medium: 31, Low: 18 },
  { district: "Mumbai",     High: 55, Medium: 22, Low: 9  },
  { district: "Nashik",     High: 29, Medium: 24, Low: 20 },
  { district: "Nagpur",     High: 34, Medium: 19, Low: 11 },
  { district: "Kolhapur",   High: 18, Medium: 22, Low: 15 },
  { district: "Satara",     High: 21, Medium: 16, Low: 8  },
  { district: "Ratnagiri",  High: 27, Medium: 14, Low: 12 },
];

const resolutionTime = [
  { month: "Jan", avgDays: 12 },
  { month: "Feb", avgDays: 10 },
  { month: "Mar", avgDays: 14 },
  { month: "Apr", avgDays: 9  },
  { month: "May", avgDays: 8  },
  { month: "Jun", avgDays: 7  },
];

const kpis = [
  {
    label:    "Resolution Rate",
    value:    "78.4%",
    change:   "+3.2%",
    positive: true,
    icon:     CheckCircle,
    color:    "text-green-600",
    bg:       "bg-green-50",
  },
  {
    label:    "Avg Resolution Time",
    value:    "7 days",
    change:   "-2 days",
    positive: true,
    icon:     Clock,
    color:    "text-orange-600",
    bg:       "bg-orange-50",
  },
  {
    label:    "High Priority Pending",
    value:    "47",
    change:   "+5",
    positive: false,
    icon:     AlertCircle,
    color:    "text-red-500",
    bg:       "bg-red-50",
  },
  {
    label:    "Monthly Filings",
    value:    "139",
    change:   "-6.1%",
    positive: true,
    icon:     TrendingDown,
    color:    "text-blue-600",
    bg:       "bg-blue-50",
  },
];

// ── Custom Tooltip ────────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-orange-100 rounded-xl shadow-lg p-3 text-xs">
      <p className="font-semibold text-stone-700 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          {p.name}: <span className="font-semibold">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

// ── Pie Label ─────────────────────────────────────────────────────────────────

function renderCustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent < 0.05) return null;
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function Analytics() {
  return (
    <div className="space-y-5">

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-white rounded-2xl border border-orange-100 p-5 hover:border-orange-200 transition-colors">
              <div className="flex items-start justify-between">
                <p className="text-xs text-stone-400 leading-tight">{k.label}</p>
                <div className={`w-8 h-8 rounded-lg ${k.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={14} className={k.color} />
                </div>
              </div>
              <p className={`text-3xl font-semibold mt-2 ${k.color}`}>{k.value}</p>
              <div className={`flex items-center gap-1 mt-1.5 text-[11px] font-medium ${k.positive ? "text-green-500" : "text-red-400"}`}>
                {k.positive ? <TrendingUp size={11} /> : <TrendingUp size={11} className="rotate-180" />}
                {k.change} vs last month
              </div>
            </div>
          );
        })}
      </div>

      {/* Monthly trend area chart */}
      <div className="bg-white rounded-2xl border border-orange-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-stone-800">Complaint Trend</p>
            <p className="text-[11px] text-stone-400 mt-0.5">Filed vs Resolved vs Pending — last 6 months</p>
          </div>
          <div className="flex gap-4">
            {[["#EA580C", "Filed"], ["#22C55E", "Resolved"], ["#F59E0B", "Pending"]].map(([c, l]) => (
              <span key={l} className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: c }} />
                {l}
              </span>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={monthlyTrend}>
            <defs>
              <linearGradient id="gFiled"    x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#EA580C" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#EA580C" stopOpacity={0.01} />
              </linearGradient>
              <linearGradient id="gResolved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#22C55E" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0.01} />
              </linearGradient>
              <linearGradient id="gPending"  x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#F59E0B" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#FFF7ED" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="filed"    stroke="#EA580C" fill="url(#gFiled)"    strokeWidth={2} name="Filed"    />
            <Area type="monotone" dataKey="resolved" stroke="#22C55E" fill="url(#gResolved)" strokeWidth={2} name="Resolved" />
            <Area type="monotone" dataKey="pending"  stroke="#F59E0B" fill="url(#gPending)"  strokeWidth={2} name="Pending"  />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Two-col: Pie + Resolution time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Department pie */}
        <div className="bg-white rounded-2xl border border-orange-100 p-5">
          <div className="mb-4">
            <p className="text-sm font-semibold text-stone-800">Complaints by Department</p>
            <p className="text-[11px] text-stone-400 mt-0.5">Distribution across government departments</p>
          </div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="55%" height={200}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {departmentData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {departmentData.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                    <span className="text-xs text-stone-500">{d.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-stone-700">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Avg resolution time */}
        <div className="bg-white rounded-2xl border border-orange-100 p-5">
          <div className="mb-4">
            <p className="text-sm font-semibold text-stone-800">Avg. Resolution Time</p>
            <p className="text-[11px] text-stone-400 mt-0.5">Average days to resolve complaints by month</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={resolutionTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#FFF7ED" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} unit=" d" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="avgDays"
                stroke="#EA580C"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#EA580C", strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#EA580C" }}
                name="Avg Days"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-3 flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-2.5">
            <TrendingDown size={14} className="text-green-600" />
            <p className="text-xs text-green-700 font-medium">Improving — down from 12 days in Jan to 7 days in Jun</p>
          </div>
        </div>
      </div>

      {/* District stacked bar */}
      <div className="bg-white rounded-2xl border border-orange-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-stone-800">District-wise Priority Breakdown</p>
            <p className="text-[11px] text-stone-400 mt-0.5">High / Medium / Low priority complaints per district</p>
          </div>
          <div className="flex gap-4">
            {[["#EF4444", "High"], ["#F97316", "Medium"], ["#A8A29E", "Low"]].map(([c, l]) => (
              <span key={l} className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: c }} />
                {l}
              </span>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={districtBar} barSize={18}>
            <CartesianGrid strokeDasharray="3 3" stroke="#FFF7ED" />
            <XAxis dataKey="district" tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="High"   stackId="a" fill="#EF4444" name="High"   radius={[0, 0, 0, 0]} />
            <Bar dataKey="Medium" stackId="a" fill="#F97316" name="Medium" />
            <Bar dataKey="Low"    stackId="a" fill="#A8A29E" name="Low"    radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}