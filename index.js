import{a as L,S as b,i as a}from"./assets/vendor-Dy2ZTtfi.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function e(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(o){if(o.ep)return;o.ep=!0;const i=e(o);fetch(o.href,i)}})();async function m(s,t,e){const n="https://pixabay.com/api/",i={key:"51363368-0cc0b280f35048ea67ead6bf3",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:e,page:t};return(await L.get(n,{params:i})).data}let f;function w(){f||(f=new b(".gallery a")),f.refresh()}function g(s){return s.map(e=>`<li class="img-box">
          <a href="${e.largeImageURL}">
            <img 
              src="${e.webformatURL}" 
              alt="${e.tags}" 
              width="360" 
              height="200"
            >
            <ul class="subscriptions">
                <li class="sub-title">
                  <h6>Likes</h6>
                  <p>${e.likes}</p>
                </li>
                <li class="sub-title">
                  <h6>Views</h6>
                  <p>${e.views}</p>
                </li>
                <li class="sub-title">
                  <h6>Comments</h6>
                  <p>${e.comments}</p>
                </li>
                <li class="sub-title">
                  <h6>Downloads</h6>
                  <p>${e.downloads}</p>
                </li>
            </ul>
          </a>
        </li>`).join("")}function p(){r.loader.classList.add("is-hidden")}function h(){r.loader.classList.remove("is-hidden")}function v(){r.galleryList.innerHTML=""}const r={form:document.querySelector(".form"),galleryList:document.querySelector(".gallery"),loader:document.querySelector(".loader"),input:document.querySelector("input"),loadMoreBtn:document.querySelector(".load-more-btn")};let l=1,d="";const u=15;async function M(s){if(s.preventDefault(),l=1,v(),h(),r.loadMoreBtn.classList.add("is-hidden"),d=s.target.elements["search-text"].value.trim(),!d)return p(),r.form.reset(),a.error({title:"Помилка!",message:"Введіть ключеве слово пошуку!",position:"center"});try{const t=await m(d,l,u);if(t.hits.length===0){a.error({title:"Помилка!",message:"Зображення не знайдено",position:"center"});return}r.galleryList.innerHTML=g(t.hits),w(),a.info({title:"Результат пошуку:",message:`знайдено ${t.totalHits} фотографій!`,position:"center"}),t.totalHits>u&&r.loadMoreBtn.classList.remove("is-hidden")}catch(t){console.log(t),a.error({title:"Помилка!",message:"Не вдалося завантажити зображення",position:"center"})}finally{p()}}function S(){const s=document.querySelector(".img-box");if(s){const t=s.getBoundingClientRect().height,e=parseInt(window.getComputedStyle(s.parentElement).gap)||0,n=t*2+e;window.scrollBy({top:n,behavior:"smooth"})}}async function y(s){s.preventDefault;const t=window.scrollY;r.galleryList.classList.add("is-hidden"),r.loadMoreBtn.classList.add("is-hidden"),l++,h();try{const e=await m(d,l,u);if(e.hits.length===0){a.info({title:"Увага",message:"Більше зображень немає",position:"center"});return}r.galleryList.insertAdjacentHTML("beforeend",g(e.hits)),window.requestAnimationFrame(()=>{window.scrollTo({top:t,behavior:"instant"}),S()});const n=Math.ceil(e.totalHits/u);r.loadMoreBtn.classList.remove("is-hidden"),n===l&&(r.loadMoreBtn.classList.add("is-hidden"),r.loadMoreBtn.removeEventListener("click",y),a.info({title:"Увага",message:"Остання сторінка!",position:"center"}))}catch(e){console.log(e),a.error({title:"Помилка!",message:"Не вдалося завантажити більше зображень",position:"center"})}finally{p(),r.galleryList.classList.remove("is-hidden")}}r.form.addEventListener("submit",M);r.loadMoreBtn.addEventListener("click",y);
//# sourceMappingURL=index.js.map
