# Dark mode guide for Tumblr themes
This guide is (largely) aimed at theme-makers, because we're going to be using [CSS Variables](https://www.w3schools.com/css/css3_variables.asp) — if your theme does not support these, you will have to do a certain amount of editing - but only once. So fear not, in the end you'll cut considerable time off of creating themes in the future.

A credit + link to my [blog](https://mournstera.tumblr.com/) in your code or credit-page if using this is a must. A reblog of my [post](https://mournstera.tumblr.com/post/724742111455592448) would be hella cool as well. 🧡

> [!NOTE]
> If you know what you're doing by all means skip ahead and copy-paste. I just want to explain what the different lines of codes.

## Overview
### What we want
- When selected, dark theme to stay dark when refreshing a page.
- To prevent default (light) theme from flashing before the displaying dark mode when browsing (for accessibility).
- If a visitor has dark mode on their PC/device, honour their preference and display dark mode with the option to turn on light mode (for accessibility).
- a snappy transition (also for accessibility - but, I will show you a way to override it like I have on my main toggle button in the top right corner).

### What we're going to do

- Use a data-theme attribute on the `<html>` node, instead of depending on `<body>`.
- Which means we can run the JS before the DOM finish rendering
- Run local storage-check in `<head>`
- Use CSS variables for colours, etc.
- Use `class=""` instead of `ID=""` if we have multiple toggle-buttons, especially for responsive design.

## Let's begin

We're going to be creating the toggle button in the top left corner of the page, displaying a sun and a moon.

First, we need to add data-theme to our`<html>` tag. "Light" will be our default theme:

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
```

## JavaScript

This is pure JS so we don't need to worry about jQuery. Place this right before `</body>` within a `<script>` tag.

Two things are happening here: When we toggle the button the theme changes, but right before it does so, it adds the class `"theme-transition"` to the `<html>` tag where we remove all transition you might have added to links, divs, etc.

This gives it a snappy transition of the theme, so we don't end up with multiple timeframes of transitions that makes it look sloppy and potentially annoying to motion-sensitive people.

You can override this transition like I have on the toggle-button in the top right corner. I'll show you this later on.

```Javascript
const themeToggleButtons = document.querySelectorAll(".theme-toggle");

themeToggleButtons.forEach((btn) => {
    btn.addEventListener("click", function () {

        // Add theme-transition class for smooth transitions
        document.documentElement.classList.add("theme-transition");

        // Retrieve the current theme and determine the target theme
        let currentTheme = document.documentElement.getAttribute("data-theme");
        let targetTheme = (currentTheme === "light") ? "dark" : "light";

        // Remove theme-transition class after a short delay
        window.setTimeout(function () {
            document.documentElement.classList.remove("theme-transition");
        }, 50);

        // Set the data-theme attribute and store in local storage
        document.documentElement.setAttribute("data-theme", targetTheme);
        localStorage.setItem("theme", targetTheme);
    });
});
```

In the first line you have `"theme-toggle"`. This will be the `class=""` we will give the button to toggle the theme later on. Notice it's a class instead of an ID, so we can have several toggle buttons which becomes convenient in responsive design.

But it's not enough to save our preferences in `LocalStorage`, we need to retrieve it whenever we refresh a page or browse around a blog or revisit.

This piece of code is usually within the script above, but by placing this part in the `<head>` we avoid that annoying flash of default/light theme. (which can be harmful to light sensitive-people.)

Place this within a `<script>` tag, after all the main <meta> tags, but before Tumblr's own meta tags.

```Javascript
const storedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme) {
    document.documentElement.setAttribute("data-theme", storedTheme);
}
```

## CSS Variables
So what are CSS Variables? Well, instead of copy-pasting the same colours over and over again, you can place them in variables- wait, does that sound familiar? It should if you're a theme-maker. Tumblr's meta tags (variables) works just like a CSS variable. We put all variables in the `:root` selector, which is placed at the very top of the stylesheet. Let's have a look:

```` CSS
:root {
    --font-size: 14px;
    --post-width: 540px;
    --NameItWhateverYouWant: 0.4em;
    --c-text: white;
    --c-bg: black;
}
````
As you can see, you can name them whatever you want, but **remember** they are case sensitive. The CSS `:root` targets the top-level of a document which is `<html>`. Now we use this information in `var()` functions. Taking the information from above, it will look like this:

```` CSS
body {
    font-size: var(--font-size);
    color: var(--c-text);
    background-color: var(--c-bg);
}
````

So, Instead of the font-color black in the CSS variable, you would replace it with hex/hsl/rbg colour, or, in our case, a Tumblr variable — mine would be `{color:Text}`.

Now let's customize the colours for light mode and dark mode. We used the `data-theme` attribute on the `<html>` node, and that's what we're going to target:
```` CSS
:root {
    --font-size: 14px;
    --post-width: 540px;
    --NameItWhateverYouWant: 0.4em;
}
:root, html[data-theme='light'] {
    --c-text: white;
    --c-bg: black;
}
html[data-theme='dark'] {
    --c-text: black;
    --c-bg: white;
}
````

Notice I've split up the root. First `:root` is variables I use in my theme that doesn't affect the changing of the theme like line-height, post width, etc. (of course replaced with Tumblr's meta-variables if I want to give the user customization options.)

Next are variables that targets the light and dark theme. In case a user's browser doesn't support `data-theme` (highly unlikely, but still), we need a default fall-back which will be the root, and since our light theme is our default theme, we're going to group them in `:root, html[data-theme='light']` because there is no reason to have it displayed separately and twice.

If you want to give the user customization options on the dark theme, rememeber to give it seperate tumblr-variables. Mine for text-color would be `{color:Dark mode Text}`.

## Snappy transition
The class we add to <html> in the script, we named "theme-transition" and for it to work we should probably go ahead and style it. Place this right after the root-variables:

```` CSS
html.theme-transition,
html.theme-transition *,
html.theme-transition *:before,
html.theme-transition *:after {
  transition: 0s !important;
  transition-delay: 0 !important;
}
````
"But I want a smooth transition on something when the theme changes, how can I override it?" 

A simple `!important` on the CSS transition you want to override, will do. For the bouncy transition I sometimes use in my themes, I use `transition: transform 700ms cubic-bezier(.26,2,.46,.71)!important.`

## Toggle-button(s)

Well all this code is no use if we can't click a button to make it happen, right?

We're going to use `<button>` because, well, it's a button we click. Someone might have trouble navigating a page due to light sensitivity or colour blindness, or they navigate by keyboard or voice or use screen-readers. Buttons are by nature clickable and the `aria-label` describes the function of it.

In this tutorial we're going to be using [Phosphor Icons](https://phosphoricons.com/) and specifically the sun and moon icons. I've placed the icons inside the `button` and given each icon an extra class (`light-on` and `light-off`) as well as their separate tooltip title.

```` HTML
<button class="theme-toggle" aria-label="toggle dark or light mode" type="button">
    <i class="ph ph-moon light-on" title="toggle dark mode"></i>
    <i class="ph ph-sun light-off" title="toggle light mode"></i>
</button>
````
Right now, both icons are dislayed at the same time. You could use script  to hide one or the other icon, but why not just use CSS-variables now that we're at it? Let's grab the CSS from before and add to it:
```` CSS
:root {
    --font-size: 14px;
    --post-width: 540px;
    --NameItWhateverYouWant: 0.4em;
}
:root, html[data-theme='light'] {
    --light-on: block;
    --light-off: none;
    --c-text: white;
    --c-bg: black;
}
html[data-theme='dark'] {
    --light-on: none;
    --light-off: block;
    --c-text: black;
    --c-bg: white;
}
````
And just like before, this won't work if we don't add those variables in `var()` functions to the css that targets the the sun and moon icons:
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
.light-on {
    display: var(--light-on);
}
.light-off {
    display: var(--light-off); 
}
````

## Result (tl;dr)

Now we combine everything we've learned and your <html> document should look similar like this:
```` HTML
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">

<script>
const storedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme) {
    document.documentElement.setAttribute("data-theme", storedTheme);
}
</script>

<style>
:root {
    --font-size: 14px;
    --post-width: 540px;
    --NameItWhateverYouWant: 0.4em;
}
:root, html[data-theme='light'] {
    --light-on: block;
    --light-off: none;
    --c-text: white;
    --c-bg: black;
}
html[data-theme='dark'] {
    --light-on: none;
    --light-off: block;
    --c-text: black;
    --c-bg: white;
}
html.theme-transition,
html.theme-transition *,
html.theme-transition *:before,
html.theme-transition *:after {
  transition: 0s !important;
  transition-delay: 0 !important;
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
    <button class="theme-toggle" aria-label="toggle dark or light mode" type="button">
        <i class="ph ph-moon light-on" title="toggle dark mode"></i>
        <i class="ph ph-sun light-off" title="toggle light mode"></i>
    </button>

    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    
    <script>
    const themeToggleButtons = document.querySelectorAll(".theme-toggle");
    
    themeToggleButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
    
            // Add theme-transition class for smooth transitions
            document.documentElement.classList.add("theme-transition");
    
            // Retrieve the current theme and determine the target theme
            let currentTheme = document.documentElement.getAttribute("data-theme");
            let targetTheme = (currentTheme === "light") ? "dark" : "light";
    
            // Remove theme-transition class after a short delay
            window.setTimeout(function () {
                document.documentElement.classList.remove("theme-transition");
            }, 50);
    
            // Set the data-theme attribute and store in local storage
            document.documentElement.setAttribute("data-theme", targetTheme);
            localStorage.setItem("theme", targetTheme);
        });
    });
    </script>
</body>
</html>
````
