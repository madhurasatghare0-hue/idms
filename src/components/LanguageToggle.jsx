import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  return (
    <button
      onClick={() =>
        i18n.changeLanguage(i18n.language === "en" ? "mr" : "en")
      }
      className="
        px-4 py-2
        rounded-xl
        bg-white/80
        backdrop-blur-md
        border border-orange-200
        shadow-lg
        hover:bg-orange-50
        transition-all
        text-sm
        font-semibold
        text-orange-600
      "
    >
      {i18n.language === "en" ? "मराठी" : "English"}
    </button>
  );
}