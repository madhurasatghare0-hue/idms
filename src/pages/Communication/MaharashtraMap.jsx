// src/pages/Communication/MaharashtraMap.jsx
import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { Plus, X } from "lucide-react";

// ── Division → colour mapping ─────────────────────────────────────────────────
const DIVISION_MAP = {
  "Mumbai City": "कोकण", "Mumbai Suburban": "कोकण", "Thane": "कोकण",
  "Palghar": "कोकण", "Raigad": "कोकण", "Ratnagiri": "कोकण", "Sindhudurg": "कोकण",
  "Pune": "पुणे", "Satara": "पुणे", "Sangli": "पुणे", "Kolhapur": "पुणे", "Solapur": "पुणे",
  "Nashik": "नाशिक", "Ahmednagar": "नाशिक", "Dhule": "नाशिक", "Nandurbar": "नाशिक", "Jalgaon": "नाशिक",
  "Aurangabad": "औरंगाबाद", "Jalna": "औरंगाबाद", "Beed": "औरंगाबाद", "Osmanabad": "औरंगाबाद",
  "Nanded": "औरंगाबाद", "Latur": "औरंगाबाद", "Parbhani": "औरंगाबाद", "Hingoli": "औरंगाबाद",
  "Nagpur": "नागपूर", "Wardha": "नागपूर", "Bhandara": "नागपूर",
  "Gondia": "नागपूर", "Chandrapur": "नागपूर", "Gadchiroli": "नागपूर",
  "Amravati": "अमरावती", "Akola": "अमरावती", "Washim": "अमरावती",
  "Buldhana": "अमरावती", "Yavatmal": "अमरावती",
};

const DIV_FILL = {
  "कोकण":     "#fde68a", "पुणे": "#bbf7d0", "नाशिक": "#bfdbfe",
  "औरंगाबाद": "#ddd6fe", "नागपूर": "#fed7aa", "अमरावती": "#fce7f3",
};
const DIV_STROKE = {
  "कोकण":     "#d97706", "पुणे": "#15803d", "नाशिक": "#1d4ed8",
  "औरंगाबाद": "#6d28d9", "नागपूर": "#c2410c", "अमरावती": "#be185d",
};

// ── Stat panels ───────────────────────────────────────────────────────────────
const panelConfig = [
  {
    key: "patraVyavahar", label: "पत्रव्यवहार",
    rows: [
      { label: "एकूण", avak: 240, javak: 180 },
      { label: "प्रगतीपथावर", avak: 140, javak: 95 },
      { label: "पूर्ण", avak: 100, javak: 85 },
    ],
    colA: "आवक", colB: "जावक", color: "text-orange-600", border: "border-orange-200",
  },
  {
    key: "nidhi", label: "निधी",
    rows: [
      { label: "एकूण", avak: 500 }, { label: "प्रगतीपथावर", avak: 300 }, { label: "पूर्ण", avak: 200 },
    ],
    colA: "एकूण", colB: null, color: "text-blue-600", border: "border-blue-200",
  },
  {
    key: "vaiyaktik", label: "वैयक्तिक लाभार्थी",
    rows: [
      { label: "एकूण", avak: 350 }, { label: "प्रगतीपथावर", avak: 150 }, { label: "पूर्ण", avak: 200 },
    ],
    colA: "एकूण", colB: null, color: "text-green-600", border: "border-green-200",
  },
  {
    key: "janSanpark", label: "जनसंपर्क",
    rows: [
      { label: "शासकीय", avak: 120 }, { label: "सार्वजनिक", avak: 150 }, { label: "वैयक्तिक", avak: 180 },
    ],
    colA: "संख्या", colB: null, color: "text-purple-600", border: "border-purple-200",
  },
];

function getDistrictData(name = "") {
  const seed = [...name].reduce((s, c) => s + c.charCodeAt(0), 0);
  return {
    constituencies: 3 + (seed % 8),
    voters: `${Math.round((8 + (seed % 15)) * 10) / 10}L`,
    volunteers: 20 + (seed % 60),
  };
}

