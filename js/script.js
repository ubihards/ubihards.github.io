const container=document.getElementById("addonList");

fetch("js/addons.js?nocache=" + Date.now())
.then(res => res.text())
.then(text => {

eval(text)

renderAddons(addons)

})

function renderAddons(list){

container.innerHTML="";

list.forEach(addon=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<img src="${addon.thumbnail}">
<div class="card-body">
<div class="card-title">${addon.title}</div>
<div class="card-tags">
${addon.tags.map(t=>`<span>${t}</span>`).join(" ")}
</div>
</div>`;

card.onclick=()=>{
location.href=addon.page;
};

container.appendChild(card);
});

}
renderAddons(addons);

/* SEARCH */

const search=document.getElementById("searchInput");
search.addEventListener("input",()=>{
const text=search.value.toLowerCase();
const filtered=addons.filter(a=>a.title.toLowerCase().includes(text));
renderAddons(filtered);
});

/* TAG FILTER */

const tagContainer=document.getElementById("tagFilter");
const tags=[...new Set(addons.flatMap(a=>a.tags))];
tags.forEach(tag=>{
const el=document.createElement("span");
el.innerText=tag;
el.onclick=()=>{
const filtered=addons.filter(a=>a.tags.includes(tag));
renderAddons(filtered);

};

tagContainer.appendChild(el);


});
