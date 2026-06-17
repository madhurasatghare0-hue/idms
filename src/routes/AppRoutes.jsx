// src/routes/AppRoutes.jsx
import { Routes, Route }   from "react-router-dom";
import Home                from "../pages/Home/Home";
import GrievanceRoutes     from "./GrievanceRoutes";
import PerformanceRoutes   from "./PerformanceRoutes";
import FundsRoutes         from "./FundsRoutes";
import CommunicationRoutes from "./CommunicationRoutes";
import VoterRoutes         from "./VoterRoutes";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Landing from "../pages/Landing/Landing";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

  <Route path="/login" element={<Login />} />

  <Route path="/register" element={<Register />} />

<Route path="/home" element={<Home />} />      <Route path="/grievance/*"     element={<GrievanceRoutes />}     />
      <Route path="/performance/*"   element={<PerformanceRoutes />}   />
      <Route path="/funds/*"         element={<FundsRoutes />}         />
      <Route path="/communication/*" element={<CommunicationRoutes />} />
      <Route path="/voter/*"         element={<VoterRoutes />}         />
    </Routes>
  );
}