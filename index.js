import{i as l,b as g,v as h}from"./assets/vendor-Da_W9YyF.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=i(s);fetch(s.href,o)}})();const k=document.querySelector("#task-form"),r=document.querySelector("#task-list"),p=document.querySelector("#themeToggle");function m(t){const e=JSON.parse(localStorage.getItem("tasks"))||[];e.push(t),localStorage.setItem("tasks",JSON.stringify(e))}function b(){return JSON.parse(localStorage.getItem("tasks"))||[]}function v(t){const i=(JSON.parse(localStorage.getItem("tasks"))||[]).filter(a=>a.id!==t);localStorage.setItem("tasks",JSON.stringify(i))}function d(t){localStorage.setItem("theme",t)}function y(){return localStorage.getItem("theme")}function u({id:t,title:e,description:i}){return`
    <li class="task-list-item" data-id="${t}">
      <div class="task-list-item-btns">
        <button class="task-list-item-btn edit-btn">Edit</button>
        <button class="task-list-item-btn delete-btn">Delete</button>
      </div>
      <h3>${e}</h3>
      <p>${i}</p>
    </li>
  `}function T(t){if(!t.target.classList.contains("delete-btn"))return;const e=t.target.closest(".task-list-item"),i=e.dataset.id;e.remove(),v(i)}function L(){const t=document.body.classList.contains("theme-dark");document.body.style.transition="background-color 0.3s ease-in-out",t?(document.body.classList.replace("theme-dark","theme-light"),d("theme-light"),l.info({title:"Theme changed",message:"Light theme activated",position:"center",timeout:4e3})):(document.body.classList.replace("theme-light","theme-dark"),d("theme-dark"),l.info({title:"Theme changed",message:"Dark theme activated",position:"center",timeout:4e3}))}function S(t){const e=t.target.closest(".task-list-item"),i=e.dataset.id,a=e.querySelector("h3").textContent,s=e.querySelector("p").textContent,o=g.create(`
  <div class="modal modal-editor">
    <h2 class="modal-editor__title">Edit Task</h2>
    <input 
      type="text" 
      value="${a}" 
      id="edit-title" 
      class="modal-editor__input"
    />
    <textarea 
      id="edit-description" 
      class="modal-editor__textarea"
    >${s}</textarea>
    <div class="modal-editor__btns">
      <button id="save-changes" class="modal-editor__btn modal-editor__btn--save">Save Changes</button>
      <button id="quit" class="modal-editor__btn modal-editor__btn--quit">Quit</button>
    </div>
  </div>
`);o.show(),document.getElementById("save-changes").addEventListener("click",()=>{const n=document.getElementById("edit-title").value.trim(),c=document.getElementById("edit-description").value.trim(),f={id:i,title:n,description:c};e.querySelector("h3").textContent=n,e.querySelector("p").textContent=c,m(f),o.close()}),document.getElementById("quit").addEventListener("click",()=>{o.close()})}k.addEventListener("submit",_);I();E();r.addEventListener("click",T);p.addEventListener("click",L);function _(t){t.preventDefault();const e=t.currentTarget,{taskName:i,taskDescription:a}=e.elements;if(!i.value.trim()||!a.value.trim()){iziToast.error({title:"Error",message:"Please fill in all fields",position:"center",timeout:4e3});return}const s={id:h(),title:i.value.trim(),description:a.value.trim()},o=u(s);r.insertAdjacentHTML("beforeend",o),m(s),e.reset()}function I(){const e=b().map(u).join("");r.insertAdjacentHTML("beforeend",e)}function E(){y()==="theme-light"&&document.body.classList.replace("theme-dark","theme-light")}r.addEventListener("click",function(t){t.target.classList.contains("edit-btn")&&S(t)});
//# sourceMappingURL=index.js.map
