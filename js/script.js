const container = document.getElementById("addonList");
const search = document.getElementById("searchInput");
const tagContainer = document.getElementById("tagFilter");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

let activeTag = "all";

function renderAddons() {
    const query = search.value.trim().toLowerCase();

    const filtered = addons.filter(addon => {
        const matchesSearch = (
            `${addon.title} ${addon.tags.join(" ")} ${addon.description || ""}`
        ).toLowerCase().includes(query);

        const matchesTag =
            activeTag === "all" || addon.tags.includes(activeTag);

        return matchesSearch && matchesTag;
    });

    container.innerHTML = "";

    filtered.forEach(addon => {
        const card = document.createElement("article");

        card.className = "card";
        card.tabIndex = 0;
        card.setAttribute("role", "link");
        card.setAttribute("aria-label", `View ${addon.title}`);

        card.innerHTML = `
            <div class="card-image">
                <img
                    src="${addon.thumbnail}"
                    alt="${addon.title} artwork"
                    loading="lazy"
                >
            </div>

            <div class="card-body">
                <div class="card-title">${addon.title}</div>

<div class="card-footer">
    <div class="card-tags">
        ${[...addon.tags]
            .sort((a, b) => a.localeCompare(b, undefined, {
                sensitivity: "base",
                numeric: true
            }))
            .slice(0, 10)
            .map(tag => `<span>${tag}</span>`)
            .join("")}
    </div>

    <span class="card-arrow" aria-hidden="true">↗</span>
</div>
            </div>
        `;

        const openPage = () => {
            window.location.href = addon.page;
        };

        card.addEventListener("click", openPage);

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openPage();
            }
        });

        container.appendChild(card);
    });

    resultCount.textContent = `${filtered.length} ${
        filtered.length === 1 ? "addon" : "addons"
    }`;

    emptyState.hidden = filtered.length !== 0;
}

// Collect unique tags and sort alphabetically (A-Z).
const sortedTags = [...new Set(
    addons.flatMap(addon => addon.tags)
)].sort((a, b) =>
    a.localeCompare(b, undefined, {
        sensitivity: "base",
        numeric: true
    })
);

// Keep "All addons" at the beginning.
const tags = ["all", ...sortedTags];

// Render tag filter buttons.
tags.forEach(tag => {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = tag === "all" ? "All addons" : tag;
    button.className = tag === activeTag ? "active" : "";

    button.setAttribute(
        "aria-pressed",
        String(tag === activeTag)
    );

    button.addEventListener("click", () => {
        activeTag = tag;

        tagContainer.querySelectorAll("button").forEach(item => {
            const selected = item === button;

            item.classList.toggle("active", selected);
            item.setAttribute("aria-pressed", String(selected));
        });

        renderAddons();
    });

    tagContainer.appendChild(button);
});

// Search addons in real time.
search.addEventListener("input", renderAddons);

// Initial render.
renderAddons();
