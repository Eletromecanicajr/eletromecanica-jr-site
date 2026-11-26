(function(){
"use strict";
if(document.getElementById("jr-weather"))return;
const css=document.createElement("style");
css.textContent=`
#jr-weather{position:fixed;left:max(12px,env(safe-area-inset-left));bottom:calc(145px + env(safe-area-inset-bottom));z-index:97;color:#f5f9fc;font:600 13px/1.4 'Segoe UI',Arial,sans-serif}
#jr-weather[hidden],#jr-weather-panel [hidden]{display:none!important}
#jr-weather button,#jr-weather-panel button{font:inherit;cursor:pointer}
#jr-weather-launch{display:flex;align-items:center;gap:8px;background:#0d2034;color:#f6d77f;border:1px solid #a27c36;border-radius:12px;padding:9px 13px;box-shadow:0 4px 18px #0007;min-height:42px}
#jr-weather-launch:hover{background:#193a54}
#jr-weather-panel{color:#f5f9fc;background:#0a1b2d;border:1px solid #b89045;border-radius:18px;width:min(680px,calc(100% - 24px));max-height:calc(100dvh - 32px);overflow:auto;padding:clamp(14px,3vw,24px);box-shadow:0 20px 80px #000a;font:14px/1.5 'Segoe UI',Arial,sans-serif}
#jr-weather-panel::backdrop{background:#000a;backdrop-filter:blur(3px)}
#jr-weather-panel *{box-sizing:border-box}
#jr-weather-panel h2,#jr-weather-panel h3,#jr-weather-panel p{margin:0}
#jr-weather-panel h2{font-size:clamp(19px,4vw,25px);color:#f6d77f;letter-spacing:.02em}
#jr-weather-panel h3{font-size:15px;margin:16px 0 8px;color:#e5edf4}
#jr-weather-panel .jw-head,#jr-weather-panel .jw-controls,#jr-weather-panel .jw-now{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
#jr-weather-panel .jw-head>div{flex:1}
#jr-weather-panel .jw-muted{color:#aab9c8;font-size:12px}
#jr-weather-panel button{color:#f5f9fc;background:#17334d;border:1px solid #45647c;border-radius:8px;padding:8px 12px}
#jr-weather-panel button:hover{border-color:#f7be40}
#jr-weather-panel .jw-close{font-size:20px;line-height:1;padding:8px 11px}
#jr-weather-panel form{display:flex;gap:6px;flex:1 1 270px;margin:0}
#jr-weather-panel input{min-width:0;flex:1;background:#071525;color:#fff;border:1px solid #45647c;padding:9px;border-radius:8px;font:inherit}
#jr-weather-panel .jw-controls{margin:14px 0 6px}
#jr-weather-panel .jw-now{margin:14px 0}
#jr-weather-panel .jw-temp{font-size:42px;font-weight:800;line-height:1.1;color:#fff}
#jr-weather-panel .jw-symbol{font-size:38px;line-height:1}
#jr-weather-panel .jw-city{font-weight:700;color:#f6d77f;margin:12px 0 0}
#jr-weather-panel .jw-metrics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
#jr-weather-panel .jw-metrics>div,#jr-weather-panel .jw-day{border:1px solid #29445b;background:#10283e;padding:9px;border-radius:9px}
#jr-weather-panel .jw-metrics strong{display:block;font-size:17px}
#jr-weather-panel .jw-days{display:grid;grid-template-columns:repeat(auto-fit,minmax(72px,1fr));gap:6px}
#jr-weather-panel .jw-day{padding:8px 4px;text-align:center;font-size:12px}
#jr-weather-panel .jw-day span{display:block;font-size:20px;margin:6px 0}
#jr-weather-panel .jw-note{border-left:3px solid #f7be40;padding:9px 11px;background:#332a1a;margin-top:14px;color:#f8deb0;font-size:12px}
#jr-weather-panel .jw-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:12px}
#jr-weather-panel a{color:#91d9ff;text-decoration:underline}
#jr-weather-panel #jw-results{display:grid;gap:5px;margin-top:7px}
#jr-weather-panel #jw-status{margin-top:9px;font-size:12px;color:#f6d77f;min-height:1em}
@media(max-width:480px){#jr-weather-launch{padding:7px 10px;font-size:12px;min-height:38px}#jr-weather-panel .jw-days{grid-template-columns:repeat(4,minmax(0,1fr))}}
`;
document.head.append(css);
const root=document.createElement("div");root.id="jr-weather";
root.innerHTML='<button id="jr-weather-launch" type="button" aria-haspopup="dialog" aria-controls="jr-weather-panel">☀ <span>Clima e tempo</span></button>';
document.body.append(root);
const panel=document.createElement("dialog");panel.id="jr-weather-panel";panel.setAttribute("aria-labelledby","jw-title");
panel.innerHTML=`
<div class="jw-head"><div><h2 id="jw-title">JR WEATHER CENTER</h2><p class="jw-muted">Central meteorológica • Eletromecânica JR</p></div><button class="jw-close" type="button" aria-label="Fechar previsão">×</button></div>
<div class="jw-controls"><form id="jw-form"><input id="jw-query" aria-label="Cidade brasileira" placeholder="Buscar cidade, UF" maxlength="100" required><button type="submit">Buscar</button></form><button id="jw-location" type="button">Minha localização</button><button id="jw-default" type="button">Campo Verde</button></div>
<p class="jw-muted">A busca consulta OpenStreetMap. A localização é opcional; coordenadas aproximadas são enviadas ao serviço meteorológico.</p>
<div id="jw-results" hidden></div><p id="jw-status" role="status" aria-live="polite"></p>
<div id="jw-data" hidden><p class="jw-city" id="jw-city"></p><div class="jw-now"><div class="jw-symbol" id="jw-icon" aria-hidden="true"></div><div><div class="jw-temp" id="jw-temp"></div><p id="jw-condition"></p><p class="jw-muted">Estimativa para agora, não medição local</p></div></div>
<div class="jw-metrics"><div><span class="jw-muted">Umidade</span><strong id="jw-humidity"></strong></div><div><span class="jw-muted">Vento</span><strong id="jw-wind"></strong></div><div><span class="jw-muted">Chuva prevista (1 h)</span><strong id="jw-rain"></strong></div><div><span class="jw-muted">Chance de chuva (1 h)</span><strong id="jw-prob"></strong></div></div><h3>Previsão • próximos 7 dias</h3><div class="jw-days" id="jw-days"></div><p class="jw-muted">Máximas e mínimas estimadas com os horários disponíveis. Horário do dispositivo.</p><p class="jw-muted" id="jw-updated"></p></div>
<div class="jw-note">Segurança operacional: consulte alertas oficiais e protocolos de segurança antes de trabalhos externos. Esta previsão não é um detector de raios nem autoriza atividades de risco.</div>
<div class="jw-links"><a href="https://alertas2.inmet.gov.br/" target="_blank" rel="noopener noreferrer">Alertas oficiais INMET ↗</a><a href="https://www.cptec.inpe.br/" target="_blank" rel="noopener noreferrer">Meteorologia e radar INPE ↗</a><a href="https://www.windy.com/" target="_blank" rel="noopener noreferrer">Mapa meteorológico ↗</a></div>
<p class="jw-muted" style="margin-top:12px">Previsões: <a href="https://www.met.no/en" target="_blank" rel="noopener noreferrer">MET Norway</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>. Geocodificação © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>.</p>`;
document.body.append(panel);
const $=id=>document.getElementById(id),launch=$("jr-weather-launch"),status=$("jw-status"),data=$("jw-data"),results=$("jw-results");
const standard={lat:-15.55,lon:-55.16,name:"Campo Verde – MT"},cache=new Map(),geoCache=new Map();
let selected=standard,request=0,searchRequest=0,updatedAt=0,lastGeo=0,focusBack=null,timer=null;
const num=(v,s)=>typeof v==="number"&&Number.isFinite(v)?Math.round(v)+s:"—";
function symbol(code){const s=String(code||"");if(s.includes("thunder"))return ["⛈️","Trovoadas"];if(s.includes("snow")||s.includes("sleet"))return ["🌨️","Precipitação invernal"];if(s.includes("rain"))return ["🌧️","Chuva"];if(s.includes("fog"))return ["🌫️","Neblina"];if(s.includes("partlycloudy")||s.includes("fair"))return ["⛅","Parcialmente nublado"];if(s.includes("cloudy"))return ["☁️","Nublado"];if(s.includes("clearsky"))return [s.includes("night")?"🌙":"☀️","Céu limpo"];return ["—","Condição indisponível"]}
const dateKey=t=>{const d=new Date(t);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-")};
function render(json,city){const ts=json?.properties?.timeseries;if(!Array.isArray(ts)||!ts.length)throw Error("sem dados");const now=Date.now(),near=ts.reduce((a,b)=>Math.abs(Date.parse(a.time)-now)<=Math.abs(Date.parse(b.time)-now)?a:b),details=near.data.instant.details,hour=near.data.next_1_hours,code=(hour||near.data.next_6_hours||near.data.next_12_hours)?.summary?.symbol_code,s=symbol(code);
$("jw-city").textContent=city.name;$("jw-icon").textContent=s[0];$("jw-condition").textContent=s[1];$("jw-temp").textContent=num(details.air_temperature,"°C");$("jw-humidity").textContent=num(details.relative_humidity,"%");$("jw-wind").textContent=num(typeof details.wind_speed==="number"?details.wind_speed*3.6:null," km/h");
$("jw-rain").textContent=typeof hour?.details?.precipitation_amount==="number"?hour.details.precipitation_amount.toLocaleString("pt-BR",{maximumFractionDigits:1})+" mm":"—";
$("jw-prob").textContent=num(hour?.details?.probability_of_precipitation,"%");
const days=new Map(),today=dateKey(now);for(const x of ts){const key=dateKey(x.time),t=x.data?.instant?.details?.air_temperature;if(key<today||typeof t!=="number")continue;let day=days.get(key);if(!day){day={time:x.time,min:t,max:t,code:null,dist:99};days.set(key,day)}day.min=Math.min(day.min,t);day.max=Math.max(day.max,t);const h=new Date(x.time).getHours(),c=(x.data.next_6_hours||x.data.next_1_hours||x.data.next_12_hours)?.summary?.symbol_code;if(c&&Math.abs(h-12)<day.dist){day.code=c;day.dist=Math.abs(h-12)}}
$("jw-days").replaceChildren();for(const [key,d] of [...days].slice(0,7)){const node=document.createElement("div");node.className="jw-day";const label=document.createElement("strong");label.textContent=key===today?"Hoje":new Date(d.time).toLocaleDateString("pt-BR",{weekday:"short"});const icon=document.createElement("span");icon.textContent=symbol(d.code)[0];icon.title=symbol(d.code)[1];const temps=document.createElement("div");temps.textContent=num(d.max,"°")+" / "+num(d.min,"°");node.append(label,icon,temps);$("jw-days").append(node)}
const stamp=json.properties.meta?.updated_at;$("jw-updated").textContent=stamp?"Modelo atualizado: "+new Date(stamp).toLocaleString("pt-BR"):"Horário de atualização do modelo indisponível.";data.hidden=false;
if(city===standard||city.name===standard.name)launch.querySelector("span").textContent="Clima · "+num(details.air_temperature,"°C");
}
async function fetchJSON(url){const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),12000);try{const r=await fetch(url,{signal:controller.signal,referrerPolicy:"strict-origin-when-cross-origin"});if(!r.ok)throw Error("HTTP "+r.status);return await r.json()}finally{clearTimeout(timeout)}}
async function load(city){selected=city;const id=++request,key=city.lat.toFixed(2)+","+city.lon.toFixed(2);data.hidden=true;status.textContent="Consultando previsão…";try{let hit=cache.get(key);if(!hit||Date.now()-hit.time>3600000){const url=new URL("https://api.met.no/weatherapi/locationforecast/2.0/compact");url.searchParams.set("lat",city.lat.toFixed(2));url.searchParams.set("lon",city.lon.toFixed(2));hit={json:await fetchJSON(url),time:Date.now()};cache.set(key,hit)}if(id!==request)return;render(hit.json,city);status.textContent="";updatedAt=hit.time}catch(e){if(id!==request)return;status.textContent="Não foi possível carregar a previsão agora. Tente novamente em alguns minutos ou consulte os links oficiais abaixo.";updatedAt=Date.now()}}
function open(){if(panel.open)return;focusBack=document.activeElement;if(typeof panel.showModal!=="function"){status.textContent="Seu navegador não suporta a janela de previsão.";window.open("https://portal.inmet.gov.br/","_blank","noopener,noreferrer");return}panel.showModal();if(!updatedAt||Date.now()-updatedAt>3600000||data.hidden)load(selected);timer=setInterval(()=>{if(panel.open&&Date.now()-updatedAt>3600000)load(selected)},60000)}
launch.addEventListener("click",open);panel.querySelector(".jw-close").addEventListener("click",()=>panel.close());panel.addEventListener("close",()=>{clearInterval(timer);if(focusBack?.isConnected)focusBack.focus()});panel.addEventListener("click",e=>{if(e.target===panel){const r=panel.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)panel.close()}});
function clearSearch(){++searchRequest;results.replaceChildren();results.hidden=true}
$("jw-default").addEventListener("click",()=>{clearSearch();load(standard)});
$("jw-form").addEventListener("submit",async e=>{e.preventDefault();const query=$("jw-query").value.trim();if(!query)return;clearSearch();const id=searchRequest;if(Date.now()-lastGeo<1100){status.textContent="Aguarde um instante para pesquisar novamente.";return}lastGeo=Date.now();status.textContent="Buscando cidades…";try{const k=query.toLocaleLowerCase("pt-BR");let list=geoCache.get(k);if(!list){const u=new URL("https://nominatim.openstreetmap.org/search");u.searchParams.set("q",query);u.searchParams.set("countrycodes","br");u.searchParams.set("format","jsonv2");u.searchParams.set("limit","5");u.searchParams.set("accept-language","pt-BR");list=await fetchJSON(u);geoCache.set(k,list)}if(id!==searchRequest)return;for(const item of list){const lat=Number(item.lat),lon=Number(item.lon);if(!Number.isFinite(lat)||!Number.isFinite(lon))continue;const btn=document.createElement("button");btn.type="button";btn.textContent=item.display_name;btn.addEventListener("click",()=>{clearSearch();load({lat,lon,name:item.display_name.split(",").slice(0,3).join(", ")})});results.append(btn)}results.hidden=!results.childElementCount;status.textContent=results.hidden?"Nenhum município encontrado.":"Selecione o local desejado."}catch(err){if(id===searchRequest)status.textContent="Busca indisponível. Tente novamente ou use Campo Verde."}});
$("jw-location").addEventListener("click",()=>{clearSearch();const id=searchRequest;if(!navigator.geolocation){status.textContent="Localização indisponível neste navegador.";return}status.textContent="Aguardando permissão de localização…";navigator.geolocation.getCurrentPosition(p=>{if(id!==searchRequest)return;load({lat:Number(p.coords.latitude.toFixed(2)),lon:Number(p.coords.longitude.toFixed(2)),name:"Sua localização aproximada"})},()=>{if(id===searchRequest)status.textContent="Localização não autorizada ou indisponível. Você pode buscar sua cidade."},{enableHighAccuracy:false,timeout:10000,maximumAge:300000})});
const nav=$("mainNav");if(nav){const a=document.createElement("a");a.href="#jr-weather-panel";a.className="nav-link";a.textContent="Clima e Tempo";a.addEventListener("click",e=>{e.preventDefault();const toggle=$("menuToggle");if(toggle?.getAttribute("aria-expanded")==="true")toggle.click();open()});const contact=nav.querySelector('a[href="#contato"]');nav.insertBefore(a,contact||null)}
function place(){const music=$("jr-yt-launcher"),musicPanel=$("jr-yt-panel");root.hidden=!!(musicPanel&&!musicPanel.hidden);if(music){const r=music.getBoundingClientRect();root.style.bottom=Math.max(12,window.innerHeight-r.top+9)+"px"}}
place();window.addEventListener("resize",place);if(window.visualViewport)window.visualViewport.addEventListener("resize",place);if(window.ResizeObserver&&$("jr-yt-launcher"))new ResizeObserver(place).observe($("jr-yt-launcher"));if(window.MutationObserver&&$("jr-yt-panel"))new MutationObserver(place).observe($("jr-yt-panel"),{attributes:true,attributeFilter:["hidden"]});
})();
