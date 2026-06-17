import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User, Mail, AtSign, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import ShivSenaLogo from "../../assets/shivsenalogo.png";
import Bg from "../../assets/bg.png";
import LanguageToggle from "../../components/LanguageToggle";

import Balasaheb from "../../assets/balasaheb.jpg";
import AnandDighe from "../../assets/ananddighe.jpg";
import EknathShinde from "../../assets/eknathshinde.jpg";
import eknathshindelogin from "../../assets/eknathshindelogin.png";

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  return (
    <div
      className="min-h-screen relative flex items-center justify-center px-5 overflow-hidden"
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Ambient wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,247,237,0.55) 0%, rgba(255,237,213,0.65) 45%, rgba(234,88,12,0.18) 100%)",
        }}
      />

      {/* Drifting saffron embers */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { top: "12%", left: "8%", size: 6, delay: "0s", dur: "9s" },
          { top: "70%", left: "14%", size: 4, delay: "2s", dur: "11s" },
          { top: "30%", left: "92%", size: 5, delay: "1s", dur: "10s" },
          { top: "82%", left: "85%", size: 3, delay: "3.5s", dur: "8s" },
          { top: "50%", left: "4%", size: 3, delay: "4s", dur: "12s" },
        ].map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              background: "radial-gradient(circle, #FB923C 0%, rgba(251,146,60,0) 70%)",
              animation: `ember-float ${p.dur} ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Top header — leaders + language toggle */}
      <div className="fixed top-5 left-0 right-0 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center -space-x-3">
          <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-br from-orange-500 to-yellow-400 shadow-lg">
            <img src={Balasaheb} alt="Balasaheb" className="w-full h-full rounded-full object-cover bg-white p-[2px]" />
          </div>
          <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-br from-orange-500 to-yellow-400 shadow-lg">
            <img src={AnandDighe} alt="Anand Dighe" className="w-full h-full rounded-full object-cover bg-white p-[2px]" />
          </div>
          
        </div>
        <LanguageToggle />
      </div>

      {/* Two-column wrapper */}
      <div className="relative w-full max-w-[820px] flex items-center justify-center gap-0 z-10">

        {/* ── Register card ── */}
        <div
          className="w-full max-w-[400px] bg-white/95 backdrop-blur-sm rounded-[24px] overflow-hidden z-10 border border-white/60"
          style={{
            boxShadow:
              "0 1px 2px rgba(154,52,18,0.06), 0 24px 48px -12px rgba(154,52,18,0.28), 0 0 0 1px rgba(255,255,255,0.4) inset",
          }}
        >
          {/* Top gradient strip with shimmer */}
          <div
            className="h-[3px] w-full relative overflow-hidden"
            style={{ background: "linear-gradient(90deg, #C2410C, #EA580C, #FBBF24, #EA580C, #C2410C)" }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                animation: "shimmer 3.5s ease-in-out infinite",
              }}
            />
          </div>

          <div className="px-8 pt-9 pb-7">

            {/* Logo */}
            <div className="flex justify-center mb-1">
              <img src={ShivSenaLogo} alt="Shiv Sena Logo" className="w-56 h-auto object-contain" />
            </div>

            {/* Heading */}
            <h2 className="text-[22px] font-semibold text-center text-stone-800 mb-1 tracking-tight">
              {t("auth.register")}
            </h2>
            <p className="text-center text-[13px] text-stone-400 mb-7">
              {t("auth.createAccount")}
            </p>

            {/* Form */}
            <form className="space-y-4">

              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">
                  {t("auth.fullName")}
                </label>
                <div
                  className="relative rounded-xl transition-all duration-200"
                  style={{
                    boxShadow: focusedField === "name"
                      ? "0 0 0 3px rgba(234,88,12,0.12)"
                      : "0 0 0 0px rgba(234,88,12,0)",
                  }}
                >
                  <User size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "name" ? "text-orange-500" : "text-orange-300"}`} />
                  <input
                    type="text"
                    placeholder={t("auth.enterFullName")}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-orange-50/70 border border-orange-100 rounded-xl pl-10 pr-3 py-2.5 text-sm text-stone-700 placeholder:text-stone-300 outline-none focus:border-orange-400 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">
                  {t("auth.email")}
                </label>
                <div
                  className="relative rounded-xl transition-all duration-200"
                  style={{
                    boxShadow: focusedField === "email"
                      ? "0 0 0 3px rgba(234,88,12,0.12)"
                      : "0 0 0 0px rgba(234,88,12,0)",
                  }}
                >
                  <Mail size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "email" ? "text-orange-500" : "text-orange-300"}`} />
                  <input
                    type="email"
                    placeholder={t("auth.enterEmail")}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-orange-50/70 border border-orange-100 rounded-xl pl-10 pr-3 py-2.5 text-sm text-stone-700 placeholder:text-stone-300 outline-none focus:border-orange-400 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">
                  {t("auth.username")}
                </label>
                <div
                  className="relative rounded-xl transition-all duration-200"
                  style={{
                    boxShadow: focusedField === "user"
                      ? "0 0 0 3px rgba(234,88,12,0.12)"
                      : "0 0 0 0px rgba(234,88,12,0)",
                  }}
                >
                  <AtSign size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "user" ? "text-orange-500" : "text-orange-300"}`} />
                  <input
                    type="text"
                    placeholder={t("auth.enterUsername")}
                    onFocus={() => setFocusedField("user")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-orange-50/70 border border-orange-100 rounded-xl pl-10 pr-3 py-2.5 text-sm text-stone-700 placeholder:text-stone-300 outline-none focus:border-orange-400 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">
                  {t("auth.password")}
                </label>
                <div
                  className="relative rounded-xl transition-all duration-200"
                  style={{
                    boxShadow: focusedField === "pass"
                      ? "0 0 0 3px rgba(234,88,12,0.12)"
                      : "0 0 0 0px rgba(234,88,12,0)",
                  }}
                >
                  <Lock size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "pass" ? "text-orange-500" : "text-orange-300"}`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("auth.enterPassword")}
                    onFocus={() => setFocusedField("pass")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-orange-50/70 border border-orange-100 rounded-xl pl-10 pr-10 py-2.5 text-sm text-stone-700 placeholder:text-stone-300 outline-none focus:border-orange-400 focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300 hover:text-orange-500 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="group w-full relative text-white text-sm font-medium rounded-xl py-3 transition-all duration-200 hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #C2410C, #EA580C 50%, #FB923C)",
                  boxShadow: "0 4px 14px rgba(234,88,12,0.35)",
                }}
              >
                <span>{t("auth.registerButton")}</span>
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-2.5 my-5">
              <div className="flex-1 h-px bg-orange-100" />
              <span className="text-[11px] text-stone-300">{t("auth.or", "OR")}</span>
              <div className="flex-1 h-px bg-orange-100" />
            </div>

            {/* Login link */}
            <p className="text-center text-sm text-stone-500">
              {t("auth.haveAccount")}{" "}
              <Link to="/login" className="text-orange-600 font-semibold hover:text-orange-700">
                {t("auth.login")}
              </Link>
            </p>
          </div>

          {/* Bottom strip */}
          <div className="bg-orange-50 border-t border-orange-100 py-3.5 flex items-center justify-center gap-2">
            <img src={ShivSenaLogo} alt="" className="h-4 w-auto opacity-60" aria-hidden="true" />
            <p className="text-[11px] font-medium text-orange-400 tracking-wide">गव्हर्नन्स कमांड सेंटर</p>
          </div>
        </div>
      </div>

      {/* Floating Right Image with soft glow base */}
      <div className="hidden lg:block fixed bottom-0 right-8 z-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(251,146,60,0.35) 0%, rgba(251,146,60,0) 70%)",
            transform: "translate(10%, 30%)",
          }}
        />
        <img
          src={eknathshindelogin}
          alt="मा. एकनाथ शिंदे"
          className="relative h-[650px] w-auto object-contain"
          style={{ filter: "drop-shadow(0 30px 40px rgba(120,53,15,0.25))" }}
        />
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-120%); }
          50% { transform: translateX(120%); }
          100% { transform: translateX(120%); }
        }
        @keyframes ember-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.5; }
          50% { transform: translateY(-18px) translateX(6px); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}