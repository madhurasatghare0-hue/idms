// src/routes/GrievanceRoutes.jsx
import { Routes, Route } from "react-router-dom";
import ModuleLayout        from "../layouts/ModuleLayout";
import { grievanceConfig } from "../config/moduleConfigs";
import Dashboard           from "../pages/Grievance/Dashboard";
import AllComplaints       from "../pages/Grievance/AllComplaints";
import Analytics           from "../pages/Grievance/Analytics";
import Reports             from "../pages/Grievance/Reports";

export default function GrievanceRoutes() {
  return (
    <ModuleLayout
      sidebarConfig={grievanceConfig.sidebar}
      navbarConfig={grievanceConfig.navbar}
    >
      <Routes>
        <Route index             element={<Dashboard />}     />
        <Route path="complaints" element={<AllComplaints />} />
        <Route path="analytics"  element={<Analytics />}     />
        {/* <Route path="reports"    element={<Reports />}       /> */}
      </Routes>
    </ModuleLayout>
  );
}