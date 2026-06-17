// src/pages/Performance/Representatives.jsx
import { useState } from "react";
import {
  Search, Filter, X, CheckCircle, Clock,
  TrendingUp, Users, Plus, Pencil, Trash2,
  MapPin, Phone, Star, Activity, ChevronRight,
  Award, BarChart2, Calendar, Briefcase
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────
const initialReps = [
  // ---------------- CM ----------------
  {
    id: "CM001",
    name: "Eknath Shinde",
    role: "Deputy Chief Minister",
    type: "CM",
    party: "Shiv Sena",
    constituency: "Kopri-Pachpakhadi",
    district: "Thane",
    completed: 142,
    pending: 18,
    score: 92,
    attendance: 94,
    status: "Active",
    color: "#FF6B00",
    recentActivities: [],
    completedWorks: [],
    pendingWorks: [],
  },

  // ---------------- Ministers ----------------
  {
    id: "MIN001",
    name: "Gulabrao Patil",
    role: "Cabinet Minister",
    type: "Minister",
    party: "Shiv Sena",
    constituency: "Jalgaon Rural",
    district: "Jalgaon",
    completed: 95,
    pending: 12,
    score: 88,
    attendance: 91,
    status: "Active",
    color: "#FF6B00",
    recentActivities: [],
    completedWorks: [],
    pendingWorks: [],
  },

  {
    id: "MIN002",
    name: "Dadaji Bhuse",
    role: "Cabinet Minister",
    type: "Minister",
    party: "Shiv Sena",
    constituency: "Malegaon Outer",
    district: "Nashik",
    completed: 90,
    pending: 15,
    score: 86,
    attendance: 90,
    status: "Active",
    color: "#FF6B00",
    recentActivities: [],
    completedWorks: [],
    pendingWorks: [],
  },

  {
    id: "MIN003",
    name: "Uday Samant",
    role: "Cabinet Minister",
    type: "Minister",
    party: "Shiv Sena",
    constituency: "Ratnagiri",
    district: "Ratnagiri",
    completed: 92,
    pending: 10,
    score: 89,
    attendance: 93,
    status: "Active",
    color: "#FF6B00",
    recentActivities: [],
    completedWorks: [],
    pendingWorks: [],
  },

  {
    id: "MIN004",
    name: "Shambhuraj Desai",
    role: "Cabinet Minister",
    type: "Minister",
    party: "Shiv Sena",
    constituency: "Patan",
    district: "Satara",
    completed: 84,
    pending: 18,
    score: 82,
    attendance: 88,
    status: "Active",
    color: "#FF6B00",
    recentActivities: [],
    completedWorks: [],
    pendingWorks: [],
  },

  {
    id: "MIN005",
    name: "Abdul Sattar",
    role: "Cabinet Minister",
    type: "Minister",
    party: "Shiv Sena",
    constituency: "Sillod",
    district: "Chhatrapati Sambhajinagar",
    completed: 81,
    pending: 19,
    score: 80,
    attendance: 86,
    status: "Active",
    color: "#FF6B00",
    recentActivities: [],
    completedWorks: [],
    pendingWorks: [],
  },

  {
    id: "MIN006",
    name: "Sanjay Shirsat",
    role: "Cabinet Minister",
    type: "Minister",
    party: "Shiv Sena",
    constituency: "Aurangabad West",
    district: "Chhatrapati Sambhajinagar",
    completed: 83,
    pending: 17,
    score: 81,
    attendance: 87,
    status: "Active",
    color: "#FF6B00",
    recentActivities: [],
    completedWorks: [],
    pendingWorks: [],
  },

  {
    id: "MIN007",
    name: "Pratap Sarnaik",
    role: "Cabinet Minister",
    type: "Minister",
    party: "Shiv Sena",
    constituency: "Ovala-Majiwada",
    district: "Thane",
    completed: 88,
    pending: 11,
    score: 87,
    attendance: 89,
    status: "Active",
    color: "#FF6B00",
    recentActivities: [],
    completedWorks: [],
    pendingWorks: [],
  },

  {
    id: "MIN008",
    name: "Bharat Gogawale",
    role: "Cabinet Minister",
    type: "Minister",
    party: "Shiv Sena",
    constituency: "Mahad",
    district: "Raigad",
    completed: 79,
    pending: 14,
    score: 79,
    attendance: 85,
    status: "Active",
    color: "#FF6B00",
    recentActivities: [],
    completedWorks: [],
    pendingWorks: [],
  },

  {
    id: "MIN009",
    name: "Yogesh Kadam",
    role: "Minister of State",
    type: "Minister",
    party: "Shiv Sena",
    constituency: "Dapoli",
    district: "Ratnagiri",
    completed: 77,
    pending: 13,
    score: 78,
    attendance: 84,
    status: "Active",
    color: "#FF6B00",
    recentActivities: [],
    completedWorks: [],
    pendingWorks: [],
  },

  // ---------------- MPs ----------------
  {
    id: "MP001",
    name: "Prataprao Jadhav",
    role: "Member of Parliament",
    type: "MP",
    party: "Shiv Sena",
    constituency: "Buldhana",
    district: "Buldhana",
    completed: 86,
    pending: 10,
    score: 88,
    attendance: 91,
    status: "Active",
    color: "#FF6B00",
    recentActivities: [],
    completedWorks: [],
    pendingWorks: [],
  },

  {
    id: "MP002",
    name: "Shrirang Barne",
    role: "Member of Parliament",
    type: "MP",
    party: "Shiv Sena",
    constituency: "Maval",
    district: "Pune",
    completed: 84,
    pending: 12,
    score: 85,
    attendance: 90,
    status: "Active",
    color: "#FF6B00",
    recentActivities: [],
    completedWorks: [],
    pendingWorks: [],
  },

  {
    id: "MP003",
    name: "Naresh Mhaske",
    role: "Member of Parliament",
    type: "MP",
    party: "Shiv Sena",
    constituency: "Thane",
    district: "Thane",
    completed: 82,
    pending: 11,
    score: 84,
    attendance: 89,
    status: "Active",
    color: "#FF6B00",
    recentActivities: [],
    completedWorks: [],
    pendingWorks: [],
  },

  {
    id: "MP004",
    name: "Dhairyasheel Mane",
    role: "Member of Parliament",
    type: "MP",
    party: "Shiv Sena",
    constituency: "Hatkanangale",
    district: "Kolhapur",
    completed: 80,
    pending: 13,
    score: 82,
    attendance: 88,
    status: "Active",
    color: "#FF6B00",
    recentActivities: [],
    completedWorks: [],
    pendingWorks: [],
  },

  {
    id: "MP005",
    name: "Sandipan Bhumare",
    role: "Member of Parliament",
    type: "MP",
    party: "Shiv Sena",
    constituency: "Aurangabad",
    district: "Chhatrapati Sambhajinagar",
    completed: 83,
    pending: 9,
    score: 86,
    attendance: 90,
    status: "Active",
    color: "#FF6B00",
    recentActivities: [],
    completedWorks: [],
    pendingWorks: [],
  },

  {
    id: "MP006",
    name: "Ravindra Waikar",
    role: "Member of Parliament",
    type: "MP",
    party: "Shiv Sena",
    constituency: "Mumbai North West",
    district: "Mumbai",
    completed: 81,
    pending: 12,
    score: 83,
    attendance: 89,
    status: "Active",
    color: "#FF6B00",
    recentActivities: [],
    completedWorks: [],
    pendingWorks: [],
  },

  {
    id: "MP007",
    name: "Sadanand Shankar Sarvankar",
    role: "Member of Parliament",
    type: "MP",
    party: "Shiv Sena",
    constituency: "Mumbai South",
    district: "Mumbai",
    completed: 79,
    pending: 14,
    score: 81,
    attendance: 87,
    status: "Active",
    color: "#FF6B00",
    recentActivities: [],
    completedWorks: [],
    pendingWorks: [],
  },
];

const emptyForm = {
  name: "", role: "", type: "MLA", party: "",
  constituency: "", district: "", contact: "", status: "Active",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const scoreColor = (s) =>
  s >= 85 ? "#16a34a" : s >= 70 ? "#d97706" : "#ef4444";

const scoreBg = (s) =>
  s >= 85 ? "bg-green-50 text-green-700 border-green-200"
  : s >= 70 ? "bg-yellow-50 text-yellow-700 border-yellow-200"
  : "bg-red-50 text-red-600 border-red-200";

const partyStyle = {
  "Shiv Sena": "bg-orange-100 text-orange-700",
  BJP:         "bg-blue-100 text-blue-700",
  NCP:         "bg-emerald-100 text-emerald-700",
  Congress:    "bg-sky-100 text-sky-700",
};

const inputCls = "w-full bg-orange-50 border border-orange-100 rounded-lg px-3 py-2 text-sm text-stone-700 placeholder:text-stone-300 outline-none focus:border-orange-400 focus:bg-white transition-colors";

// Initials avatar
function Initials({ name, size = "md" }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const sz = size === "lg" ? "w-20 h-20 text-2xl" : size === "xl" ? "w-28 h-28 text-3xl" : "w-12 h-12 text-sm";
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center font-bold text-white flex-shrink-0 shadow-md`}>
      {initials}
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

// ── Rep Card ─────────────────────────────────────────────────────────────────
function RepCard({ rep, onClick, size = "normal" }) {
  const isLarge = size === "large";
  return (
    <div
      onClick={() => onClick(rep)}
      className="group flex flex-col items-center cursor-pointer select-none"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(rep)}
    >
      <div className={`relative ${isLarge ? "w-24 h-24" : "w-[72px] h-[72px]"} rounded-full flex-shrink-0 transition-all duration-200 group-hover:scale-105`}>
        {/* Outer ring */}
        <div className={`absolute inset-0 rounded-full border-[3px] transition-all duration-200
          ${rep.status === "Active"
            ? "border-orange-200 group-hover:border-orange-500 group-hover:shadow-[0_0_0_4px_rgba(249,115,22,0.15)]"
            : "border-stone-200 group-hover:border-stone-400"}`}
        />
        {/* Avatar */}
        <div className={`absolute inset-[4px] rounded-full bg-gradient-to-br
          ${rep.type === "CM" ? "from-orange-500 to-red-600"
          : rep.type === "Minister" ? "from-orange-400 to-orange-600"
          : rep.type === "MLA" ? "from-blue-400 to-blue-600"
          : "from-purple-400 to-purple-600"}
          flex items-center justify-center text-white font-bold shadow-inner
          ${isLarge ? "text-xl" : "text-sm"}`}
        >
          {rep.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </div>
        {/* Score badge */}
        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-white shadow-sm`}
          style={{ backgroundColor: scoreColor(rep.score) }}
        >
          {rep.score}
        </div>
      </div>

      <p className={`mt-2.5 font-semibold text-stone-800 text-center leading-tight group-hover:text-orange-600 transition-colors ${isLarge ? "text-sm" : "text-xs"}`}>
        {rep.name}
      </p>
      {isLarge && (
        <p className="text-[11px] text-stone-500 text-center mt-0.5">{rep.role}</p>
      )}
      {!isLarge && (
        <p className="text-[10px] text-stone-400 text-center mt-0.5 truncate w-[80px]">{rep.constituency}</p>
      )}
    </div>
  );
}

