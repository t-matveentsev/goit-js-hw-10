import"./assets/styles-2d897a86.js";import{i}from"./assets/vendor-77e16229.js";const s=document.querySelector(".form");s.addEventListener("submit",function(o){o.preventDefault();const t=parseInt(s.elements.delay.value),m=s.elements.state.value;new Promise((e,l)=>{setTimeout(m==="fulfilled"?()=>e(t):()=>l(t),t)}).then(e=>{i.success({title:"Fulfilled promise",message:`✅ Fulfilled promise in ${e}ms`,position:"topRight"})}).catch(e=>{i.error({title:"Rejected promise",message:`❌ Rejected promise in ${e}ms`,position:"topRight"})})});
//# sourceMappingURL=commonHelpers2.js.map