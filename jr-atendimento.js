(()=>{"use strict";
const key="jr-atendimento-v1";
try{if(sessionStorage.getItem(key))return}catch(e){}
function init(){
if(document.getElementById("jr-atendimento"))return;
const style=document.createElement("style");
style.textContent=`
#jr-atendimento{box-sizing:border-box;position:fixed;left:max(12px,env(safe-area-inset-left));bottom:calc(18px + env(safe-area-inset-bottom));z-index:97;width:290px;max-width:calc(100vw - 24px);max-height:calc(100dvh - 100px);overflow:auto;background:linear-gradient(145deg,#102c46,#071525);color:#f5f9fc;border:1px solid #f7be40;border-radius:12px;padding:13px;box-shadow:0 12px 32px #0007;font:14px/1.45 system-ui,sans-serif}
#jr-atendimento[hidden]{display:none!important}
#jr-atendimento *{box-sizing:border-box}
#jr-atendimento .jr-a-head{display:flex;align-items:center;gap:9px;margin-bottom:8px}
#jr-atendimento .jr-a-chip{flex:none;width:36px;height:36px}
#jr-atendimento .jr-a-title{color:#f7be40;font-weight:800;font-size:13px;flex:1}
#jr-atendimento .jr-a-close{background:transparent;color:#fff;border:1px solid #48627a;border-radius:7px;min-width:38px;min-height:38px;font:22px/1 system-ui;cursor:pointer}
#jr-atendimento p{font:13px/1.45 system-ui;margin:0 0 11px;color:#e2edf4}
#jr-atendimento .jr-a-link{display:flex;align-items:center;justify-content:center;gap:8px;min-height:44px;border-radius:7px;background:#25d366;color:#052718;font:800 13px/1.3 system-ui;text-decoration:none;padding:8px;text-align:center}
#jr-atendimento a:focus-visible,#jr-atendimento button:focus-visible{outline:3px solid #fff;outline-offset:2px}
@media(max-width:700px){#jr-atendimento{width:250px;padding:10px;border-radius:9px}#jr-atendimento p{font-size:12px}#jr-atendimento .jr-a-title{font-size:12px}}
`;
document.head.append(style);
const el=document.createElement("aside");el.id="jr-atendimento";el.hidden=true;el.setAttribute("aria-label","Atendimento Eletromecânica JR");
el.innerHTML='<div class="jr-a-head"><svg class="jr-a-chip" viewBox="0 0 48 48" aria-hidden="true"><rect x="9" y="9" width="30" height="30" rx="6" fill="#102c46" stroke="#f7be40" stroke-width="2"/><path d="M15 3v6m9-6v6m9-6v6M15 39v6m9-6v6m9-6v6M3 15h6m-6 9h6m-6 9h6m30-18h6m-6 9h6m-6 9h6" stroke="#f7be40" stroke-width="2" stroke-linecap="round"/><text x="24" y="29" fill="#fff" text-anchor="middle" font-size="15" font-weight="900">JR</text></svg><strong class="jr-a-title">Bem-vindo à Eletromecânica JR!</strong><button type="button" class="jr-a-close" aria-label="Fechar janela de atendimento">×</button></div><p>Precisa de uma solução técnica? Fale agora mesmo com nossa equipe.</p><a class="jr-a-link" target="_blank" rel="noopener noreferrer"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-8 8 8 8 0 0 1-3.5-.8L4 20l1.3-4.5a8 8 0 1 1 14.7-4Z"/><path d="M9 8c0 4 3 7 7 7l1-2-3-1-1 1-3-3 1-1-1-2Z"/></svg>Conversar pelo WhatsApp</a>';
const link=el.querySelector("a");link.href="https://wa.me/5566996406718?text="+encodeURIComponent("Olá! Vim pelo site da Eletromecânica JR e gostaria de conversar com a equipe.");
document.body.append(el);
let due=false,closed=false,shown=false;
const music=document.querySelector(".jr-yt-widget");const panel=document.getElementById("jr-yt-panel");
function mark(){try{sessionStorage.setItem(key,"1")}catch(e){}}
function close(){closed=true;el.hidden=true;mark()}
function place(){if(!due||closed)return;
if(panel&&!panel.hidden){el.hidden=true;return}
const base=music?Math.max(18,Math.ceil(window.innerHeight-music.getBoundingClientRect().top+10)):18;
el.style.bottom=base+"px";el.style.maxHeight="calc(100dvh - "+(base+90)+"px)";
if(window.innerHeight-base<230){el.hidden=true;return}
el.hidden=false;if(!shown){shown=true;mark()}}
el.querySelector("button").addEventListener("click",close);link.addEventListener("click",close);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!el.hidden)close()});
if(music&&window.MutationObserver)new MutationObserver(place).observe(music,{subtree:true,attributes:true,attributeFilter:["hidden","aria-expanded"]});
if(music&&window.ResizeObserver)new ResizeObserver(place).observe(music);
window.addEventListener("resize",place);setTimeout(()=>{due=true;place()},5000);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();