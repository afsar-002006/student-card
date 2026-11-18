import { Eye, Pencil, Trash2, IdCard } from "lucide-react";
import Avatar from "./Avatar";
import StatusBadge from "./StatusBadge";

export default function StudentTable({ students, onView, onEdit, onDelete, onCard }) {
  const hasActions = onView || onEdit || onDelete || onCard;
  const Btn = ({ onClick, icon: Icon, label, danger }) => (
    <button onClick={onClick} title={label} aria-label={label}
      className={`rounded-lg p-2 ${danger ? "text-danger hover:bg-red-50" : "text-muted hover:bg-sky hover:text-primary"}`}>
      <Icon size={16} />
    </button>
  );
  if (!students.length) return <p className="p-8 text-center text-sm text-muted">No students found. Add a student or change your search.</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-line bg-page text-muted">
          <tr>{["Photo", "Student Name", "Register Number", "Department", "Year", "Status", hasActions && "Actions"].filter(Boolean).map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-b border-line last:border-0 hover:bg-page/60">
              <td className="px-4 py-3"><Avatar student={s} /></td>
              <td className="px-4 py-3 font-medium">{s.name}</td>
              <td className="px-4 py-3 text-muted">{s.regNo}</td>
              <td className="px-4 py-3">{s.department}</td>
              <td className="px-4 py-3">{s.year}</td>
              <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
              {hasActions && (
                <td className="px-4 py-3"><div className="flex gap-1">
                  {onView && <Btn onClick={() => onView(s)} icon={Eye} label="View details" />}
                  {onEdit && <Btn onClick={() => onEdit(s)} icon={Pencil} label="Edit student" />}
                  {onCard && <Btn onClick={() => onCard(s)} icon={IdCard} label="Generate ID card" />}
                  {onDelete && <Btn onClick={() => onDelete(s)} icon={Trash2} label="Delete student" danger />}
                </div></td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
