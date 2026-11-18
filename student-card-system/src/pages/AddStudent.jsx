import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import StudentForm from "../components/StudentForm";

export default function AddStudent({ students, onAdd }) {
  const [saved, setSaved] = useState(null);
  const handleSave = (data) => {
    onAdd({ ...data, id: `s${Date.now()}`, cardGenerated: false });
    setSaved(data.name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {saved && (
        <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-success" role="status">
          <CheckCircle2 size={18} />
          <span><strong>{saved}</strong> was saved.</span>
          <Link to="/students" className="ml-auto font-medium underline">View students</Link>
        </div>
      )}
      <div className="card p-6">
        <h2 className="mb-5 text-lg font-semibold">Student registration</h2>
        <StudentForm onSubmit={handleSave} existing={students} />
      </div>
    </div>
  );
}
