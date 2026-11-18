import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import StudentTable from "../components/StudentTable";
import StudentForm from "../components/StudentForm";
import StatusBadge from "../components/StatusBadge";
import Avatar from "../components/Avatar";
import Modal from "../components/Modal";
import { departments, validTill } from "../data/studentData";

export default function Students({ students, onUpdate, onDelete }) {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("");
  const [viewing, setViewing] = useState(null);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const list = students.filter((s) =>
    (!dept || s.department === dept) &&
    (s.name + s.regNo).toLowerCase().includes(q.trim().toLowerCase()));

  const details = (s) => [["Register Number", s.regNo], ["Department", s.department], ["Academic Year", s.academicYear], ["Year / Semester", `${s.year} / ${s.semester}`], ["Section", s.section], ["Date of Birth", s.dob], ["Blood Group", s.bloodGroup], ["Email", s.email], ["Phone", s.phone], ["Card validity", validTill(s)]];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <SearchBar value={q} onChange={setQ} />
        <select className="input sm:max-w-xs" value={dept} onChange={(e) => setDept(e.target.value)} aria-label="Filter by department">
          <option value="">All departments</option>
          {departments.map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>
      <div className="card">
        <StudentTable students={list} onView={setViewing} onEdit={setEditing} onDelete={setDeleting} onCard={(s) => nav(`/generate-card?id=${s.id}`)} />
      </div>

      {viewing && (
        <Modal title="Student details" onClose={() => setViewing(null)}>
          <div className="mb-4 flex items-center gap-4">
            <Avatar student={viewing} size={64} />
            <div><p className="text-lg font-semibold">{viewing.name}</p><StatusBadge status={viewing.status} /></div>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            {details(viewing).map(([k, v]) => (<div key={k}><dt className="text-xs text-muted">{k}</dt><dd className="text-sm font-medium">{v}</dd></div>))}
          </dl>
        </Modal>
      )}

      {editing && (
        <Modal title="Edit student" onClose={() => setEditing(null)}>
          <StudentForm initial={editing} existing={students} submitLabel="Save changes"
            onSubmit={(d) => { onUpdate(d); setEditing(null); }} onCancel={() => setEditing(null)} />
        </Modal>
      )}

      {deleting && (
        <Modal title="Delete student?" onClose={() => setDeleting(null)}>
          <p className="text-sm text-muted">This removes <strong className="text-ink">{deleting.name}</strong> from this browser. You can't undo it.</p>
          <div className="mt-5 flex gap-3">
            <button className="btn-danger" onClick={() => { onDelete(deleting.id); setDeleting(null); }}>Delete student</button>
            <button className="btn-outline" onClick={() => setDeleting(null)}>Keep student</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
