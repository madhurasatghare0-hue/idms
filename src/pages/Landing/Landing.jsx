// src/pages/Landing/Landing.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ShivSenaLogo from "../../assets/shivsenalogo.png";
import LanguageToggle from "../../components/LanguageToggle";

import slide1 from "../../assets/slide1.avif";
import slide2 from "../../assets/slide2.webp";
import slide3 from "../../assets/slide3.png";
import slide4 from "../../assets/slide4.webp";

const slides = [
  {
  image: slide1,
  title: {
    en: "Hon. Eknath Shinde",
    mr: "मा. एकनाथ शिंदे",
  },
  subtitle: {
    en: "Deputy Chief Minister of Maharashtra",
    mr: "महाराष्ट्राचे उपमुख्यमंत्री",
  },
  quote: {
    en: "Strong leadership, decisive action, and a commitment to serving the people of Maharashtra.",
    mr: "दृढ नेतृत्व, ठाम निर्णय आणि महाराष्ट्राच्या जनतेच्या सेवेसाठी अखंड वचनबद्धता.",
  },
},

  {
    image: slide2,
    title: {
      en: "Development for Every Citizen",
      mr: "प्रत्येक नागरिकासाठी विकास",
    },
    subtitle: {
      en: "Transparent Governance & Digital Transformation",
      mr: "पारदर्शक शासन आणि डिजिटल परिवर्तन",
    },
    quote: {
      en: "A vision where technology strengthens public service.",
      mr: "तंत्रज्ञानाच्या माध्यमातून लोकसेवा अधिक प्रभावी करण्याचा संकल्प.",
    },
  },

  {
    image: slide3,
    title: {
      en: "Building a Strong Maharashtra",
      mr: "सशक्त महाराष्ट्राची उभारणी",
    },
    subtitle: {
      en: "Infrastructure, Innovation & Inclusive Growth",
      mr: "पायाभूत सुविधा, नवकल्पना आणि सर्वसमावेशक विकास",
    },
    quote: {
      en: "Progress is achieved when every citizen moves forward together.",
      mr: "प्रत्येक नागरिकाच्या प्रगतीतच राज्याची खरी प्रगती आहे.",
    },
  },

  {
    image: slide4,
    title: {
      en: "Integrated Decision Management System",
      mr: "इंटिग्रेटेड डिसिजन मॅनेजमेंट सिस्टम",
    },
    subtitle: {
      en: "Smart Governance for a Better Tomorrow",
      mr: "उद्याच्या महाराष्ट्रासाठी स्मार्ट प्रशासन",
    },
    quote: {
      en: "Technology, transparency and teamwork for efficient governance.",
      mr: "कार्यक्षम प्रशासनासाठी तंत्रज्ञान, पारदर्शकता आणि संघभावना.",
    },
  },
];

const AUTO_PLAY_MS = 5000;
const INTRO_HOLD_MS = 1200;
const INTRO_WIPE_MS = 800;

export default function Landing() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [current, setCurrent] = useState(0);

  const [imagesReady, setImagesReady] = useState(false);
  const [introPhase, setIntroPhase] = useState("hold"); // "hold" -> "wiping" -> "done"

  // ── Preload every slide image before allowing the intro to finish ──
  useEffect(() => {
    let loaded = 0;
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.image;
      img.onload = img.onerror = () => {
        loaded += 1;
        if (loaded === slides.length) setImagesReady(true);
      };
    });
  }, []);

  // ── Intro sequence — only starts the timer once images are ready ──
  useEffect(() => {
    if (!imagesReady) return;
    const holdTimer = setTimeout(() => setIntroPhase("wiping"), INTRO_HOLD_MS);
    const doneTimer = setTimeout(() => setIntroPhase("done"), INTRO_HOLD_MS + INTRO_WIPE_MS);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [imagesReady]);

  // ── Slideshow autoplay — starts only after intro is fully done ──
  useEffect(() => {
    if (introPhase !== "done") return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_MS);
    return () => clearInterval(interval);
  }, [introPhase]);

  const goTo = (index) => setCurrent(index);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">

      {/* ── Background slides — stacked, crossfade ── */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${s.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            opacity: current === i ? 1 : 0,
            zIndex: 0,
          }}
        />
      ))}

      {/* ── Dark gradient overlay for text legibility ── */}
      <div
  className="absolute inset-0 z-[1]"
  style={{
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.78) 100%)",
  }}
/>

{/* ── INTRO OVERLAY — Logo appears over the first slide ── */}
{introPhase !== "done" && (
  <div
    className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
    style={{
      background: "rgba(0,0,0,0.15)", // Optional light overlay
      opacity: introPhase === "wiping" ? 0 : 1,
      transition: `opacity ${INTRO_WIPE_MS}ms ease-out`,
    }}
  >
    <img
  src={ShivSenaLogo}
  alt="शिवसेना"
  className="w-[90vw] max-w-[1000px] object-contain"
  style={{
    animation:
      introPhase === "wiping"
        ? `logoZoomOut ${INTRO_WIPE_MS}ms ease-in forwards`
        : "logoPop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
  }}
/>
  </div>
)}

      {/* ── Top bar — logo + language toggle (only after intro) ── */}
      {introPhase === "done" && (
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 animate-fade-quick">
          <img src={ShivSenaLogo} alt="शिवसेना" className="h-10 w-auto object-contain" />
          <LanguageToggle />
        </div>
      )}

      {/* ── Main content (only after intro, only ever on top of a slide) ── */}
      {introPhase === "done" && (
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">

          <div key={current} className="animate-fade max-w-3xl">

            <p className="text-[12px] uppercase tracking-widest text-orange-300 font-semibold mb-4">
              · इंटिग्रेटेड डिझिजन मॅनेजमेंट सिस्टम ·
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {i18n.language === "mr" ? slides[current].title.mr : slides[current].title.en}
            </h1>

            <h3 className="mt-3 text-lg md:text-xl text-orange-300 font-medium">
              {i18n.language === "mr" ? slides[current].subtitle.mr : slides[current].subtitle.en}
            </h3>

            <p className="mt-5 text-base md:text-lg text-gray-200 leading-relaxed italic max-w-xl mx-auto">
              "{i18n.language === "mr" ? slides[current].quote.mr : slides[current].quote.en}"
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-10 px-10 py-3 rounded-xl text-base font-semibold text-white transition-transform duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #EA580C, #FB923C)",
                boxShadow: "0 8px 24px rgba(234,88,12,0.4)",
              }}
            >
              {t("landing.getStarted")}
            </button>
          </div>

          {/* ── Slide indicators + arrows ── */}
          <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-6">

           
            <button
              onClick={() => goTo((current - 1 + slides.length) % slides.length)}
              className="w-9 h-9 rounded-full border border-white/30 text-white/70 hover:text-white hover:border-white/60 flex items-center justify-center transition-colors"
              aria-label="Previous slide"
            >
              ‹
            </button>

            <div className="flex gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`transition-all duration-300 rounded-full ${
                    current === index
                      ? "w-10 h-2 bg-orange-500"
                      : "w-2 h-2 bg-white/50 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

             <button
              onClick={() => goTo((current + 1) % slides.length)}
              className="w-9 h-9 rounded-full border border-white/30 text-white/70 hover:text-white hover:border-white/60 flex items-center justify-center transition-colors"
              aria-label="Next slide"
            >
              ›
            </button>

            
          </div>
        </div>
      )}

     {/* Animations */}
<style>{`
  @keyframes logoPop {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }
    60% {
      opacity: 1;
      transform: scale(1.08);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes logoZoomOut {
    0% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(2.2);
    }
  }
`}</style>
    </div>
  );
}