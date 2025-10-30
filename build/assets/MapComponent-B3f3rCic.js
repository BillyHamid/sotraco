const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/leaflet-src-C6KBGlij.js","assets/index-D2nobhDc.js","assets/index-UHtjvgaX.css"])))=>i.map(i=>d[i]);
import{c as v,r as c,_ as y,m as E,a as g,j as n,B as x}from"./index-D2nobhDc.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]],I=v("zoom-in",N);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]],$=v("zoom-out",T),b={L01:{stops:[{name:"Karpala Terminus",coords:[12.34,-1.49]},{name:"Zone 1",coords:[12.35,-1.5]},{name:"Boulmiougou-Est",coords:[12.36,-1.51]},{name:"Cité An II",coords:[12.365,-1.515]},{name:"Hôtel de Ville",coords:[12.37,-1.518]},{name:"Place de la Nation",coords:[12.3714,-1.5197]}],path:[[12.34,-1.49],[12.35,-1.5],[12.36,-1.51],[12.365,-1.515],[12.37,-1.518],[12.3714,-1.5197]]},L02:{stops:[{name:"Tampouy Terminus",coords:[12.41,-1.51]},{name:"Cité Azimo",coords:[12.4,-1.512]},{name:"Gounghin",coords:[12.39,-1.514]},{name:"Rond-point des Nations Unies",coords:[12.38,-1.518]},{name:"Patte d'Oie Sud",coords:[12.375,-1.52]},{name:"Échangeur de l'Est",coords:[12.37,-1.525]}],path:[[12.41,-1.51],[12.4,-1.512],[12.39,-1.514],[12.38,-1.518],[12.375,-1.52],[12.37,-1.525]]},L03:{stops:[{name:"Pissy Terminus",coords:[12.38,-1.55]},{name:"Cité Universitaire",coords:[12.375,-1.54]},{name:"Marché Central",coords:[12.3714,-1.53]},{name:"Hôpital Yalgado",coords:[12.37,-1.52]},{name:"Zone du Bois",coords:[12.365,-1.5]},{name:"Ouaga 2000 Terminus",coords:[12.35,-1.48]}],path:[[12.38,-1.55],[12.375,-1.54],[12.3714,-1.53],[12.37,-1.52],[12.365,-1.5],[12.35,-1.48]]},L04:{stops:[{name:"Tanghin Terminus",coords:[12.4,-1.48]},{name:"Sompangdo",coords:[12.39,-1.49]},{name:"Wemtenga",coords:[12.38,-1.5]},{name:"Stade du 4 Août",coords:[12.3714,-1.51]},{name:"Cissin Marché",coords:[12.36,-1.52]},{name:"Cissin Terminus",coords:[12.35,-1.53]}],path:[[12.4,-1.48],[12.39,-1.49],[12.38,-1.5],[12.3714,-1.51],[12.36,-1.52],[12.35,-1.53]]}};function R({selectedLine:i,selectedBus:w,onSelectBus:k}){const p=c.useRef(null),o=c.useRef(null),a=c.useRef([]);c.useEffect(()=>{if(!(typeof window>"u"||!p.current))return y(()=>import("./leaflet-src-C6KBGlij.js").then(t=>t.l),__vite__mapDeps([0,1,2])).then(t=>{if(o.current)return;const r=document.createElement("link");r.rel="stylesheet",r.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(r);const l=t.map(p.current).setView([12.3714,-1.5197],13);t.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(l),o.current=l,h(t)}),()=>{o.current&&(o.current.remove(),o.current=null)}},[]),c.useEffect(()=>{o.current&&typeof window<"u"&&y(()=>import("./leaflet-src-C6KBGlij.js").then(t=>t.l),__vite__mapDeps([0,1,2])).then(t=>{h(t)})},[i,w]);const h=t=>{if(!o.current)return;a.current.forEach(e=>e.remove()),a.current=[];const r=E.filter(e=>e.status==="active"),l=i?r.filter(e=>e.lineId===i):r;g.forEach(e=>{if(i&&i!==e.id)return;const s=b[e.id];if(!s)return;const m=t.polyline(s.path,{color:e.color,weight:4,opacity:.7}).addTo(o.current);a.current.push(m),s.stops.forEach((d,f)=>{const u=t.divIcon({html:`<div style="width: 24px; height: 24px;">
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="white" stroke="${e.color}" stroke-width="3"/>
              <circle cx="12" cy="12" r="4" fill="${e.color}"/>
            </svg>
          </div>`,className:"custom-stop-icon",iconSize:[24,24],iconAnchor:[12,12]}),_=t.marker(d.coords,{icon:u}).bindPopup(`
            <div style="padding: 8px;">
              <p style="font-weight: 600; font-size: 12px; margin: 0;">${d.name}</p>
              <p style="font-size: 11px; color: #666; margin: 4px 0 0 0;">${e.name}</p>
            </div>
          `).addTo(o.current);a.current.push(_)})}),l.forEach(e=>{const s=g.find(u=>u.id===e.lineId);if(!s)return;const m=e.status==="active"?s.color:e.status==="maintenance"?"#F59E0B":"#6B7280",d=t.divIcon({html:`<div style="width: 40px; height: 40px;">
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="${m}" opacity="0.9"/>
            <circle cx="20" cy="20" r="15" fill="white" opacity="0.3"/>
            <path d="M12 16h16v8H12z M14 14h12v2H14z M16 26h8v2h-8z" fill="white"/>
            <circle cx="16" cy="28" r="2" fill="white"/>
            <circle cx="24" cy="28" r="2" fill="white"/>
          </svg>
        </div>`,className:"custom-bus-icon",iconSize:[40,40],iconAnchor:[20,20]}),f=t.marker([e.gpsLat,e.gpsLng],{icon:d}).bindPopup(`
          <div style="padding: 12px; min-width: 200px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <div style="width: 32px; height: 32px; background-color: ${s.color}; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <p style="font-weight: 600; font-size: 13px; margin: 0;">${e.registration}</p>
                <p style="font-size: 11px; color: #666; margin: 0;">${e.model}</p>
              </div>
            </div>
            <div style="font-size: 11px; line-height: 1.8;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #666;">Ligne:</span>
                <span style="font-weight: 500; color: ${s.color};">${s.name.split(" - ")[0]}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #666;">Chauffeur:</span>
                <span style="font-weight: 500;">${e.driver}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #666;">Remplissage:</span>
                <span style="font-weight: 500;">${e.fillRate}%</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #666;">Capacité:</span>
                <span style="font-weight: 500;">${e.capacity} places</span>
              </div>
            </div>
          </div>
        `).on("click",()=>k(e.id)).addTo(o.current);a.current.push(f)})},j=()=>{o.current&&o.current.zoomIn()},z=()=>{o.current&&o.current.zoomOut()};return n.jsxs("div",{className:"h-[600px] relative",children:[n.jsx("div",{ref:p,className:"h-full w-full rounded-lg"}),n.jsxs("div",{className:"absolute top-4 right-4 z-[1000] flex flex-col gap-2",children:[n.jsx(x,{size:"sm",variant:"outline",className:"bg-white shadow-lg",onClick:j,children:n.jsx(I,{className:"w-4 h-4"})}),n.jsx(x,{size:"sm",variant:"outline",className:"bg-white shadow-lg",onClick:z,children:n.jsx($,{className:"w-4 h-4"})})]}),n.jsxs("div",{className:"absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-xs text-gray-600 z-[1000]",children:["© ",n.jsx("a",{href:"https://leafletjs.com",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600",children:"Leaflet"})," | © ",n.jsx("a",{href:"https://www.openstreetmap.org/copyright",target:"_blank",rel:"noopener noreferrer",className:"text-blue-600",children:"OpenStreetMap"})]})]})}export{R as default};
