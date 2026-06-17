// src/pages/Grievance/AllComplaints.jsx
import { useState } from "react";
import {
  Search, Filter, Eye, UserCheck, CheckCircle,
  ChevronLeft, ChevronRight, Download, X, Clock,
  AlertCircle, MoreHorizontal,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const complaints = [
  { id: "GRV-2024-001", date: "12 Jun 2024", applicant: "Ramesh Patil",     complaint: "Road repair required near Shivaji Chowk, potholes causing accidents", district: "Thane",      constituency: "Virar",           status: "Pending",     priority: "High",   assignedTo: "—"              },
  { id: "GRV-2024-002", date: "11 Jun 2024", applicant: "Sunita Jadhav",    complaint: "Water supply disrupted for 5 days in sector 12",                        district: "Pune",       constituency: "Kothrud",          status: "In Progress", priority: "High",   assignedTo: "Anil Kamble"    },
  { id: "GRV-2024-003", date: "10 Jun 2024", applicant: "Mahesh Desai",     complaint: "Street lights not working on NH-48 near village",                       district: "Nashik",     constituency: "Nashik West",      status: "Resolved",    priority: "Medium", assignedTo: "Priya Patil"    },
  { id: "GRV-2024-004", date: "09 Jun 2024", applicant: "Kavita Shinde",    complaint: "Illegal construction blocking drainage, flooding every monsoon",         district: "Mumbai",     constituency: "Mumbai South",     status: "Pending",     priority: "High",   assignedTo: "—"              },
  { id: "GRV-2024-005", date: "08 Jun 2024", applicant: "Vijay Kulkarni",   complaint: "Ration shop not distributing grains for 2 months",                      district: "Kolhapur",   constituency: "Kolhapur North",   status: "In Progress", priority: "Medium", assignedTo: "Rekha Sawant"   },
  { id: "GRV-2024-006", date: "07 Jun 2024", applicant: "Deepa Bhosale",    complaint: "School building roof collapsed, children at risk",                      district: "Satara",     constituency: "Satara",           status: "Resolved",    priority: "High",   assignedTo: "Ganesh More"    },
  { id: "GRV-2024-007", date: "06 Jun 2024", applicant: "Suresh Naik",      complaint: "Bridge near river closed for 3 months, villagers stranded",             district: "Ratnagiri",  constituency: "Ratnagiri",        status: "Pending",     priority: "High",   assignedTo: "—"              },
  { id: "GRV-2024-008", date: "05 Jun 2024", applicant: "Meena Rane",       complaint: "No electricity connection given despite application 6 months ago",      district: "Nagpur",     constituency: "Nagpur South West",status: "In Progress", priority: "Low",    assignedTo: "Sanjay Wagh"    },
  { id: "GRV-2024-009", date: "04 Jun 2024", applicant: "Prakash Kadam",    complaint: "Hospital staff absent, medicines unavailable at PHC",                   district: "Pune",       constituency: "Pune Cantonment",  status: "Pending",     priority: "High",   assignedTo: "—"              },
  { id: "GRV-2024-010", date: "03 Jun 2024", applicant: "Anita Gaikwad",    complaint: "Pension not received for 4 months despite documents submitted",         district: "Thane",      constituency: "Thane",            status: "Resolved",    priority: "Medium", assignedTo: "Ravi Jadhav"    },
  { id: "GRV-2024-011", date: "02 Jun 2024", applicant: "Ganesh Pawar",     complaint: "Open drain near residential area causing disease outbreak",             district: "Nashik",     constituency: "Nashik West",      status: "In Progress", priority: "High",   assignedTo: "Pooja Tole"     },
  { id: "GRV-2024-012", date: "01 Jun 2024", applicant: "Lalita Mane",      complaint: "Land encroachment by local builder on government plot",                 district: "Mumbai",     constituency: "Mumbai South",     status: "Pending",     priority: "Medium", assignedTo: "—"              },
  { id: "GRV-2024-013", date: "31 May 2024", applicant: "Santosh More",     complaint: "Bus route discontinued from village to taluka office",                  district: "Kolhapur",   constituency: "Kolhapur North",   status: "Resolved",    priority: "Low",    assignedTo: "Amit Kulkarni"  },
  { id: "GRV-2024-014", date: "30 May 2024", applicant: "Rohini Sawant",    complaint: "Crop damage due to floods, no compensation received",                   district: "Ratnagiri",  constituency: "Ratnagiri",        status: "In Progress", priority: "High",   assignedTo: "Vijay Kale"     },
  { id: "GRV-2024-015", date: "29 May 2024", applicant: "Balu Shirke",      complaint: "Encroachment on tribal land, FIR not registered by police",             district: "Nandurbar",  constituency: "Akkalkuwa",        status: "Pending",     priority: "High",   assignedTo: "—"              },
];

const statusOptions   = ["All", "Pending", "In Progress", "Resolved"];
const priorityOptions = ["All", "High", "Medium", "Low"];
const districtOptions = ["All", "Thane", "Pune", "Nashik", "Mumbai", "Kolhapur", "Satara", "Ratnagiri", "Nagpur", "Nandurbar"];

const PAGE_SIZE = 8;

// ── Helpers ───────────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const map = {
    Pending:      "bg-red-50 text-red-600 border border-red-200",
    "In Progress":"bg-yellow-50 text-yellow-700 border border-yellow-200",
    Resolved:     "bg-green-50 text-green-700 border border-green-200",
  };
  const icons = {
    Pending:      <AlertCircle size={11} />,
    "In Progress":<Clock size={11} />,
    Resolved:     <CheckCircle size={11} />,
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium ${map[status]}`}>
      {icons[status]} {status}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const map = {
    High:   "bg-red-500 text-white",
    Medium: "bg-orange-400 text-white",
    Low:    "bg-stone-300 text-stone-700",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${map[priority]}`}>
      {priority}
    </span>
  );
}

