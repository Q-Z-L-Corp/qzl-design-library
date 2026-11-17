import type { PublicApiRecord } from './generated/public-api-docs';

export function PublicApiDocumentationPage({ records, query }: {
  records: PublicApiRecord[];
  query: string;
}) {
  const normalizedQuery = query.trim().toLowerCase();
  const filteredRecords = records.filter((record) => {
    if (record.kind === 'component') return false;
    if (!normalizedQuery) return true;
    const memberContent = record.members.flatMap((member) => [
      member.name,
      member.type,
      member.description,
      ...member.callbackParameters.map((parameter) => `${parameter.name} ${parameter.type} ${parameter.description}`)
    ]);
    const parameterContent = record.parameters.map((parameter) => `${parameter.name} ${parameter.type} ${parameter.description}`);
    return [
      record.packageName,
      record.name,
      record.kind,
      record.signature,
      record.description,
      ...memberContent,
      ...parameterContent
    ].join(' ').toLowerCase().includes(normalizedQuery);
  });
  const packages = [...new Set(filteredRecords.map((record) => record.packageName))];

  return (
    <article className="public-api-page">
      <div className="docs-breadcrumb">QZL Design Library <span>/</span> Public API reference</div>
      <header className="docs-page-title">
        <div className="docs-eyebrow">PACKAGE APIS</div>
        <h1>Public API reference</h1>
        <p>Reference for the exported types, utilities, and theme APIs that complement the component catalog. Entries are generated from each package’s TypeScript source and JSDoc.</p>
      </header>
      {normalizedQuery && <p className="public-api-page__count">{filteredRecords.length} API entries match “{query}”.</p>}
      {filteredRecords.length === 0 && <p className="public-api-page__empty">No public APIs match this search.</p>}
      {packages.map((packageName) => (
        <section className="public-api-package" key={packageName}>
          <h2>{packageName}</h2>
          <div className="public-api-list">
            {filteredRecords.filter((record) => record.packageName === packageName).map((record) => (
              <details className="public-api-entry" key={`${record.sourcePath}:${record.name}`}>
                <summary>
                  <code>{record.name}</code>
                  <span>{record.kind}</span>
                </summary>
                <p>{record.description}</p>
                <pre><code>{record.signature}</code></pre>
                {record.parameters.length > 0 && (
                  <div className="public-api-entry__details">
                    <h3>Parameters</h3>
                    <dl>
                      {record.parameters.map((parameter) => (
                        <div key={parameter.name}>
                          <dt><code>{parameter.name}</code> <span>{parameter.type}</span></dt>
                          <dd>{parameter.description || 'No parameter-specific description is declared.'}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
                {record.members.length > 0 && (
                  <div className="public-api-entry__details">
                    <h3>Members</h3>
                    <dl>
                      {record.members.map((member, index) => (
                        <div key={`${member.name}-${index}`}>
                          <dt><code>{member.name}</code>{member.optional && <span>optional</span>} <span>{member.type}</span></dt>
                          <dd>{member.description || 'No member-specific description is declared.'}</dd>
                          {member.callbackParameters.map((parameter) => (
                            <dd key={parameter.name}><code>{parameter.name}</code> <code>{parameter.type}</code> — {parameter.description || 'No callback parameter description is declared.'}</dd>
                          ))}
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
                {record.examples.map((example, index) => (
                  <div className="public-api-entry__example" key={`${record.name}-example-${index}`}>
                    <h3>Example</h3>
                    <pre><code>{example}</code></pre>
                  </div>
                ))}
              </details>
            ))}
          </div>
        </section>
      ))}
    </article>
  );
}