// ── D3 map ────────────────────────────────────────────────────────────────────
function MaharashtraMapSVG({ onSelect }) {
  const containerRef = useRef(null);
  const svgRef       = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const W = container.offsetWidth || 680;
    const H = Math.round(W * 0.72);

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${W} ${H}`)
      .attr("height", H)
      .attr("width", "100%");

    svg.selectAll("*").remove();
    const g = svg.append("g");

    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", (e) => {
        g.attr("transform", e.transform);
        g.selectAll("text").attr("font-size", `${Math.max(4, 8 / e.transform.k)}px`);
      });

    svg.call(zoom).on("dblclick.zoom", null);

    container._zoomIn  = () => svg.transition().duration(300).call(zoom.scaleBy, 1.5);
    container._zoomOut = () => svg.transition().duration(300).call(zoom.scaleBy, 0.67);
    container._reset   = () => svg.transition().duration(400).call(zoom.transform, d3.zoomIdentity);

    const URLS = [
      "https://cdn.jsdelivr.net/npm/india-maps-data@1.0.0/states/Maharashtra/maharashtra-districts.json",
      "https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@main/states/Maharashtra/maharashtra-districts.json",
    ];

    const tryFetch = (urls) =>
      urls.reduce(
        (p, url) => p.catch(() => fetch(url).then((r) => { if (!r.ok) throw new Error(); return r.json(); })),
        Promise.reject()
      );

    let selectedPath = null;

    tryFetch(URLS)
      .then((geojson) => {
        const proj    = d3.geoMercator().fitSize([W, H], geojson);
        const pathGen = d3.geoPath(proj);

        const getName = (d) =>
          d.properties.district || d.properties.NAME_2 || d.properties.name || "";

        g.selectAll("path")
          .data(geojson.features)
          .join("path")
          .attr("d", pathGen)
          .attr("fill", (d) => DIV_FILL[DIVISION_MAP[getName(d)]] || "#fdba74")
          .attr("stroke", (d) => DIV_STROKE[DIVISION_MAP[getName(d)]] || "#f97316")
          .attr("stroke-width", 0.8)
          .style("cursor", "pointer")
          .on("click", function (event, d) {
            if (selectedPath) d3.select(selectedPath).attr("stroke-width", 0.8);
            selectedPath = this;
            d3.select(this).attr("stroke", "#ea580c").attr("stroke-width", 2.5);
            onSelect({ name: getName(d), division: DIVISION_MAP[getName(d)] || "–" });
          });

        g.selectAll("text")
          .data(geojson.features)
          .join("text")
          .attr("x", (d) => pathGen.centroid(d)[0])
          .attr("y", (d) => pathGen.centroid(d)[1] + 1)
          .attr("text-anchor", "middle")
          .attr("font-size", "8px")
          .attr("fill", "#44403c")
          .attr("font-weight", "500")
          .attr("pointer-events", "none")
          .text((d) => {
            const n = getName(d);
            return n.length > 9 ? n.slice(0, 8) + "." : n;
          });
      })
      .catch(() => {
        g.append("text")
          .attr("x", W / 2).attr("y", H / 2)
          .attr("text-anchor", "middle")
          .attr("fill", "#a8a29e")
          .attr("font-size", "13px")
          .text("नकाशा लोड होऊ शकला नाही — कृपया पुन्हा प्रयत्न करा.");
      });
  }, []);

  return (
    <div ref={containerRef} className="bg-stone-50 w-full">
      <svg ref={svgRef} style={{ display: "block", width: "100%" }} />
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function MaharashtraMapPage() {
  const [selected, setSelected] = useState(null);
  const mapRef = useRef(null);
  const data = selected ? getDistrictData(selected.name) : null;

  return (
    <div className="space-y-5">

      {/* Page header */}
      <div>
        <h1 className="text-xl font-semibold text-stone-800">महाराष्ट्र शिवसेना नकाशा</h1>
        <p className="text-sm text-stone-400 mt-1">मतदारसंघनिहाय आढावा आणि माहिती</p>
      </div>

      {/* 4 stat panels */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {panelConfig.map((panel) => (
          <div key={panel.key} className={`bg-white rounded-2xl border ${panel.border} overflow-hidden`}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-orange-50">
              <span className={`text-[13px] font-semibold ${panel.color}`}>{panel.label}</span>
              <button className="w-5 h-5 rounded-md border border-orange-100 flex items-center justify-center text-stone-400 hover:text-orange-600 transition-colors">
                <Plus size={11} />
              </button>
            </div>
            <table className="w-full text-[12px]">
              <thead>
                <tr className="bg-orange-50/40 border-b border-orange-50">
                  <th className="text-left px-3 py-2 text-[10px] text-stone-400 font-medium">#</th>
                  <th className="text-left px-3 py-2 text-[10px] text-stone-400 font-medium w-full"> </th>
                  <th className="text-left px-3 py-2 text-[10px] text-stone-400 font-medium">{panel.colA}</th>
                  {panel.colB && <th className="text-left px-3 py-2 text-[10px] text-stone-400 font-medium">{panel.colB}</th>}
                </tr>
              </thead>
              <tbody>
                {panel.rows.map((row, i) => (
                  <tr key={i} className="border-b border-orange-50 last:border-b-0 hover:bg-orange-50/30 transition-colors">
                    <td className="px-3 py-2 text-stone-400">{String(i + 1).padStart(2, "0")}</td>
                    <td className="px-3 py-2 text-stone-600 whitespace-nowrap">{row.label}</td>
                    <td className={`px-3 py-2 font-semibold ${panel.color}`}>{row.avak}</td>
                    {panel.colB && <td className="px-3 py-2 font-medium text-stone-500">{row.javak}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Map card */}
      <div className="bg-white border border-orange-100 rounded-2xl overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-orange-50">
          <div>
            <span className="text-sm font-semibold text-stone-700">महाराष्ट्र — जिल्हा नकाशा</span>
            <span className="text-[11px] text-stone-400 ml-2">36 जिल्हे • जिल्हा निवडण्यासाठी क्लिक करा</span>
          </div>
          <div className="flex gap-1.5">
            {[
              { label: "+", action: () => mapRef.current?._zoomIn?.()  },
              { label: "−", action: () => mapRef.current?._zoomOut?.() },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={action}
                className="w-7 h-7 rounded-lg border border-orange-100 text-stone-500 hover:bg-orange-50 text-sm font-medium transition-colors flex items-center justify-center"
              >{label}</button>
            ))}
            <button
              onClick={() => { mapRef.current?._reset?.(); setSelected(null); }}
              className="px-3 h-7 rounded-lg border border-orange-100 text-stone-500 hover:bg-orange-50 text-[11px] transition-colors"
            >रीसेट</button>
          </div>
        </div>

        {/* Map */}
        <div ref={mapRef}>
          <MaharashtraMapSVG onSelect={setSelected} />
        </div>

        {/* Division legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 px-5 py-3 border-t border-orange-50">
          {Object.entries(DIV_FILL).map(([name, fill]) => (
            <span key={name} className="flex items-center gap-1.5 text-[11px] text-stone-500">
              <span
                className="w-2.5 h-2.5 rounded-sm inline-block border"
                style={{ background: fill, borderColor: DIV_STROKE[name] }}
              />
              {name}
            </span>
          ))}
        </div>

        {/* Status bar */}
        <div className="px-5 py-2.5 border-t border-orange-50 bg-orange-50/30">
          <span className="text-[12px] text-stone-400">
            {selected
              ? `निवडले: ${selected.name} — ${selected.division} विभाग`
              : "कोणताही जिल्हा निवडलेला नाही"}
          </span>
        </div>
      </div>

      {/* District detail card */}
      {selected && data && (
        <div className="bg-white border border-orange-100 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-orange-50 bg-orange-50/50">
            <div>
              <h2 className="text-sm font-semibold text-stone-800">{selected.name}</h2>
              <p className="text-[11px] text-stone-400 mt-0.5">{selected.division} विभाग</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="w-7 h-7 rounded-lg border border-orange-100 flex items-center justify-center text-stone-400 hover:text-red-500 hover:border-red-100 transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          {/* District stat tiles */}
          <div className="grid grid-cols-3 gap-3 p-4">
            <div className="bg-orange-50 rounded-xl p-3 text-center">
              <p className="text-[10px] text-stone-400 mb-1">मतदारसंघ</p>
              <p className="text-xl font-semibold text-orange-600">{data.constituencies}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-[10px] text-stone-400 mb-1">मतदार</p>
              <p className="text-xl font-semibold text-green-600">{data.voters}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-[10px] text-stone-400 mb-1">स्वयंसेवक</p>
              <p className="text-xl font-semibold text-blue-600">{data.volunteers}</p>
            </div>
          </div>

          {/* Mini stat panels */}
          <div className="grid grid-cols-2 gap-3 px-4 pb-4">
            {panelConfig.map((panel) => (
              <div key={panel.key} className={`border ${panel.border} rounded-xl overflow-hidden`}>
                <div className="flex items-center justify-between px-3 py-2 bg-orange-50/30 border-b border-orange-50">
                  <span className={`text-[11px] font-semibold ${panel.color}`}>{panel.label}</span>
                  <Plus size={11} className="text-stone-300" />
                </div>
                <table className="w-full text-[11px]">
                  <tbody>
                    {panel.rows.map((row, i) => (
                      <tr key={i} className="border-b border-orange-50 last:border-b-0">
                        <td className="px-3 py-1.5 text-stone-400 w-6">{String(i + 1).padStart(2, "0")}</td>
                        <td className="px-2 py-1.5 text-stone-600">{row.label}</td>
                        <td className={`px-2 py-1.5 font-semibold ${panel.color}`}>{Math.round(row.avak * 0.3)}</td>
                        {panel.colB && <td className="px-2 py-1.5 text-stone-500">{Math.round((row.javak ?? 0) * 0.3)}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <div className="px-4 pb-4">
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-2.5 text-sm font-medium transition-colors">
              आढावा पहा →
            </button>
          </div>
        </div>
      )}

    </div>
  );
}