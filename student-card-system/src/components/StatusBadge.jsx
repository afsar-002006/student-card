export default function StatusBadge({ status }) {
  const active = status === "Active";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${active ? "bg-green-50 text-success" : "bg-red-50 text-danger"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-success" : "bg-danger"}`} />
      {status}
    </span>
  );
}
