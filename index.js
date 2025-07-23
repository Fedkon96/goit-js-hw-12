import{a as L,S as b,i as n}from"./assets/vendor-Dy2ZTtfi.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();async function h(i,e,t){const a="https://pixabay.com/api/",s={key:"51363368-0cc0b280f35048ea67ead6bf3",q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:t,page:e};return(await L.get(a,{params:s})).data}let f;function w(){f||(f=new b(".gallery a")),f.refresh()}function p(i){return i.map(t=>`<li class="img-box">
          <a href="${t.largeImageURL}">
            <img 
              src="${t.webformatURL}" 
              alt="${t.tags}" 
              width="360" 
              height="200"
            >
            <ul class="subscriptions">
                <li class="sub-title">
                  <h6>Likes</h6>
                  <p>${t.likes}</p>
                </li>
                <li class="sub-title">
                  <h6>Views</h6>
                  <p>${t.views}</p>
                </li>
                <li class="sub-title">
                  <h6>Comments</h6>
                  <p>${t.comments}</p>
                </li>
                <li class="sub-title">
                  <h6>Downloads</h6>
                  <p>${t.downloads}</p>
                </li>
            </ul>
          </a>
        </li>`).join("")}function m(){r.loader.classList.add("is-hidden")}function g(){r.loader.classList.remove("is-hidden")}function v(){r.galleryList.innerHTML=""}const r={form:document.querySelector(".form"),galleryList:document.querySelector(".gallery"),loader:document.querySelector(".loader"),input:document.querySelector("input"),loadMoreBtn:document.querySelector(".load-more-btn")};let l=1,d="";const u=15;async function M(i){if(i.preventDefault(),l=1,v(),g(),r.loadMoreBtn.classList.add("is-hidden"),d=i.target.elements["search-text"].value.trim(),!d)return m(),r.form.reset(),n.error({title:"Помилка!",message:"Введіть ключеве слово пошуку!",position:"center"});try{const e=await h(d,l,u);if(e.hits.length===0){n.error({title:"Помилка!",message:"Зображення не знайдено",position:"center"});return}r.galleryList.innerHTML=p(e.hits),w(),n.info({title:"Результат пошуку:",message:`знайдено ${e.totalHits} фотографій!`,position:"center"}),e.totalHits>u&&r.loadMoreBtn.classList.remove("is-hidden")}catch(e){console.log(e),n.error({title:"Помилка!",message:"Не вдалося завантажити зображення",position:"center"})}finally{m()}}function S(){const i=document.querySelector(".img-box");if(i){const e=i.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}async function y(i){i.preventDefault;const e=window.scrollY;r.galleryList.classList.add("is-hidden"),r.loadMoreBtn.classList.add("is-hidden"),l++,g();try{const t=await h(d,l,u);if(t.hits.length===0){n.info({title:"Увага",message:"Більше зображень немає",position:"center"});return}r.galleryList.insertAdjacentHTML("beforeend",p(t.hits)),window.requestAnimationFrame(()=>{window.scrollTo({top:e,behavior:"instant"}),S()});const a=Math.ceil(t.totalHits/u);r.loadMoreBtn.classList.remove("is-hidden"),a===l&&(r.loadMoreBtn.classList.add("is-hidden"),r.loadMoreBtn.removeEventListener("click",y),n.info({title:"Увага",message:"Остання сторінка!",position:"center"}))}catch(t){console.log(t),n.error({title:"Помилка!",message:"Не вдалося завантажити більше зображень",position:"center"})}finally{m(),r.galleryList.classList.remove("is-hidden")}}r.form.addEventListener("submit",M);r.loadMoreBtn.addEventListener("click",y);
//# sourceMappingURL=index.js.map
