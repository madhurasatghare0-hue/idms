// src/pages/Booths.jsx
import { useState } from "react";
import { Search, Eye, MapPin, Filter } from "lucide-react";

const boothsData = [
  { id: "B101", area: "Andheri",      district: "Mumbai", voters: 1245, volunteers: 8 },
  { id: "B205", area: "Shivajinagar", district: "Pune",   voters: 1188, volunteers: 6 },
  { id: "B310", area: "College Road", district: "Nashik", voters: 1399, volunteers: 9 },
];

const statCards = [
  { label: "Total booths",     value: "3",     color: "text-orange-600", sub: "All districts",      subColor: "text-stone-400" },
  { label: "Total voters",     value: "3,832", color: "text-blue-600",   sub: "Across all booths",  subColor: "text-blue-400"  },
  { label: "Total volunteers", value: "23",    color: "text-green-600",  sub: "Deployed",           subColor: "text-green-500" },
  { label: "Avg. per booth",   value: "1,277", color: "text-red-500",    sub: "Voters per booth",   subColor: "text-red-400"   },
];

function coverageBadge(volunteers) {
  if (volunteers >= 9) return { label: "Strong",    cls: "bg-green-50 text-green-700"  };
  if (volunteers >= 7) return { label: "Moderate",  cls: "bg-orange-50 text-orange-600" };
  return                      { label: "Low",       cls: "bg-red-50 text-red-600"      };
}

export default function Booths() {
  const [search, setSearch] = useState("");

  const filtered = boothsData.filter(
    (b) =>
      b.area.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-stone-800">Booths</h1>
          <p className="text-sm text-stone-400 mt-1">Constituency-wise booth overview and volunteer coverage</p>
        </div>
        <button className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors">
          <MapPin size={15} />
          Add Booth
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
            placeholder="Search by booth, area or district..."
            className="w-full bg-orange-50 border border-orange-100 rounded-lg pl-9 pr-3 py-2 text-sm text-stone-700 placeholder:text-stone-400 outline-none focus:border-orange-400 focus:bg-white transition-colors"
          />
        </div>
        {[
          { label: "All districts", opts: ["Mumbai", "Pune", "Nashik"] },
          { label: "All coverage",  opts: ["Strong", "Moderate", "Low"] },
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
              {["#", "Booth ID", "Area", "District", "Voters", "Volunteers", "Coverage", "Action"].map((h) => (
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
            {filtered.map((booth, index) => {
              const coverage = coverageBadge(booth.volunteers);
              return (
                <tr
                  key={booth.id}
                  className={`border-b border-orange-50 hover:bg-orange-50/40 transition-colors ${index === filtered.length - 1 ? "border-b-0" : ""}`}
                >
                  <td className="px-4 py-3 text-stone-400">{index + 1}</td>
                  <td className="px-4 py-3">
                    <span className="bg-orange-50 text-orange-600 px-2.5 py-0.5 rounded-full text-[11px] font-medium">
                      {booth.id}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-stone-800">{booth.area}</td>
                  <td className="px-4 py-3 text-stone-500">{booth.district}</td>
                  <td className="px-4 py-3 font-medium text-blue-600">{booth.voters.toLocaleString()}</td>
                  <td className="px-4 py-3 font-medium text-green-600">{booth.volunteers}</td>

                  {/* Coverage badge */}
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium ${coverage.cls}`}>
                      {coverage.label}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3 text-center">
                    <button
                      className="w-7 h-7 rounded-md border border-blue-100 text-blue-500 hover:bg-blue-50 flex items-center justify-center transition-colors mx-auto"
                      aria-label="View booth"
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
            Showing {filtered.length} of {boothsData.length} booths
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