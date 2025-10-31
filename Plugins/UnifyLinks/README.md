# UnifyLinks

This is a plugin to unify the design and style of Legacy and NPF Tumblr link blocks using JS, HTML, and CSS.

This is an example of the output for both Legacy and NPF:

![Screenshot of UnifyLinks](https://raw.githubusercontent.com/flipsewtf/Tumblr/main/Plugins/UnifyLinks/unify_links.jpg)

## Features

-   Converts Tumblr NPF link blocks to custom-styled link blocks
-   Shows title, site name, and description
-   Hides thumbnails
-   Smooth arrow animation on hover
-   Fully accessible (ARIA labels included)

## Installation

> [!IMPORTANT]  
> <strong>Credit in your theme's code or credits page is required.</strong>

### Javascript

Place the script somewhere before `</body>` using a `<script>` tag.  
Upload it via Tumblr theme assets — do **not** insert the script directly in your theme, as the Tumblr preview window may not handle it properly.

```html
<script src="Plugins/UnifyLinks/links.js"></script>
```

## HTML

Replace the Legacy link block with the HTML from `unify_links.html`

## CSS

Use the `unify_links.css` CSS to style it.
Comments in the CSS should help you understand the structure.
Use Chrome DevTools / Firefox Inspector to tweak styles if needed.

You're more than welcome to customize it, as long as you keep the classes and HTML structure intact — otherwise, the script will not work.

## Comments

Compatibility with Infinite Scroll is not guaranteed; I do not provide support for it.

```

```
