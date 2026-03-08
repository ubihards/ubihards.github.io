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


function renderTags(){

const tagContainer = document.getElementById("tagFilter");

if(!tagContainer) return;

tagContainer.innerHTML="";

const tags = [...new Set(addons.flatMap(a => a.tags))];

tags.forEach(tag => {

const el = document.createElement("span");

el.className="tag";

el.innerText = tag;

el.onclick = () => {

const filtered = addons.filter(a => a.tags.includes(tag));

renderAddons(filtered);

};

tagContainer.appendChild(el);

});

}

function renderAddons(list){

const container=document.getElementById("addonList");

if(!container)return;

container.innerHTML="";

list.forEach(addon=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML = `
<img src="${addon.thumbnail}">

<div class="card-body">

<div class="card-title">${addon.title}</div>

<div class="card-tags">
${addon.tags.map(t=>`<span class="tag">${t}</span>`).join(" ")}
</div>

</div>
`;

</div>

`;

card.onclick=()=>{

location.href=addon.page;

};

container.appendChild(card);

});

}

