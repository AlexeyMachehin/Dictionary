(()=>{"use strict";var e,t={872:(e,t,n)=>{n(58),n(747),document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelectorAll(".dropdown-trigger");M.Dropdown.init(e)})),n(444);var r=n(503),a=n(591),o=n(336);const d=(0,r.ZF)({apiKey:"AIzaSyC5I1TQyHSXpKIyD84w4_m5rOn18PdSZQU",authDomain:"dictionary-3c90f.firebaseapp.com",projectId:"dictionary-3c90f",storageBucket:"dictionary-3c90f.appspot.com",messagingSenderId:"523829874991",appId:"1:523829874991:web:1db98b1c0ce218267751da"}),l=(0,a.ad)(d),c=(0,o.v0)();function s(e){return(0,a.JU)(l,"words",e)}async function i(e,t,n){await(0,a.r7)((0,a.JU)(l,"words",e),{[t]:n})}let u,m,v,b=null,h=!0,f=null,y=document.querySelector(".container"),g=document.querySelector(".container-preloader"),w=document.querySelector(".enter-new-theme");const L=document.querySelector(".add-new-theme");let p=document.querySelector(".enter-word"),S=document.querySelector(".enter-translate"),q=document.querySelector(".add-button-form"),E=document.querySelector(".add-word_header");const O=document.querySelector(".learn");let T=document.querySelector(".learning__word"),k=document.querySelector(".translate");const H=document.querySelector(".check"),j=document.querySelector(".next__word"),_=document.querySelector(".change-language-button");let C=document.querySelector(".translate-type__header"),A=document.querySelector(".show-translate");const I=document.querySelector(".register-form");document.getElementById("register-name"),document.getElementById("register-email"),document.getElementById("register-password"),document.querySelector(".register-button");const D=document.querySelector(".login-form");document.getElementById("login-name"),document.getElementById("login-email"),document.getElementById("login-password"),document.querySelector(".login-button");const x=document.querySelector(".functions"),B=document.querySelector(".learn-button"),$=document.querySelector("[data-target='dropdown1']");document.querySelector(".dropdown-content");let J,R=document.querySelector(".dropdown-content__inner"),U=(document.querySelector(".add-theme"),document.querySelector(".add-button-table"),document.querySelector(".words-list")),P=document.querySelector(".table-head-item");const K=document.querySelector(".register-and-login");function F(e){return/[а-я]/i.test(e)}function Q(){m=function(e){let t=e;return Math.floor(Math.random()*(t-0)+0)}(Object.values(u).length),!0===h?Object.values(u)[m]===v&&Object.values(u).length>1?Q():(v=Object.values(u)[m],T.innerHTML="",T.insertAdjacentHTML("afterbegin",` <div\n    class="learning__word learn__input flow-text"\n    data-function="learn__input"\n  >${v}</div>`)):Object.keys(u)[m]===v&&Object.keys(u).length>1?Q():(v=Object.keys(u)[m],T.innerHTML="",T.insertAdjacentHTML("afterbegin",` <div\n  class="learning__word learn__input flow-text"\n  data-function="learn__input"\n>${v}</div>`))}function W(e){f?(E.innerHTML="add a word to the current theme",q.disabled=!1,p.disabled=!1,S.disabled=!1,U.innerHTML="",P.innerHTML="",Object.entries(e).map((([e,t])=>U.insertAdjacentHTML("afterbegin",`<tr><td>${e}</td><td>${t}</td><td><button class="delete-button btn #ef9a9a red lighten-3" data-delete="${e}">delete</button></td></tr>`))),P.insertAdjacentHTML("afterbegin",'<th>English word</th><th>Russian translate</th><th><button class="add-button-table btn modal-trigger" href="#modal2">add</button></th>'),document.querySelectorAll(".delete-button").forEach((e=>e.addEventListener("click",(e=>{let t=e.target.dataset.delete;!async function(e,t){const n=(0,a.JU)(l,"words",e);await(0,a.r7)(n,{[t]:(0,a.AK)()})}(f,t)}))))):E.innerHTML="choose theme"}function X(e,t,n){e.value="",e.disabled=!1,e.classList.remove(n),e.setAttribute("placeholder",t)}function Y(){var e,t;h?Object.keys(u)[m]===k.value.toLowerCase()?Z(k.value.toLowerCase()):z():(e=u,t=k.value.toLowerCase(),b=Object.keys(e).find((n=>e[n]===t)),Object.values(u)[m]===k.value.toLowerCase()?Z(b):z())}function Z(e){k.classList.add("correct"),k.setAttribute("placeholder","CORRECT"),delete u[e],k.value="",k.classList.remove("error"),k.focus(),0===Object.keys(u).length?(j.disabled=!0,k.disabled=!0,T.innerHTML="You translated all words correctly",X(k,"enter translate","correct"),A.disabled=!0,H.disabled=!0,_.disabled=!0):setTimeout((()=>{Q(),X(k,"enter translate","correct")}),500)}function z(){k.classList.add("error"),k.setAttribute("placeholder","WRONG!"),k.value="",setTimeout((()=>{X(k,"enter translate","error"),k.focus()}),500)}document.querySelector(".img-wrong"),document.addEventListener("DOMContentLoaded",(function(e){const t=document.querySelectorAll(".modal");M.Modal.init(t,{onOpenEnd:function(){k.focus(),w.focus(),p.focus()},onCloseEnd:function(){T.innerHTML="",H.innerHTML="check",H.disabled=!1,_.disabled=!1,j.disabled=!1,X(k,"enter translate","error"),f&&(0,a.cf)(s(f),(e=>{u=e.data(),W(e.data())}))}})})),document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelectorAll(".dropdown-trigger");M.Dropdown.init(e,{constrainWidth:!1,isScrollable:!0})})),x.addEventListener("click",(e=>{"theme-link"===e.target.dataset.theme&&(f=e.target.innerHTML,(0,a.cf)(s(f),(e=>{u=e.data(),W(e.data())})),B.style.display="block",$.innerHTML=f+'<i class="material-icons right">arrow_drop_down</i>',$.classList.remove("pulse")),"learn-all-words-by-theme"===e.target.dataset.function&&(f?(A.disabled=!1,Q()):(k.disabled=!0,T.innerHTML="Choose theme",H.disabled=!0,j.disabled=!0,A.disabled=!0),U.innerHTML="")})),I.addEventListener("submit",(e=>{var t,n;e.preventDefault(),t=I.email.value,n=I.password.value,new Promise(((e,r)=>{(0,o.Xb)(c,t,n).then((t=>e(t.user))).catch((e=>r(e)))}))})),D.addEventListener("submit",(e=>{var t,n;e.preventDefault(),(t=D.email.value,n=D.password.value,new Promise(((e,r)=>{(0,o.e5)(c,t,n).then((t=>e(t.user))).catch((e=>r(e)))}))).then((()=>{M.Modal.getInstance(K).close()}))})),L.addEventListener("click",(()=>{(async function(e){await(0,a.pl)((0,a.JU)(l,"words",e),{})})(w.value).then(X(w,"Add new theme","empty"))})),H.addEventListener("click",(e=>Y())),O.addEventListener("keydown",(e=>{"Enter"===e.key&&(e.preventDefault(),Y())})),j.addEventListener("click",(()=>{0===Object.keys(u).length?(j.disabled=!0,k.disabled=!0,T.innerHTML="You translated all words correctly"):(Q(),H.disabled=!1,H.innerHTML="check",k.focus())})),j.addEventListener("mousedown",(()=>{X(k,"enter translate","correct"),X(k,"enter translate","error")})),_.addEventListener("click",(()=>{k.placeholder="enter translate",k.classList.remove("error"),h?(h=!1,C.innerHTML="English-Russian"):(h=!0,C.innerHTML="Russian-English"),Q(),k.focus()})),A.addEventListener("mousedown",(()=>{k.value=h?Object.keys(u)[m]:Object.values(u)[m]})),A.addEventListener("touchstart",(()=>{k.value=h?Object.keys(u)[m]:Object.values(u)[m]})),A.addEventListener("mouseup",(()=>{k.value="",k.focus()})),A.addEventListener("touchend",(()=>{k.value="",k.focus()})),q.addEventListener("click",(()=>{""===p.value||""===S.value?E.innerHTML="enter translate":!F(p.value)&&F(S.value)||F(p.value)&&!F(S.value)?F(p.value)?(i(f,S.value.trim().toLowerCase(),p.value.trim().toLowerCase()),p.value="",S.value="",E.innerHTML="add a word to the current theme"):(i(f,p.value.trim().toLowerCase(),S.value.trim().toLowerCase()),p.value="",S.value="",E.innerHTML="add a word to the current theme"):(E.innerHTML="enter in different languages",p.value="",S.value="")})),(0,a.cf)((0,a.hJ)(l,"words"),(e=>{R.innerHTML="",e.docs.forEach((e=>{return t=e.id,R.insertAdjacentHTML("beforeend",`<li class="themes-list-item">\n      <a class="theme-link" data-theme="theme-link">${t}</a><button data-function='${t}' class="btn delete-theme #ef9a9a red lighten-3">del</button>\n    </li>`),J=document.querySelectorAll(".delete-theme"),void J.forEach((e=>{e.addEventListener("click",(e=>{!async function(e){await(0,a.oe)((0,a.JU)(l,"words",e))}(e.target.dataset.function),e.target.dataset.function===f&&($.innerHTML='Choose theme<i class="material-icons right">arrow_drop_down</i>',U.innerHTML="",q.disabled=!0,p.disabled=!0,S.disabled=!0,f=null)}))}));var t})),g.classList.remove("active"),g.style.display="none",y.style.display="block"}))}},n={};function r(e){var a=n[e];if(void 0!==a)return a.exports;var o=n[e]={exports:{}};return t[e].call(o.exports,o,o.exports,r),o.exports}r.m=t,e=[],r.O=(t,n,a,o)=>{if(!n){var d=1/0;for(i=0;i<e.length;i++){for(var[n,a,o]=e[i],l=!0,c=0;c<n.length;c++)(!1&o||d>=o)&&Object.keys(r.O).every((e=>r.O[e](n[c])))?n.splice(c--,1):(l=!1,o<d&&(d=o));if(l){e.splice(i--,1);var s=a();void 0!==s&&(t=s)}}return t}o=o||0;for(var i=e.length;i>0&&e[i-1][2]>o;i--)e[i]=e[i-1];e[i]=[n,a,o]},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={787:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var a,o,[d,l,c]=n,s=0;if(d.some((t=>0!==e[t]))){for(a in l)r.o(l,a)&&(r.m[a]=l[a]);if(c)var i=c(r)}for(t&&t(n);s<d.length;s++)o=d[s],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return r.O(i)},n=self.webpackChunktest=self.webpackChunktest||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var a=r.O(void 0,[507],(()=>r(872)));a=r.O(a)})();
//# sourceMappingURL=scripts.f33da30211c266323d4f.js.map