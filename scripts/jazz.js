const commonOptions = {
    theme: "custom",
    followCursor: true,
    placement: "top",
    touch: "hold",
    arrow: false,
};

tippy("[data-tippy-content]", {
    ...commonOptions,
    content(reference) {
        return reference.getAttribute("data-tippy-content");
    },
});

const themeToggleButtons = document.querySelectorAll(".theme-toggle");

themeToggleButtons.forEach((btn) => {
    const storedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const initialTooltipText = storedTheme === "dark" ? "Toggle light mode" : "Toggle dark mode";
    tippy(btn, {
        ...commonOptions,
        content: initialTooltipText,
    });

    btn.addEventListener("click", function () {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const targetTheme = currentTheme === "light" ? "dark" : "light";

        const tooltipText = targetTheme === "dark" ? "Toggle light mode" : "Toggle dark mode";
        btn._tippy.setContent(tooltipText);

        document.documentElement.classList.add("theme-transition");
        document.documentElement.setAttribute("data-theme", targetTheme);
        localStorage.setItem("theme", targetTheme);

        setTimeout(function () {
            document.documentElement.classList.remove("theme-transition");
        }, 50);
    });
});
