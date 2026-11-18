import { X } from "lucide-react";
export default function Modal({ title, onClose, children, wide }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 p-4" onClick={onClose}>
      <div className={`card my-8 w-full ${wide ? "max-w-4xl" : "max-w-2xl"} p-5`} onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-muted hover:bg-sky" aria-label="Close"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
