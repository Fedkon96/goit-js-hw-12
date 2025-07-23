import{a as w,S as M,i as a}from"./assets/vendor-Dy2ZTtfi.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();async function h(r,e,n){const o="https://pixabay.com/api/",s={key:"51363368-0cc0b280f35048ea67ead6bf3",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:n};return(await w.get(o,{params:s})).data}let p;function m(){p||(p=new M(".gallery a")),p.refresh()}function y(r,e){const n=r.map(o=>`<li class="img-box">
          <a href="${o.largeImageURL}">
            <img 
              src="${o.webformatURL}" 
              alt="${o.tags}" 
              width="360" 
              height="200"
            >
            <ul class="subscriptions">
                <li class="sub-title">
                  <h6>Likes</h6>
                  <p>${o.likes}</p>
                </li>
                <li class="sub-title">
                  <h6>Views</h6>
                  <p>${o.views}</p>
                </li>
                <li class="sub-title">
                  <h6>Comments</h6>
                  <p>${o.comments}</p>
                </li>
                <li class="sub-title">
                  <h6>Downloads</h6>
                  <p>${o.downloads}</p>
                </li>
            </ul>
          </a>
        </li>`).join("");e===1?i.galleryList.innerHTML=n:i.galleryList.insertAdjacentHTML("beforeend",n)}function u(){i.loader.classList.add("is-hidden")}function L(){i.loader.classList.remove("is-hidden")}function S(){i.galleryList.innerHTML=""}function b(){i.loadMoreBtn.classList.remove("is-hidden")}function g(){i.loadMoreBtn.classList.add("is-hidden")}const i={form:document.querySelector(".form"),galleryList:document.querySelector(".gallery"),loader:document.querySelector(".loader"),input:document.querySelector("input"),loadMoreBtn:document.querySelector(".load-more-btn")};let l=1,d="";const f=15;async function B(r){if(r.preventDefault(),l=1,S(),L(),g(),d=r.target.elements["search-text"].value.trim(),!d)return u(),i.form.reset(),a.error({title:"Помилка!",message:"Введіть ключеве слово пошуку!",position:"center"});try{const e=await h(d,l,f);if(e.hits.length===0){a.error({title:"Помилка!",message:"Зображення не знайдено",position:"center"});return}y(e.hits,l),m(),a.info({title:"Результат пошуку:",message:`знайдено ${e.totalHits} фотографій!`,position:"center"}),e.totalHits>f&&b()}catch(e){console.log(e),a.error({title:"Помилка!",message:"Не вдалося завантажити зображення",position:"center"})}finally{u()}}function v(){const r=document.querySelector(".img-box");if(r){const e=r.getBoundingClientRect().height,n=parseInt(window.getComputedStyle(r.parentElement).gap)||0,o=e*2+n;window.scrollBy({top:o,behavior:"smooth"})}}async function q(r){r.preventDefault(),l++,L(),g();try{const e=await h(d,l,f);if(e.hits.length===0){a.info({title:"Увага",message:"Більше зображень немає",position:"center"}),g(),u();return}y(e.hits,l),m();const n=Math.ceil(e.totalHits/f);l>=n?(i.loadMoreBtn.classList.add("is-hidden"),a.info({title:"Увага",message:"Це останні зображення",position:"center"})):b(),v()}catch(e){console.error("Помилка завантаження:",e),a.error({title:"Помилка!",message:"Не вдалося завантажити зображення",position:"center"})}finally{u()}}i.form.addEventListener("submit",B);i.loadMoreBtn.addEventListener("click",q);
//# sourceMappingURL=index.js.map
