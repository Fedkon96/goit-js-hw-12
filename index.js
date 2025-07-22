import{a as f,S as d,i as l}from"./assets/vendor-Cip_4kvj.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();function p(o){return f("https://pixabay.com/api/",{params:{key:"51363368-0cc0b280f35048ea67ead6bf3",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:9}}).then(e=>e.data).catch(e=>{throw e})}function m(o){const s=o.map(t=>`<li class="img-box">
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
        </li>`).join("");i.galleryList.innerHTML=s}const h=o=>{u(),m(o),y()},g=new d(".gallery a");function y(){g.refresh()}function c(){i.loader.classList.add("is-hidden")}function L(){i.loader.classList.remove("is-hidden")}function u(){i.galleryList.innerHTML=""}const i={form:document.querySelector(".form"),galleryList:document.querySelector(".gallery"),loader:document.querySelector(".loader"),input:document.querySelector("input")};function b(o){o.preventDefault(),u(),L();const s=o.target.elements["search-text"].value.trim();if(!s)return c(),i.form.reset(),l.error({title:"Помилка!",message:"Введіть ключеве слово пошуку!",position:"center"});p(s).then(t=>{if(t.total===0)return i.form.reset(),l.error({message:"На жаль, немає зображень, що відповідають вашому пошуковому запиту. Спробуйте ще раз!",position:"center"});h(t.hits)}).catch(t=>{l.error({title:"Помилка!",message:"Не вдалося завантажити зображення. Не має звязку з ресурсом.",position:"center"})}).finally(()=>{c()})}i.form.addEventListener("submit",b);
//# sourceMappingURL=index.js.map
