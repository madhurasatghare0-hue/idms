// src/pages/Funds/Allocation.jsx
import { useState } from "react";
import { Search, Eye, X, Filter } from "lucide-react";

const allocationData = [
  {
    id: 1,
    constituency: "Akkalkuwa",
    district: "Nandurbar",
    total: 500, utilized: 300, remaining: 200,
    year: "2025-26",
    projects: [
      { name: "Road Development",  amount: 120 },
      { name: "Water Supply",      amount: 80  },
      { name: "School Renovation", amount: 40  },
      { name: "Health Centre",     amount: 60  },
    ],
  },
  {
    id: 2,
    constituency: "Shahada",
    district: "Nandurbar",
    total: 300, utilized: 300, remaining: 0,
    year: "2025-26",
    projects: [
      { name: "Road Work", amount: 150 },
      { name: "Drainage",  amount: 100 },
      { name: "School",    amount: 50  },
    ],
  },
  {
    id: 3,
    constituency: "Navapur",
    district: "Nandurbar",
    total: 200, utilized: 0, remaining: 200,
    year: "2025-26",
    projects: [],
  },
];

const statCards = [
  { label: "Total budget",  value: "₹1,000 L", color: "text-orange-600", sub: "FY 2025–26",       subColor: "text-stone-400" },
  { label: "Allocated",     value: "₹1,000 L", color: "text-blue-600",   sub: "100% of total",    subColor: "text-blue-400"  },
  { label: "Utilized",      value: "₹600 L",   color: "text-green-600",  sub: "60% utilized",     subColor: "text-green-500" },
  { label: "Remaining",     value: "₹400 L",   color: "text-red-500",    sub: "To be utilized",   subColor: "text-red-400"   },
];

function statusBadge(utilized, total) {
  const pct = total > 0 ? (utilized / total) * 100 : 0;
  if (pct >= 100) return { label: "Fully used", cls: "bg-green-50 text-green-700" };
  if (pct > 0)    return { label: "Partial",    cls: "bg-orange-50 text-orange-600" };
  return              { label: "Unused",     cls: "bg-red-50 text-red-600" };
}

function barColor(pct) {
  if (pct >= 100) return "bg-green-500";
  if (pct >= 50)  return "bg-orange-500";
  return "bg-red-400";
}

