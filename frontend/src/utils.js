export function downloadCSV(data, filename) {
  if (!data || !data.length) return;

  const getHeaders = (obj) => Object.keys(obj);
  const headers = getHeaders(data[0]);

  const csvRows = [];
  // Add headers
  csvRows.push(headers.join(','));

  // Add rows
  for (const row of data) {
    const values = headers.map(header => {
      const val = row[header];
      if (val === null || val === undefined) return '""';
      const strVal = String(val).replace(/"/g, '""');
      // Quote strings that contain commas or newlines
      if (strVal.includes(',') || strVal.includes('\n')) {
        return `"${strVal}"`;
      }
      return strVal;
    });
    csvRows.push(values.join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadPDF(certInfo = null) {
  if (!certInfo) {
    window.print();
    return;
  }
  
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  
  const doc = iframe.contentWindow.document;
  
  const html = `
    <html>
      <head>
        <title>Quantum-Safe Certificate - ${certInfo.assetId || 'Export'}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #333; }
          .header { border-bottom: 2px solid #0ea5e9; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-end; }
          .title { font-size: 28px; font-weight: bold; color: #0f172a; margin: 0; }
          .subtitle { color: #64748b; font-size: 14px; margin-top: 5px; }
          .cert-id { font-family: monospace; font-size: 16px; background: #f1f5f9; padding: 6px 12px; border-radius: 4px; color: #0f172a; }
          .section { margin-bottom: 25px; }
          .section-title { font-size: 18px; font-weight: 600; color: #334155; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 10px 0; border-bottom: 1px dashed #cbd5e1; vertical-align: top; }
          .label { width: 35%; color: #64748b; font-weight: 500; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
          .value { font-family: 'SFMono-Regular', Consolas, monospace; color: #0f172a; font-size: 15px; }
          .badge { background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; font-family: sans-serif; }
          .footer { margin-top: 60px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 class="title">Quantum-Safe Certificate</h1>
            <div class="subtitle">Blockchain-Anchored Verification Receipt</div>
          </div>
          <div class="cert-id">${certInfo.certId}</div>
        </div>
        
        <div class="section">
          <div class="section-title">Asset Information</div>
          <table>
            <tr><td class="label">Asset Hostname</td><td class="value" style="font-size: 18px; font-weight: 700; color: #0284c7;">${certInfo.assetId}</td></tr>
            <tr><td class="label">Quantum Security Score</td><td class="value"><span class="badge" style="background: #e0f2fe; color: #0369a1;">${certInfo.quantumScore} / 100</span></td></tr>
            <tr><td class="label">Algorithm Suite</td><td class="value" style="font-family: sans-serif; font-weight: 600;">${Array.isArray(certInfo.algorithms) ? certInfo.algorithms.join(', ') : certInfo.algorithms}</td></tr>
            <tr><td class="label">Certificate Status</td><td class="value"><span class="badge">${certInfo.status}</span></td></tr>
          </table>
        </div>

        <div class="section">
          <div class="section-title">Validity & Ledger Verification</div>
          <table>
            <tr><td class="label">Date of Issuance</td><td class="value">${certInfo.issuedAt}</td></tr>
            <tr><td class="label">Valid Until</td><td class="value">${certInfo.validUntil}</td></tr>
            <tr><td class="label">Blockchain Network</td><td class="value" style="font-family: sans-serif;">${certInfo.network} Mainnet</td></tr>
            <tr><td class="label">Block Confirmation #</td><td class="value">${certInfo.blockNumber}</td></tr>
            <tr><td class="label">Transaction Hash</td><td class="value">${certInfo.blockchainTx}</td></tr>
            <tr><td class="label">Immutable Signature</td><td class="value">${certInfo.certificateHash}</td></tr>
          </table>
        </div>

        <div class="footer">
          Q-Sentra Post-Quantum Enterprise Security Platform &bull; Generated on ${new Date().toLocaleString()}
          <br><br>This ledger receipt cryptographically guarantees the resilience of the specified asset against quantum-computing decryption threats up to the specified validity date.
        </div>
      </body>
    </html>
  `;
  
  doc.open();
  doc.write(html);
  doc.close();
  
  setTimeout(() => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  }, 250);
}
