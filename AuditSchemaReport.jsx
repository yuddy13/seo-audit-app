import React from 'react';

const AuditSchemaReport = ({ schema }) => {
  if (!schema) return null;

  return (
    <div>
      <h2>Schema Audit</h2>
      {schema.error ? (
        <p>Error loading schema</p>
      ) : (
        <div>
          <p><strong>Detected:</strong> {schema.found.join(', ') || 'None'}</p>
          <p><strong>Missing:</strong> {schema.missing.join(', ') || 'None'}</p>
          <a href={`https://validator.schema.org/#url=${schema.domain}`} target="_blank" rel="noopener noreferrer">
            Check on validator.schema.org
          </a>
        </div>
      )}
    </div>
  );
};

export default AuditSchemaReport;