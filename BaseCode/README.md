# A Rich, jQuery-Free Tumblr Basecode Template

For a long time, most theme-makers relied on jQuery because Tumblr scripts required it. But now, you can build a fully functional theme **without jQuery**. This basecode is designed to help you do just that.

Accessibility (a11y) is always evolving, but I’ve done my best to make this basecode as accessible as possible. I hope you find it useful - the internet is for everyone!

---

## Terms of Use

-   This is a **basecode template**, not a full theme. Do not use it as a finished theme.
-   Feel free to make **literally any modifications** you want, but please include a credit link in your code or on your credits page back to [mournstera.tumblr.com](https://mournstera.tumblr.com).
-   Use in creating premium/paid themes is allowed.

---

## Credits

This basecode builds on several resources:

### Tumblr Photosets (NPF)

-   [@eggdesign](https://egg.design) — [Reverse Compatible Template](https://github.com/cornetespoir/npf-theme-base/blob/main/reverse-compatible-template.html)
-   [@eossa](https://eossa.studio) — [Template Add-On](https://codepen.io/juliasteiwer/pen/yLGvKjV)  
    _(Wrap multiple photosets in `<div>`s if you have more than one per post.)_

### Tumblr Photosets (Legacy)

-   [@Spacetchi](https://spacetchi.tumblr.com) — [5ppi Flexible Legacy Photoset](https://github.com/Spacetchi/tumblr-flexible-photoset/tree/master)

### Other Resources

-   [Phosphor Icons](https://phosphoricons.com) — For icons
-   [Tippy.js](https://atomiks.github.io/tippyjs) — Tooltips

### My Plugins / Resources

-   **Dark Mode** — An accessible, modern dark mode inspired by [this tutorial](https://github.com/flipsewtf/Tumblr/tree/main/Tutorials/DarkMode)
-   **UnifyAudio** — [Plugin for legacy and NPF audio](https://github.com/flipsewtf/Tumblr/tree/main/Plugins/UnifyAudio)
-   **UnifyLinks** — [Plugin for NPF and legacy links](https://github.com/flipsewtf/Tumblr/tree/main/Plugins/UnifyLinks)

> **Important:** I deeply appreciate the work of @eggdesign and @Spacetchi. Without their templates, creating a jQuery-free theme would not have been possible.

---

## Features & Notes

This basecode includes examples of:

-   Slide-down toggle menus
-   Hiding Tumblr controls behind icons
-   Update tabs
-   Tag toggles
-   Dark mode toggle
-   Shortened note counts

It uses:

-   **CSS Variables** — especially for light/dark mode and consistent spacing
-   **Tippy.js** — for accessible tooltips
-   **Phosphor Icons** — as examples for custom like/reblog icons, update tab, etc.

The code is **very** heavily commented. It may be verbose, but it’s meant to help you understand how everything works. Using Chrome DevTools or Firefox Inspector is recommended to explore the structure, classes, and functionality.

---

## Suggestions & Help

If you want a jQuery-free version of [@bychloethemes’s Timeago plugin](https://bychloethemes.tumblr.com/plugins/timeago), I wrote one [here](https://github.com/flipsewtf/TimeAgo).

Pure JavaScript isn’t harder than jQuery — it’s just a few extra lines. The benefit? You **don’t need to load an entire library** for simple tasks like a navigation toggle 😁
