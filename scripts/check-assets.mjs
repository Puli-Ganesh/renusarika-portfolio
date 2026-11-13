import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import assert from 'node:assert/strict';
const roles=['hero','about','learning','contact'];
for(const role of roles)for(const width of [400,800]){
  const path=`public/portraits/renusarika-${role}-${width}.webp`;
  assert(existsSync(path),`Missing ${path}`);
  assert(statSync(path).size>1000,`Empty ${path}`);
}
assert(existsSync('public/icons/favicon.svg'));
const resumePath='public/resume/Rachamalli_Renusarika_Resume.pdf';
if(existsSync(resumePath))assert(readFileSync(resumePath).subarray(0,4).toString()==='%PDF','Resume must be a real PDF');
if(existsSync('dist/index.html')) {
  const html=readFileSync('dist/index.html','utf8');
  for(const match of html.matchAll(/(?:src|href)="(\/(?:assets|portraits|icons)\/[^"?#]+)"/g))assert(existsSync(`dist${match[1]}`),`Broken build asset ${match[1]}`);
}
console.log(`PASS: ${readdirSync('public/portraits').length} portrait assets, favicon, production entry references. Resume: ${existsSync(resumePath)?'real PDF present':'correctly unavailable; source PDF not supplied'}.`);
