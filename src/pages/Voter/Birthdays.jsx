// src/pages/Birthdays.jsx
import { useState } from "react";
import { Search, Send, Gift, Filter } from "lucide-react";

const peopleData = [
  { id: 1, name: "Arjun Chavan",  age: 40, district: "Solapur", mobile: "7559239207" },
  { id: 2, name: "Dinesh Kamble", age: 35, district: "Pune",    mobile: "7559334897" },
];

const statCards = [
  { label: "Today's birthdays", value: "2",    color: "text-orange-600", sub: "11 Jun 2026",       subColor: "text-stone-400" },
  { label: "Wishes sent",       value: "0",    color: "text-green-600",  sub: "Pending action",    subColor: "text-green-500" },
  { label: "This week",         value: "9",    color: "text-blue-600",   sub: "Upcoming birthdays",subColor: "text-blue-400"  },
  { label: "This month",        value: "34",   color: "text-red-500",    sub: "Total in June",     subColor: "text-red-400"   },
];

export default function Birthdays() {
  const [search, setSearch] = useState("");
  const [sent, setSent] = useState({});

  const filtered = peopleData.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
            <Gift size={16} className="text-orange-500" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-stone-800">Today's Birthdays</h1>
            <p className="text-sm text-stone-400 mt-0.5">Send birthday wishes to voters</p>
          </div>
        </div>
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
            placeholder="Search by name or district..."
            className="w-full bg-orange-50 border border-orange-100 rounded-lg pl-9 pr-3 py-2 text-sm text-stone-700 placeholder:text-stone-400 outline-none focus:border-orange-400 focus:bg-white transition-colors"
          />
        </div>
        {[
          { label: "All districts", opts: ["Solapur", "Pune", "Mumbai"] },
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
              {["#", "Name", "Age", "District", "Mobile", "Action"].map((h) => (
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
            {filtered.map((person, index) => (
              <tr
                key={person.id}
                className={`border-b border-orange-50 hover:bg-orange-50/40 transition-colors ${index === filtered.length - 1 ? "border-b-0" : ""}`}
              >
                <td className="px-4 py-3 text-stone-400">{index + 1}</td>
                <td className="px-4 py-3 font-semibold text-stone-800">{person.name}</td>
                <td className="px-4 py-3 text-stone-500">{person.age}</td>
                <td className="px-4 py-3 text-stone-500">{person.district}</td>
                <td className="px-4 py-3 text-stone-500">{person.mobile}</td>

                {/* Action */}
                <td className="px-4 py-3 text-center">
                  {sent[person.id] ? (
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-green-50 text-green-700">
                      Sent ✓
                    </span>
                  ) : (
                    <button
                      onClick={() => setSent((prev) => ({ ...prev, [person.id]: true }))}
                      className="inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors mx-auto"
                    >
                      <Send size={12} />
                      Send Wish
                    </button>
                  )}
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
            Showing {filtered.length} of {peopleData.length} birthdays today
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