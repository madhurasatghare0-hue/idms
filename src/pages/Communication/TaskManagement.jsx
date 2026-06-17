import React, { useState } from "react";
import {
  LayoutDashboard,
  PhoneCall,
  Plus,
  Eye,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  Bell,
  Settings,
  ChevronDown,
  Shield,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const ALL_TASKS = [
  { id: 1, title: "Prepare Rally Poster",   assignee: "Amit",   initials: "AM", priority: "High",   status: "Pending",     deadline: "10 Jun" },
  { id: 2, title: "Facebook Campaign",      assignee: "Sneha",  initials: "SN", priority: "Medium", status: "In Progress", deadline: "11 Jun" },
  { id: 3, title: "Video Editing",          assignee: "Rohit",  initials: "RO", priority: "Low",    status: "Completed",   deadline: "09 Jun" },
  { id: 4, title: "Press Release Draft",    assignee: "Pooja",  initials: "PO", priority: "High",   status: "Pending",     deadline: "12 Jun" },
  { id: 5, title: "Instagram Reels",        assignee: "Vikram", initials: "VK", priority: "Medium", status: "In Progress", deadline: "13 Jun" },
  { id: 6, title: "Banner Design – Ward 5", assignee: "Amit",   initials: "AM", priority: "Low",    status: "Completed",   deadline: "08 Jun" },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",       active: false },
  { icon: PhoneCall,       label: "Task Management", active: true  },
];

// ── Badge helpers ─────────────────────────────────────────────────────────────

const statusStyle = {
  "Pending":     { bg: "#FEF2F2", color: "#DC2626", dot: "#DC2626" },
  "In Progress": { bg: "#EFF6FF", color: "#2563EB", dot: "#2563EB" },
  "Completed":   { bg: "#ECFDF5", color: "#059669", dot: "#059669" },
};

const priorityStyle = {
  "High":   { bg: "#FFF7ED", color: "#C2410C" },
  "Medium": { bg: "#FFFBEB", color: "#B45309" },
  "Low":    { bg: "#F9FAFB", color: "#6B7280" },
};

const avatarColor = ["#FFF7ED/#EA580C", "#EEF2FF/#6366F1", "#F0FDF4/#10B981", "#FEF2F2/#EF4444", "#EFF6FF/#2563EB", "#FDF4FF/#9333EA"];

function Avatar({ initials, idx }) {
  const [bg, fg] = avatarColor[idx % avatarColor.length].split("/");
  return (
    <div style={{ width: 30, height: 30, borderRadius: "50%", background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

function StatusBadge({ status }) {
  const s = statusStyle[status] || statusStyle["Pending"];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const p = priorityStyle[priority] || priorityStyle["Low"];
  return (
    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, background: p.bg, color: p.color }}>
      {priority}
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function TaskManagement() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All status");
  const [filterPriority, setFilterPriority] = useState("All priority");

  const total      = ALL_TASKS.length;
  const pending    = ALL_TASKS.filter(t => t.status === "Pending").length;
  const inProgress = ALL_TASKS.filter(t => t.status === "In Progress").length;
  const completed  = ALL_TASKS.filter(t => t.status === "Completed").length;

  const filtered = ALL_TASKS.filter(t => {
    const matchSearch   = t.title.toLowerCase().includes(search.toLowerCase()) || t.assignee.toLowerCase().includes(search.toLowerCase());
    const matchStatus   = filterStatus === "All status"   || t.status === filterStatus;
    const matchPriority = filterPriority === "All priority" || t.priority === filterPriority;
    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#FFF7ED", fontFamily: "'Inter', system-ui, sans-serif" }}>

     

       

        

      {/* ── Main ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

      
        

        {/* ── Page content ── */}
        <main style={{ flex: 1, padding: "2px 32px", overflowY: "auto" }}>

          

          {/* ── KPI Cards ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
            {[
              { label: "Total",       value: total,      border: "#FEE2CA", numColor: "#EA580C", sub: "All tasks"          },
              { label: "Pending",     value: pending,    border: "#FEE2E2", numColor: "#DC2626", sub: "Awaiting action"    },
              { label: "In Progress", value: inProgress, border: "#DBEAFE", numColor: "#2563EB", sub: "Active tasks"       },
              { label: "Completed",   value: completed,  border: "#D1FAE5", numColor: "#059669", sub: `${Math.round(completed/total*100)}% completion` },
            ].map((c) => (
              <div key={c.label} style={{ background: "#fff", borderRadius: 16, padding: "20px 22px", border: `1px solid ${c.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "transform 0.2s, box-shadow 0.2s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.09)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
              >
                <p style={{ fontSize: 12, color: "#9CA3AF", margin: "0 0 10px", fontWeight: 500 }}>{c.label}</p>
                <p style={{ fontSize: 34, fontWeight: 800, color: c.numColor, margin: "0 0 6px", letterSpacing: "-0.03em" }}>{c.value}</p>
                <p style={{ fontSize: 11, color: "#9CA3AF", margin: 0 }}>{c.sub}</p>
              </div>
            ))}
          </div>

          {/* ── Table card ── */}
          <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #FEE2CA", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>

            {/* Search + Filters */}
            <div style={{ padding: "16px 22px", borderBottom: "1px solid #FFF1E8", display: "flex", alignItems: "center", gap: 12 }}>
              {/* Search */}
              <div style={{ flex: 1, position: "relative" }}>
                <Search size={13} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search task or assignee..."
                  style={{ width: "100%", paddingLeft: 34, paddingRight: 14, height: 38, border: "1px solid #FEE2CA", borderRadius: 10, fontSize: 13, color: "#374151", outline: "none", background: "#FFF7ED", boxSizing: "border-box" }}
                />
              </div>

              {/* Status filter */}
              <div style={{ position: "relative" }}>
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  style={{ appearance: "none", background: "#fff", border: "1px solid #FEE2CA", borderRadius: 10, padding: "8px 32px 8px 12px", fontSize: 13, color: "#374151", cursor: "pointer", outline: "none" }}
                >
                  {["All status", "Pending", "In Progress", "Completed"].map(s => <option key={s}>{s}</option>)}
                </select>
                <ChevronDown size={13} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", pointerEvents: "none" }} />
              </div>

              {/* Priority filter */}
              <div style={{ position: "relative" }}>
                <select
                  value={filterPriority}
                  onChange={e => setFilterPriority(e.target.value)}
                  style={{ appearance: "none", background: "#fff", border: "1px solid #FEE2CA", borderRadius: 10, padding: "8px 32px 8px 12px", fontSize: 13, color: "#374151", cursor: "pointer", outline: "none" }}
                >
                  {["All priority", "High", "Medium", "Low"].map(p => <option key={p}>{p}</option>)}
                </select>
                <ChevronDown size={13} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", pointerEvents: "none" }} />
              </div>

              <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#FFF7ED", border: "1px solid #FEE2CA", borderRadius: 10, padding: "8px 14px", fontSize: 13, color: "#6B7280", cursor: "pointer" }}>
                <SlidersHorizontal size={13} /> Filter
              </button>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#FFFBF7" }}>
                    {["#", "Task", "Assignee", "Priority", "Status", "Deadline", "Action"].map(h => (
                      <th key={h} style={{ padding: "10px 18px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.08em", textTransform: "uppercase", borderBottom: "1px solid #FFF1E8", whiteSpace: "nowrap" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ padding: "32px", textAlign: "center", color: "#9CA3AF", fontSize: 13 }}>No tasks match your filters.</td>
                    </tr>
                  ) : filtered.map((t, i) => (
                    <tr
                      key={t.id}
                      style={{ borderBottom: i < filtered.length - 1 ? "1px solid #FFF7F0" : "none", transition: "background 0.12s", cursor: "pointer" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#FFFBF7"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ padding: "14px 18px", color: "#9CA3AF", fontSize: 12, fontWeight: 500 }}>{i + 1}</td>

                      <td style={{ padding: "14px 18px" }}>
                        <p style={{ fontWeight: 600, color: "#1F2937", margin: 0 }}>{t.title}</p>
                      </td>

                      <td style={{ padding: "14px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Avatar initials={t.initials} idx={i} />
                          <span style={{ color: "#374151", fontWeight: 500 }}>{t.assignee}</span>
                        </div>
                      </td>

                      <td style={{ padding: "14px 18px" }}>
                        <PriorityBadge priority={t.priority} />
                      </td>

                      <td style={{ padding: "14px 18px" }}>
                        <StatusBadge status={t.status} />
                      </td>

                      <td style={{ padding: "14px 18px", color: "#6B7280", fontSize: 12, whiteSpace: "nowrap" }}>{t.deadline}</td>

                      <td style={{ padding: "14px 18px" }}>
                        <button style={{ background: "#FFF7ED", border: "1px solid #FEE2CA", borderRadius: 8, padding: "6px 12px", fontSize: 11, color: "#EA580C", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                          <Eye size={12} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div style={{ padding: "12px 22px", borderTop: "1px solid #FFF1E8", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: 12, color: "#9CA3AF", margin: 0 }}>Showing {filtered.length} of {ALL_TASKS.length} tasks</p>
              <div style={{ display: "flex", gap: 6 }}>
                {[1, 2].map((p, i) => (
                  <button key={p} style={{ width: 28, height: 28, borderRadius: 7, border: i === 0 ? "none" : "1px solid #FEE2CA", background: i === 0 ? "linear-gradient(135deg,#EA580C,#F97316)" : "#fff", color: i === 0 ? "#fff" : "#6B7280", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                    {p}
                  </button>
                ))}
                <button style={{ padding: "0 10px", height: 28, borderRadius: 7, border: "1px solid #FEE2CA", background: "#fff", color: "#6B7280", fontSize: 12, cursor: "pointer" }}>›</button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}