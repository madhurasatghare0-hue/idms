// src/config/moduleConfigs.js
import {
  LayoutDashboard, ClipboardList, BarChart2, FileText,
  Users, Trophy, TrendingUp,
  Banknote, FolderKanban, Receipt,
  MessageSquare, Mail, Phone, Megaphone,
  UserCheck, MapPin, HandHelping, CalendarDays,
  Cake,
} from "lucide-react";

export const grievanceConfig = {
  sidebar: {
  brandName: "IDMS",
  brandSub: "modules.grievance",
  basePath: "/grievance",
  navItems: [
    {
      label: "common.dashboard",
      icon: LayoutDashboard,
      path: "",
    },
    {
      label: "grievance.allComplaints",
      icon: ClipboardList,
      path: "/complaints",
    },
    {
      label: "grievance.analytics",
      icon: BarChart2,
      path: "/analytics",
    },
  ],
},
  navbar: {
  title: "grievance.navbar.title",
  subtitle: "grievance.navbar.subtitle",
},
};

export const performanceConfig = {
  sidebar: {
  brandName: "IDMS",
  brandSub: "modules.performance",
  basePath: "/performance",
  navItems: [
    {
      label: "common.dashboard",
      icon: LayoutDashboard,
      path: "",
    },
    {
      label: "performance.representatives",
      icon: Users,
      path: "/representatives",
    },
    // {
    //   label: "performance.map",
    //   icon: MapPin,
    //   path: "/map",
    // },
  ],
},
  navbar: {
  title: "performance.navbar.title",
  subtitle: "performance.navbar.subtitle",
},
};

export const fundsConfig = {
  sidebar: {
  brandName: "IDMS",
  brandSub: "modules.funds",
  basePath: "/funds",
  navItems: [
    {
      label: "common.dashboard",
      icon: LayoutDashboard,
      path: "",
    },
    {
      label: "funds.allocation",
      icon: Banknote,
      path: "/allocation",
    },
    {
      label: "funds.projects",
      icon: FolderKanban,
      path: "/projects",
    },
  ],
},
  navbar: {
  title: "funds.navbar.title",
  subtitle: "funds.navbar.subtitle",
},
};

export const communicationConfig = {
  sidebar: {
  brandName: "IDMS",
  brandSub: "modules.communication",
  basePath: "/communication",
  navItems: [
    {
      label: "common.dashboard",
      icon: LayoutDashboard,
      path: "",
    },
    {
      label: "communication.taskManagement",
      icon: Phone,
      path: "/taskmanagement",
    },
  ],
},
  navbar: {
  title: "communication.navbar.title",
  subtitle: "communication.navbar.subtitle",
},
};

export const voterConfig = {
  sidebar: {
  brandName: "IDMS",
  brandSub: "modules.voter",
  basePath: "/voter",
  navItems: [
    {
      label: "common.dashboard",
      icon: LayoutDashboard,
      path: "",
    },
    {
      label: "voter.voters",
      icon: UserCheck,
      path: "/voters",
    },
    {
      label: "voter.booths",
      icon: MapPin,
      path: "/booths",
    },
    {
      label: "voter.birthdays",
      icon: Cake,
      path: "/birthdays",
    },
    {
      label: "voter.events",
      icon: CalendarDays,
      path: "/events",
    },
  ],
},
  navbar: {
  title: "voter.navbar.title",
  subtitle: "voter.navbar.subtitle",
},
};