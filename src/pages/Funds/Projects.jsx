// src/pages/Funds/Projects.jsx
import { useState } from "react";
import { Search, Eye, Filter } from "lucide-react";

const projectsData = [
  {
    id: 1,
    name: "Road Development",
    district: "Nandurbar",
    allocated: 500,
    utilized: 300,
    progress: 60,
    status: "Ongoing",
    year: "2025-26",
  },
  {
    id: 2,
    name: "Water Supply",
    district: "Nandurbar",
    allocated: 300,
    utilized: 300,
    progress: 100,
    status: "Completed",
    year: "2025-26",
  },
  {
    id: 3,
    name: "School Renovation",
    district: "Nandurbar",
    allocated: 200,
    utilized: 0,
    progress: 0,
    status: "Not Started",
    year: "2025-26",
  },
];

const statCards = [
  { label: "Total budget",    value: "₹1,000 L", color: "text-orange-600", sub: "FY 2025–26",        subColor: "text-stone-400"  },
  { label: "Total projects",  value: "3",         color: "text-blue-600",   sub: "Across 1 district", subColor: "text-blue-400"   },
  { label: "Completed",       value: "1",         color: "text-green-600",  sub: "33% complete",      subColor: "text-green-500"  },
  { label: "Not started",     value: "1",         color: "text-red-500",    sub: "Pending start",     subColor: "text-red-400"    },
];

function statusBadge(status) {
  if (status === "Completed")   return { cls: "bg-green-50 text-green-700" };
  if (status === "Ongoing")     return { cls: "bg-orange-50 text-orange-600" };
  return                               { cls: "bg-red-50 text-red-600" };
}

function barColor(pct) {
  if (pct >= 100) return "bg-green-500";
  if (pct >= 50)  return "bg-orange-500";
  return "bg-red-400";
}

export default function Projects() {
  const [search, setSearch] = useState("");

  const filtered = projectsData.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">

      {/* Page header */}
      <div>
        <h1 className="text-xl font-semibold text-stone-800">Fund Projects</h1>
        <p className="text-sm text-stone-400 mt-1">
          Track constituency-wise projects funded under the allocation.
        </p>
      </div>

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

      {/* Filter bar */}
      <div className="bg-white border border-orange-100 rounded-xl p-3.5 flex flex-wrap gap-2.5 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-300" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search project or district..."
            className="w-full bg-orange-50 border border-orange-100 rounded-lg pl-9 pr-3 py-2 text-sm text-stone-700 placeholder:text-stone-400 outline-none focus:border-orange-400 focus:bg-white transition-colors"
          />
        </div>
        {[
          { label: "All districts", opts: ["Nandurbar", "Pune", "Thane"]                },
          { label: "All years",     opts: ["2025-26", "2024-25", "2023-24"]              },
          { label: "All status",    opts: ["Completed", "Ongoing", "Not Started"]        },
        ].map(({ label, opts }) => (
          <select
            key={label}
            className="bg-orange-50 border border-orange-100 rounded-lg px-3 py-2 text-sm text-stone-600 outline-none focus:border-orange-400 transition-colors cursor-pointer"
          >
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
              {["#", "Project", "District", "Allocated", "Utilized", "Progress", "Status", "Action"].map((h) => (
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
              const badge = statusBadge(item.status);

              return (
                <tr
                  key={item.id}
                  className={`border-b border-orange-50 hover:bg-orange-50/40 transition-colors ${index === filtered.length - 1 ? "border-b-0" : ""}`}
                >
                  <td className="px-4 py-3 text-stone-400">{index + 1}</td>
                  <td className="px-4 py-3 font-semibold text-stone-800">{item.name}</td>
                  <td className="px-4 py-3 text-stone-500">{item.district}</td>
                  <td className="px-4 py-3 font-medium text-orange-600">₹{item.allocated} L</td>
                  <td className="px-4 py-3 font-medium text-green-600">₹{item.utilized} L</td>

                  {/* Progress bar */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-orange-50 rounded-full overflow-hidden min-w-[80px]">
                        <div
                          className={`h-full rounded-full ${barColor(item.progress)}`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-stone-400 w-7 text-right">
                        {item.progress}%
                      </span>
                    </div>
                  </td>

                  {/* Status badge */}
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium ${badge.cls}`}>
                      {item.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3 text-center">
                    <button
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
                <td colSpan={8} className="px-4 py-10 text-center text-stone-400 text-sm">
                  No results found for "{search}"
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-orange-50 bg-orange-50/30">
          <p className="text-[12px] text-stone-400">
            Showing {filtered.length} of {projectsData.length} projects
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

    </div>
  );
}