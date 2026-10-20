import {test} from 'node:test';
import assert from 'node:assert/strict';
import {answer,analyzeRole,projects} from '../knowledge.js';
test('specific topics retrieve relevant supplied experience',()=>{
 for(const [q,term] of [['prepayment forecasting','Net Interest Income'],['amortization balloon loans','floating'],['FAS 107 valuation','off-balance'],['MLOps deployment','Kubernetes'],['education','Information Technology']]) assert.ok(answer(q).text.includes(term),q);
});
test('certification is disclosed as expired',()=>assert.match(answer('SnowPro certification').text,/expired September 2025/));
test('unsupported claims and private data are not fabricated',()=>{
 assert.match(answer('What is her exact model accuracy?').text,/don’t have confirmed/);
 assert.match(answer('What is her salary?').text,/not in the professional profile/);
});
test('job matching separates supported skills and undocumented requirements',()=>{
 const result=analyzeRole('Python, SQL, AWS SageMaker and PyTorch. Java and GCP required.');
 assert.deepEqual(result.matched,['Python','SQL','AWS','SageMaker']);
 assert.deepEqual(result.gaps,['Java','GCP','PyTorch']);
 assert.match(result.caveat,/not a hiring score/);
});
test('no recognized requirements produces no invented overlap',()=>assert.deepEqual(analyzeRole('Seeking a graphic designer').matched,[]));
test('all walkthroughs include evidence boundaries',()=>{assert.equal(projects.length,8);for(const p of projects){assert.ok(p.evidence);assert.ok(p.boundary);assert.equal(p.architecture.length,4);}});

test('new achievements and actual implementation are distinguishable',()=>{
 assert.match(answer('Tell me about FTP runtime').text,/Spark cluster optimization/);
 assert.doesNotMatch(answer('Tell me about FTP runtime').text,/\d+\s*(hours|minutes)/);
 assert.match(answer('Tell me about skill files').text,/reusable skill files/);
 assert.match(answer('What uses LangGraph?').text,/not yet been confirmed/);
 assert.match(answer('How does this website work?').text,/not LangChain/);
 assert.match(answer('prepayment OPM').text,/magnitude of improvement have not been provided/);
});
test('new resume skills match without silently promoting planned tools',()=>{
 const r=analyzeRole('Terraform Snowpipe AWS Glue LangGraph RAG');
 assert.ok(r.matched.includes('Terraform'));
 assert.ok(r.matched.includes('AWS Glue'));
 assert.ok(r.gaps.some(x=>x.includes('generative AI')));
});

test('published frontend excludes withheld benchmarks and private resume fields',async()=>{
 const {readFile}=await import('node:fs/promises');
 for(const file of ['index.html','knowledge.js','app.js']){
  const text=await readFile(new URL('../'+file,import.meta.url),'utf8');
  assert.doesNotMatch(text,/\b\d{10}\b|\d+\s*(?:hrs|hours|minutes)\b/i);
 }
});
