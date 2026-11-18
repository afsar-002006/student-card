import { useState } from "react";
import { Save, RotateCcw } from "lucide-react";
import { defaultCollege, sampleStudents } from "../data/studentData";

export default function Settings({ college, onSaveCollege, onResetData }) {
  const [c, setC] = useState(college);
  const [msg, setMsg] = useState("");
  const set = (k) => (e) => setC({ ...c, [k]: e.target.value });
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <form className="card space-y-4 p-6" onSubmit={(e) => { e.preventDefault(); onSaveCollege(c); setMsg("Settings saved."); }}>
        <h2 className="text-lg font-semibold">College details on the ID card</h2>
        <div><label className="label">College name</label><input className="input" value={c.name} onChange={set("name")} /></div>
        <div><label className="label">Address</label><input className="input" value={c.address} onChange={set("address")} /></div>
        <div><label className="label">Signature label</label><input className="input" value={c.principal} onChange={set("principal")} /></div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="btn-primary" type="submit"><Save size={16} /> Save settings</button>
          <button className="btn-outline" type="button" onClick={() => setC(defaultCollege)}>Restore defaults</button>
          {msg && <span className="text-sm text-success">{msg}</span>}
        </div>
      </form>
      <div className="card p-6">
        <h2 className="text-lg font-semibold">Sample data</h2>
        <p className="mt-1 text-sm text-muted">Replace every student in this browser with the {sampleStudents.length} sample students.</p>
        <button className="btn-danger mt-4" onClick={() => window.confirm("Replace all students with sample data?") && onResetData()}><RotateCcw size={16} /> Reset to sample data</button>
      </div>
    </div>
  );
}
