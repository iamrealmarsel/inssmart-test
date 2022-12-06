(()=>{"use strict";const e={duration:500,easing:"ease"},t={duration:500,easing:"ease-in"};new class{constructor(e){this.tabElements=document.querySelectorAll("[data-tab-to]"),this.activeElements={tabElement:null,contentElement:null},this.eventHandlers=[],this.options={...t,...e},this.isTabsCreated=!1}init(){const{breakpointMaxWidth:e,breakpointMinWidth:t}=this.options;e&&t?(window.innerWidth>=t&&window.innerWidth<=e&&this.create(),window.addEventListener("resize",(()=>{window.innerWidth>=t&&window.innerWidth<=e?this.create():this.destroy()}))):e?(window.innerWidth<=e&&this.create(),window.addEventListener("resize",(()=>{window.innerWidth<=e?this.create():this.destroy()}))):t?(window.innerWidth>=t&&this.create(),window.addEventListener("resize",(()=>{window.innerWidth>=t?this.create():this.destroy()}))):this.create()}destroy(){this.isTabsCreated&&(this.eventHandlers.forEach((e=>{e.tabElement.removeEventListener("click",e.handler),e.tabElement.classList.remove("my-tabs-active"),e.contentElement.classList.remove("my-content"),e.contentElement.classList.remove("my-content-active")})),this.isTabsCreated=!1)}create(){if(this.isTabsCreated)return;let e=!1;this.tabElements.forEach((t=>{if(!(t instanceof HTMLElement))return;const i=document.querySelector(`#${t.dataset.tabTo}`);if(!(i instanceof HTMLElement))return;i.classList.add("my-content"),e||(t.classList.add("my-tabs-active"),i.classList.add("my-content-active"),this.activeElements={tabElement:t,contentElement:i},e=!0);const n=new KeyframeEffect(i,[{opacity:"fade"===this.options.animation?0:1,transform:"scale"===this.options.animation?"scale(0)":"scale(1)"},{opacity:1,transform:"scale(1)"}],{duration:this.options.duration,easing:this.options.easing}),s=new Animation(n),a=()=>{this.activeElements.tabElement!==t&&(this.activeElements.tabElement?.classList.remove("my-tabs-active"),this.activeElements.contentElement?.classList.remove("my-content-active"),t.classList.add("my-tabs-active"),i.classList.add("my-content-active"),s.play(),this.activeElements={tabElement:t,contentElement:i})};t.addEventListener("click",a),this.eventHandlers.push({tabElement:t,contentElement:i,handler:a})})),this.isTabsCreated=!0}}({animation:"fade",duration:300,breakpointMinWidth:601}).init(),new class{constructor(t,i){this.accordionElement=document.querySelector(t),this.accordionChildElements=this.accordionElement?.children,this.options={...e,...i},this.eventHandlers=[],this.isAccordionCreated=!1}init(){const{breakpointMaxWidth:e,breakpointMinWidth:t}=this.options;e&&t?(window.innerWidth>=t&&window.innerWidth<=e&&this.create(),window.addEventListener("resize",(()=>{window.innerWidth>=t&&window.innerWidth<=e?this.create():this.destroy()}))):e?(window.innerWidth<=e&&this.create(),window.addEventListener("resize",(()=>{window.innerWidth<=e?this.create():this.destroy()}))):t?(window.innerWidth>=t&&this.create(),window.addEventListener("resize",(()=>{window.innerWidth>=t?this.create():this.destroy()}))):this.create()}destroy(){this.isAccordionCreated&&(this.eventHandlers.forEach((e=>{e.element.classList.remove("my-accordion-title"),e.element.removeEventListener("click",e.handler),e.element.nextElementSibling.style.height="",e.animation.cancel()})),this.isAccordionCreated=!1)}create(){if(!this.isAccordionCreated){if(this.accordionChildElements)for(let e=0;e<this.accordionChildElements.length;e+=2){const t=this.accordionChildElements[e],i=this.accordionChildElements[e+1],n=i.firstElementChild;if(!(t instanceof HTMLElement&&n instanceof HTMLElement&&i instanceof HTMLElement))throw new Error("Wrong element structure");t.classList.add("my-accordion-title");let s=!1,a=!1;const r=new KeyframeEffect(i,null,{duration:this.options.duration,easing:this.options.easing,fill:"forwards"}),o=new Animation(r);o.addEventListener("finish",(()=>{a=!1,o.cancel(),i.style.height=s?"auto":"0"}));const d=e=>{e.preventDefault(),a||(a=!0,s?(t.classList.remove("my-accordion-active"),r.setKeyframes([{height:`${n.offsetHeight}px`,offset:0},{height:0,offset:1}])):(t.classList.add("my-accordion-active"),r.setKeyframes([{height:0,offset:0},{height:`${n.offsetHeight}px`,offset:1}])),s=!s,o.play())};t.addEventListener("click",d),this.eventHandlers.push({element:t,handler:d,animation:o})}this.isAccordionCreated=!0}}}("#accordion",{breakpointMaxWidth:600}).init(),document.querySelectorAll("[data-feature-add-to]").forEach((e=>{e.addEventListener("submit",(t=>{if(t.preventDefault(),e instanceof HTMLFormElement){const t=new FormData(e).get("feature");if("string"==typeof t&&""===t.trim())return e.classList.add("my-validation-error"),void e.animate({transform:["translateX(0)","translateX(-10px)","translateX(10px)","translateX(-10px)","translateX(8px)","translateX(-8px)","translateX(0)"]},{duration:500});document.querySelector(`#${e.dataset.featureAddTo}`)?.insertAdjacentHTML("beforeend",`<li class="bikes__feature">${t}</li>`)}})),e.addEventListener("input",(()=>{e.classList.remove("my-validation-error")}))}))})();