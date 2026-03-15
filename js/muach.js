(function(){ "use strict";

window.addEventListener("load", function(){
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("selectstart", e => e.preventDefault());

document.querySelectorAll("img").forEach(img=>{
img.setAttribute("draggable","false");
img.addEventListener("dragstart", e=>e.preventDefault());
});

document.addEventListener("keydown", function(e){

if(e.key === "F12") return false;

if(e.ctrlKey && e.shiftKey && e.key === "I") return false;

if(e.ctrlKey && e.shiftKey && e.key === "J") return false;

if(e.ctrlKey && e.shiftKey && e.key === "C") return false;

if(e.ctrlKey && e.key === "U") return false;

if(e.ctrlKey && e.key === "S") return false;

});

function detectDevTools(){
const threshold = 160;
if(
window.outerWidth - window.innerWidth > threshold ||
window.outerHeight - window.innerHeight > threshold
){

document.body.innerHTML="";
location.reload();
}
}

setInterval(detectDevTools,1000);

(function(){

let devtoolsOpen=false;

const element=new Image();

Object.defineProperty(element,'id',{
get:function(){
devtoolsOpen=true;
document.body.innerHTML="";
location.reload();
}
});

console.log(element);

})();

if(window.top !== window.self){
window.top.location = window.self.location;
}

document.addEventListener("copy", e=>{
e.preventDefault();
});

document.addEventListener("cut", e=>{
e.preventDefault();
});

document.addEventListener("paste", e=>{
e.preventDefault();
});

setInterval(()=>{
console.clear();
},2000);


});

})();