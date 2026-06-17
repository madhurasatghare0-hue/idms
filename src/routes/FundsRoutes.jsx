// src/routes/FundsRoutes.jsx
import { Routes, Route } from "react-router-dom";
import ModuleLayout    from "../layouts/ModuleLayout";
import { fundsConfig } from "../config/moduleConfigs";
import Dashboard       from "../pages/Funds/Dashboard";
import Allocation      from "../pages/Funds/Allocation";
import Projects from "../pages/Funds/Projects";

export default function FundsRoutes() {
  return (
    <ModuleLayout
      sidebarConfig={fundsConfig.sidebar}
      navbarConfig={fundsConfig.navbar}
    >
      <Routes>
        <Route index             element={<Dashboard />}  />
        <Route path="allocation" element={<Allocation />} />
        <Route path="projects" element={<Projects />} />

      </Routes>
    </ModuleLayout>
  );
}