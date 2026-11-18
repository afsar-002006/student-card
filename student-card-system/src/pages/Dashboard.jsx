import { Link } from "react-router-dom";
import { UserPlus, Users, IdCard } from "lucide-react";
import DashboardStats from "../components/DashboardStats";
import StudentTable from "../components/StudentTable";
import { departments } from "../data/studentData";

export default function Dashboard({ students }) {
  const recent = [...students].slice(-5).reverse();
  const counts = departments.map((d) => ({ d, n: students.filter((s) => s.department === d).length }));
  const max = Math.max(1, ...counts.map((c) => c.n));
  return (
    <div className="space-y-6">
      <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Welcome back, Administrator</h2>
          <p className="mt-1 text-sm text-muted">Add students, review records and print identity cards from one place.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/add-student" className="btn-primary"><UserPlus size={16} /> Add Student</Link>
          <Link to="/students" className="btn-outline"><Users size={16} /> View Students</Link>
          <Link to="/generate-card" className="btn-outline"><IdCard size={16} /> Generate ID Card</Link>
        </div>
      </div>

      <DashboardStats students={students} />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="card xl:col-span-2">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h3 className="font-semibold">Recent students</h3>
            <Link to="/students" className="text-sm font-medium text-primary hover:underline">View all</Link>
          </div>
          <StudentTable students={recent} />
        </div>
        <div className="card p-5">
          <h3 className="mb-4 font-semibold">Students by department</h3>
          <ul className="space-y-4">
            {counts.map(({ d, n }) => (
              <li key={d}>
                <div className="mb-1 flex justify-between text-sm"><span>{d}</span><span className="font-medium">{n}</span></div>
                <div className="h-2 rounded-full bg-sky"><div className="h-2 rounded-full bg-primary" style={{ width: `${(n / max) * 100}%` }} /></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
