const container = document.getElementById("addonList");

let currentList = [...addons];

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


/* SORT FUNCTION */

function sortAddons(type){

if(type==="az"){
currentList.sort((a,b)=>a.title.localeCompare(b.title));
}

if(type==="za"){
currentList.sort((a,b)=>b.title.localeCompare(a.title));
}

renderAddons(currentList);

}


/* INITIAL RENDER */

renderAddons(currentList);


/* SEARCH */

const search=document.getElementById("searchInput");

search.addEventListener("input",()=>{

const text=search.value.toLowerCase();

currentList=addons.filter(a=>
a.title.toLowerCase().includes(text)
);

renderAddons(currentList);

});


/* TAG FILTER */

const tagContainer=document.getElementById("tagFilter");

const tags=[...new Set(addons.flatMap(a=>a.tags))];

/* SORT TAG ABJAD */

tags.sort((a,b)=>a.localeCompare(b));

tags.forEach(tag=>{

const el=document.createElement("span");

el.innerText=tag;

el.onclick=()=>{

currentList=addons.filter(a=>a.tags.includes(tag));

renderAddons(currentList);

};

tagContainer.appendChild(el);

});


/* SORT DROPDOWN */

const sortSelect=document.getElementById("sortSelect");

sortSelect.addEventListener("change",()=>{
sortAddons(sortSelect.value);
});

/* CHANGELOG TOGGLE */

document.querySelectorAll(".log-title").forEach(title=>{

title.addEventListener("click",()=>{

const content = title.nextElementSibling;

if(content.style.display==="block"){

content.style.display="none";

}else{

content.style.display="block";

}

});

});
/* AUTO REFRESH */

setInterval(()=>{
location.reload();
},60000);
