// src/pages/Performance/Dashboard.jsx
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, RadarChart,
  Radar, PolarGrid, PolarAngleAxis,
} from "recharts";
import {
  CheckCircle, Clock, TrendingUp, Users,
  X, MapPin, Star, Briefcase, Calendar,
  ChevronRight, Activity,
} from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────────

const statCards = [
  {
    label: "Total Representatives",
    value: "288",
    color: "text-orange-600",
    bg: "bg-orange-50",
    icon: Users,
    sub: "Ministers + MLAs",
    subColor: "text-stone-400",
  },
  {
    label: "Works Completed",
    value: "1,847",
    color: "text-green-600",
    bg: "bg-green-50",
    icon: CheckCircle,
    sub: "+124 this month",
    subColor: "text-green-500",
  },
  {
    label: "Works Pending",
    value: "342",
    color: "text-red-500",
    bg: "bg-red-50",
    icon: Clock,
    sub: "Requires attention",
    subColor: "text-red-400",
  },
  {
    label: "Avg Performance",
    value: "78.4",
    color: "text-orange-500",
    bg: "bg-orange-50",
    icon: TrendingUp,
    sub: "Out of 100",
    subColor: "text-stone-400",
  },
];

const chiefMinister = {
  id: "DCM001",
  name: "Eknath Shinde",
  role: "Deputy Chief Minister",
  constituency: "Kopri-Pachpakhadi",
  district: "Thane",
  completed: 142,
  pending: 18,
  score: 92,
  attendance: "94%",
  recentActivities: [
    "Reviewed infrastructure development projects",
    "Held public grievance redressal meeting",
    "Inspected ongoing road and metro works",
  ],
};

const ministers = [
  {
    id: "MIN001",
    name: "Uday Samant",
    role: "Minister for Industries",
    constituency: "Ratnagiri",
    district: "Ratnagiri",
    completed: 84,
    pending: 14,
    score: 89,
    attendance: "93%",
    recentActivities: [
      "MIDC expansion review",
      "Industrial investment meeting",
      "Port infrastructure inspection",
    ],
  },

  {
    id: "MIN002",
    name: "Shambhuraj Desai",
    role: "Minister for Public Works",
    constituency: "Patan",
    district: "Satara",
    completed: 79,
    pending: 18,
    score: 85,
    attendance: "91%",
    recentActivities: [
      "Road development review",
      "Bridge inspection",
      "District planning meeting",
    ],
  },

  {
    id: "MIN003",
    name: "Deepak Kesarkar",
    role: "Minister for School Education",
    constituency: "Sawantwadi",
    district: "Sindhudurg",
    completed: 76,
    pending: 16,
    score: 83,
    attendance: "89%",
    recentActivities: [
      "School modernization review",
      "Digital classroom initiative",
      "Teachers interaction",
    ],
  },

  {
    id: "MIN004",
    name: "Sanjay Rathod",
    role: "Minister for Food & Drug Administration",
    constituency: "Digras",
    district: "Yavatmal",
    completed: 72,
    pending: 20,
    score: 80,
    attendance: "88%",
    recentActivities: [
      "FDA inspection drive",
      "Public health review",
      "Consumer protection meeting",
    ],
  },
];

const mlas = [
  {
    id: "MLA001",
    name: "Bharat Gogawale",
    constituency: "Mahad",
    district: "Raigad",
    completed: 71,
    pending: 9,
    score: 90,
    attendance: "95%",
    recentActivities: [
      "Road inspection",
      "Public grievance camp",
      "Water project review",
    ],
  },

  {
    id: "MLA002",
    name: "Sada Sarvankar",
    constituency: "Mahim",
    district: "Mumbai",
    completed: 68,
    pending: 12,
    score: 86,
    attendance: "92%",
    recentActivities: [
      "Health camp",
      "Road widening review",
      "Citizen meeting",
    ],
  },

  {
    id: "MLA003",
    name: "Sanjay Shirsat",
    constituency: "Aurangabad West",
    district: "Chhatrapati Sambhajinagar",
    completed: 64,
    pending: 15,
    score: 82,
    attendance: "90%",
    recentActivities: [
      "Smart city review",
      "Public hearing",
      "Infrastructure planning",
    ],
  },

  {
    id: "MLA004",
    name: "Abdul Sattar",
    constituency: "Sillod",
    district: "Chhatrapati Sambhajinagar",
    completed: 59,
    pending: 18,
    score: 78,
    attendance: "86%",
    recentActivities: [
      "Agriculture meeting",
      "Irrigation review",
      "Village inspection",
    ],
  },

  {
    id: "MLA005",
    name: "Pratap Sarnaik",
    constituency: "Ovala-Majiwada",
    district: "Thane",
    completed: 74,
    pending: 10,
    score: 91,
    attendance: "96%",
    recentActivities: [
      "Metro connectivity review",
      "Citizen outreach",
      "Road development",
    ],
  },

  {
    id: "MLA006",
    name: "Yogesh Kadam",
    constituency: "Dapoli",
    district: "Ratnagiri",
    completed: 60,
    pending: 16,
    score: 79,
    attendance: "88%",
    recentActivities: [
      "Tourism development",
      "Village visit",
      "Coastal project review",
    ],
  },

  {
    id: "MLA007",
    name: "Mahendra Thorve",
    constituency: "Karjat",
    district: "Raigad",
    completed: 57,
    pending: 21,
    score: 75,
    attendance: "84%",
    recentActivities: [
      "Road repair",
      "School inspection",
      "Water supply review",
    ],
  },

  {
    id: "MLA008",
    name: "Tanaji Sawant",
    constituency: "Paranda",
    district: "Dharashiv",
    completed: 82,
    pending: 8,
    score: 93,
    attendance: "97%",
    recentActivities: [
      "Hospital inspection",
      "Health scheme review",
      "Medical camp inauguration",
    ],
  },
];

