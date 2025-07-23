import{a as w,S as M,i as a}from"./assets/vendor-Dy2ZTtfi.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();async function h(r,e,i){const o="https://pixabay.com/api/",s={key:"51363368-0cc0b280f35048ea67ead6bf3",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:i};return(await w.get(o,{params:s})).data}let f;function m(){f||(f=new M(".gallery a")),f.refresh()}function y(r,e){const i=r.map(o=>`<li class="img-box">
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
        </li>`).join("");console.log(i),e===1?n.galleryList.innerHTML=i:n.galleryList.insertAdjacentHTML("beforeend",i)}function p(){n.loader.classList.add("is-hidden")}function L(){n.loader.classList.remove("is-hidden")}function S(){n.galleryList.innerHTML=""}function b(){n.loadMoreBtn.classList.remove("is-hidden")}function g(){n.loadMoreBtn.classList.add("is-hidden")}const n={form:document.querySelector(".form"),galleryList:document.querySelector(".gallery"),loader:document.querySelector(".loader"),input:document.querySelector("input"),loadMoreBtn:document.querySelector(".load-more-btn")};let l=1,d="";const u=15;async function B(r){if(r.preventDefault(),l=1,S(),L(),g(),d=r.target.elements["search-text"].value.trim(),!d)return p(),n.form.reset(),a.error({title:"Помилка!",message:"Введіть ключеве слово пошуку!",position:"center"});try{const e=await h(d,l,u);if(e.hits.length===0){a.error({title:"Помилка!",message:"Зображення не знайдено",position:"center"});return}y(e.hits,l),m(),a.info({title:"Результат пошуку:",message:`знайдено ${e.totalHits} фотографій!`,position:"center"}),e.totalHits>u&&b()}catch(e){console.log(e),a.error({title:"Помилка!",message:"Не вдалося завантажити зображення",position:"center"})}finally{p()}}function v(){const r=document.querySelector(".img-box");if(r){const e=r.getBoundingClientRect().height,i=parseInt(window.getComputedStyle(r.parentElement).gap)||0,o=e*2+i;window.scrollBy({top:o,behavior:"smooth"})}}async function q(r){r.preventDefault(),l++,L(),g();try{const e=await h(d,l,u);if(e.hits.length===0){a.info({title:"Увага",message:"Більше зображень немає",position:"center"}),g();return}y(e.hits,l),m();const i=Math.ceil(e.totalHits/u);l>=i?(n.loadMoreBtn.classList.add("is-hidden"),a.info({title:"Увага",message:"Це останні зображення",position:"center"})):b(),v()}catch(e){console.error("Помилка завантаження:",e),a.error({title:"Помилка!",message:"Не вдалося завантажити зображення",position:"center"})}finally{p()}}n.form.addEventListener("submit",B);n.loadMoreBtn.addEventListener("click",q);
//# sourceMappingURL=index.js.map
