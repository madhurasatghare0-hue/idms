// src/routes/VoterRoutes.jsx
import { Routes, Route } from "react-router-dom";
import ModuleLayout      from "../layouts/ModuleLayout";
import { voterConfig }   from "../config/moduleConfigs";
import Dashboard         from "../pages/Voter/Dashboard";
import Voters from "../pages/Voter/Voters";
import Booths from "../pages/Voter/Booths";
import Birthdays from "../pages/Voter/Birthdays";
import Events from "../pages/Voter/Events";

export default function VoterRoutes() {
  return (
    <ModuleLayout
      sidebarConfig={voterConfig.sidebar}
      navbarConfig={voterConfig.navbar}
    >
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="voters" element={<Voters/>} />
        <Route path="booths" element={<Booths />} />
        <Route path="birthdays" element={<Birthdays />} /> 
        <Route path="events" element={<Events />} />       
</Routes>
    </ModuleLayout>
  );
}