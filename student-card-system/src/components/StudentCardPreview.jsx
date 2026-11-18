import { useEffect, useRef, useState } from "react";
import StudentIDCard from "./StudentIDCard";

const W = 760, H = 480;

// Scales the fixed-size ID card down to fit its container (e.g. on mobile).
export default function StudentCardPreview({ student, college, cardRef, printable, maxScale = 1 }) {
  const box = useRef(null);
  const [scale, setScale] = useState(maxScale);

  useEffect(() => {
    const update = () => box.current && setScale(Math.min(maxScale, box.current.clientWidth / W));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(box.current);
    return () => ro.disconnect();
  }, [maxScale]);

  return (
    <div ref={box} className="w-full">
      <div style={{ width: W * scale, height: H * scale }} className="mx-auto">
        <div className="card-scale" style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          <StudentIDCard student={student} college={college} innerRef={cardRef} printable={printable} />
        </div>
      </div>
    </div>
  );
}
