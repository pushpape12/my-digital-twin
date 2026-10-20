import {test} from 'node:test';
import assert from 'node:assert/strict';
import {answer,analyzeRole,projects} from '../knowledge.js';
test('specific topics retrieve relevant supplied experience',()=>{
 for(const [q,term] of [['prepayment forecasting','Net Interest Income'],['amortization balloon loans','floating'],['FAS 107 valuation','off-balance'],['MLOps deployment','Kubernetes'],['education','9.2']]) assert.ok(answer(q).text.includes(term),q);
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
test('all walkthroughs include evidence boundaries',()=>{assert.equal(projects.length,5);for(const p of projects){assert.ok(p.evidence);assert.ok(p.boundary);assert.equal(p.architecture.length,4);}});
