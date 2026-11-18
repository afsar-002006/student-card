import { Search } from "lucide-react";
export default function SearchBar({ value, onChange, placeholder = "Search by name or register number" }) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
      <input className="input pl-9" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}
