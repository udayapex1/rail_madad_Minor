import nodemailer           from "nodemailer";
import { generateReceiptPDF } from "./generateReceipt.js";
import dotenv               from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendComplaintMail = async ({
  to, name, complaintId, pnrNumber,
  category, urgency, department, status, createdAt
}) => {
  try {
    const pdfBuffer = await generateReceiptPDF({
      complaintId, name, pnrNumber,
      category, urgency, department, status, createdAt
    });

    const urgencyColor = urgency === "High"   ? "#C00000"
                       : urgency === "Medium" ? "#E97132"
                       :                        "#1E7B45";

    const urgencyBg    = urgency === "High"   ? "#FFF0F0"
                       : urgency === "Medium" ? "#FFF5EC"
                       :                        "#F0FFF4";

    await transporter.sendMail({
      from:    `"Rail Madad" <${process.env.MAIL_USER}>`,
      to,
      subject: `Complaint Registered — ${complaintId} | Rail Madad`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:30px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

        <!-- HEADER -->
        <tr>
          <td style="background:#1F4E79;padding:36px 40px;">
            <h1 style="color:white;margin:0;font-size:26px;letter-spacing:2px;text-transform:uppercase;">Rail Madad</h1>
            <p style="color:#cce4f7;margin:6px 0 0;font-size:12px;letter-spacing:1px;text-transform:uppercase;">Indian Railways — Grievance Management</p>
          </td>
        </tr>

        <!-- SUCCESS BANNER -->
        <tr>
          <td style="background:#E8F5E9;padding:16px 40px;border-left:5px solid #1E7B45;">
            <p style="margin:0;color:#1E7B45;font-size:14px;font-weight:bold;">
              Complaint Successfully Registered
            </p>
            <p style="margin:4px 0 0;color:#555;font-size:13px;">
              The concerned department has been notified and will take necessary action.
            </p>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="padding:32px 40px;">
            <p style="font-size:15px;color:#333;">Dear <strong>${name}</strong>,</p>
            <p style="font-size:14px;color:#555;line-height:1.7;">
              Your grievance has been received and registered on the Rail Madad platform.
              Please find the details of your complaint below.
            </p>

            <!-- COMPLAINT ID -->
            <div style="background:#EBF3FB;border-radius:8px;padding:18px 20px;margin:24px 0;text-align:center;">
              <p style="margin:0;font-size:11px;color:#555;text-transform:uppercase;letter-spacing:2px;">Complaint Reference Number</p>
              <p style="margin:10px 0 0;font-size:28px;font-weight:bold;color:#1F4E79;letter-spacing:3px;">${complaintId}</p>
              <p style="margin:6px 0 0;font-size:11px;color:#888;">Kindly save this reference number for future correspondence</p>
            </div>

            <!-- DETAILS TABLE -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e0e0e0;margin:20px 0;">
              <tr style="background:#1F4E79;">
                <td style="padding:10px 16px;color:white;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;width:40%;">Field</td>
                <td style="padding:10px 16px;color:white;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Details</td>
              </tr>
              ${pnrNumber ? `
              <tr style="background:#f9f9f9;">
                <td style="padding:12px 16px;color:#555;font-size:13px;font-weight:bold;">PNR Number</td>
                <td style="padding:12px 16px;color:#222;font-size:13px;">${pnrNumber}</td>
              </tr>` : ""}
              <tr>
                <td style="padding:12px 16px;color:#555;font-size:13px;font-weight:bold;">Category</td>
                <td style="padding:12px 16px;color:#222;font-size:13px;">${category}</td>
              </tr>
              <tr style="background:#f9f9f9;">
                <td style="padding:12px 16px;color:#555;font-size:13px;font-weight:bold;">Urgency Level</td>
                <td style="padding:12px 16px;">
                  <span style="background:${urgencyBg};color:${urgencyColor};padding:4px 12px;border-radius:20px;font-size:12px;font-weight:bold;">
                    ${urgency}
                  </span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;color:#555;font-size:13px;font-weight:bold;">Assigned Department</td>
                <td style="padding:12px 16px;color:#222;font-size:13px;">${department}</td>
              </tr>
              <tr style="background:#f9f9f9;">
                <td style="padding:12px 16px;color:#555;font-size:13px;font-weight:bold;">Current Status</td>
                <td style="padding:12px 16px;">
                  <span style="background:#FFF8E7;color:#7B5E00;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:bold;">
                    ${status}
                  </span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;color:#555;font-size:13px;font-weight:bold;">Date of Filing</td>
                <td style="padding:12px 16px;color:#222;font-size:13px;">
                  ${new Date(createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                </td>
              </tr>
            </table>

            <!-- PDF NOTE -->
            <div style="background:#F5F5F5;border-radius:8px;padding:14px 18px;border-left:4px solid #1F4E79;">
              <p style="margin:0;font-size:13px;color:#444;">
                A PDF receipt of your complaint is attached to this email.
                Please download and retain it for your records.
              </p>
            </div>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#1F4E79;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#cce4f7;">This is a system-generated email. Please do not reply to this message.</p>
            <p style="margin:6px 0 0;font-size:11px;color:#cce4f7;">Ministry of Railways — Government of India</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>
      `,
      attachments: [
        {
          filename:    `Receipt-${complaintId}.pdf`,
          content:     pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    console.log(`Mail sent to ${to}`);

  } catch (error) {
    console.error("Mail sending failed:", error.message);
  }
};