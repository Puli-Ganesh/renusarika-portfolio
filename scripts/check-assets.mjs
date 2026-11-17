import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import assert from 'node:assert/strict';
for(const role of ['hero','about','contact'])for(const size of [360,720]){
  const file=`public/images/${role}-${size}.webp`;
  assert(existsSync(file),file);assert(statSync(file).size>1000,file);
}
const pdf=readFileSync('public/resume/Rachamalli_Renusarika_Resume.pdf');
assert(pdf.subarray(0,5).toString()==='%PDF-');
assert(existsSync('public/fonts/manrope-latin.woff2'));
assert(existsSync('public/fonts/MANROPE_LICENSE.txt'));
assert(existsSync('public/favicon.svg'));
if(existsSync('dist/index.html')){
  const html=readFileSync('dist/index.html','utf8');
  for(const match of html.matchAll(/(?:src|href)="\.\/([^"?#]+)"/g))assert(existsSync(`dist/${match[1]}`),match[1]);
}
const source=readFileSync('src/App.vue','utf8');
assert(!/tel:|Systems in Motion|Scroll to Explore|coming soon/i.test(source));
assert(!readdirSync('public/images').some(name=>/c7deda|3d225|f35161|288faa/.test(name)));
console.log('PASS: 6 portrait variants, PDF, local font/license, favicon, build entry, and content exclusions.');
