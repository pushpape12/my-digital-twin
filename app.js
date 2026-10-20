import {projects,answer,analyzeRole} from './knowledge.js';
const $=s=>document.querySelector(s);
const el=(tag,text,className)=>{const node=document.createElement(tag);if(text)node.textContent=text;if(className)node.className=className;return node;};
function addMessage(text,user=false,source=''){
 const message=el('div',text,'message'+(user?' user':''));
 if(source)message.append(el('small',source,'source'));
 $('#messages').append(message);$('#messages').scrollTop=$('#messages').scrollHeight;
}
const welcome=()=>addMessage('Hi, I’m Pushpa’s AI twin. Ask about her financial ML experience, explore her engineering work, or explore role fit from the home screen.','', 'Based on the professional information Pushpa supplied');
welcome();
function ask(text){
 text=text.trim();if(!text)return;
 addMessage(text,true);const result=answer(text);addMessage(result.text,false,result.source);
 if($('#speak').checked && 'speechSynthesis' in window){speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(result.text);utterance.rate=.95;speechSynthesis.speak(utterance);}
}
$('#chat-form').addEventListener('submit',event=>{event.preventDefault();ask($('#question').value);$('#question').value='';});
document.querySelectorAll('[data-prompt]').forEach(b=>b.addEventListener('click',()=>ask(b.dataset.prompt)));
$('#clear').addEventListener('click',()=>{if('speechSynthesis' in window)speechSynthesis.cancel();$('#messages').replaceChildren();welcome();});
$('#speak').addEventListener('change',()=>{if(!$('#speak').checked&&'speechSynthesis' in window)speechSynthesis.cancel();});
if(!('speechSynthesis' in window)){$('#speak').disabled=true;$('#speech-status').textContent='Speech playback is unavailable in this browser.';}
const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
if(Recognition){
 const recognition=new Recognition();recognition.lang='en-IN';recognition.interimResults=false;
 recognition.onresult=e=>{$('#question').value=e.results[0][0].transcript;$('#question').focus();$('#speech-status').textContent='Transcript ready. Review it, then send.';};
 recognition.onerror=()=>{$('#speech-status').textContent='Voice input could not start. Check microphone permission or type your question.';};
 recognition.onend=()=>{$('#mic').disabled=false;};
 $('#mic').addEventListener('click',()=>{if(!window.confirm('Your browser may send microphone audio to its speech recognition provider. Continue?'))return;try{recognition.start();$('#mic').disabled=true;$('#speech-status').textContent='Listening…';}catch{$('#speech-status').textContent='Unable to start recognition. Please type your question.';}});
}else{$('#mic').hidden=true;$('#speech-status').textContent='Type to chat. Voice input is not supported in this browser.';}
projects.forEach((project,index)=>{
 const button=el('button',null,'project-card');button.type='button';button.append(el('span',String(index+1).padStart(2,'0'),'project-number'),el('small',project.category),el('h3',project.title),el('p',project.summary));
 const tags=el('div',null,'tags');project.tags.forEach(t=>tags.append(el('span',t,'tag')));button.append(tags,el('span','Explore the walkthrough','project-link'));
 button.addEventListener('click',()=>{
  const detail=$('#project-detail');detail.replaceChildren(el('span',project.category,'eyebrow'),Object.assign(el('h2',project.title),{id:'detail-title'}),el('p',project.summary),el('h3','Reported contribution'),el('p',project.evidence),el('h3','Illustrative workflow'));
  const flow=el('div',null,'flow');project.architecture.forEach((step,i)=>flow.append(el('span',(i+1)+'. '+step)));detail.append(flow,el('h3','Evidence & boundaries'),el('p',project.boundary),el('p','Source: professional profile pasted by Pushpa. No employer documents or independent verification supplied.'));
  $('#project-dialog').showModal();
 });$('#projects').append(button);
});

$('#project-dialog').addEventListener('click',e=>{if(e.target===$('#project-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
$('#fit-form').addEventListener('submit',e=>{
 e.preventDefault();const text=$('#job').value.trim();if(!text)return;const result=analyzeRole(text);const target=$('#fit-results');target.replaceChildren();
 target.append(el('h3','Documented skill overlap'));
 target.append(el('p',result.matched.length?result.matched.join(' · '):'No supported skill keywords were found. Review this role directly with Pushpa.'));
 target.append(el('h3','Evidence to clarify'),el('p',result.gaps.length?result.gaps.join(' · ')+' — not documented in the supplied profile.':'No additional tracked skill gaps detected. Other requirements, seniority, and depth still need review.'));
 target.append(el('h3','Questions for a human conversation'));const list=el('ul');result.questions.forEach(q=>list.append(el('li',q)));target.append(list,el('p',result.caveat),el('p','Your pasted text stays in this page. It is not uploaded or stored by this app.'));
});

document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>{const dialog=document.getElementById(button.dataset.open);if(dialog.open){dialog.close();return;}if(dialog.id==='agent-dialog'){dialog.show();$('#agent-launcher').setAttribute('aria-expanded','true');$('#question').focus();}else{dialog.showModal();}}));
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('close',()=>{if(dialog.id==='agent-dialog'){$('#agent-launcher').setAttribute('aria-expanded','false');if('speechSynthesis' in window)speechSynthesis.cancel();$('#agent-launcher').focus();}}));

$('#agent-dialog').addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();$('#agent-dialog').close();}});

const themeToggle = $('#theme-toggle');
function syncThemeToggle() {
 const dark = document.documentElement.dataset.theme === 'dark';
 themeToggle.setAttribute('aria-pressed', String(dark));
 themeToggle.setAttribute('aria-label', 'Switch to ' + (dark ? 'light' : 'dark') + ' mode');
 $('#theme-label').textContent = dark ? 'Light' : 'Dark';
}
syncThemeToggle();
themeToggle.addEventListener('click', () => {
 const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
 document.documentElement.dataset.theme = theme;
 try { localStorage.setItem('pushpa-theme', theme); } catch { /* Browsing still works when storage is unavailable. */ }
 syncThemeToggle();
});