// ── Add / Edit Modal ──────────────────────────────────────────────────────────
function RepModal({ onClose, onSave, initial }) {
  const [form, setForm] = useState(initial ? {
    name: initial.name, role: initial.role, type: initial.type,
    party: initial.party, constituency: initial.constituency,
    district: initial.district,  status: initial.status,
  } : emptyForm);
  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())         e.name         = "Name is required";
    if (!form.role.trim())         e.role         = "Role is required";
    if (!form.constituency.trim()) e.constituency = "Constituency is required";
    if (!form.district.trim())     e.district     = "District is required";
    if (!form.party.trim())        e.party        = "Party is required";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave(form);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl border border-orange-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-orange-50 bg-gradient-to-r from-orange-50 to-white">
          <div>
            <h2 className="text-base font-semibold text-stone-800">
              {initial ? "Edit Representative" : "Add Representative"}
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">Fill in the details below</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg border border-orange-100 flex items-center justify-center text-stone-400 hover:text-red-500 hover:border-red-100 transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4 max-h-[65vh] overflow-y-auto">
          <Field label="Full Name" required>
            <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Suresh Patil" className={inputCls} />
            {errors.name && <p className="text-[11px] text-red-500">{errors.name}</p>}
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Type" required>
              <select value={form.type} onChange={(e) => set("type", e.target.value)} className={inputCls}>
                <option>Minister</option>
                <option>MLA</option>
                <option>MP</option>
              </select>
            </Field>
            <Field label="Role / Designation" required>
              <input type="text" value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="e.g. Finance Minister" className={inputCls} />
              {errors.role && <p className="text-[11px] text-red-500">{errors.role}</p>}
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Party" required>
              <select value={form.party} onChange={(e) => set("party", e.target.value)} className={inputCls}>
                <option value="">Select party</option>
                {["Shiv Sena", "BJP", "NCP", "Congress", "Independent"].map(o => <option key={o}>{o}</option>)}
              </select>
              {errors.party && <p className="text-[11px] text-red-500">{errors.party}</p>}
            </Field>
            <Field label="Status">
              <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inputCls}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Constituency" required>
              <input type="text" value={form.constituency} onChange={(e) => set("constituency", e.target.value)} placeholder="e.g. Virar" className={inputCls} />
              {errors.constituency && <p className="text-[11px] text-red-500">{errors.constituency}</p>}
            </Field>
            <Field label="District" required>
              <input type="text" value={form.district} onChange={(e) => set("district", e.target.value)} placeholder="e.g. Palghar" className={inputCls} />
              {errors.district && <p className="text-[11px] text-red-500">{errors.district}</p>}
            </Field>
          </div>

          <Field label="Contact Number">
            <input type="text" value={form.contact} onChange={(e) => set("contact", e.target.value)} placeholder="e.g. 9876540000" className={inputCls} />
          </Field>
        </div>

        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-orange-50 bg-orange-50/30">
          <button onClick={onClose} className="px-4 py-2 text-sm text-stone-500 border border-orange-100 rounded-lg hover:bg-orange-50 transition-colors">Cancel</button>
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-orange-600 hover:bg-orange-700 active:scale-95 text-white rounded-lg transition-all">
            <Plus size={15} />
            {initial ? "Save Changes" : "Add Representative"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Profile Modal ─────────────────────────────────────────────────────────────
function ProfileDrawer({ rep, onClose, onEdit, onDelete }) {
  if (!rep) return null;

  const scoreC = scoreColor(rep.score);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-orange-100 overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="relative bg-gradient-to-br from-orange-500 to-orange-700 px-5 py-6 text-white flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>

          {/* Avatar */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/50 flex items-center justify-center text-2xl font-bold mb-3 shadow-lg">
              {rep.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <h2 className="text-lg font-bold leading-tight">{rep.name}</h2>
            <p className="text-orange-100 text-sm mt-0.5">{rep.role}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-white/20 text-white">
                {rep.party}
              </span>
              <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${rep.status === "Active" ? "bg-green-400/30 text-green-100" : "bg-stone-400/30 text-stone-200"}`}>
                {rep.status}
              </span>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-2 mt-5">
            {[
              { label: "Attendance", value: `${rep.attendance}%` },
              { label: "Score",      value: rep.score             },
              { label: "Completed",  value: rep.completed         },
            ].map(({ label, value }) => (
              <div key={label} className="text-center bg-white/15 rounded-lg py-2">
                <p className="text-lg font-bold">{value}</p>
                <p className="text-[10px] text-orange-100">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">

          {/* Info */}
          <div className="px-5 py-4 border-b border-orange-50">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm text-stone-600">
                <MapPin size={14} className="text-orange-400 flex-shrink-0" />
                <span>{rep.constituency}, {rep.district}</span>
              </div>
              
            </div>
          </div>

          {/* Performance Score */}
          <div className="px-5 py-4 border-b border-orange-50">
            <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-3">Performance Score</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-orange-50 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${rep.score}%`, backgroundColor: scoreC }}
                />
              </div>
              <span className="text-base font-bold" style={{ color: scoreC }}>{rep.score}/100</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-green-50 rounded-lg p-2.5 text-center">
                <CheckCircle size={14} className="text-green-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-green-600">{rep.completed}</p>
                <p className="text-[10px] text-stone-400">Completed</p>
              </div>
              <div className="bg-red-50 rounded-lg p-2.5 text-center">
                <Clock size={14} className="text-red-400 mx-auto mb-1" />
                <p className="text-lg font-bold text-red-500">{rep.pending}</p>
                <p className="text-[10px] text-stone-400">Pending</p>
              </div>
            </div>
          </div>

          {/* Completed Works */}
          <div className="px-5 py-4 border-b border-orange-50">
            <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-3">Completed Works</p>
            <div className="space-y-2">
              {rep.completedWorks?.map(({ label, count }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    <span className="text-sm text-stone-600">{label}</span>
                  </div>
                  <span className="text-sm font-semibold text-green-600">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Works */}
          <div className="px-5 py-4 border-b border-orange-50">
            <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-3">Pending Works</p>
            <div className="space-y-2">
              {rep.pendingWorks?.map(({ label, count }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                    <span className="text-sm text-stone-600">{label}</span>
                  </div>
                  <span className="text-sm font-semibold text-orange-600">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="px-5 py-4">
            <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-3">Recent Activities</p>
            <div className="space-y-2">
              {rep.recentActivities?.map((activity, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={11} className="text-orange-500" />
                  </div>
                  <span className="text-sm text-stone-600 leading-snug">{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex gap-2 px-5 py-4 border-t border-orange-50 bg-orange-50/40 flex-shrink-0">
          <button
            onClick={() => { onEdit(rep); onClose(); }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-orange-200 text-orange-600 text-sm font-medium hover:bg-orange-50 transition-colors"
          >
            <Pencil size={14} /> Edit
          </button>
          <button
            onClick={() => { onDelete(rep.id); onClose(); }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-red-100 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors"
          >
            <Trash2 size={14} /> Remove
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition-colors">
            <BarChart2 size={14} /> Full Report
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function Section({ title, icon: Icon, count, color, children }) {
  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${color}`}>
          <Icon size={14} />
          {title}
        </div>
        <span className="text-stone-400 text-xs">{count} members</span>
        <div className="flex-1 h-px bg-orange-100" />
      </div>
      {children}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Representatives() {
  const [reps,       setReps]       = useState(initialReps);
  const [search,     setSearch]     = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showAdd,    setShowAdd]    = useState(false);
  const [editRep,    setEditRep]    = useState(null);
  const [activeRep,  setActiveRep]  = useState(null);

  // ── filter ──
  const filtered = reps.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) ||
      r.constituency.toLowerCase().includes(q) ||
      r.district.toLowerCase().includes(q) ||
      r.party.toLowerCase().includes(q);
    const matchType = typeFilter === "All" || r.type === typeFilter;
    return matchSearch && matchType;
  });

  const cm        = filtered.filter(r => r.type === "CM");
  const ministers = filtered.filter(r => r.type === "Minister");
  const mlas      = filtered.filter(r => r.type === "MLA");
  const mps       = filtered.filter(r => r.type === "MP");

  // ── handlers ──
  const handleAdd = (form) => {
    setReps(prev => [{
      ...form, id: `REP${Math.floor(Math.random() * 9000) + 1000}`,
      completed: 0, pending: 0, score: 0, attendance: 0,
      color: "#6B7280", recentActivities: [], completedWorks: [], pendingWorks: [],
    }, ...prev]);
  };

  const handleEdit = (form) => {
    setReps(prev => prev.map(r => r.id === editRep.id ? { ...r, ...form } : r));
    setEditRep(null);
  };

  const handleDelete = (id) => {
    setReps(prev => prev.filter(r => r.id !== id));
  };

  const typePills = [
    { label: "All",      count: reps.length,                                   cls: "bg-orange-50 text-orange-600 border-orange-200" },
    { label: "Minister", count: reps.filter(r => r.type === "Minister" || r.type === "CM").length, cls: "bg-orange-50 text-orange-600 border-orange-200" },
    { label: "MLA",      count: reps.filter(r => r.type === "MLA").length,     cls: "bg-blue-50 text-blue-600 border-blue-200"     },
    { label: "MP",       count: reps.filter(r => r.type === "MP").length,      cls: "bg-purple-50 text-purple-600 border-purple-200" },
  ];

  const noResults = filtered.length === 0;

  return (
    <div className="space-y-6">

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 px-8 py-8 text-white shadow-lg">
        {/* Decorative rings */}
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-12 -right-4 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-1/2 right-32 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                <TrendingUp size={13} />
              </div>
              <span className="text-orange-100 text-xs font-medium uppercase tracking-widest">Performance Tracking</span>
            </div>
            <h1 className="text-2xl font-bold leading-tight">Representatives Dashboard</h1>
            <p className="text-orange-100 mt-1 text-sm">Monitor Ministers, MLAs & MPs Performance</p>

            {/* Stats row */}
            <div className="flex items-center gap-6 mt-4">
              {[
                { label: "Ministers", value: reps.filter(r => r.type === "Minister" || r.type === "CM").length },
                { label: "MLAs",      value: reps.filter(r => r.type === "MLA").length     },
                { label: "MPs",       value: reps.filter(r => r.type === "MP").length       },
                { label: "Active",    value: reps.filter(r => r.status === "Active").length },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-xl font-bold">{value}</p>
                  <p className="text-[11px] text-orange-200">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex flex-col items-end gap-2">
            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-2 bg-white text-orange-600 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-orange-50 active:scale-95 transition-all shadow-sm"
            >
              <Plus size={16} />
              Add Representative
            </button>
          </div>
        </div>
      </div>

      {/* ── Search + Filter Bar ── */}
      <div className="bg-white border border-orange-100 rounded-xl p-3.5 flex flex-wrap gap-2.5 items-center shadow-sm">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-300" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, constituency, party..."
            className="w-full bg-orange-50 border border-orange-100 rounded-lg pl-9 pr-3 py-2 text-sm text-stone-700 placeholder:text-stone-400 outline-none focus:border-orange-400 focus:bg-white transition-colors"
          />
        </div>

        {/* Type filter pills */}
        {/* <div className="flex gap-1.5">
          {typePills.map(({ label, count, cls }) => (
            <button
              key={label}
              onClick={() => setTypeFilter(label === "Minister" ? "All" : label === "All" ? "All" : label)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                ${typeFilter === label || (label === "All" && typeFilter === "All")
                  ? `${cls} ring-2 ring-offset-1 ring-orange-200`
                  : `${cls} opacity-60 hover:opacity-100`}`}
            >
              {label} {count}
            </button>
          ))}
        </div> */}

        {/* Mobile add */}
        <button
          onClick={() => setShowAdd(true)}
          className="md:hidden flex items-center gap-1.5 bg-orange-600 text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-orange-700 transition-colors"
        >
          <Plus size={15} /> Add
        </button>
      </div>

      {/* ── No results ── */}
      {noResults && (
        <div className="bg-white border border-orange-100 rounded-2xl px-6 py-14 text-center">
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-3">
            <Users size={20} className="text-orange-300" />
          </div>
          <p className="text-stone-500 text-sm">No representatives match your search.</p>
          <button onClick={() => { setSearch(""); setTypeFilter("All"); }} className="mt-2 text-orange-500 text-xs hover:underline">Clear filters</button>
        </div>
      )}

      {/* ── Chief Minister Section ── */}
      {cm.length > 0 && (
        <Section title="Deputy Chief Minister" icon={Award} count={cm.length} color="bg-orange-100 text-orange-700">
          <div className="flex justify-center">
            {cm.map(rep => (
              <RepCard key={rep.id} rep={rep} onClick={setActiveRep} size="large" />
            ))}
          </div>
        </Section>
      )}

      {/* ── Ministers Section ── */}
      {ministers.length > 0 && (
        <Section title="Ministers" icon={Briefcase} count={ministers.length} color="bg-orange-50 text-orange-600">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-6">
            {ministers.map(rep => (
              <RepCard key={rep.id} rep={rep} onClick={setActiveRep} />
            ))}
          </div>
        </Section>
      )}

      {/* ── MLAs Section ── */}
      {mlas.length > 0 && (
        <Section title="MLAs" icon={Users} count={mlas.length} color="bg-blue-50 text-blue-600">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-x-4 gap-y-6">
            {mlas.map(rep => (
              <RepCard key={rep.id} rep={rep} onClick={setActiveRep} />
            ))}
          </div>
        </Section>
      )}

      {/* ── MPs Section ── */}
      {mps.length > 0 && (
        <Section title="MPs" icon={Star} count={mps.length} color="bg-purple-50 text-purple-600">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-6">
            {mps.map(rep => (
              <RepCard key={rep.id} rep={rep} onClick={setActiveRep} />
            ))}
          </div>
        </Section>
      )}

      {/* ── Side Drawer ── */}
      <ProfileDrawer
        rep={activeRep}
        onClose={() => setActiveRep(null)}
        onEdit={(rep) => setEditRep(rep)}
        onDelete={handleDelete}
      />

      {/* ── Modals ── */}
      {showAdd && <RepModal onClose={() => setShowAdd(false)} onSave={handleAdd} />}
      {editRep  && <RepModal onClose={() => setEditRep(null)} onSave={handleEdit} initial={editRep} />}

    </div>
  );
}