import { useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Download, Printer, Eye, Wand2 } from "lucide-react";
import StudentCardPreview from "../components/StudentCardPreview";
import Modal from "../components/Modal";
import { downloadCardPdf } from "../utils/exportCard";

export default function GenerateCard({ students, college, onGenerated }) {
  const [params, setParams] = useSearchParams();
  const [showPreview, setShowPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const cardRef = useRef(null);

  const student = students.find((s) => s.id === params.get("id")) || students[0];
  if (!student) {
    return <div className="card p-8 text-center text-sm text-muted">No students yet. <Link to="/add-student" className="font-medium text-primary underline">Add a student</Link> to generate an ID card.</div>;
  }

  const generate = () => { onGenerated(student.id); setNote(`ID card generated for ${student.name}.`); };
  const download = async () => {
    setBusy(true);
    try { await downloadCardPdf(cardRef.current, `${student.regNo}-id-card`); onGenerated(student.id); setNote("PDF downloaded."); }
    catch { setNote("Could not create the PDF. Try again."); }
    setBusy(false);
  };

  return (
    <div className="space-y-5">
      <div className="card flex flex-col gap-4 p-5 lg:flex-row lg:items-end">
        <div className="flex-1">
          <label className="label" htmlFor="pick">Select student</label>
          <select id="pick" className="input" value={student.id} onChange={(e) => { setParams({ id: e.target.value }); setNote(""); }}>
            {students.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.regNo})</option>)}
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn-primary" onClick={generate}><Wand2 size={16} /> Generate ID Card</button>
          <button className="btn-outline" onClick={() => setShowPreview(true)}><Eye size={16} /> Preview</button>
          <button className="btn-outline" onClick={download} disabled={busy}><Download size={16} /> {busy ? "Creating PDF..." : "Download PDF"}</button>
          <button className="btn-outline" onClick={() => window.print()}><Printer size={16} /> Print</button>
        </div>
      </div>
      {note && <p className="rounded-lg bg-sky px-4 py-2 text-sm text-primary" role="status">{note}</p>}

      <div className="card p-4 sm:p-6">
        <p className="mb-4 text-sm text-muted">Live preview. It updates as soon as you pick another student.</p>
        <StudentCardPreview student={student} college={college} cardRef={cardRef} printable />
      </div>

      {showPreview && (
        <Modal wide title={`Preview: ${student.name}`} onClose={() => setShowPreview(false)}>
          <StudentCardPreview student={student} college={college} />
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="btn-primary" onClick={download} disabled={busy}><Download size={16} /> Download PDF</button>
            <button className="btn-outline" onClick={() => window.print()}><Printer size={16} /> Print</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
