import { validTill, initials, defaultCollege } from "../data/studentData";

// Small deterministic pseudo-random generator so each student gets a unique look-alike QR / barcode.
function seeded(text) {
  let h = 2166136261;
  for (const c of text) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0) % 1000) / 1000;
}

function FinderPattern({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="7" height="7" /><rect x="1" y="1" width="5" height="5" fill="#fff" /><rect x="2" y="2" width="3" height="3" />
    </g>
  );
}

function QrPlaceholder({ seed }) {
  const n = 21, rnd = seeded(seed), cells = [];
  const finder = (x, y) => (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    if (finder(x, y)) continue;
    if (rnd() > 0.52) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
  }
  return (
    <svg viewBox="0 0 21 21" className="h-[112px] w-[112px]" fill="#0F2A5C" shapeRendering="crispEdges">
      <FinderPattern x={0} y={0} /><FinderPattern x={14} y={0} /><FinderPattern x={0} y={14} />{cells}
    </svg>
  );
}

function Barcode({ seed }) {
  const rnd = seeded(seed + "bar");
  let x = 0; const bars = [];
  while (x < 150) { const w = 1 + Math.floor(rnd() * 3); if (rnd() > 0.35) bars.push(<rect key={x} x={x} y="0" width={w} height="30" />); x += w + 1; }
  return <svg viewBox="0 0 150 30" className="h-[30px] w-[150px]" fill="#0F2A5C" preserveAspectRatio="none">{bars}</svg>;
}

function Row({ label, value }) {
  return (
    <div className="flex text-[13px] leading-[22px]">
      <span className="w-[96px] shrink-0 text-slate-500">{label}</span>
      <span className="font-semibold text-slate-800">: {value}</span>
    </div>
  );
}

// Fixed 760 x 480 landscape card. Works for any student passed via props.
export default function StudentIDCard({ student, college = defaultCollege, innerRef, printable }) {
  const s = student;
  return (
    <div ref={innerRef} className={`${printable ? "print-target" : ""} flex h-[480px] w-[760px] flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white`}>
      {/* Header */}
      <div className="flex items-center gap-4 bg-[#0F2A5C] px-6 py-3 text-white">
        <img src="/college-logo.png" alt="" className="h-[60px] w-[60px] rounded-full bg-white p-0.5" />
        <div className="text-center flex-1">
          <p className="text-[16px] font-bold leading-tight tracking-wide">{college.name}</p>
          <p className="mt-1 text-[11px] text-blue-200">{college.address}</p>
        </div>
      </div>
      <div className="bg-[#E8F1FE] py-1.5 text-center text-[13px] font-bold tracking-[0.2em] text-[#0F2A5C]">STUDENT IDENTITY CARD</div>

      {/* Main */}
      <div className="flex flex-1 gap-5 px-6 pt-4">
        <div className="flex h-[170px] w-[136px] shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-[#60A5FA] bg-[#E8F1FE]">
          {s.photo ? <img src={s.photo} alt={s.name} className="h-full w-full object-cover" /> : <span className="text-4xl font-bold text-[#2563EB]">{initials(s.name)}</span>}
        </div>
        <div className="min-w-0 flex-1">
          <p className="mb-1.5 text-[22px] font-bold leading-tight text-[#0F2A5C]">{s.name}</p>
          <Row label="Register No" value={s.regNo} />
          <Row label="Department" value={s.department} />
          <Row label="Academic Year" value={s.academicYear} />
          <Row label="Year / Sem" value={`${s.year} / ${s.semester}`} />
          <Row label="Section" value={s.section} />
          <Row label="Blood Group" value={s.bloodGroup} />
        </div>
        <div className="flex w-[130px] shrink-0 flex-col items-center">
          <div className="rounded-lg border border-slate-200 p-2"><QrPlaceholder seed={s.regNo || "none"} /></div>
          <p className="mt-1.5 text-[11px] font-medium text-slate-500">Scan to Verify</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-end justify-between border-t border-slate-200 px-6 pb-3 pt-2">
        <div>
          <p className="text-[11px] text-slate-500">Card Validity</p>
          <p className="text-[13px] font-semibold text-slate-800">Valid till {validTill(s)}</p>
        </div>
        <div className="flex flex-col items-center">
          <Barcode seed={s.regNo || "none"} />
          <p className="text-[10px] tracking-[0.25em] text-slate-500">{s.regNo}</p>
        </div>
        <div className="w-[150px] text-center">
          <div className="border-b border-slate-400 pb-6" />
          <p className="mt-1 text-[11px] font-medium text-slate-600">{college.principal}</p>
        </div>
      </div>
    </div>
  );
}
