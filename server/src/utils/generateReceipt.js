import PDFDocument from "pdfkit";

export const generateReceiptPDF = ({ complaintId, name, pnrNumber, category, urgency, department, status, createdAt }) => {
  return new Promise((resolve, reject) => {
    const doc    = new PDFDocument({ margin: 50, size: "A4" });
    const chunks = [];

    doc.on("data",  chunk => chunks.push(chunk));
    doc.on("end",   ()    => resolve(Buffer.concat(chunks)));
    doc.on("error", err   => reject(err));

    // ── Header ──────────────────────────────────────────────────────────────
    doc.rect(0, 0, 612, 100).fill("#1F4E79");

    doc.fillColor("white")
       .fontSize(26)
       .font("Helvetica-Bold")
       .text("RAIL MADAD", 50, 30);

    doc.fillColor("#cce0f5")
       .fontSize(11)
       .font("Helvetica")
       .text("AI-Powered Complaint Management System", 50, 62);

    doc.fillColor("#cce0f5")
       .fontSize(10)
       .text("Indian Railways", 50, 78);

    // ── Receipt Title ────────────────────────────────────────────────────────
    doc.fillColor("#1F4E79")
       .fontSize(18)
       .font("Helvetica-Bold")
       .text("COMPLAINT RECEIPT", 50, 120);

    doc.moveTo(50, 145).lineTo(562, 145).strokeColor("#1F4E79").lineWidth(2).stroke();

    // ── Complaint ID Badge ───────────────────────────────────────────────────
    doc.rect(50, 155, 512, 45).fill("#EBF3FB");
    doc.fillColor("#1F4E79")
       .fontSize(13)
       .font("Helvetica-Bold")
       .text("Complaint ID", 70, 163);
    doc.fillColor("#C55A11")
       .fontSize(16)
       .font("Helvetica-Bold")
       .text(complaintId, 300, 163);

    // ── Details Table ────────────────────────────────────────────────────────
    const rows = [
      ["Passenger Name",  name],
      ["PNR Number",      pnrNumber || "Not Provided"],
      ["Category",        category],
      ["Urgency Level",   urgency],
      ["Department",      department],
      ["Status",          status],
      ["Filed On",        new Date(createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })],
    ];

    let y = 215;
    rows.forEach(([label, value], i) => {
      const bg = i % 2 === 0 ? "#F7FBFF" : "#FFFFFF";
      doc.rect(50, y, 512, 32).fill(bg);

      doc.fillColor("#555555")
         .fontSize(11)
         .font("Helvetica-Bold")
         .text(label, 70, y + 10);

      doc.fillColor("#222222")
         .fontSize(11)
         .font("Helvetica")
         .text(value, 270, y + 10);

      y += 32;
    });

    // ── Urgency Color Indicator ──────────────────────────────────────────────
    const urgencyColor = urgency === "High" ? "#C00000" : urgency === "Medium" ? "#E97132" : "#1E7B45";
    doc.rect(50, y + 10, 512, 36).fill(urgencyColor);
    doc.fillColor("white")
       .fontSize(12)
       .font("Helvetica-Bold")
       .text(`Priority: ${urgency.toUpperCase()} — Assigned to ${department}`, 70, y + 21);

    y += 60;

    // ── Note ────────────────────────────────────────────────────────────────
    doc.rect(50, y, 512, 60).fill("#FFF8E7");
    doc.fillColor("#7B5E00")
       .fontSize(10)
       .font("Helvetica-Bold")
       .text("Important Note", 70, y + 10);
    doc.fillColor("#555555")
       .fontSize(9.5)
       .font("Helvetica")
       .text(
         "Please save your Complaint ID for future reference. You can use it to track the status of your complaint on Rail Madad platform.",
         70, y + 24,
         { width: 460 }
       );

    y += 80;

    // ── Footer ───────────────────────────────────────────────────────────────
    doc.moveTo(50, y).lineTo(562, y).strokeColor("#cccccc").lineWidth(1).stroke();

    doc.fillColor("#888888")
       .fontSize(9)
       .font("Helvetica")
       .text("This is a system-generated receipt. No signature required.", 50, y + 10, { align: "center", width: 512 });

    doc.fillColor("#888888")
       .fontSize(9)
       .text("© 2025 Rail Madad — Indian Railways Complaint Management", 50, y + 24, { align: "center", width: 512 });

    doc.end();
  });
};