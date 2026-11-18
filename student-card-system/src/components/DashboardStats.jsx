import { Users, BadgeCheck, Building2, IdCard } from "lucide-react";

export default function DashboardStats({ students }) {
  const stats = [
    { label: "Total Students", value: students.length, icon: Users },
    { label: "Active Cards", value: students.filter((s) => s.status === "Active").length, icon: BadgeCheck },
    { label: "Departments", value: new Set(students.map((s) => s.department)).size, icon: Building2 },
    { label: "Generated Cards", value: students.filter((s) => s.cardGenerated).length, icon: IdCard },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <div key={label} className="card flex items-center gap-4 p-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-sky text-primary"><Icon size={22} /></span>
          <div>
            <p className="text-2xl font-semibold">{value}</p>
            <p className="text-sm text-muted">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
