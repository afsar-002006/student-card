import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// Captures the card element and saves it as a credit-card sized landscape PDF.
export async function downloadCardPdf(el, filename = "id-card") {
  const canvas = await html2canvas(el, {
    scale: 3,
    backgroundColor: "#ffffff",
    useCORS: true,
    onclone: (_doc, node) => {
      // remove the on-screen scaling so the capture is full size
      let p = node.parentElement;
      while (p) { if (p.classList?.contains("card-scale")) p.style.transform = "none"; p = p.parentElement; }
    },
  });
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [85.6, 54] });
  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 85.6, 54);
  pdf.save(`${filename}.pdf`);
}
