import React, { useState } from 'react';
import AuditReport from './components/AuditSchemaReport';

export default function App() {
  const [stage, setStage] = useState('input');
  const [url, setUrl] = useState('');
  const [auditData, setAuditData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    setStage('loading');

    setTimeout(async () => {
      const res = await fetch('/audit-report.json');
      const data = await res.json();

      const enrichedData = {
        ...data,
        schema_summary: {
          found: ["Organization", "WebSite"],
          missing: ["Product", "FAQPage"],
          domain: url
        }
      };

      setAuditData(enrichedData);
      setStage('report');
    }, 2000);
  };

  return (
    <div>
      {stage === 'input' && (
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
          />
          <button type="submit">Run Audit</button>
        </form>
      )}
      {stage === 'loading' && <p>Loading...</p>}
      {stage === 'report' && auditData && <AuditReport schema={auditData.schema_summary} />}
    </div>
  );
}