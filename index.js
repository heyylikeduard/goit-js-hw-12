import{a as g,S as h,i as l}from"./assets/vendor-DtKhzRW5.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const b="46909038-6f1101192bb2e76c1441c4637",E="https://pixabay.com/api/",L=15;async function v(t,o=1){const a={key:b,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:L,page:o};try{return(await g.get(E,{params:a})).data}catch(s){throw console.error("Error fetching images:",s),s}}function P(t){return t.map(({webformatURL:o,largeImageURL:a,tags:s,likes:e,views:r,comments:n,downloads:y})=>`
      <div class="photo-card">
        <a href="${a}" class="gallery__item">
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
            <b>Comments:</b> ${n}
          </p>
          <p class="info-item">
            <b>Downloads:</b> ${y}
          </p>
        </div>
      </div>
    `).join("")}const w=document.getElementById("search-form"),d=document.querySelector(".gallery"),m=document.getElementById("loader"),i=document.getElementById("load-more");let f="",c=1,u=0,I=new h(".gallery a",{captionsData:"alt",captionDelay:250});async function p(){m.style.display="block";try{const t=await v(f,c);if(u=t.totalHits,t.hits.length===0&&c===1){l.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!"}),i.style.display="none";return}d.insertAdjacentHTML("beforeend",P(t.hits)),I.refresh(),d.children.length>=u?(i.style.display="none",l.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})):i.style.display="block",q(),c+=1}catch{l.error({title:"Error",message:"Failed to fetch images. Please try again later."})}finally{m.style.display="none"}}function q(){const t=d.querySelector(".photo-card");if(!t)return;const o=t.getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}w.addEventListener("submit",t=>{if(t.preventDefault(),f=t.target.elements.query.value.trim(),f===""){l.warning({title:"Warning",message:"Please enter a search term."});return}d.innerHTML="",c=1,u=0,i.style.display="none",p()});i.addEventListener("click",p);
//# sourceMappingURL=index.js.map