// ── View Modal ────────────────────────────────────────────────────────────────
function ViewModal({ data, onClose }) {
  const pct = data.total > 0 ? Math.round((data.utilized / data.total) * 100) : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg border border-orange-100 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-orange-50 bg-orange-50/50">
          <div>
            <h2 className="text-base font-semibold text-stone-800">{data.constituency} — Fund Details</h2>
            <p className="text-xs text-stone-400 mt-0.5">District: {data.district}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-orange-100 flex items-center justify-center text-stone-400 hover:text-red-500 hover:border-red-100 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Info grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <p className="text-[11px] text-stone-400 mb-1">Total</p>
              <p className="text-base font-semibold text-orange-600">₹{data.total} L</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-[11px] text-stone-400 mb-1">Utilized</p>
              <p className="text-base font-semibold text-green-600">₹{data.utilized} L</p>
            </div>
            <div className="bg-red-50 rounded-xl p-3 text-center">
              <p className="text-[11px] text-stone-400 mb-1">Remaining</p>
              <p className="text-base font-semibold text-red-500">₹{data.remaining} L</p>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex items-center justify-between text-[12px] mb-1.5">
              <span className="text-stone-500 font-medium">Utilization progress</span>
              <span className={`font-semibold ${pct >= 100 ? "text-green-600" : pct >= 50 ? "text-orange-500" : "text-red-500"}`}>
                {pct}%
              </span>
            </div>
            <div className="h-2.5 bg-orange-50 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${barColor(pct)}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>₹0</span>
              <span>₹{data.total} L</span>
            </div>
          </div>

          {/* Projects table */}
          <div>
            <p className="text-[12px] font-medium text-stone-700 mb-2">Project-wise allocation</p>
            <div className="border border-orange-100 rounded-xl overflow-hidden">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-orange-50 border-b border-orange-100">
                    <th className="text-left px-4 py-2.5 text-[11px] font-medium text-stone-400 uppercase tracking-wider">Project</th>
                    <th className="text-left px-4 py-2.5 text-[11px] font-medium text-stone-400 uppercase tracking-wider">Amount</th>
                    <th className="text-left px-4 py-2.5 text-[11px] font-medium text-stone-400 uppercase tracking-wider">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {data.projects.length > 0 ? data.projects.map((p, i) => (
                    <tr key={i} className={`border-b border-orange-50 ${i === data.projects.length - 1 ? "border-b-0" : ""}`}>
                      <td className="px-4 py-2.5 text-stone-700">{p.name}</td>
                      <td className="px-4 py-2.5 font-medium text-orange-600">₹{p.amount} L</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-orange-50 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-400 rounded-full"
                              style={{ width: `${Math.round((p.amount / data.total) * 100)}%` }}
                            />
                          </div>
                          <span className="text-[11px] text-stone-400">
                            {Math.round((p.amount / data.total) * 100)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={3} className="px-4 py-6 text-center text-stone-400 text-sm">
                        No projects added yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Year pill */}
          <div className="flex justify-between items-center text-[12px] text-stone-400">
            <span>Financial year</span>
            <span className="bg-orange-50 text-orange-600 px-2.5 py-0.5 rounded-full font-medium">{data.year}</span>
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Allocation() {
  const [search,   setSearch]   = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = allocationData.filter((item) =>
    item.constituency.toLowerCase().includes(search.toLowerCase()) ||
    item.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">

      {/* Page header */}
      <div>
        <h1 className="text-xl font-semibold text-stone-800">Fund Allocation</h1>
        <p className="text-sm text-stone-400 mt-1">Constituency-wise fund allocation and utilization</p>
      </div>

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

      {/* Filter bar */}
      <div className="bg-white border border-orange-100 rounded-xl p-3.5 flex flex-wrap gap-2.5 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-300" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search constituency or district..."
            className="w-full bg-orange-50 border border-orange-100 rounded-lg pl-9 pr-3 py-2 text-sm text-stone-700 placeholder:text-stone-400 outline-none focus:border-orange-400 focus:bg-white transition-colors"
          />
        </div>
        {[
          { label: "All districts", opts: ["Nandurbar", "Pune", "Thane"]       },
          { label: "All years",     opts: ["2025-26", "2024-25", "2023-24"]     },
          { label: "All status",    opts: ["Fully used", "Partial", "Unused"]   },
        ].map(({ label, opts }) => (
          <select key={label} className="bg-orange-50 border border-orange-100 rounded-lg px-3 py-2 text-sm text-stone-600 outline-none focus:border-orange-400 transition-colors cursor-pointer">
            <option>{label}</option>
            {opts.map((o) => <option key={o}>{o}</option>)}
          </select>
        ))}
        <button className="flex items-center gap-1.5 bg-orange-50 border border-orange-100 hover:border-orange-300 hover:text-orange-600 rounded-lg px-3 py-2 text-sm text-stone-500 transition-colors">
          <Filter size={15} />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-orange-100 rounded-xl overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-orange-50 border-b border-orange-100">
              {["#", "Constituency", "District", "Total", "Utilized", "Remaining", "Progress", "Status", "Action"].map((h) => (
                <th
                  key={h}
                  className={`px-4 py-3 text-[11px] font-medium text-stone-400 uppercase tracking-wider ${h === "Action" ? "text-center" : "text-left"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, index) => {
              const pct    = item.total > 0 ? Math.round((item.utilized / item.total) * 100) : 0;
              const status = statusBadge(item.utilized, item.total);

              return (
                <tr
                  key={item.id}
                  className={`border-b border-orange-50 hover:bg-orange-50/40 transition-colors ${index === filtered.length - 1 ? "border-b-0" : ""}`}
                >
                  <td className="px-4 py-3 text-stone-400">{index + 1}</td>
                  <td className="px-4 py-3 font-semibold text-stone-800">{item.constituency}</td>
                  <td className="px-4 py-3 text-stone-500">{item.district}</td>
                  <td className="px-4 py-3 font-medium text-orange-600">₹{item.total} L</td>
                  <td className="px-4 py-3 font-medium text-green-600">₹{item.utilized} L</td>
                  <td className="px-4 py-3 font-medium text-red-500">₹{item.remaining} L</td>

                  {/* Progress bar */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-orange-50 rounded-full overflow-hidden min-w-[80px]">
                        <div
                          className={`h-full rounded-full ${barColor(pct)}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-stone-400 w-7 text-right">{pct}%</span>
                    </div>
                  </td>

                  {/* Status badge */}
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium ${status.cls}`}>
                      {status.label}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setSelected(item)}
                      className="w-7 h-7 rounded-md border border-blue-100 text-blue-500 hover:bg-blue-50 flex items-center justify-center transition-colors mx-auto"
                      aria-label="View details"
                    >
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-stone-400 text-sm">
                  No results found for "{search}"
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-orange-50 bg-orange-50/30">
          <p className="text-[12px] text-stone-400">
            Showing {filtered.length} of {allocationData.length} constituencies
          </p>
          <div className="flex gap-1">
            {["‹", "1", "2", "›"].map((p, i) => (
              <button
                key={i}
                className={`w-7 h-7 rounded-md text-[12px] border flex items-center justify-center transition-colors
                  ${p === "1"
                    ? "bg-orange-600 text-white border-orange-600"
                    : "border-orange-100 text-stone-500 hover:bg-orange-50 bg-white"
                  }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* View modal */}
      {selected && (
        <ViewModal data={selected} onClose={() => setSelected(null)} />
      )}

    </div>
  );
}