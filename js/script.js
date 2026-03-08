async function loadAddons(){

const response = await fetch("js/addons.js?nocache=" + Date.now());

const text = await response.text();

eval(text);

initSite();

}

loadAddons();



function initSite(){

renderAddons(addons);

renderTags();

search();

}



function renderAddons(list){

const container=document.getElementById("addonList");

if(!container)return;

container.innerHTML="";

list.forEach(addon=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<img src="${addon.thumbnail}">

<div class="card-body">

<div class="card-title">${addon.title}</div>

<div class="card-tags">

${addon.tags.map(t=>`<span class="tag">${t}</span>`).join("")}

</div>

</div>

`;

card.onclick=()=>{

location.href=addon.page;

};

container.appendChild(card);

});

}
