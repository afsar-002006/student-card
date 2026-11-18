import { initials } from "../data/studentData";
export default function Avatar({ student, size = 36 }) {
  return student.photo ? (
    <img src={student.photo} alt={student.name} style={{ width: size, height: size }} className="rounded-full object-cover" />
  ) : (
    <span style={{ width: size, height: size }} className="inline-flex items-center justify-center rounded-full bg-sky text-xs font-semibold text-primary">
      {initials(student.name)}
    </span>
  );
}
