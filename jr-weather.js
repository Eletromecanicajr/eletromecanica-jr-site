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
#jr-weather-panel .jw-geo{margin:12px 0;border:1px solid #b89045;border-radius:12px;background:#10283e;padding:12px}
#jr-weather-panel .jw-geo h3{margin:0 0 8px;color:#f6d77f}
#jr-weather-panel #jw-geo-source{font-size:14px;font-weight:700;color:#f6d77f;overflow-wrap:anywhere}
#jr-weather-panel .jw-geo .jw-metrics{margin:9px 0}
#jr-weather-panel .jw-geo strong{font-variant-numeric:tabular-nums;overflow-wrap:anywhere}
#jr-weather-panel .jw-geo .jw-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}
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
<div class="jw-controls"><form id="jw-form"><input id="jw-query" aria-label="Cidade brasileira" placeholder="Buscar cidade, UF" maxlength="100" required><button type="submit">Buscar</button></form><button id="jw-location" type="button">Localizar GPS</button><button id="jw-default" type="button">Campo Verde</button></div>
<p class="jw-muted">Ao abrir, a central solicita sua localização. Permita o acesso ao GPS ou escolha uma cidade. Coordenadas arredondadas são enviadas ao serviço meteorológico e ao OpenStreetMap para identificar o município. As coordenadas de campo exibidas são mantidas com a precisão original do aparelho.</p>
<div id="jw-results" hidden></div><p id="jw-status" role="status" aria-live="polite"></p>
<section class="jw-geo" aria-labelledby="jw-geo-title"><h3 id="jw-geo-title">📍 Coordenadas de campo • UTM / WGS 84</h3><p class="jw-muted" id="jw-geo-source">Selecione um local ou ative o GPS.</p><div class="jw-metrics"><div><span class="jw-muted">Easting (E)</span><strong id="jw-east">—</strong></div><div><span class="jw-muted">Northing (N)</span><strong id="jw-north">—</strong></div><div><span class="jw-muted">Fuso / hemisfério</span><strong id="jw-zone">—</strong></div><div><span class="jw-muted">EPSG</span><strong id="jw-epsg">—</strong></div><div><span class="jw-muted">Latitude (°)</span><strong id="jw-lat">—</strong></div><div><span class="jw-muted">Longitude (°)</span><strong id="jw-lon">—</strong></div><div><span class="jw-muted">Precisão horizontal estimada</span><strong id="jw-accuracy">—</strong></div><div><span class="jw-muted">Altitude do GPS (elipsoidal)</span><strong id="jw-alt">—</strong></div></div><p class="jw-muted" id="jw-geo-time"></p><div class="jw-actions"><button id="jw-copy" type="button" disabled>Copiar coordenadas</button><button id="jw-refresh" type="button" disabled>Atualizar previsão</button></div><p id="jw-copy-status" role="status" class="jw-muted"></p><p class="jw-muted" style="margin-top:8px">UTM em WGS 84; não equivale a levantamento topográfico certificado. Para projetos em SIRGAS 2000, confirme o referencial e a precisão exigidos.</p></section>
<div id="jw-data" hidden><p class="jw-city" id="jw-city"></p><div class="jw-now"><div class="jw-symbol" id="jw-icon" aria-hidden="true"></div><div><div class="jw-temp" id="jw-temp"></div><p id="jw-condition"></p><p class="jw-muted">Estimativa para agora, não medição local</p></div></div>
<div class="jw-metrics"><div><span class="jw-muted">Umidade</span><strong id="jw-humidity"></strong></div><div><span class="jw-muted">Vento</span><strong id="jw-wind"></strong></div><div><span class="jw-muted">Direção do vento (de)</span><strong id="jw-direction"></strong></div><div><span class="jw-muted">Rajada de vento</span><strong id="jw-gust"></strong></div><div><span class="jw-muted">Pressão ao nível do mar</span><strong id="jw-pressure"></strong></div><div><span class="jw-muted">Cobertura de nuvens</span><strong id="jw-cloud"></strong></div><div><span class="jw-muted">Chuva prevista (1 h)</span><strong id="jw-rain"></strong></div><div><span class="jw-muted">Chance de chuva (1 h)</span><strong id="jw-prob"></strong></div></div><h3>Previsão • próximos 7 dias</h3><div class="jw-days" id="jw-days"></div><p class="jw-muted">Máximas e mínimas estimadas com os horários disponíveis. Horário do dispositivo.</p><p class="jw-muted" id="jw-updated"></p></div>
<div class="jw-note">Segurança operacional: consulte alertas oficiais e protocolos de segurança antes de trabalhos externos. Esta previsão não é um detector de raios nem autoriza atividades de risco.</div>
<div class="jw-links"><a href="https://alertas2.inmet.gov.br/" target="_blank" rel="noopener noreferrer">Alertas oficiais INMET ↗</a><a href="https://www.cptec.inpe.br/" target="_blank" rel="noopener noreferrer">Meteorologia e radar INPE ↗</a><a href="https://www.windy.com/" target="_blank" rel="noopener noreferrer">Mapa meteorológico ↗</a></div>
<p class="jw-muted" style="margin-top:12px">Previsões: <a href="https://www.met.no/en" target="_blank" rel="noopener noreferrer">MET Norway</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>. Geocodificação © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>.</p>`;
document.body.append(panel);
const $=id=>document.getElementById(id),launch=$("jr-weather-launch"),status=$("jw-status"),data=$("jw-data"),results=$("jw-results");
const standard={lat:-15.55,lon:-55.16,name:"Campo Verde – MT",source:"Referência aproximada do município"},cache=new Map(),geoCache=new Map();
let selected=null,request=0,searchRequest=0,updatedAt=0,lastGeo=0,focusBack=null,timer=null;
const num=(v,s)=>typeof v==="number"&&Number.isFinite(v)?Math.round(v)+s:"—";
// WGS 84 Transverse Mercator, UTM zone with Norway/Svalbard exceptions.
function utm(lat,lon){
 if(!Number.isFinite(lat)||!Number.isFinite(lon)||lat< -80||lat>84||lon< -180||lon>180)return null;
 let z=Math.min(60,Math.floor((lon+180)/6)+1);
 if(lat>=56&&lat<64&&lon>=3&&lon<12)z=32;
 if(lat>=72&&lat<84&&lon>=0&&lon<42)z=lon<9?31:lon<21?33:lon<33?35:37;
 const a=6378137,e2=0.0066943799901413165,ep2=e2/(1-e2),k=.9996,r=Math.PI/180,p=lat*r,l=(lon-(z*6-183))*r;
 const sin=Math.sin(p),cos=Math.cos(p),tan=Math.tan(p),N=a/Math.sqrt(1-e2*sin*sin),T=tan*tan,C=ep2*cos*cos,A=cos*l;
 const M=a*((1-e2/4-3*e2**2/64-5*e2**3/256)*p-(3*e2/8+3*e2**2/32+45*e2**3/1024)*Math.sin(2*p)+(15*e2**2/256+45*e2**3/1024)*Math.sin(4*p)-35*e2**3/3072*Math.sin(6*p));
 const east=500000+k*N*(A+(1-T+C)*A**3/6+(5-18*T+T*T+72*C-58*ep2)*A**5/120);
 const north=k*(M+N*tan*(A*A/2+(5-T+9*C+4*C*C)*A**4/24+(61-58*T+T*T+600*C-330*ep2)*A**6/720))+(lat<0?10000000:0);
 return {east,north,zone:z,hem:lat<0?"S":"N",epsg:(lat<0?32700:32600)+z};
}
const fmt=(v,d=0)=>Number.isFinite(v)?v.toLocaleString("pt-BR",{minimumFractionDigits:d,maximumFractionDigits:d}):"—";
let copyText="";
function renderGeo(city){
 const u=utm(city.lat,city.lon),gps=city.source==="GPS do aparelho";
 $("jw-geo-source").textContent="Município / local: "+city.name+" • "+(city.source||"Local selecionado na busca")+(u?"":" • Fora da cobertura UTM (80° S a 84° N).");
 $("jw-east").textContent=u?fmt(u.east)+" m":"—";
 $("jw-north").textContent=u?fmt(u.north)+" m":"—";
 $("jw-zone").textContent=u?u.zone+" "+u.hem:"—";
 $("jw-epsg").textContent=u?"EPSG:"+u.epsg:"—";
 $("jw-lat").textContent=fmt(city.lat,6)+"°";
 $("jw-lon").textContent=fmt(city.lon,6)+"°";
 $("jw-accuracy").textContent=gps&&Number.isFinite(city.accuracy)?"± "+fmt(city.accuracy,1)+" m":"Não informada";
 $("jw-alt").textContent=gps&&Number.isFinite(city.altitude)?fmt(city.altitude,1)+" m"+(Number.isFinite(city.altitudeAccuracy)?" (± "+fmt(city.altitudeAccuracy,1)+" m)":""):"Não informada";
 $("jw-geo-time").textContent=city.timestamp?"GPS: "+new Date(city.timestamp).toLocaleString("pt-BR"):"Coordenadas de referência, não obtidas por GPS.";
 copyText=["Eletromecânica JR — Coordenadas de campo",city.name,city.source||"Local selecionado na busca","WGS 84","Latitude: "+city.lat.toFixed(6),"Longitude: "+city.lon.toFixed(6),u?"UTM "+u.zone+u.hem+" | EPSG:"+u.epsg+" | E: "+u.east.toFixed(0)+" m | N: "+u.north.toFixed(0)+" m":"UTM indisponível",gps&&Number.isFinite(city.accuracy)?"Precisão horizontal estimada: ± "+city.accuracy.toFixed(1)+" m":"Precisão horizontal não informada",gps&&Number.isFinite(city.altitude)?"Altitude elipsoidal: "+city.altitude.toFixed(1)+" m":"Altitude não informada",city.timestamp?"GPS: "+new Date(city.timestamp).toLocaleString("pt-BR"):"Coordenada de referência"].join("\n");
 $("jw-copy").disabled=false;$("jw-refresh").disabled=false;$("jw-copy-status").textContent="";
}
$("jw-copy").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(copyText);$("jw-copy-status").textContent="Coordenadas copiadas."}catch(e){const field=document.createElement("textarea");field.value=copyText;field.setAttribute("readonly","");$("jw-copy-status").replaceChildren(document.createTextNode("Selecione e copie os dados: "),field);field.focus();field.select()}});
$("jw-refresh").addEventListener("click",()=>{if(!selected)return;cache.delete(selected.lat.toFixed(2)+","+selected.lon.toFixed(2));load(selected)});
function symbol(code){const s=String(code||"");if(s.includes("thunder"))return ["⛈️","Trovoadas"];if(s.includes("snow")||s.includes("sleet"))return ["🌨️","Precipitação invernal"];if(s.includes("rain"))return ["🌧️","Chuva"];if(s.includes("fog"))return ["🌫️","Neblina"];if(s.includes("partlycloudy")||s.includes("fair"))return ["⛅","Parcialmente nublado"];if(s.includes("cloudy"))return ["☁️","Nublado"];if(s.includes("clearsky"))return [s.includes("night")?"🌙":"☀️","Céu limpo"];return ["—","Condição indisponível"]}
const dateKey=t=>{const d=new Date(t);return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-")};
function render(json,city){const ts=json?.properties?.timeseries;if(!Array.isArray(ts)||!ts.length)throw Error("sem dados");const now=Date.now(),near=ts.reduce((a,b)=>Math.abs(Date.parse(a.time)-now)<=Math.abs(Date.parse(b.time)-now)?a:b),details=near.data.instant.details,hour=near.data.next_1_hours,code=(hour||near.data.next_6_hours||near.data.next_12_hours)?.summary?.symbol_code,s=symbol(code);
$("jw-city").textContent=city.name;$("jw-icon").textContent=s[0];$("jw-condition").textContent=s[1];$("jw-temp").textContent=num(details.air_temperature,"°C");$("jw-humidity").textContent=num(details.relative_humidity,"%");$("jw-wind").textContent=num(typeof details.wind_speed==="number"?details.wind_speed*3.6:null," km/h");
const dir=details.wind_from_direction;
$("jw-direction").textContent=Number.isFinite(dir)?Math.round(dir)+"° "+["N","NE","L","SE","S","SO","O","NO"][Math.round(dir/45)%8]:"—";
$("jw-gust").textContent=num(Number.isFinite(details.wind_speed_of_gust)?details.wind_speed_of_gust*3.6:null," km/h");
$("jw-pressure").textContent=num(details.air_pressure_at_sea_level," hPa");
$("jw-cloud").textContent=num(details.cloud_area_fraction,"%");
$("jw-rain").textContent=typeof hour?.details?.precipitation_amount==="number"?hour.details.precipitation_amount.toLocaleString("pt-BR",{maximumFractionDigits:1})+" mm":"—";
$("jw-prob").textContent=num(hour?.details?.probability_of_precipitation,"%");
const days=new Map(),today=dateKey(now);for(const x of ts){const key=dateKey(x.time),t=x.data?.instant?.details?.air_temperature;if(key<today||typeof t!=="number")continue;let day=days.get(key);if(!day){day={time:x.time,min:t,max:t,code:null,dist:99};days.set(key,day)}day.min=Math.min(day.min,t);day.max=Math.max(day.max,t);const h=new Date(x.time).getHours(),c=(x.data.next_6_hours||x.data.next_1_hours||x.data.next_12_hours)?.summary?.symbol_code;if(c&&Math.abs(h-12)<day.dist){day.code=c;day.dist=Math.abs(h-12)}}
$("jw-days").replaceChildren();for(const [key,d] of [...days].slice(0,7)){const node=document.createElement("div");node.className="jw-day";const label=document.createElement("strong");label.textContent=key===today?"Hoje":new Date(d.time).toLocaleDateString("pt-BR",{weekday:"short"});const icon=document.createElement("span");icon.textContent=symbol(d.code)[0];icon.title=symbol(d.code)[1];const temps=document.createElement("div");temps.textContent=num(d.max,"°")+" / "+num(d.min,"°");node.append(label,icon,temps);$("jw-days").append(node)}
const stamp=json.properties.meta?.updated_at;$("jw-updated").textContent=stamp?"Modelo atualizado: "+new Date(stamp).toLocaleString("pt-BR"):"Horário de atualização do modelo indisponível.";data.hidden=false;
launch.querySelector("span").textContent="Clima · "+num(details.air_temperature,"°C");
}
async function fetchJSON(url){const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),12000);try{const r=await fetch(url,{signal:controller.signal,referrerPolicy:"strict-origin-when-cross-origin"});if(!r.ok)throw Error("HTTP "+r.status);return await r.json()}finally{clearTimeout(timeout)}}
async function load(city){selected=city;renderGeo(city);const id=++request,key=city.lat.toFixed(2)+","+city.lon.toFixed(2);data.hidden=true;status.textContent="Consultando previsão…";try{let hit=cache.get(key);if(!hit||Date.now()-hit.time>3600000){const url=new URL("https://api.met.no/weatherapi/locationforecast/2.0/compact");url.searchParams.set("lat",city.lat.toFixed(2));url.searchParams.set("lon",city.lon.toFixed(2));hit={json:await fetchJSON(url),time:Date.now()};cache.set(key,hit)}if(id!==request)return;render(hit.json,city);status.textContent="";updatedAt=hit.time}catch(e){if(id!==request)return;status.textContent="Não foi possível carregar a previsão agora. Tente novamente em alguns minutos ou consulte os links oficiais abaixo.";updatedAt=Date.now()}}
function open(){if(panel.open)return;focusBack=document.activeElement;if(typeof panel.showModal!=="function"){status.textContent="Seu navegador não suporta a janela de previsão.";window.open("https://portal.inmet.gov.br/","_blank","noopener,noreferrer");return}panel.showModal();locate();timer=setInterval(()=>{if(panel.open&&selected&&Date.now()-updatedAt>3600000)load(selected)},60000)}
launch.addEventListener("click",open);panel.querySelector(".jw-close").addEventListener("click",()=>panel.close());panel.addEventListener("close",()=>{clearSearch();clearInterval(timer);if(focusBack?.isConnected)focusBack.focus()});panel.addEventListener("click",e=>{if(e.target===panel){const r=panel.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)panel.close()}});
function clearSearch(){++searchRequest;++request;results.replaceChildren();results.hidden=true}
$("jw-default").addEventListener("click",()=>{clearSearch();load(standard)});
$("jw-form").addEventListener("submit",async e=>{e.preventDefault();const query=$("jw-query").value.trim();if(!query)return;clearSearch();const id=searchRequest;if(Date.now()-lastGeo<1100){status.textContent="Aguarde um instante para pesquisar novamente.";return}lastGeo=Date.now();status.textContent="Buscando cidades…";try{const k=query.toLocaleLowerCase("pt-BR");let list=geoCache.get(k);if(!list){const u=new URL("https://nominatim.openstreetmap.org/search");u.searchParams.set("q",query);u.searchParams.set("countrycodes","br");u.searchParams.set("format","jsonv2");u.searchParams.set("limit","5");u.searchParams.set("accept-language","pt-BR");list=await fetchJSON(u);geoCache.set(k,list)}if(id!==searchRequest)return;for(const item of list){const lat=Number(item.lat),lon=Number(item.lon);if(!Number.isFinite(lat)||!Number.isFinite(lon))continue;const btn=document.createElement("button");btn.type="button";btn.textContent=item.display_name;btn.addEventListener("click",()=>{clearSearch();load({lat,lon,name:item.display_name.split(",").slice(0,3).join(", ")})});results.append(btn)}results.hidden=!results.childElementCount;status.textContent=results.hidden?"Nenhum município encontrado.":"Selecione o local desejado."}catch(err){if(id===searchRequest)status.textContent="Busca indisponível. Tente novamente ou use Campo Verde."}});
// Reverse geocoding is independent of the forecast and never substitutes GPS coordinates.
async function identifyMunicipality(city,id){
 const active=()=>id===searchRequest&&selected===city&&panel.open;
 const lat=city.lat.toFixed(4),lon=city.lon.toFixed(4),key="reverse:"+lat+","+lon;
 let name=geoCache.get(key);
 try{
  if(!name){
   const delay=Math.max(0,1100-(Date.now()-lastGeo));
   if(delay)await new Promise(resolve=>setTimeout(resolve,delay));
   if(!active())return;
   lastGeo=Date.now();
   const u=new URL("https://nominatim.openstreetmap.org/reverse");
   u.searchParams.set("lat",lat);u.searchParams.set("lon",lon);
   u.searchParams.set("format","jsonv2");u.searchParams.set("zoom","10");
   u.searchParams.set("addressdetails","1");u.searchParams.set("accept-language","pt-BR");
   const result=await fetchJSON(u),a=result?.address||{};
   const municipality=a.municipality||a.city||a.town||a.village;
   if(!municipality)throw Error("Município não identificado");
   const uf=(a["ISO3166-2-lvl4"]||"").match(/^BR-([A-Z]{2})$/)?.[1]||a.state;
   name=municipality+(uf?" – "+uf:"");
   geoCache.set(key,name);
  }
 }catch(e){name="Município não identificado (GPS disponível)"}
 if(!active())return;
 city.name=name;
 renderGeo(city);
 $("jw-city").textContent=name;
}
function locate(){
 clearSearch();const id=searchRequest;selected=null;data.hidden=true;copyText="";updatedAt=0;
 for(const field of ["jw-east","jw-north","jw-zone","jw-epsg","jw-lat","jw-lon","jw-accuracy","jw-alt"])$(field).textContent="—";
 $("jw-copy").disabled=true;$("jw-refresh").disabled=true;$("jw-copy-status").textContent="";$("jw-geo-time").textContent="";$("jw-geo-source").textContent="Aguardando posição do aparelho.";
 launch.querySelector("span").textContent="Clima e tempo";
 function failed(message){if(id!==searchRequest)return;status.textContent=message;$("jw-geo-source").textContent="GPS indisponível. Ative a localização ou escolha uma cidade; nenhuma posição foi presumida."}
 if(!navigator.geolocation){failed("GPS indisponível neste navegador. Busque sua cidade.");return}
 if(!window.isSecureContext){failed("O GPS exige uma conexão HTTPS. Abra o site seguro ou busque sua cidade.");return}
 status.textContent="Localizando você… Autorize a localização quando solicitado.";
 navigator.geolocation.getCurrentPosition(p=>{
 if(id!==searchRequest||!panel.open)return;
 const city={lat:p.coords.latitude,lon:p.coords.longitude,accuracy:p.coords.accuracy,altitude:p.coords.altitude,altitudeAccuracy:p.coords.altitudeAccuracy,timestamp:p.timestamp,name:"Identificando município…",source:"GPS do aparelho"};
 load(city);identifyMunicipality(city,id);
 },err=>{failed(err.code===1?"Permissão negada. Ative a localização deste site no navegador e toque em Localizar GPS, ou busque sua cidade.":err.code===3?"O GPS demorou a responder. Toque em Localizar GPS para tentar novamente.":"Não foi possível localizar o aparelho. Tente novamente ou busque sua cidade.")},{enableHighAccuracy:true,timeout:20000,maximumAge:0});
}
$("jw-location").addEventListener("click",locate);
const nav=$("mainNav");if(nav){const a=document.createElement("a");a.href="#jr-weather-panel";a.className="nav-link";a.textContent="Clima e Tempo";a.addEventListener("click",e=>{e.preventDefault();const toggle=$("menuToggle");if(toggle?.getAttribute("aria-expanded")==="true")toggle.click();open()});const contact=nav.querySelector('a[href="#contato"]');nav.insertBefore(a,contact||null)}
function place(){const music=$("jr-yt-launcher"),musicPanel=$("jr-yt-panel");root.hidden=!!(musicPanel&&!musicPanel.hidden);if(music){const r=music.getBoundingClientRect();root.style.bottom=Math.max(12,window.innerHeight-r.top+9)+"px"}}
place();window.addEventListener("resize",place);if(window.visualViewport)window.visualViewport.addEventListener("resize",place);if(window.ResizeObserver&&$("jr-yt-launcher"))new ResizeObserver(place).observe($("jr-yt-launcher"));if(window.MutationObserver&&$("jr-yt-panel"))new MutationObserver(place).observe($("jr-yt-panel"),{attributes:true,attributeFilter:["hidden"]});
})();