function FilterPill({ label, value, options, onChange }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[11px] text-stone-400">{label}:</span>
      <div className="flex gap-1">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors
              ${value === o
                ? "bg-orange-600 text-white"
                : "bg-orange-50 text-stone-500 hover:bg-orange-100"
              }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── View Modal ────────────────────────────────────────────────────────────────

function ViewModal({ complaint, onClose }) {
  if (!complaint) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-orange-100">
            <div>
              <h3 className="text-sm font-semibold text-stone-800">{complaint.id}</h3>
              <p className="text-[11px] text-stone-400 mt-0.5">Filed on {complaint.date}</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center hover:bg-orange-100 transition-colors">
              <X size={15} className="text-stone-500" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-4">
            <div className="flex gap-3">
              <StatusBadge status={complaint.status} />
              <PriorityBadge priority={complaint.priority} />
            </div>

            <div>
              <p className="text-[11px] text-stone-400 mb-1">Complaint</p>
              <p className="text-sm text-stone-700 bg-orange-50 rounded-xl p-3 leading-relaxed">{complaint.complaint}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Applicant",     value: complaint.applicant     },
                { label: "District",      value: complaint.district      },
                { label: "Constituency",  value: complaint.constituency  },
                { label: "Assigned To",   value: complaint.assignedTo    },
              ].map(({ label, value }) => (
                <div key={label} className="bg-stone-50 rounded-xl p-3">
                  <p className="text-[10px] text-stone-400 uppercase tracking-wide mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-stone-700">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-4 border-t border-orange-50 flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 text-xs text-stone-500 hover:bg-stone-50 rounded-lg transition-colors">Close</button>
            <button className="px-4 py-2 text-xs bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-1.5">
              <UserCheck size={13} /> Assign Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AllComplaints() {
  const [search,      setSearch]      = useState("");
  const [status,      setStatus]      = useState("All");
  const [priority,    setPriority]    = useState("All");
  const [district,    setDistrict]    = useState("All");
  const [page,        setPage]        = useState(1);
  const [viewing,     setViewing]     = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter
  const filtered = complaints.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch   = !q || c.id.toLowerCase().includes(q) || c.applicant.toLowerCase().includes(q) || c.complaint.toLowerCase().includes(q);
    const matchStatus   = status   === "All" || c.status   === status;
    const matchPriority = priority === "All" || c.priority === priority;
    const matchDistrict = district === "All" || c.district === district;
    return matchSearch && matchStatus && matchPriority && matchDistrict;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const counts = {
    Pending:      complaints.filter(c => c.status === "Pending").length,
    "In Progress":complaints.filter(c => c.status === "In Progress").length,
    Resolved:     complaints.filter(c => c.status === "Resolved").length,
  };

  const handleFilterChange = (setter) => (val) => {
    setter(val);
    setPage(1);
  };

  return (
    <div className="space-y-4">

      {/* KPI pills */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total",       value: complaints.length, color: "text-orange-600", bg: "bg-orange-50 border-orange-100" },
          { label: "Pending",     value: counts.Pending,    color: "text-red-600",    bg: "bg-red-50 border-red-100"       },
          { label: "In Progress", value: counts["In Progress"], color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-100" },
          { label: "Resolved",    value: counts.Resolved,   color: "text-green-600",  bg: "bg-green-50 border-green-100"   },
        ].map((k) => (
          <div key={k.label} className={`rounded-xl border px-4 py-3 ${k.bg}`}>
            <p className="text-[11px] text-stone-400">{k.label}</p>
            <p className={`text-2xl font-bold mt-0.5 ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Search + filter bar */}
      <div className="bg-white rounded-2xl border border-orange-100 p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-300" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by Application No., name, or complaint..."
              className="w-full bg-orange-50 border border-orange-100 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-600 outline-none focus:border-orange-400 focus:bg-white transition-colors"
            />
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium border transition-colors ${
              showFilters ? "bg-orange-600 text-white border-orange-600" : "bg-orange-50 text-stone-500 border-orange-100 hover:bg-orange-100"
            }`}
          >
            <Filter size={13} /> Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-orange-50 text-stone-500 border border-orange-100 hover:bg-orange-100 transition-colors">
            <Download size={13} /> Export
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-4 pt-1 border-t border-orange-50">
            <FilterPill label="Status"   value={status}   options={statusOptions}   onChange={handleFilterChange(setStatus)}   />
            <FilterPill label="Priority" value={priority} options={priorityOptions} onChange={handleFilterChange(setPriority)} />
            <FilterPill label="District" value={district} options={districtOptions} onChange={handleFilterChange(setDistrict)} />
            {(status !== "All" || priority !== "All" || district !== "All") && (
              <button
                onClick={() => { setStatus("All"); setPriority("All"); setDistrict("All"); setPage(1); }}
                className="flex items-center gap-1 text-[11px] text-red-400 hover:text-red-600 transition-colors ml-auto"
              >
                <X size={11} /> Clear all
              </button>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-orange-50 border-b border-orange-100">
                {["Application No.", "Date", "Applicant", "Complaint", "District", "Priority", "Status", "Assigned To", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-stone-400 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {paginated.length > 0 ? paginated.map((c) => (
                <tr key={c.id} className="hover:bg-orange-50/40 transition-colors">
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-semibold text-orange-600 font-mono">{c.id}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-stone-400 whitespace-nowrap">{c.date}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-medium text-stone-700 whitespace-nowrap">{c.applicant}</span>
                  </td>
                  <td className="px-4 py-3.5 max-w-xs">
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">{c.complaint}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-stone-500 whitespace-nowrap">{c.district}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <PriorityBadge priority={c.priority} />
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-stone-500 whitespace-nowrap">{c.assignedTo}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setViewing(c)}
                        title="View"
                        className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 flex items-center justify-center transition-colors"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        title="Assign"
                        className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
                      >
                        <UserCheck size={13} />
                      </button>
                      <button
                        title="Resolve"
                        className="w-7 h-7 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center transition-colors"
                      >
                        <CheckCircle size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-sm text-stone-400">
                    No complaints match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-orange-50 bg-orange-50/30">
          <p className="text-[12px] text-stone-400">
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} complaints
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-7 h-7 rounded-lg bg-white border border-orange-100 flex items-center justify-center text-stone-400 hover:border-orange-300 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors
                  ${p === page ? "bg-orange-600 text-white" : "bg-white border border-orange-100 text-stone-500 hover:border-orange-300"}`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="w-7 h-7 rounded-lg bg-white border border-orange-100 flex items-center justify-center text-stone-400 hover:border-orange-300 disabled:opacity-40 transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* View modal */}
      <ViewModal complaint={viewing} onClose={() => setViewing(null)} />
    </div>
  );
}