const performanceData = [
  { month: "Jan", ministers: 82, mlas: 74 },
  { month: "Feb", ministers: 78, mlas: 71 },
  { month: "Mar", ministers: 85, mlas: 79 },
  { month: "Apr", ministers: 80, mlas: 76 },
  { month: "May", ministers: 88, mlas: 82 },
  { month: "Jun", ministers: 84, mlas: 78 },
];

const radarData = [
  { subject: "Attendance",  ministers: 89, mlas: 81 },
  { subject: "Works Done",  ministers: 84, mlas: 76 },
  { subject: "Feedback",    ministers: 78, mlas: 72 },
  { subject: "Funds Used",  ministers: 91, mlas: 84 },
  { subject: "Reports",     ministers: 86, mlas: 79 },
  { subject: "Response",    ministers: 75, mlas: 68 },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const scoreColor  = (s) => s >= 85 ? "text-green-600"  : s >= 70 ? "text-yellow-600"  : "text-red-500";
const scoreBg     = (s) => s >= 85 ? "bg-green-100 text-green-700" : s >= 70 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-600";
const scoreBarClr = (s) => s >= 85 ? "bg-green-500"    : s >= 70 ? "bg-yellow-400"    : "bg-red-400";

function initials(name) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

// Deterministic pastel background per person
const avatarColors = [
  "bg-orange-200 text-orange-800",
  "bg-amber-200 text-amber-800",
  "bg-rose-200 text-rose-800",
  "bg-violet-200 text-violet-800",
  "bg-sky-200 text-sky-800",
  "bg-teal-200 text-teal-800",
];
function avatarColor(id) {
  const idx = id.charCodeAt(id.length - 1) % avatarColors.length;
  return avatarColors[idx];
}

// ── Profile Drawer ────────────────────────────────────────────────────────────

function ProfileDrawer({ person, onClose }) {
  if (!person) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col overflow-hidden animate-slide-in">

        {/* Header */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-6 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X size={16} />
          </button>

          {/* Avatar */}
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-2 border-white/40 flex-shrink-0 ${avatarColor(person.id)}`}>
              {initials(person.name)}
            </div>
            <div className="pt-1">
              <h2 className="text-white text-lg font-semibold leading-tight">{person.name}</h2>
              <p className="text-orange-100 text-sm mt-0.5">{person.role || "MLA"}</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <MapPin size={12} className="text-orange-200" />
                <p className="text-orange-200 text-xs">{person.constituency}, {person.district}</p>
              </div>
            </div>
          </div>

          {/* Score badge */}
          <div className="mt-4 flex items-center gap-3">
            <div className="bg-white/15 rounded-xl px-4 py-2 text-center">
              <p className="text-orange-100 text-[10px] uppercase tracking-wide">Score</p>
              <p className="text-white text-2xl font-bold">{person.score}</p>
            </div>
            <div className="bg-white/15 rounded-xl px-4 py-2 text-center">
              <p className="text-orange-100 text-[10px] uppercase tracking-wide">Attendance</p>
              <p className="text-white text-2xl font-bold">{person.attendance}</p>
            </div>
            <div className="bg-white/15 rounded-xl px-4 py-2 text-center">
              <p className="text-orange-100 text-[10px] uppercase tracking-wide">Completed</p>
              <p className="text-white text-2xl font-bold">{person.completed}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">

          {/* Performance bar */}
          <div className="bg-orange-50 rounded-xl p-4">
            <p className="text-xs font-medium text-stone-500 mb-3 uppercase tracking-wide">Performance Score</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-orange-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${scoreBarClr(person.score)}`}
                  style={{ width: `${person.score}%` }}
                />
              </div>
              <span className={`text-sm font-bold ${scoreColor(person.score)}`}>{person.score}/100</span>
            </div>
          </div>

          {/* Works stats */}
          <div>
            <p className="text-xs font-medium text-stone-500 mb-3 uppercase tracking-wide">Works Overview</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle size={14} className="text-green-600" />
                  <p className="text-xs text-stone-500">Completed</p>
                </div>
                <p className="text-2xl font-bold text-green-600">{person.completed}</p>
              </div>
              <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={14} className="text-red-500" />
                  <p className="text-xs text-stone-500">Pending</p>
                </div>
                <p className="text-2xl font-bold text-red-500">{person.pending}</p>
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div>
            <p className="text-xs font-medium text-stone-500 mb-3 uppercase tracking-wide flex items-center gap-1.5">
              <Activity size={12} /> Recent Activities
            </p>
            <div className="space-y-2">
              {(person.recentActivities || []).map((act, i) => (
                <div key={i} className="flex items-start gap-3 bg-stone-50 rounded-lg p-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
                  <p className="text-sm text-stone-600">{act}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick info */}
          <div>
            <p className="text-xs font-medium text-stone-500 mb-3 uppercase tracking-wide">Details</p>
            <div className="space-y-2">
              {[
                { icon: MapPin,    label: "Constituency", value: person.constituency },
                { icon: Briefcase, label: "Role",         value: person.role || "MLA" },
                { icon: Star,      label: "District",     value: person.district },
                { icon: Calendar,  label: "Session Attendance", value: person.attendance },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center justify-between py-2.5 border-b border-stone-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <Icon size={13} className="text-orange-400" />
                    <span className="text-xs text-stone-400">{label}</span>
                  </div>
                  <span className="text-xs font-medium text-stone-700">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .animate-slide-in { animation: slideIn 0.25s ease-out; }
      `}</style>
    </>
  );
}

// ── Chief Minister Banner ─────────────────────────────────────────────────────

function CMBanner({ cm, onSelect }) {
  return (
    <div
      onClick={() => onSelect(cm)}
      className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 rounded-2xl p-5 cursor-pointer hover:shadow-lg transition-shadow group"
    >
      <div className="flex items-center gap-5">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
          {initials(cm.name)}
        </div>

        {/* Info */}
        <div className="flex-1">
          <p className="text-orange-100 text-xs uppercase tracking-widest font-medium mb-0.5">
            {cm.role} of Maharashtra
          </p>         
          <h3 className="text-white text-xl font-bold">{cm.name}</h3>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin size={12} className="text-orange-200" />
            <p className="text-orange-100 text-sm">{cm.constituency}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="hidden md:flex items-center gap-6 mr-2">
          {[
            { label: "Score",     value: cm.score,      extra: "/100"      },
            { label: "Attendance",value: cm.attendance, extra: ""          },
            { label: "Completed", value: cm.completed,  extra: " works"    },
          ].map(({ label, value, extra }) => (
            <div key={label} className="text-center">
              <p className="text-orange-100 text-[10px] uppercase tracking-wide">{label}</p>
              <p className="text-white text-xl font-bold">{value}<span className="text-sm font-normal text-orange-200">{extra}</span></p>
            </div>
          ))}
        </div>

        <ChevronRight size={18} className="text-white/60 group-hover:translate-x-1 transition-transform flex-shrink-0" />
      </div>
    </div>
  );
}

// ── Minister Card ─────────────────────────────────────────────────────────────

function MinisterCard({ person, onSelect }) {
  return (
    <div
      onClick={() => onSelect(person)}
      className="bg-white border border-orange-100 rounded-2xl p-4 cursor-pointer hover:border-orange-300 hover:shadow-md transition-all group flex flex-col items-center text-center"
    >
      {/* Circular avatar */}
      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold border-2 border-orange-100 group-hover:border-orange-300 transition-colors ${avatarColor(person.id)}`}>
        {initials(person.name)}
      </div>

      <p className="mt-3 text-sm font-semibold text-stone-800 leading-tight">{person.name}</p>
      <p className="text-[11px] text-orange-500 mt-0.5">{person.role}</p>
      <p className="text-[11px] text-stone-400 mt-0.5">{person.constituency}</p>

      {/* Score pill */}
      <span className={`mt-3 text-[11px] font-semibold px-3 py-1 rounded-full ${scoreBg(person.score)}`}>
        {person.score} / 100
      </span>

      {/* Mini bar */}
      <div className="w-full mt-3 h-1 bg-orange-50 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${scoreBarClr(person.score)}`} style={{ width: `${person.score}%` }} />
      </div>
    </div>
  );
}

// ── MLA Card (horizontal, compact) ───────────────────────────────────────────

function MLACard({ person, onSelect }) {
  return (
    <div
      onClick={() => onSelect(person)}
      className="bg-white border border-orange-100 rounded-xl p-3.5 cursor-pointer hover:border-orange-300 hover:shadow-sm transition-all group flex items-center gap-3"
    >
      {/* Circular avatar */}
      <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${avatarColor(person.id)}`}>
        {initials(person.name)}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-stone-800 truncate">{person.name}</p>
        <p className="text-[11px] text-orange-400 truncate">{person.constituency}</p>
        {/* Mini bar */}
        <div className="mt-1.5 flex items-center gap-2">
          <div className="flex-1 h-1 bg-orange-50 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${scoreBarClr(person.score)}`} style={{ width: `${person.score}%` }} />
          </div>
          <span className={`text-[11px] font-bold flex-shrink-0 ${scoreColor(person.score)}`}>{person.score}</span>
        </div>
      </div>

      <ChevronRight size={14} className="text-stone-300 group-hover:text-orange-400 transition-colors flex-shrink-0" />
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [selectedPerson, setSelectedPerson] = useState(null);

  return (
    <div className="space-y-5">

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-orange-100 hover:border-orange-200 transition-colors">
              <div className="flex items-start justify-between">
                <p className="text-xs text-stone-400">{s.label}</p>
                <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                  <Icon size={14} className={s.color} />
                </div>
              </div>
              <h2 className={`text-3xl font-semibold mt-2 ${s.color}`}>{s.value}</h2>
              <p className={`text-[11px] mt-1 ${s.subColor}`}>{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar chart */}
        <div className="bg-white rounded-2xl p-5 border border-orange-100">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium text-stone-800">Monthly performance trend</p>
            <span className="text-[11px] text-orange-400">Last 6 months</span>
          </div>
          <div className="flex gap-4 mb-3">
            {[["#EA580C", "Ministers"], ["#FDBA74", "MLAs"]].map(([c, l]) => (
              <span key={l} className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: c }} />
                {l}
              </span>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={performanceData} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#FFF7ED" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#a8a29e" }} axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "0.5px solid #FFE4C4" }} />
              <Bar dataKey="ministers" fill="#EA580C" radius={[4, 4, 0, 0]} name="Ministers" />
              <Bar dataKey="mlas"      fill="#FDBA74" radius={[4, 4, 0, 0]} name="MLAs"      />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar chart */}
        <div className="bg-white rounded-2xl p-5 border border-orange-100">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium text-stone-800">Performance radar</p>
            <span className="text-[11px] text-orange-400">Current session</span>
          </div>
          <div className="flex gap-4 mb-3">
            {[["#EA580C", "Ministers"], ["#FDBA74", "MLAs"]].map(([c, l]) => (
              <span key={l} className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: c }} />
                {l}
              </span>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#FFE4C4" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#a8a29e" }} />
              <Radar name="Ministers" dataKey="ministers" stroke="#EA580C" fill="#EA580C" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="MLAs"      dataKey="mlas"      stroke="#FDBA74" fill="#FDBA74" fillOpacity={0.15} strokeWidth={2} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "0.5px solid #FFE4C4" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Chief Minister ── */}
      <div>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-4 h-px bg-orange-200 inline-block" />
          Chief Minister
          <span className="flex-1 h-px bg-orange-50 inline-block" />
        </p>
        <CMBanner cm={chiefMinister} onSelect={setSelectedPerson} />
      </div>

      {/* ── Cabinet Ministers ── */}
      <div>
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-4 h-px bg-orange-200 inline-block" />
          Cabinet Ministers
          <span className="flex-1 h-px bg-orange-50 inline-block" />
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ministers.map((m) => (
            <MinisterCard key={m.id} person={m} onSelect={setSelectedPerson} />
          ))}
        </div>
      </div>

      {/* ── MLAs ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-4 h-px bg-orange-200 inline-block" />
            MLAs
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-green-600">
              <CheckCircle size={11} /> {mlas.filter(p => p.score >= 85).length} High performers
            </span>
            <span className="flex items-center gap-1.5 text-red-500">
              <Clock size={11} /> {mlas.filter(p => p.score < 70).length} Need attention
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {mlas.map((m) => (
            <MLACard key={m.id} person={m} onSelect={setSelectedPerson} />
          ))}
        </div>
      </div>

      {/* Profile drawer */}
      <ProfileDrawer person={selectedPerson} onClose={() => setSelectedPerson(null)} />
    </div>
  );
}