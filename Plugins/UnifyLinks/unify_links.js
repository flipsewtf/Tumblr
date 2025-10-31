/*
UnifyLinks Tumblr plugin
-  https://mournstera.tumblr.com
-  https://github.com/flipsewtf/Tumblr
-  Version 1.0.0
*/
document.addEventListener("DOMContentLoaded", () => {
    const handleNPFLinks = () => {
        document.querySelectorAll(".npf-link-block").forEach((block) => {
            // Skip if already converted (jic)
            if (block.dataset.converted) return;
            block.dataset.converted = "true";

            const link = block.querySelector("a");
            const href = link?.getAttribute("href") || "#";

            const title =
                block.querySelector(".title")?.textContent.trim() ||
                block.querySelector(".link-title")?.textContent.trim() ||
                "";

            const description =
                block.querySelector(".description")?.textContent.trim() || "";
            const siteName =
                block.querySelector(".site-name")?.textContent.trim() || "";

            block.classList.remove("npf-link-block");
            block.classList.add("custom-link-block");

            block.innerHTML = "";

            const anchor = document.createElement("a");
            anchor.className = "link-header";
            anchor.href = href;
            anchor.target = "_blank";

            const titleWrap = document.createElement("div");
            titleWrap.className = "link-title-wrap";

            const titleSpan = document.createElement("span");
            titleSpan.className = "link-title";
            titleSpan.textContent = title;
            titleWrap.appendChild(titleSpan);

            if (siteName) {
                const hostSpan = document.createElement("span");
                hostSpan.className = "site-url";
                hostSpan.setAttribute("aria-label", `Host: ${siteName}`);
                hostSpan.textContent = siteName;
                titleWrap.appendChild(hostSpan);
            }

            anchor.appendChild(titleWrap);

            // Add SVG
            const svg = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg"
            );
            svg.setAttribute("class", "link-icon");
            svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svg.setAttribute("width", "24");
            svg.setAttribute("height", "24");
            svg.setAttribute("viewBox", "0 0 24 24");
            svg.setAttribute("fill", "none");
            svg.setAttribute("stroke", "currentColor");
            svg.setAttribute("stroke-width", "2");
            svg.setAttribute("stroke-linecap", "round");
            svg.setAttribute("stroke-linejoin", "round");

            const path = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path"
            );
            path.setAttribute("d", "m9 18 6-6-6-6");
            svg.appendChild(path);

            anchor.appendChild(svg);

            block.appendChild(anchor);

            if (description) {
                const maxChars = 100;
                let shortDescription = description;

                if (description.length > maxChars) {
                    shortDescription =
                        description.slice(0, maxChars).trim() + "…";
                }

                const descP = document.createElement("p");
                descP.className = "link-description";
                descP.textContent = shortDescription;
                block.appendChild(descP);
            }
        });
    };

    handleNPFLinks();

    const observer = new MutationObserver(() => {
        handleNPFLinks();
    });
    observer.observe(document.body, { childList: true, subtree: true });
});
