import { useState } from "react";
import {
  Search, Eye, Pencil, Trash2, SlidersHorizontal,
  Plus, List, Clock, Loader, CheckCircle, X
} from "lucide-react";

const initialComplaints = [
  { id: "GRV001", citizen: "Rahul Patil",  initials: "RP", category: "Roads",       department: "PWD",        priority: "High",   status: "Pending",     date: "12 Jun 2025" },
  { id: "GRV002", citizen: "Sneha Shah",   initials: "SS", category: "Water",       department: "Water Dept", priority: "Medium", status: "Resolved",    date: "11 Jun 2025" },
  { id: "GRV003", citizen: "Amit Kumar",   initials: "AK", category: "Electricity", department: "MSEB",       priority: "Low",    status: "In Progress", date: "10 Jun 2025" },
  { id: "GRV004", citizen: "Priya Desai",  initials: "PD", category: "Sanitation",  department: "Municipal",  priority: "High",   status: "Pending",     date: "09 Jun 2025" },
];

const emptyForm = {
  citizen:    "",
  category:   "",
  department: "",
  priority:   "High",
  status:     "Pending",
};

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

const countCards = [
  { label: "All",         value: "1,542", icon: List,        bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200" },
  { label: "Pending",     value: "125",   icon: Clock,       bg: "bg-red-50",    text: "text-red-600",    border: "border-red-200"    },
  { label: "In Progress", value: "84",    icon: Loader,      bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
  { label: "Resolved",    value: "1,333", icon: CheckCircle, bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200"  },
];

// ─── Label + input/select helper ────────────────────────────────────────────
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

const inputCls =
  "w-full bg-orange-50 border border-orange-100 rounded-lg px-3 py-2 text-sm text-stone-700 placeholder:text-stone-300 outline-none focus:border-orange-400 focus:bg-white transition-colors";

// ─── Modal ───────────────────────────────────────────────────────────────────
function AddComplaintModal({ onClose, onAdd }) {
  const [form, setForm]     = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const set = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.citizen.trim())    e.citizen    = "Citizen name is required";
    if (!form.category.trim())   e.category   = "Category is required";
    if (!form.department.trim()) e.department = "Department is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const initials = form.citizen
      .trim()
      .split(" ")
      .map((n) => n[0]?.toUpperCase())
      .join("")
      .slice(0, 2);

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
    });

    onAdd({
      id:         `GRV${String(Math.floor(Math.random() * 9000) + 1000)}`,
      citizen:    form.citizen.trim(),
      initials,
      category:   form.category.trim(),
      department: form.department.trim(),
      priority:   form.priority,
      status:     form.status,
      date:       today,
    });

    onClose();
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal box */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg border border-orange-100 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-orange-50">
          <div>
            <h2 className="text-base font-semibold text-stone-800">Add New Complaint</h2>
            <p className="text-xs text-stone-400 mt-0.5">Fill in the details to register a grievance</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-orange-100 flex items-center justify-center text-stone-400 hover:text-red-500 hover:border-red-100 transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Citizen name */}
          <Field label="Citizen Name" required>
            <input
              type="text"
              value={form.citizen}
              onChange={(e) => set("citizen", e.target.value)}
              placeholder="e.g. Rahul Patil"
              className={inputCls}
            />
            {errors.citizen && <p className="text-[11px] text-red-500">{errors.citizen}</p>}
          </Field>

          {/* Category + Department — side by side */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Category" required>
              <input
                type="text"
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                placeholder="e.g. Roads"
                className={inputCls}
              />
              {errors.category && <p className="text-[11px] text-red-500">{errors.category}</p>}
            </Field>

            <Field label="Department" required>
              <select
                value={form.department}
                onChange={(e) => set("department", e.target.value)}
                className={inputCls}
              >
                <option value="">Select dept.</option>
                <option>PWD</option>
                <option>Water Dept</option>
                <option>MSEB</option>
                <option>Municipal</option>
                <option>Health Dept</option>
              </select>
              {errors.department && <p className="text-[11px] text-red-500">{errors.department}</p>}
            </Field>
          </div>

          {/* Priority + Status — side by side */}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Priority">
              <select
                value={form.priority}
                onChange={(e) => set("priority", e.target.value)}
                className={inputCls}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </Field>

            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className={inputCls}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </Field>
          </div>

          {/* Description — optional */}
          <Field label="Description (optional)">
            <textarea
              rows={3}
              placeholder="Briefly describe the complaint..."
              className={`${inputCls} resize-none`}
            />
          </Field>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-orange-50 bg-orange-50/30">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-stone-500 border border-orange-100 rounded-lg hover:bg-orange-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-orange-600 hover:bg-orange-700 active:scale-95 text-white rounded-lg transition-all"
          >
            <Plus size={15} />
            Add Complaint
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AllComplaints() {
  const [search,      setSearch]      = useState("");
  const [complaints,  setComplaints]  = useState(initialComplaints);
  const [showModal,   setShowModal]   = useState(false);

  const handleAdd = (newComplaint) => {
    setComplaints((prev) => [newComplaint, ...prev]);
  };

  return (
    <div className="space-y-5">

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-stone-800">All Complaints</h1>
          <p className="text-sm text-stone-400 mt-1">View and manage all grievance complaints</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all"
        >
          <Plus size={16} />
          Add Complaint
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <AddComplaintModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}

      {/* Count pills */}
      <div className="flex flex-wrap gap-3">
        {countCards.map(({ label, value, icon: Icon, bg, text, border }) => (
          <div
            key={label}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[13px] font-medium cursor-pointer ${bg} ${text} ${border}`}
          >
            <Icon size={13} />
            {label} <span className="font-semibold">{value}</span>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="bg-white border border-orange-100 rounded-xl p-3.5 flex flex-wrap gap-2.5 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-300" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID, citizen, category..."
            className="w-full bg-orange-50 border border-orange-100 rounded-lg pl-9 pr-3 py-2 text-sm text-stone-700 placeholder:text-stone-400 outline-none focus:border-orange-400 focus:bg-white transition-colors"
          />
        </div>
        {[
          { label: "All status",      opts: ["Pending", "In Progress", "Resolved"]     },
          { label: "All priority",    opts: ["High", "Medium", "Low"]                  },
          { label: "All departments", opts: ["PWD", "Water Dept", "MSEB", "Municipal"] },
        ].map(({ label, opts }) => (
          <select
            key={label}
            className="bg-orange-50 border border-orange-100 rounded-lg px-3 py-2 text-sm text-stone-600 outline-none focus:border-orange-400 focus:bg-white transition-colors cursor-pointer"
          >
            <option>{label}</option>
            {opts.map((o) => <option key={o}>{o}</option>)}
          </select>
        ))}
        <button className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 hover:border-orange-300 hover:text-orange-600 rounded-lg px-3 py-2 text-sm text-stone-500 transition-colors">
          <SlidersHorizontal size={15} />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-orange-100 rounded-xl overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-orange-50 border-b border-orange-100">
              {["ID", "Citizen", "Category", "Department", "Priority", "Status", "Date", "Actions"].map((h) => (
                <th
                  key={h}
                  className={`px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wider ${h === "Actions" ? "text-center" : "text-left"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {complaints.map((item, i) => (
              <tr
                key={item.id}
                className={`border-b border-orange-50 hover:bg-orange-50/50 transition-colors ${i === complaints.length - 1 ? "border-b-0" : ""}`}
              >
                <td className="px-4 py-3 font-semibold text-orange-600">{item.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-semibold text-orange-700 flex-shrink-0">
                      {item.initials}
                    </div>
                    <span className="text-stone-700">{item.citizen}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-stone-500">{item.category}</td>
                <td className="px-4 py-3 text-stone-500">{item.department}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium ${priorityStyle[item.priority]}`}>
                    {item.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium ${statusStyle[item.status]}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-stone-400">{item.date}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-1.5">
                    <button className="w-7 h-7 rounded-md border border-blue-100 text-blue-500 hover:bg-blue-50 flex items-center justify-center transition-colors" aria-label="View">
                      <Eye size={14} />
                    </button>
                    <button className="w-7 h-7 rounded-md border border-green-100 text-green-600 hover:bg-green-50 flex items-center justify-center transition-colors" aria-label="Edit">
                      <Pencil size={14} />
                    </button>
                    <button
                      className="w-7 h-7 rounded-md border border-red-100 text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors"
                      aria-label="Delete"
                      onClick={() => setComplaints((prev) => prev.filter((c) => c.id !== item.id))}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-orange-50 bg-orange-50/30">
          <p className="text-[12px] text-stone-400">
            Showing 1–{complaints.length} of {complaints.length} complaints
          </p>
          <div className="flex gap-1">
            {["‹", "1", "2", "3", "...", "154", "›"].map((p, i) => (
              <button
                key={i}
                className={`w-7 h-7 rounded-md text-[12px] border flex items-center justify-center transition-colors
                  ${p === "1"
                    ? "bg-orange-600 text-white border-orange-600"
                    : "border-orange-100 text-stone-500 hover:bg-orange-50 hover:border-orange-300 bg-white"
                  }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}