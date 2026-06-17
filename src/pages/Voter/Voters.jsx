// src/pages/Voters.jsx
import { useState } from "react";
import { Search, Eye, UserPlus, Filter } from "lucide-react";

const votersData = [
  { id: "VT001", name: "Rahul Patil",  district: "Mumbai", booth: "101", mobile: "+91 XXXXXXX123" },
  { id: "VT002", name: "Sneha More",   district: "Pune",   booth: "205", mobile: "+91 XXXXXXX456" },
  { id: "VT003", name: "Amit Shinde",  district: "Nashik", booth: "310", mobile: "+91 XXXXXXX789" },
];

const statCards = [
  { label: "Total voters",     value: "1,240", color: "text-orange-600", sub: "All districts",    subColor: "text-stone-400" },
  { label: "Mumbai",           value: "420",   color: "text-blue-600",   sub: "33.8% of total",  subColor: "text-blue-400"  },
  { label: "Pune",             value: "390",   color: "text-green-600",  sub: "31.4% of total",  subColor: "text-green-500" },
  { label: "Nashik",           value: "430",   color: "text-red-500",    sub: "34.6% of total",  subColor: "text-red-400"   },
];

export default function Voters() {
  const [search, setSearch] = useState("");

  const filtered = votersData.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.id.toLowerCase().includes(search.toLowerCase()) ||
      v.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-stone-800">Voters</h1>
          <p className="text-sm text-stone-400 mt-1">Manage and browse voter records</p>
        </div>
        <button className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors">
          <UserPlus size={15} />
          Add Voter
        </button>
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
            placeholder="Search by name, voter ID or district..."
            className="w-full bg-orange-50 border border-orange-100 rounded-lg pl-9 pr-3 py-2 text-sm text-stone-700 placeholder:text-stone-400 outline-none focus:border-orange-400 focus:bg-white transition-colors"
          />
        </div>
        {[
          { label: "All districts", opts: ["Mumbai", "Pune", "Nashik"]  },
          { label: "All booths",    opts: ["101", "205", "310"]          },
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
              {["#", "Voter ID", "Name", "District", "Booth", "Mobile", "Action"].map((h) => (
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
            {filtered.map((voter, index) => (
              <tr
                key={voter.id}
                className={`border-b border-orange-50 hover:bg-orange-50/40 transition-colors ${index === filtered.length - 1 ? "border-b-0" : ""}`}
              >
                <td className="px-4 py-3 text-stone-400">{index + 1}</td>
                <td className="px-4 py-3">
                  <span className="bg-orange-50 text-orange-600 px-2.5 py-0.5 rounded-full text-[11px] font-medium">
                    {voter.id}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold text-stone-800">{voter.name}</td>
                <td className="px-4 py-3 text-stone-500">{voter.district}</td>
                <td className="px-4 py-3 text-stone-500">{voter.booth}</td>
                <td className="px-4 py-3 text-stone-500">{voter.mobile}</td>

                {/* Action */}
                <td className="px-4 py-3 text-center">
                  <button
                    className="w-7 h-7 rounded-md border border-blue-100 text-blue-500 hover:bg-blue-50 flex items-center justify-center transition-colors mx-auto"
                    aria-label="View voter"
                  >
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-stone-400 text-sm">
                  No results found for "{search}"
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-orange-50 bg-orange-50/30">
          <p className="text-[12px] text-stone-400">
            Showing {filtered.length} of {votersData.length} voters
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