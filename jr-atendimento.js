(()=>{"use strict";
const key="jr-atendimento-gaveta-v2";
function init(){
if(document.getElementById("jr-atendimento"))return;
const style=document.createElement("style");
style.textContent=`
#jr-atendimento{position:fixed;left:env(safe-area-inset-left,0px);top:110px;z-index:101;display:flex;align-items:flex-start;max-width:100%;pointer-events:none;font:14px/1.45 system-ui,sans-serif}
#jr-atendimento *{box-sizing:border-box}
#jr-atendimento [hidden]{display:none!important}
#jr-atendimento .jr-a-drawer{pointer-events:auto;box-sizing:border-box;width:min(290px,calc(100vw - 56px));max-height:var(--jr-a-space,240px);overflow:auto;overscroll-behavior:contain;background:linear-gradient(145deg,#102c46,#071525);color:#f5f9fc;border:1px solid #f7be40;border-left:0;border-radius:0 0 10px 0;padding:12px;box-shadow:0 8px 25px #0008;animation:jr-a-enter .23s ease-out}
#jr-atendimento .jr-a-tab{pointer-events:auto;flex:none;display:flex;align-items:center;justify-content:center;gap:8px;min-width:44px;max-height:var(--jr-a-space,240px);padding:10px 7px;border:1px solid #f7be40;border-left:0;border-radius:0 9px 9px 0;background:linear-gradient(155deg,#102c46,#071525);color:#f7be40;font:800 11px/1 system-ui;cursor:pointer;box-shadow:3px 4px 14px #0006}
#jr-atendimento .jr-a-tab span{writing-mode:vertical-rl;transform:rotate(180deg)}
#jr-atendimento .jr-a-tab b{font-size:20px;line-height:1}
#jr-atendimento .jr-a-head{display:flex;align-items:center;gap:8px;margin-bottom:7px}
#jr-atendimento .jr-a-chip{flex:none;width:34px;height:34px}
#jr-atendimento .jr-a-title{color:#f7be40;font-weight:800;font-size:13px;flex:1}
#jr-atendimento .jr-a-close{background:transparent;color:#fff;border:1px solid #48627a;border-radius:7px;min-width:36px;min-height:36px;font:20px/1 system-ui;cursor:pointer}
#jr-atendimento p{font:13px/1.4 system-ui;margin:0 0 10px;color:#e2edf4}
#jr-atendimento .jr-a-link{display:flex;align-items:center;justify-content:center;gap:7px;min-height:44px;border-radius:7px;background:#25d366;color:#052718;font:800 13px/1.3 system-ui;text-decoration:none;padding:8px;text-align:center}
#jr-atendimento .jr-a-link svg{flex:none}
#jr-atendimento a:focus-visible,#jr-atendimento button:focus-visible{outline:3px solid #fff;outline-offset:-3px}
#jr-atendimento.jr-a-tiny .jr-a-tab span{display:none}
#jr-atendimento.jr-a-tiny .jr-a-tab{height:44px}
@keyframes jr-a-enter{from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:translateX(0)}}
@media(max-width:700px){#jr-atendimento .jr-a-drawer{width:min(246px,calc(100vw - 56px));padding:9px}#jr-atendimento p,#jr-atendimento .jr-a-title{font-size:12px}}
@media(max-width:700px){#jr-atendimento .jr-a-tab[aria-expanded="false"]{min-width:28px;width:28px;padding:6px 3px;gap:2px;flex-direction:column;font-size:10px}#jr-atendimento .jr-a-tab[aria-expanded="false"] b{font-size:15px}}
@media(prefers-reduced-motion:reduce){#jr-atendimento .jr-a-drawer{animation:none}}
`;
document.head.append(style);
const root=document.createElement("aside");root.id="jr-atendimento";root.setAttribute("aria-label","Atendimento Eletromecânica JR");
const el=document.createElement("div");el.className="jr-a-drawer";el.id="jr-a-drawer";el.hidden=true;
el.innerHTML='<div class="jr-a-head"><svg class="jr-a-chip" viewBox="0 0 48 48" aria-hidden="true"><rect x="9" y="9" width="30" height="30" rx="6" fill="#102c46" stroke="#f7be40" stroke-width="2"/><path d="M15 3v6m9-6v6m9-6v6M15 39v6m9-6v6m9-6v6M3 15h6m-6 9h6m-6 9h6m30-18h6m-6 9h6m-6 9h6" stroke="#f7be40" stroke-width="2" stroke-linecap="round"/><text x="24" y="29" fill="#fff" text-anchor="middle" font-size="15" font-weight="900">JR</text></svg><strong class="jr-a-title">Bem-vindo à Eletromecânica JR!</strong><button type="button" class="jr-a-close" aria-label="Fechar janela de atendimento">×</button></div><p>Precisa de uma solução técnica? Fale agora mesmo com nossa equipe.</p><a class="jr-a-link" target="_blank" rel="noopener noreferrer"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-8 8 8 8 0 0 1-3.5-.8L4 20l1.3-4.5a8 8 0 1 1 14.7-4Z"/><path d="M9 8c0 4 3 7 7 7l1-2-3-1-1 1-3-3 1-1-1-2Z"/></svg>Conversar pelo WhatsApp</a>';
const tab=document.createElement("button");tab.type="button";tab.className="jr-a-tab";tab.setAttribute("aria-controls",el.id);tab.setAttribute("aria-expanded","false");tab.setAttribute("aria-label","Abrir atendimento");tab.innerHTML='<span>ATENDIMENTO</span><b aria-hidden="true">›</b>';
root.append(el,tab);document.body.append(root);
const link=el.querySelector("a");link.href="https://wa.me/5566996406718?text="+encodeURIComponent("Olá! Vim pelo site da Eletromecânica JR e gostaria de conversar com a equipe.");
const music=document.querySelector(".jr-yt-widget");
let manual=false,open=false;
function mark(){try{sessionStorage.setItem(key,"1")}catch(e){}}
function place(){
const height=window.visualViewport?window.visualViewport.height:window.innerHeight;
const musicTop=music?music.getBoundingClientRect().top:height-12;
const limit=Math.min(height-12,musicTop-10);
const top=Math.max(4,Math.min(110,limit-200));
const space=Math.max(0,limit-top);
root.style.top=top+"px";root.style.setProperty("--jr-a-space",space+"px");
root.classList.toggle("jr-a-tiny",space<130);
if(space<105&&open)setOpen(false,false);
if(space<105&&window.innerWidth>=600&&music){
const right=music.getBoundingClientRect().right;
if(window.innerWidth-right>=320){root.style.top="90px";root.style.setProperty("--jr-a-space",Math.max(120,height-110)+"px");el.style.position="fixed";el.style.left=(Math.ceil(right)+12)+"px";el.style.top="90px";root.classList.remove("jr-a-tiny");return;}
}
el.style.position="";el.style.left="";el.style.top="";
}
function setOpen(value,user){if(user){manual=true;mark()}open=value;el.hidden=!value;tab.setAttribute("aria-expanded",String(value));tab.setAttribute("aria-label",value?"Recolher atendimento":"Abrir atendimento");tab.querySelector("b").textContent=value?"‹":"›";}
function canOpen(){return parseFloat(root.style.getPropertyValue("--jr-a-space"))>=105}
tab.addEventListener("click",()=>{place();if(!open&&!canOpen()){manual=true;mark();window.open(link.href,"_blank","noopener,noreferrer");return}setOpen(!open,true)});
el.querySelector("button").setAttribute("aria-label","Recolher atendimento");
el.querySelector("button").addEventListener("click",()=>{setOpen(false,true);tab.focus()});
link.addEventListener("click",()=>setOpen(false,true));
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&open){setOpen(false,true);tab.focus()}});
if(music&&window.ResizeObserver)new ResizeObserver(place).observe(music);
if(music&&window.MutationObserver)new MutationObserver(place).observe(music,{subtree:true,attributes:true,attributeFilter:["hidden","aria-expanded"]});
window.addEventListener("resize",place);if(window.visualViewport)window.visualViewport.addEventListener("resize",place);
place();
let seen=false;try{seen=!!sessionStorage.getItem(key)}catch(e){}
if(!seen)setTimeout(()=>{if(!manual){place();if(canOpen()){setOpen(true,false);mark()}}},5000);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();