// // src/components/ModuleNavbar.jsx
// import { Bell, Search, ChevronLeft, Menu } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import ShivSenaLogo  from "../assets/shivsenalogo.png";
// import EknathShinde  from "../assets/eknathshinde.jpg";

// export default function ModuleNavbar({ config }) {
//   const { title, subtitle } = config;
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   return (
//     <header
//       className="flex-shrink-0 border-b border-orange-200"
//       style={{
//         background: "linear-gradient(135deg, #fff7ed 0%, #fff 50%, #fff7ed 100%)",
//       }}
//     >

//       {/* ── Top strip ── */}
//       <div className="flex items-center justify-between px-5 py-2.5">

//         {/* Left — back + Eknath Shinde photo + title */}
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => navigate("/")}
//             className="w-8 h-8 rounded-lg border border-orange-200 flex items-center justify-center text-orange-500 hover:bg-orange-50 transition-colors flex-shrink-0"
//             aria-label="Back to home"
//           >
//             <ChevronLeft size={18} />
//           </button>

//           {/* CM photo + name */}
//           <div className="flex items-center gap-2">
//             <div
//               className="w-9 h-9 rounded-full p-[2px] flex-shrink-0"
//               style={{
//                 background: "linear-gradient(135deg, #EA580C, #FBBF24)",
//               }}
//             >
//               <img
//                 src={EknathShinde}
//                 alt="मा. एकनाथ शिंदे"
//                 className="w-full h-full rounded-full object-cover object-top"
//               />
//             </div>
            
//           </div>

          

//           {/* Page title */}
//           <div className="hidden md:block">
//             <h1 className="text-[14px] font-semibold text-stone-800 leading-tight">
//               {title}
//             </h1>
//             <p className="text-[11px] text-stone-400">{subtitle}</p>
//           </div>
//         </div>

//         {/* Center — Shiv Sena logo */}
//         <div className="absolute-right">
//           <img
//             src={ShivSenaLogo}
//             alt="शिवसेना"
//             className="h-10 w-auto object-contain"
//             style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))" }}
//           />
//         </div>

        
//       </div>

//       {/* ── Bottom accent line ── */}
//       <div
//         className="h-[3px] w-full"
//         style={{
//           background: "linear-gradient(90deg, #EA580C, #FBBF24, #EA580C)",
//         }}
//       />

//     </header>
//   );
// }










// src/components/ModuleNavbar.jsx

import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ShivSenaLogo from "../assets/shivsenalogo.png";
import EknathShinde from "../assets/eknathshinde.jpg";

export default function ModuleNavbar({ config }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { title, subtitle } = config;

  return (
    <header
      className="flex-shrink-0 border-b border-orange-200"
      style={{
        background:
          "linear-gradient(135deg, #fff7ed 0%, #fff 50%, #fff7ed 100%)",
      }}
    >
      <div className="flex items-center justify-between px-5 py-2.5">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/home")}
            aria-label={t("common.back")}
            className="w-8 h-8 rounded-lg border border-orange-200 flex items-center justify-center text-orange-500 hover:bg-orange-50 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-full p-[2px]"
              style={{
                background:
                  "linear-gradient(135deg,#EA580C,#FBBF24)",
              }}
            >
              <img
                src={EknathShinde}
                alt={t("common.cm")}
                className="w-full h-full rounded-full object-cover object-top"
              />
            </div>
          </div>

          <div className="hidden md:block">
            <h1 className="text-[14px] font-semibold text-stone-800">
              {t(title)}
            </h1>

            <p className="text-[11px] text-stone-400">
              {t(subtitle)}
            </p>
          </div>
        </div>

        {/* Right */}
        <img
          src={ShivSenaLogo}
          alt={t("common.party")}
          className="h-10 w-auto object-contain"
          style={{
            filter:
              "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
          }}
        />
      </div>

      <div
        className="h-[3px] w-full"
        style={{
          background:
            "linear-gradient(90deg,#EA580C,#FBBF24,#EA580C)",
        }}
      />
    </header>
  );
}

