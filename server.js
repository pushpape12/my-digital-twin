import http from 'node:http';
import {readFile} from 'node:fs/promises';
const files={'/IMG-20260221-WA0023.jpg':['IMG-20260221-WA0023.jpg','image/jpeg'],'/theme.js':['theme.js','text/javascript'],'/Pushpa-Peddamganti-Resume.pdf':['Pushpa-Peddamganti-Resume.pdf','application/pdf'],'/':['index.html','text/html'],'/styles.css':['styles.css','text/css'],'/app.js':['app.js','text/javascript'],'/knowledge.js':['knowledge.js','text/javascript']};
const server=http.createServer(async(req,res)=>{
 const file=files[new URL(req.url,'http://localhost').pathname];
 if(!file){res.writeHead(404);res.end('Not found');return;}
 try { const content=await readFile(new URL(file[0],import.meta.url));res.writeHead(200,{'Content-Type':file[1]+((file[1]==='application/pdf'||file[1]==='image/jpeg')?'':'; charset=utf-8'),'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'none'; frame-ancestors 'none'"});res.end(content); }
 catch {res.writeHead(500);res.end('Unable to load application');}
});
server.listen(Number(process.env.PORT||3000),process.env.HOST||'127.0.0.1',()=>console.log('Meet Pushpa started on port '+server.address().port));
