import fs from 'node:fs';
if (!fs.existsSync('out/en/index.html') || !fs.existsSync('out/.nojekyll')) throw new Error('Run the complete production build first.');
fs.rmSync('docs', { force: true, recursive: true });
fs.cpSync('out', 'docs', { recursive: true });
console.log('Copied the verified static export to docs/.');
