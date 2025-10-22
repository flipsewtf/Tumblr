# Dark mode guide for Tumblr themes
This guide is aimed at **Tumblr theme makers**. We’ll be using [CSS Variables](https://www.w3schools.com/css/css3_variables.asp), so if your theme doesn’t support them yet, you’ll need to edit your CSS once. In the long run, this will save you **considerable time** when creating or updating themes.

**Credit:** Please include a link to my [blog](https://mournstera.tumblr.com/) in your code or credit page if using this. Reblogging my [original post](https://mournstera.tumblr.com/post/724742111455592448) is also appreciated. 🤝


> [!NOTE]
> If you know what you're doing by all means skip ahead and copy-paste. I just want to explain what the different lines of codes.

### Overview

#### Goals

* Dark theme persists after page refresh.
* Prevent the light theme flash on load (important for accessibility).
* Respect system dark mode preferences, while allowing toggling.
* Smooth transitions, but also customizable for motion-sensitive users.

#### Approach

* Use `data-theme` on `<html>` instead of `<body>` for early JS execution.
* Check `localStorage` in `<head>` to restore user preference.
* Use CSS variables for colors, fonts, etc.
* Use `class` for toggle buttons to allow multiple buttons (responsive-friendly).

---

### Let's begin

We're going to be creating a toggle button, displaying a sun and a moon - more on that later.

First, we need to add data-theme to our`<html>` tag.

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
```

### JavaScript

Here’s what happens when the toggle button is clicked:

1. The theme changes (`light` ↔ `dark`).
2. Right before the change, a class `"theme-transition"` is temporarily added to `<html>`. This **disables other transitions** (links, divs, etc.) for a snappy theme switch.

This prevents overlapping transitions that can look messy or be jarring for motion-sensitive users.

If you want certain elements to still transition smoothly during a theme change (like a bouncy button animation), you can **override the transition** with a specific CSS rule — I’ll show an example later.

This is **pure JavaScript** — no jQuery required. Place the JS just before the closing `</body>` tag inside a `<script>` tag:

```Javascript
const themeToggleButtons = document.querySelectorAll(".theme-toggle");

themeToggleButtons.forEach((btn) => {
    // Determine initial theme
    const storedTheme = localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    // Set initial ARIA attributes
    btn.setAttribute("aria-label", storedTheme === "dark" ? "Enable light mode" : "Enable dark mode");
    btn.setAttribute("aria-pressed", storedTheme === "dark");
    
    // Set the initial theme on <html>
    document.documentElement.setAttribute("data-theme", storedTheme);

    // Click handler
    btn.addEventListener("click", function () {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const targetTheme = currentTheme === "light" ? "dark" : "light";

        // Snappy transition
        document.documentElement.classList.add("theme-transition");
        setTimeout(() => {
            document.documentElement.classList.remove("theme-transition");
        }, 50);

        // Apply new theme and store preference
        document.documentElement.setAttribute("data-theme", targetTheme);
        localStorage.setItem("theme", targetTheme);

        // Update ARIA attributes
        btn.setAttribute("aria-label", targetTheme === "dark" ? "Enable light mode" : "Enable dark mode");
        btn.setAttribute("aria-pressed", targetTheme === "dark");
    });
});

```

In the first line you have `"theme-toggle"`. This will be the `class=""` we will give the button to toggle the theme later on.

> [!TIP]
> Use `class` instead of `id` for multiple toggle buttons - this comes in handy in responsive design if you have a different button for mobile design.

### Load Stored Theme Early

Saving the user's theme preference in `localStorage` is not enough — we also need to **retrieve it on page load**, so the theme stays consistent when refreshing or navigating the site.

To avoid the **flash of the default (light) theme** — which can be uncomfortable for light-sensitive users — place this code **early in the `<head>`**, before the rest of the page content renders.

Add it inside a `<script>` tag **after your main `<meta>` tags but before Tumblr’s own meta tags**:


```Javascript
// Check stored theme or system preference
const storedTheme = localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

// Apply it immediately to <html> to avoid flash
if (storedTheme) {
    document.documentElement.setAttribute("data-theme", storedTheme);
}
```

### CSS Variables
CSS Variables let you store values like colors or sizes in one place, so you don't have to repeat them. If you're a theme-maker, this will feel familiar — Tumblr's meta tags work similarly. We define CSS variables in the `:root` selector at the top of the stylesheet.

The `:root` block acts as a fallback for browsers that don’t support `data-theme` (rare, but good to cover). Since light is our default theme, we group it with `html[data-theme='light']` to avoid repeating values, so:  `:root, html[data-theme='light']` .

Instead of hardcoding values like a black font color, you can use a Tumblr variable — for example, `{color:Text}`. If you want to let users customize the dark theme, create separate Tumblr variables like `{color:Dark mode Text}`. 

The first `:root` block contains variables that **don't** change with the theme (like line-height or post width) — you can replace these with Tumblr meta-variables if you want to give users customization options.   



> [!TIP]
> Group root variables that don't change between themes separately from theme-specific variables.

```css
:root {
    --font-size: 14px;
    --post-width: 540px;
    --line-height: 1.5;
    --NameItWhateverYouWant: 4rem;
}
:root, html[data-theme='light'] {
    --light-on: block;
    --light-off: none;
    --c-text: black;
    --c-bg: white;
}
html[data-theme='dark'] {
    --light-on: none;
    --light-off: block;
    --c-text: white;
    --c-bg: black;
}
```
You can name variables whatever you like, but **remember** they are case-sensitive.  

The `:root` selector targets the top-level `<html>` element. To use a variable, wrap it in a `var()` function. For example:

```` CSS
body {
    font-size: var(--font-size);
    color: var(--c-text);
    background-color: var(--c-bg);
}
````


## Snappy transition
The class `theme-transition` in the script needs styling. Place this right after the root-variables:

```` CSS
html.theme-transition,
html.theme-transition * {
    transition: none !important;
}
````
"But I want a smooth transition on something when the theme changes, how can I override it?" 

A simple `!important` on the CSS transition you want to override, will do. For the bouncy transition I use in a few themes like [like this one](https://flipseprvs.tumblr.com/bruise1), where the theme button is a toggle, I use `transition: transform .3s cubic-bezier(0,2.18,.64,.69) !important;`.

## Toggle-button(s)

We'll use a `<button>` because it's inherently clickable and accessible. Screen readers, keyboard, or voice users can understand its function through the `aria-label`.

For this tutorial, we use [Phosphor Icons](https://phosphoricons.com/) for the sun and moon. Each icon gets its own class (`light-on` and `light-off`) and tooltip title:

```html
<button class="theme-toggle" aria-label="toggle dark & light mode" type="button" role="button">
    <i class="ph ph-moon light-on" title="toggle dark mode"></i>
    <i class="ph ph-sun light-off" title="toggle light mode"></i>
</button>
````

The `light-on` and `light-off` classes link to the CSS variables in `:root` that determine which icon is visible in light or dark mode. These variables must then be used with `var()` in the CSS targeting the sun and moon icons:

```` CSS
.light-on {
    display: var(--light-on);
}
.light-off {
    display: var(--light-off); 
}
````
Remember to give the colours of the the toggle-button(s) a variable and `var()` function if you want it to change along with the theme. Here's an example:

```` CSS
/* Buttons come with a standard outline, padding, borders and background-color so we have to style them if you don't use a css reset */
button.theme-toggle {
    outline: none;
    border: 0;
    padding: 0;
    background: transparent; /* or a give it a variable */
    cursor: pointer; /* make it stand out from text when hovering*/
    font-size: 20px;  /* size of icons */
    color: var(--c-text); /* color of icons */
}
````

## Result (tl;dr)

Now we combine everything we've learned and your <html> document should look similar like this:
```` HTML
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/> 
    
    <script>
        // Check stored theme or system preference
        const storedTheme = localStorage.getItem("theme") ||
            (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        
        // Apply it immediately to <html> to avoid flash
        if (storedTheme) {
            document.documentElement.setAttribute("data-theme", storedTheme);
        }
    </script>
    
    <style>
        :root {
            --font-size: 14px;
            --post-width: 540px;
            --line-height: 1.5;
            --NameItWhateverYouWant: 4rem;
        }
        :root, html[data-theme='light'] {
            --light-on: block;
            --light-off: none;
            --c-text: black;
            --c-bg: white;
        }
        html[data-theme='dark'] {
            --light-on: none;
            --light-off: block;
            --c-text: white;
            --c-bg: black;
        }
        html.theme-transition,
        html.theme-transition * {
            transition: none !important;
        }
        body {
            font-family: var(--font-family)
            font-size: var(--font-size);
            color: var(--c-text);
            background-color: var(--c-bg);
        }
        button.theme-toggle {
            outline: none;
            border: 0;
            padding: 0;
            background: transparent;
            cursor: pointer;
            font-size: 20px;
            color: var(--c-text);
        }
        .light-on {
            display: var(--light-on);
        }
        .light-off {
            display: var(--light-off); 
        }
    </style>
</head>

<body>
    <button class="theme-toggle" aria-label="toggle dark & light mode" type="button" role="button">
        <i class="ph ph-moon light-on" title="toggle dark mode"></i>
        <i class="ph ph-sun light-off" title="toggle light mode"></i>
    </button>

    <script src="https://cdn.jsdelivr.net/npm/@phosphor-icons/web"></script>

    <script>
        const themeToggleButtons = document.querySelectorAll(".theme-toggle");
        
        themeToggleButtons.forEach((btn) => {
            // Determine initial theme
            const storedTheme = localStorage.getItem("theme") ||
                (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        
            // Set initial ARIA attributes
            btn.setAttribute("aria-label", storedTheme === "dark" ? "Enable light mode" : "Enable dark mode");
            btn.setAttribute("aria-pressed", storedTheme === "dark");
            
            // Set the initial theme on <html>
            document.documentElement.setAttribute("data-theme", storedTheme);
        
            // Click handler
            btn.addEventListener("click", function () {
                const currentTheme = document.documentElement.getAttribute("data-theme");
                const targetTheme = currentTheme === "light" ? "dark" : "light";
        
                // Snappy transition
                document.documentElement.classList.add("theme-transition");
                setTimeout(() => {
                    document.documentElement.classList.remove("theme-transition");
                }, 50);
        
                // Apply new theme and store preference
                document.documentElement.setAttribute("data-theme", targetTheme);
                localStorage.setItem("theme", targetTheme);
        
                // Update ARIA attributes
                btn.setAttribute("aria-label", targetTheme === "dark" ? "Enable light mode" : "Enable dark mode");
                btn.setAttribute("aria-pressed", targetTheme === "dark");
            });
        });
    </script>
</body>
</html>
````
