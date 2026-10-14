(function(){
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const ano=$('#ano');if(ano)ano.textContent=new Date().getFullYear();
// navbar / hambúrguer
const nav=$('.nav'),bg=$('.burger');
if(nav&&bg){const set=o=>{nav.classList.toggle('open',o);bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Fechar menu':'Abrir menu')};
bg.addEventListener('click',()=>set(!nav.classList.contains('open')));
$$('.nav nav a').forEach(a=>a.addEventListener('click',()=>set(false)));
addEventListener('keydown',e=>{if(e.key==='Escape')set(false)});
document.addEventListener('click',e=>{if(!nav.contains(e.target))set(false)});
matchMedia('(min-width: 861px)').addEventListener('change',()=>set(false))}
// marquee com ícones
const tr=$('#track');if(tr){const t=[['html5-plain','HTML'],['css3-plain','CSS'],['javascript-plain','JavaScript'],['react-original','React'],['php-plain','PHP'],['laravel-plain','Laravel'],['java-plain','Java'],['spring-plain','Spring Boot'],['csharp-plain','C#'],['mysql-plain','MySQL'],['python-plain','Python'],['git-plain','Git'],['docker-plain','Docker']].map(([i,n])=>`<span><i class="d devicon-${i}"></i>${n}</span>`).join('')+[['hdd-network','Redes'],['pc-display','Virtualização'],['shield-lock','Segurança'],['activity','Monitorização']].map(([i,n])=>`<span><i class="d bi bi-${i}"></i>${n}</span>`).join('');tr.innerHTML=t+t}
// texto revelado ao rolar
const at=$('#about-text');if(at){at.setAttribute('aria-label',at.textContent);at.innerHTML=at.textContent.trim().split(/\s+/).map(w=>`<span class="w" aria-hidden="true">${w}</span>`).join(' ');const ws=$$('.w',at);
const up=()=>{if(reduce){ws.forEach(w=>w.classList.add('on'));return}const r=at.getBoundingClientRect(),vh=innerHeight,p=Math.min(1,Math.max(0,(vh*.85-r.top)/(r.height+vh*.3))),n=Math.round(p*ws.length);ws.forEach((w,i)=>w.classList.toggle('on',i<n))};
addEventListener('scroll',up,{passive:true});addEventListener('resize',up);up()}
// barras
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.style.width=e.target.dataset.v+'%';io.unobserve(e.target)}}),{threshold:.4});
$$('.bar2 i').forEach(b=>reduce?b.style.width=b.dataset.v+'%':io.observe(b));
// contadores
$$('[data-count]').forEach(el=>{const n=+el.dataset.count,suf=el.dataset.suf||'';if(reduce){el.textContent=n+suf;return}
const o=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;o.disconnect();const t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/1200);el.textContent=Math.round(n*(1-Math.pow(1-k,3)))+suf;if(k<1)requestAnimationFrame(f)})(t0)});o.observe(el)});
// filtros de projectos
const fb=$$('.filters button');fb.forEach(b=>b.addEventListener('click',()=>{fb.forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b)});const f=b.dataset.filter;$$('.row[data-category]').forEach(r=>r.hidden=!(f==='all'||r.dataset.category.split(' ').includes(f)))}));
// formulário -> email
const form=$('#contactForm');if(form)form.addEventListener('submit',e=>{e.preventDefault();const g=id=>$('#'+id).value.trim(),note=$('#note');
if(!g('nome')||!/^\S+@\S+\.\S+$/.test(g('email'))||!g('assunto')||!g('msg')){note.textContent='Preenche nome, um email válido, o assunto e a mensagem.';return}
const body=`${g('msg')}\n\n${g('nome')}\n${g('email')}${g('orc')?'\nOrçamento: '+g('orc'):''}${$('#news').checked?'\nQuero receber actualizações.':''}`;
location.href=`mailto:munguambenelson26@gmail.com?subject=${encodeURIComponent(g('assunto')+' - '+g('nome'))}&body=${encodeURIComponent(body)}`;note.textContent='A abrir o teu programa de email…'});
})();
