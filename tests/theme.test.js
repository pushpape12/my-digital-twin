import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const source=readFileSync(new URL('../theme.js',import.meta.url),'utf8');
function theme(values={},blocked=false){
 const document={documentElement:{dataset:{}}};
 runInNewContext(source,{document,localStorage:{getItem(key){if(blocked)throw new Error('Storage blocked');return values[key]??null;}}});
 return document.documentElement.dataset.theme;
}
test('legacy dark preference resets to the subtle light design',()=>assert.equal(theme({'pushpa-theme':'dark'}),'light'));
test('explicit choices in the current design are retained',()=>{assert.equal(theme({'pushpa-theme-v2':'dark'}),'dark');assert.equal(theme({'pushpa-theme-v2':'light'}),'light');});
test('missing, invalid, and blocked storage default to light',()=>{assert.equal(theme(),'light');assert.equal(theme({'pushpa-theme-v2':'invalid'}),'light');assert.equal(theme({},true),'light');});
