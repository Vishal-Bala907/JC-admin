import{u as T}from"./Layout-CLuA73Dq.js";import{M as w}from"./index-eCljlgW-.js";const v={translateText:async(a,i,l)=>(await w.get(`https://api.mymemory.translated.net/get?q=${a}&langpair=${i}|${l}`)).data},K=()=>{const{globalSetting:a,languages:i}=T(),l=t=>{if(!t)return t;const r={...t};return Object.keys(r).forEach(o=>{const e=r[o];(e!=null&&e.toLowerCase().includes("authentication failure")||e!=null&&e.toLowerCase().includes("error")||!e)&&(console.log(`Removing invalid translation for language: ${o}`),delete r[o])}),r},f=(t,r)=>{const o=i==null?void 0:i.map(e=>e==null?void 0:e.iso_code);return t?!r||!(o!=null&&o.length)?!1:o==null?void 0:o.some(e=>t[e]?r[e]?t[e]!==r[e]:!1:!0):!0},h=async(t,r,o)=>{var d;const e=(a==null?void 0:a.translation_key)||"a91efbf362a6e399453d";try{const c=await v.translateText(t,r,o,e),n=(d=c==null?void 0:c.responseData)==null?void 0:d.translatedText;return n!=null&&n.toLowerCase().includes("authentication failure")||n!=null&&n.toLowerCase().includes("error")||!n?(console.error(`Translation API failed for ${r} to ${o}:`,n),null):n}catch(c){return console.error("error on translation",c),null}};return{hasKeyChanged:f,handleRemoveEmptyKey:t=>{for(const r in t)t[r].trim()===""&&delete t[r];return t},handlerTextTranslateHandler:async(t,r,o)=>{const e=l(o);if(!(a!=null&&a.allow_auto_trans)||!(f(e,{[r]:t})||!1))return!1;const c=i==null?void 0:i.filter(s=>(s==null?void 0:s.iso_code)!==r),n=c.map(s=>t?h(t==null?void 0:t.toLowerCase(),r,s==null?void 0:s.iso_code):""),m=await Promise.all(n);let y=c.map((s,u)=>{const p=m[u];return p?{lang:s==null?void 0:s.iso_code,text:p}:null}).filter(Boolean).reduce((s,u)=>Object.assign(s,{[u.lang]:u.text}),{});return e&&e[r]&&(y[r]=e[r]),y}}};export{K as u};
