import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

const titles = { "/": "Dashboard", "/students": "Students", "/add-student": "Add Student", "/generate-card": "Generate ID Card", "/settings": "Settings" };

export default function Navbar({ onMenu }) {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-white/90 px-4 py-3 backdrop-blur sm:px-8">
      <button className="rounded-lg p-2 hover:bg-sky lg:hidden" onClick={onMenu} aria-label="Open menu"><Menu size={20} /></button>
      <h1 className="text-lg font-semibold">{titles[pathname] || "Student Cards"}</h1>
      <span className="ml-auto text-sm text-muted">Administrator</span>
    </header>
  );
}
