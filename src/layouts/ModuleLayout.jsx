import ModuleSidebar from "../components/ModuleSidebar";
import ModuleNavbar  from "../components/ModuleNavbar";

export default function ModuleLayout({ children, sidebarConfig, navbarConfig }) {
  return (
    <div className="flex h-screen bg-orange-50 overflow-hidden">
      <ModuleSidebar config={sidebarConfig} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <ModuleNavbar config={navbarConfig} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}