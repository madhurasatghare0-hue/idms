// src/pages/Events.jsx
import { useState } from "react";
import { Search, Eye, Plus, CalendarDays, Filter } from "lucide-react";

const eventsData = [
  { id: 1, name: "Voter Awareness Camp", location: "Mumbai", date: "15 Jun 2026", status: "Upcoming"  },
  { id: 2, name: "Booth Meeting",         location: "Pune",   date: "18 Jun 2026", status: "Scheduled" },
  { id: 3, name: "Public Rally",          location: "Nashik", date: "22 Jun 2026", status: "Confirmed" },
];

const statCards = [
  { label: "Total events",   value: "3",  color: "text-orange-600", sub: "FY 2025–26",      subColor: "text-stone-400" },
  { label: "Upcoming",       value: "1",  color: "text-red-500",    sub: "Needs prep",       subColor: "text-red-400"   },
  { label: "Scheduled",      value: "1",  color: "text-blue-600",   sub: "Date confirmed",   subColor: "text-blue-400"  },
  { label: "Confirmed",      value: "1",  color: "text-green-600",  sub: "Ready to go",      subColor: "text-green-500" },
];

function statusBadge(status) {
  if (status === "Confirmed") return "bg-green-50 text-green-700";
  if (status === "Scheduled") return "bg-blue-50 text-blue-600";
  return "bg-orange-50 text-orange-600";
}

export default function Events() {
  const [search, setSearch] = useState("");

  const filtered = eventsData.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-stone-800">Events</h1>
          <p className="text-sm text-stone-400 mt-1">Manage voter connect events and rallies</p>
        </div>
        <button className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors">
          <Plus size={15} />
          Add Event
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
            placeholder="Search event or location..."
            className="w-full bg-orange-50 border border-orange-100 rounded-lg pl-9 pr-3 py-2 text-sm text-stone-700 placeholder:text-stone-400 outline-none focus:border-orange-400 focus:bg-white transition-colors"
          />
        </div>
        {[
          { label: "All locations", opts: ["Mumbai", "Pune", "Nashik"]                       },
          { label: "All status",    opts: ["Upcoming", "Scheduled", "Confirmed"]              },
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
              {["#", "Event", "Location", "Date", "Status", "Action"].map((h) => (
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
            {filtered.map((event, index) => (
              <tr
                key={event.id}
                className={`border-b border-orange-50 hover:bg-orange-50/40 transition-colors ${index === filtered.length - 1 ? "border-b-0" : ""}`}
              >
                <td className="px-4 py-3 text-stone-400">{index + 1}</td>
                <td className="px-4 py-3 font-semibold text-stone-800">{event.name}</td>
                <td className="px-4 py-3 text-stone-500">{event.location}</td>

                {/* Date with icon */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-stone-500">
                    <CalendarDays size={13} className="text-orange-300" />
                    {event.date}
                  </div>
                </td>

                {/* Status badge */}
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium ${statusBadge(event.status)}`}>
                    {event.status}
                  </span>
                </td>

                {/* Action */}
                <td className="px-4 py-3 text-center">
                  <button
                    className="w-7 h-7 rounded-md border border-blue-100 text-blue-500 hover:bg-blue-50 flex items-center justify-center transition-colors mx-auto"
                    aria-label="View event"
                  >
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-stone-400 text-sm">
                  No results found for "{search}"
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-orange-50 bg-orange-50/30">
          <p className="text-[12px] text-stone-400">
            Showing {filtered.length} of {eventsData.length} events
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