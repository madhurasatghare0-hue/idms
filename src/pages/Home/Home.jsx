import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Bg from "../../assets/bg.png";
import ShivSenaLogo from "../../assets/shivsenalogo.png";
import EknathShinde from "../../assets/eknathshinde.jpg";
import LanguageToggle from "../../components/LanguageToggle";

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const stats = [
    {
      icon: "ti-layout-grid",
      num: "5",
      label: t("home.stats.activeModules"),
    },
    {
      icon: "ti-chart-dots",
      num: "12",
      label: t("home.stats.liveDashboards"),
    },
    {
      icon: "ti-users-group",
      num: "5",
      label: t("home.stats.teamWorking"),
    },
  ];

  const homeCards = t("home.cards", {
    returnObjects: true,
  });

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />

      <div className="fixed top-5 right-5 z-[9999] flex items-center gap-3">
        <LanguageToggle/>
  
  
      </div>

      

      <main className="relative z-10 flex flex-col items-center px-6 pt-4 pb-10">

        <div className="relative mb-1">
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 70%)",
              transform: "scale(1.5)",
            }}
          />

          <div
            className="w-30 h-30 rounded-full p-[3px]"
            style={{
              background:
                "linear-gradient(135deg,#EA580C,#FBBF24,#EA580C)",
            }}
          >
            <div className="w-full h-full rounded-full p-[2px] bg-white">
              <img
                src={EknathShinde}
                alt="Eknath Shinde"
                className="w-full h-full rounded-full object-top"
              />
            </div>
          </div>
        </div>

        <img
          src={ShivSenaLogo}
          alt="Shiv Sena"
          className="object-contain drop-shadow-sm"
        />

        

        <h1 className="text-5xl font-black text-center mb-3 leading-tight">
          {t("home.title")}{" "}
          <span className="text-orange-500">
            {t("home.titleHighlight")}
          </span>
        </h1>

        <p className="text-[13px] text-center max-w-lg mb-8 leading-relaxed">
          {t("home.description")}
        </p>

        {/* Stats */}

        {/* <div className="flex flex-wrap justify-center gap-4 mb-10">
          {stats.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/80 border border-orange-200 shadow-sm"
            >
              <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                <i className={`ti ${item.icon} text-lg text-orange-500`} />
              </div>

              <div>
                <p className="text-xl font-black">{item.num}</p>
                <p className="text-[11px] text-gray-500">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div> */}

        {/* Cards */}

        <div className="w-full max-w-5xl space-y-5">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {homeCards.slice(0, 3).map((card) => (
              <ModuleCard
                key={card.id}
                card={card}
                navigate={navigate}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:w-2/3 mx-auto">
            {homeCards.slice(3, 5).map((card) => (
              <ModuleCard
                key={card.id}
                card={card}
                navigate={navigate}
              />
            ))}
          </div>

        </div>

        <p className="text-center text-[11px] text-orange-400 mt-10">
          {t("home.footer")}
        </p>

      </main>
    </div>
  );
}

function ModuleCard({ card, navigate }) {
  return (
    <div
      onClick={() => navigate(card.route)}
      className="cursor-pointer rounded-2xl overflow-hidden bg-white border border-orange-200 shadow-sm hover:shadow-lg transition-all"
    >
      <div className="h-1 bg-gradient-to-r from-orange-500 to-yellow-400" />

      <div className="p-5 space-y-4">

        <div className="flex justify-between">

          <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center">
            <i className={`ti ${card.icon} text-white text-xl`} />
          </div>

          <span className="font-black text-orange-300">
            {card.num}
          </span>

        </div>

        <div>

          <h3 className="font-bold text-[15px]">
            {card.title}
          </h3>

          <p className="text-[12px] text-gray-500 mt-2">
            {card.description}
          </p>

        </div>

        <div className="flex justify-between items-center pt-3 border-t">

          <div className="flex gap-2 flex-wrap">
            {card.tag.split("•").map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px]"
              >
                {tag.trim()}
              </span>
            ))}
          </div>

          <i className="ti ti-arrow-right text-orange-500" />

        </div>

      </div>
    </div>
  );
}

