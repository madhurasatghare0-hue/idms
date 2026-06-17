// src/routes/PerformanceRoutes.jsx
import { Routes, Route }     from "react-router-dom";
import ModuleLayout          from "../layouts/ModuleLayout";
import { performanceConfig } from "../config/moduleConfigs";
import Dashboard             from "../pages/Performance/Dashboard";
import Representatives       from "../pages/Performance/Representatives";
// import MaharashtraMapPage from "../pages/Performance/MaharashtraMapPage";


export default function PerformanceRoutes() {
  return (
    <ModuleLayout
      sidebarConfig={performanceConfig.sidebar}
      navbarConfig={performanceConfig.navbar}
    >
      <Routes>
        <Route index                  element={<Dashboard />}       />
        <Route path="representatives" element={<Representatives />} />
        {/* <Route path="map" element={<MaharashtraMapPage />} /> */}
      </Routes>
    </ModuleLayout>
  );
}