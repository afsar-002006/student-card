import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, UserPlus, IdCard, Settings, X } from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/students", label: "Students", icon: Users },
  { to: "/add-student", label: "Add Student", icon: UserPlus },
  { to: "/generate-card", label: "Generate ID Card", icon: IdCard },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-ink/30 lg:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-white transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <img src="/college-logo.png" alt="College logo" className="h-10 w-10" />
          <div className="leading-tight">
            <p className="text-sm font-semibold text-navy">MSAJCE</p>
            <p className="text-xs text-muted">Student Cards</p>
          </div>
          <button className="ml-auto lg:hidden" onClick={onClose} aria-label="Close menu"><X size={18} /></button>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={onClose}
              className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? "bg-sky text-primary" : "text-muted hover:bg-page hover:text-ink"}`}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
