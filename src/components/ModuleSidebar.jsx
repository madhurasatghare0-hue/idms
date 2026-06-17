// src/components/ModuleSidebar.jsx

import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ShivSenaLogo from "../assets/shivsenalogo.png";
import EknathShinde from "../assets/eknathshinde.jpg";

export default function ModuleSidebar({ config }) {
  const { brandSub, navItems, basePath } = config;

  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <aside
      className="w-60 flex flex-col flex-shrink-0 h-full border-r border-orange-200 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #FFF7ED 0%, #ffffff 50%, #FFF7ED 100%)",
      }}
    >
      {/* ───────── Brand Header ───────── */}

      <div
        className="flex flex-col items-center px-4 pt-5 pb-4 border-b border-orange-100 cursor-pointer relative"
        onClick={() => navigate("/")}
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20px 20px, #EA580C 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        <img
          src={ShivSenaLogo}
          alt={t("common.party")}
          className="h-9 w-auto object-contain mb-4 relative z-10"
        />

        {/* Photo */}

        <div className="relative flex items-center justify-center mb-3 z-10">
          <div
            className="absolute w-20 h-20 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, #EA580C, transparent)",
            }}
          />

          <div
            className="absolute w-[72px] h-[72px] rounded-full border-2 border-dashed border-orange-300 opacity-40"
            style={{
              animation: "spin 12s linear infinite",
            }}
          />

          <div
            className="w-16 h-16 rounded-full p-[2.5px]"
            style={{
              background:
                "linear-gradient(135deg,#EA580C 0%,#FBBF24 50%,#EA580C 100%)",
            }}
          >
            <div className="w-full h-full rounded-full p-[2px] bg-white">
              <img
                src={EknathShinde}
                alt={t("common.cm")}
                className="w-full h-full rounded-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Module Name */}

        <p className="text-xs font-semibold text-orange-600 relative z-10">
          {t(brandSub)}
        </p>
      </div>

      {/* ───────── Navigation ───────── */}

      <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={path}
            to={`${basePath}${path}`}
            end={path === ""}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                isActive
                  ? "text-orange-700 font-semibold"
                  : "text-stone-500 hover:text-orange-600"
              }`
            }
            style={({ isActive }) =>
              isActive
                ? {
                    background:
                      "linear-gradient(135deg,#FFF7ED 0%,#FFEDD5 100%)",
                    border: "0.5px solid #FDBA74",
                    boxShadow: "0 2px 8px rgba(234,88,12,.08)",
                  }
                : {
                    border: "0.5px solid transparent",
                  }
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(135deg,#EA580C,#FB923C)",
                          boxShadow: "0 2px 6px rgba(234,88,12,.35)",
                        }
                      : {
                          background: "#FFF7ED",
                        }
                  }
                >
                  <Icon
                    size={14}
                    style={{
                      color: isActive ? "#fff" : "#FB923C",
                    }}
                  />
                </div>

                {/* translated label */}

                <span className="flex-1 text-[13px]">{t(label)}</span>

                {isActive && (
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg,#EA580C,#FBBF24)",
                    }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom line */}

      <div
        className="h-[2px]"
        style={{
          background:
            "linear-gradient(90deg,transparent,#EA580C,#FBBF24,#EA580C,transparent)",
        }}
      />

      {/* Footer */}

      <div
        className="flex items-center justify-center gap-2 px-4 py-3"
        style={{
          background: "rgba(255,247,237,.8)",
        }}
      >
        <img
          src={ShivSenaLogo}
          alt=""
          className="h-4 opacity-50"
          aria-hidden="true"
        />

        <p
          className="text-[10px] text-orange-400 font-medium"
          style={{
            fontFamily: "'Noto Sans Devanagari', sans-serif",
          }}
        >
          {t("common.commandCentre")}
        </p>
      </div>
    </aside>
  );
}