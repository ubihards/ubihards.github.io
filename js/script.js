let addons = [];
const container = document.getElementById("addonList");
const search = document.getElementById("searchInput");
const tagContainer = document.getElementById("tagFilter");

async function loadAddons(){
    const response = await fetch("js/addons.js?nocache=" + Date.now());
    const text = await response.text();

    eval(text); // file addons.js harus berisi: addons = [...]

    initSite();
}

loadAddons();

function initSite(){
    renderAddons(addons);
    renderTags();
}

/* RENDER ADDONS */

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

/* SEARCH */

search.addEventListener("input",()=>{
    const text=search.value.toLowerCase();

    const filtered=addons.filter(a =>
        a.title.toLowerCase().includes(text) ||
        a.tags.join(" ").toLowerCase().includes(text)
    );

    renderAddons(filtered);
});

/* TAG FILTER */

function renderTags(){

    tagContainer.innerHTML="";

    const tags=[...new Set(addons.flatMap(a=>a.tags))];

    // tombol ALL
    const all=document.createElement("span");
    all.innerText="All";
    all.onclick=()=>renderAddons(addons);
    tagContainer.appendChild(all);

    tags.forEach(tag=>{
        const el=document.createElement("span");
        el.innerText=tag;

        el.onclick=()=>{
            const filtered=addons.filter(a=>a.tags.includes(tag));
            renderAddons(filtered);
        };

        tagContainer.appendChild(el);
    });

}
