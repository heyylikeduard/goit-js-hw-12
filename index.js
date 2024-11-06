import{S as m,i as n}from"./assets/vendor-B2mb6eXk.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const u="46909038-6f1101192bb2e76c1441c4637",d="https://pixabay.com/api/";async function p(a){const o=new URLSearchParams({key:u,q:a,image_type:"photo",orientation:"horizontal",safesearch:"true"});try{const t=await fetch(`${d}?${o}`);if(!t.ok)throw new Error(t.statusText);return(await t.json()).hits}catch(t){throw console.error("Error fetching images:",t),t}}function y(a){return a.map(({webformatURL:o,largeImageURL:t,tags:s,likes:e,views:r,comments:i,downloads:f})=>`
      <div class="photo-card">
        <a href="${t}" class="gallery__item">
          <img src="${o}" alt="${s}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes:</b> ${e}
          </p>
          <p class="info-item">
            <b>Views:</b> ${r}
          </p>
          <p class="info-item">
            <b>Comments:</b> ${i}
          </p>
          <p class="info-item">
            <b>Downloads:</b> ${f}
          </p>
        </div>
      </div>
    `).join("")}const g=document.getElementById("search-form"),c=document.querySelector(".gallery"),l=document.getElementById("loader");let h=new m(".gallery a",{captionsData:"alt",captionDelay:250});g.addEventListener("submit",async a=>{a.preventDefault();const o=a.target.elements.query.value.trim();if(o===""){n.warning({title:"Warning",message:"Please enter a search term."});return}l.style.display="block";try{const t=await p(o);if(c.innerHTML="",t.length===0){n.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"});return}c.innerHTML=y(t),h.refresh()}catch{n.error({title:"Error",message:"Failed to fetch images. Please try again later."})}finally{l.style.display="none"}});
//# sourceMappingURL=index.js.map
