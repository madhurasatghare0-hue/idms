// src/routes/CommunicationRoutes.jsx
import { Routes, Route }        from "react-router-dom";
import ModuleLayout             from "../layouts/ModuleLayout";
import { communicationConfig }  from "../config/moduleConfigs";
import Dashboard                from "../pages/Communication/Dashboard";
import TaskManagement from "../pages/Communication/TaskManagement";
import MaharashtraMap from "../pages/Communication/MaharashtraMap";

export default function CommunicationRoutes() {
  return (
    <ModuleLayout
      sidebarConfig={communicationConfig.sidebar}
      navbarConfig={communicationConfig.navbar}
    >
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="taskmanagement" element={<TaskManagement/>} />
        {/* <Route path="maharashtramap" element={<MaharashtraMap/>} /> */}

      </Routes>
    </ModuleLayout>
  );
}