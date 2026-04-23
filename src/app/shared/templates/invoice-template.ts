export function  buildInvoiceTemplate(invoiceData: any): string {
const today = new Date().toLocaleDateString();
return `
<!DOCTYPE html>
<html>
<head>
  <title>Invoice</title>

  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      color: #000;
    }

    /* Header */
    .company-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #000;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }

    .company-name {
      font-size: 22px;
      font-weight: bold;
    }

    .company-meta {
      text-align: right;
      font-size: 12px;
    }

    /* Table */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }

    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }

    th:nth-child(2),
    th:nth-child(3),
    th:nth-child(4),
    td:nth-child(2),
    td:nth-child(3),
    td:nth-child(4) {
      text-align: right;
    }

    h2, h3 {
      margin: 10px 0;
    }

    /* 🔥 FIX: Right-aligned totals */
    .summary {
      text-align: right !important;
      margin-top: 20px;
      width: 100%;
    }

    .summary p,
    .summary h3 {
      margin: 4px 0;
    }

    /* Signature */
    .signature {
      text-align: right;
      margin-top: 60px;
    }

    .signature-line {
      margin-top: 40px;
      border-top: 1px solid #000;
      width: 200px;
      margin-left: auto;
      text-align: center;
      padding-top: 5px;
    }

    /* Footer */
    .terms {
      margin-top: 30px;
      font-size: 11px;
      color: #333;
    }

    .terms ul {
      margin: 5px 0 0 15px;
      padding: 0;
    }

  </style>
</head>

<body>

  <!-- Company Header -->
  <div class="company-header">
    <div>
      <div class="company-name">CarKaashiv</div>
      <div style="font-size:12px;">Automobile Parts & Services</div>
    </div>

    <div class="company-meta">
      <div><strong>Printed:</strong> ${today}</div>
      <div>WhatsApp: +91-XXXXXXXXXX</div>
    </div>
  </div>

  <!-- Invoice Content (Captured from UI) -->
  ${invoiceData}

  <!-- Signature -->
  <div class="signature">
    <div class="signature-line">
      Authorized Signature
    </div>
  </div>

  <!-- Terms & Conditions -->
  <div class="terms">
    <strong>Terms & Conditions:</strong>
    <ul>
      <li>Goods once sold cannot be returned or exchanged.</li>
      <li>Please verify items at the time of delivery.</li>
      <li>Warranty (if applicable) is as per manufacturer policy.</li>
      <li>This is a system-generated invoice.</li>
    </ul>
  </div>

</body>
</html>
`
      
}