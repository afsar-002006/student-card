import { useState } from "react";
import { Upload, Save, RotateCcw } from "lucide-react";
import { departments, bloodGroups } from "../data/studentData";

const empty = { name: "", regNo: "", department: "", academicYear: "", year: "", semester: "", section: "", dob: "", bloodGroup: "", email: "", phone: "", photo: "", status: "Active" };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 3) e.name = "Enter the full name (at least 3 letters).";
  if (!/^[A-Za-z0-9]{6,15}$/.test(v.regNo)) e.regNo = "Use 6-15 letters or digits.";
  if (!v.department) e.department = "Select a department.";
  if (!/^\d{4}-\d{4}$/.test(v.academicYear)) e.academicYear = "Use the format 2025-2026.";
  if (!v.year) e.year = "Select the year.";
  if (!v.semester) e.semester = "Select the semester.";
  if (!/^[A-Za-z]$/.test(v.section)) e.section = "Enter a single letter, e.g. A.";
  if (!v.dob) e.dob = "Select the date of birth.";
  if (!v.bloodGroup) e.bloodGroup = "Select a blood group.";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email address.";
  if (!/^\d{10}$/.test(v.phone)) e.phone = "Enter a 10-digit phone number.";
  return e;
}

export default function StudentForm({ initial, onSubmit, submitLabel = "Save Student", onCancel, existing = [] }) {
  const [v, setV] = useState(initial || empty);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });

  const onPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return setErrors({ ...errors, photo: "Choose an image file." });
    if (file.size > 1024 * 1024) return setErrors({ ...errors, photo: "Photo must be under 1 MB." });
    const r = new FileReader();
    r.onload = () => { setV((p) => ({ ...p, photo: r.result })); setErrors((p) => ({ ...p, photo: undefined })); };
    r.readAsDataURL(file);
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate(v);
    if (!errs.regNo && existing.some((s) => s.regNo.toLowerCase() === v.regNo.toLowerCase() && s.id !== v.id))
      errs.regNo = "This register number already exists.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSubmit({ ...v, name: v.name.trim(), section: v.section.toUpperCase() });
    if (!initial) { setV(empty); }
  };

  const Field = ({ k, label, children }) => (
    <div>
      <label className="label" htmlFor={k}>{label}</label>
      {children}
      {errors[k] && <p className="mt-1 text-xs text-danger">{errors[k]}</p>}
    </div>
  );
  const Select = ({ k, options, placeholder }) => (
    <select id={k} className="input" value={v[k]} onChange={set(k)}>
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="flex h-28 w-24 items-center justify-center overflow-hidden rounded-lg border border-dashed border-line bg-page text-muted">
          {v.photo ? <img src={v.photo} alt="Preview" className="h-full w-full object-cover" /> : <Upload size={22} />}
        </div>
        <div>
          <label className="btn-outline cursor-pointer"><Upload size={16} /> Upload photo
            <input type="file" accept="image/*" className="hidden" onChange={onPhoto} />
          </label>
          <p className="mt-2 text-xs text-muted">JPG or PNG, under 1 MB. Passport-style photo works best.</p>
          {errors.photo && <p className="mt-1 text-xs text-danger">{errors.photo}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field k="name" label="Student Name"><input id="name" className="input" value={v.name} onChange={set("name")} placeholder="Full name" /></Field>
        <Field k="regNo" label="Register Number"><input id="regNo" className="input" value={v.regNo} onChange={set("regNo")} placeholder="e.g. 310122104001" /></Field>
        <Field k="department" label="Department"><Select k="department" options={departments} placeholder="Select department" /></Field>
        <Field k="academicYear" label="Academic Year"><input id="academicYear" className="input" value={v.academicYear} onChange={set("academicYear")} placeholder="2025-2026" /></Field>
        <Field k="year" label="Year"><Select k="year" options={["1", "2", "3", "4"]} placeholder="Select year" /></Field>
        <Field k="semester" label="Semester"><Select k="semester" options={["1", "2", "3", "4", "5", "6", "7", "8"]} placeholder="Select semester" /></Field>
        <Field k="section" label="Section"><input id="section" maxLength={1} className="input" value={v.section} onChange={set("section")} placeholder="A" /></Field>
        <Field k="dob" label="Date of Birth"><input id="dob" type="date" className="input" value={v.dob} onChange={set("dob")} /></Field>
        <Field k="bloodGroup" label="Blood Group"><Select k="bloodGroup" options={bloodGroups} placeholder="Select blood group" /></Field>
        <Field k="status" label="Status"><Select k="status" options={["Active", "Inactive"]} placeholder="Status" /></Field>
        <Field k="email" label="Email"><input id="email" type="email" className="input" value={v.email} onChange={set("email")} placeholder="name@example.com" /></Field>
        <Field k="phone" label="Phone Number"><input id="phone" className="input" value={v.phone} onChange={set("phone")} placeholder="10-digit mobile number" /></Field>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-line pt-4">
        <button type="submit" className="btn-primary"><Save size={16} /> {submitLabel}</button>
        {!initial && <button type="button" className="btn-outline" onClick={() => { setV(empty); setErrors({}); }}><RotateCcw size={16} /> Reset Form</button>}
        {onCancel && <button type="button" className="btn-outline" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
