# Stereo — Tumblr Theme Guide

This is a thorough guide for my premium Tumblr theme, **Stereo**. Give [the post](https://mournstera.tumblr.com/post/768597500421668864) a reblog if you're going to be using it! ❤️

Please read this guide carefully before sending me any inquiries.

## About

Stereo is a responsive, single-column Tumblr theme with either a left or right sidebar, and optional tabbed content for About, Tags, Updates, and Blogroll. Full NPF post support, optional dark/light/system mode, and a built-in search bar.

Options include custom post width, sidebar width, custom title and description, font size, three customisable font families, sharp or rounded corners, and swappable icons throughout.

A little HTML knowledge is useful, since the About and Tags sections are edited directly in the code. The theme file is full of comments to help you along.

### License & terms

All themes are distributed under the **Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International** licence. Please read my [Terms of Use](https://mournstera.tumblr.com/themes) before installing.

---

## Getting started

Stereo is responsive, so depending on your screen size, the customisation panel may take up a lot of space and cause the theme to render differently while you're editing. The Tumblr preview window also doesn't always reflect the real thing. Before messaging me, please:

- Change and toggle the options in the customisation panel.
- Hit save, then view your actual blog URL.

### Mobile theme

Tumblr provides its own mobile theme (the one that resembles the app or dashboard). If you'd like Stereo to be used on mobile as well:

1. In the theme editor, scroll to the bottom of the customisation panel and open **Advanced options**.
2. Toggle off **Use default mobile theme**.

---

## Installation

1. Click the Ko-fi link in the theme post — you'll be directed to my [Ko-fi shop](https://ko-fi.com/flipse/shop).
2. Once purchased, you'll receive a `.txt` file.
3. Open it in Notepad (or similar) and copy the entire code.
4. Go to `tumblr.com/customize/[YOUR-BLOG-URL]`.
5. **Please note:** if you have a previous theme's code installed, first reset your theme options by going to Browse themes → Tumblr Official → Use → Save.
6. Click **Edit HTML**, delete all existing code, then paste in Stereo's code.
7. Click Update, then Save.

---

## Upload images

Optional images can be uploaded via the customisation panel:

| Field                      | Notes                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Sidebar** (Light / Dark) | Shown next to your sidebar description. Upload only the light version if you don't need separate light/dark versions. |
| **About** (Light / Dark)   | Shown in the About tab. Same rule applies for light/dark versions.                                                    |

---

## Colours

Click a colour swatch in the panel to open the picker. A 6-digit code prefixed with `#` is a hex colour. For a more precise picker (including picking from a photo), try [redketchup.io/color-picker](https://redketchup.io/color-picker).

Default colours for Stereo:

| Option         | Light     | Dark      |
| -------------- | --------- | --------- |
| Text           | `#252525` | `#ffffff` |
| Text Alt       | `#9a9a9a` | `#aaaaaa` |
| Background     | `#ffffff` | `#0f0f0f` |
| Background Alt | `#f8f8f8` | `#1c1c1c` |
| Borders        | `#e7e7e7` | `#474747` |
| Accent         | `#a0abff` | `#919cff` |
| Accent Alt     | `#e5b6ff` | `#dda0ff` |

_Text Alt, Background Alt, and Accent Alt are used across secondary text, alternating backgrounds (like note blockquotes), and accents like the header username icon or About section links._

---

## Select options

### Font size

Choose between 12px, 13px, 14px, 15px, and 16px.

### Blog layout

Left or right sidebar.

### Layout gap

The space between your sidebar and post column. Choose between 48px, 64px, 72px, 80px, 96px, and 112px.

### Corners

Rounded or sharp — affects content boxes, buttons, and images throughout the theme.

### Post width

Choose between 400px, 450px, 500px, and 540px (540px matches the dashboard default).

### Photoset spacing

The gap between images in a photoset. Choose between 1px, 2px, 3px, and 4px (4px matches the dashboard default).

### Post controls

Controls how the like, reblog, tag toggle, date, and note count icons/labels are displayed:

- **Mixed** — icons with select labels shown (note count and tag toggle).
- **Icons & Text** — icons with all labels shown.
- **Icons** — icons only.
- **Text** — text only, separated by slashes.

### Display tags

- **Always** — tags shown under every post.
- **Truncated** — tags shown with an expandable ellipsis.
- **Behind Toggle** — tags hidden by default, revealed via a button next to post controls.

### Tags case

Default, uppercase, or lowercase — affects the tags displayed under posts.

### Sidebar width

Choose between 176px, 192px, 208px, 224px, and 240px.

### Sidebar image size

Choose between 72px, 80px, 96px, 128px, 144px, or Full width.

### Sidebar image shape

Square, rounded, circle, capsule, blob 1, or blob 2.

### Featured tags

Controls how linked pages set up as tag pages are displayed in your sidebar navigation:

- **None** — tag-style pages appear in the normal page list only.
- **Inline** — tag-style pages are pulled out into a separate "Featured Tags" row.
- **Separated** — same as Inline, but the tag-style pages are removed from the main page list.

---

## Text fields: Customisation

### Fonts

Pick any [Google Font](https://fonts.google.com/) and type its exact name into the field.

| Field              | Used for                                                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Body font**      | The main text of your blog.                                                                                                               |
| **Secondary font** | Navigation, post info (date, notes, tags), section titles, the header username, note container headers, About section stats and headings. |
| **Display font**   | The header title.                                                                                                                         |

### Header title

The title shown above your posts.

### Post margin

The gap between posts. Default is `7.5rem`. Keep a `rem` unit on the number — use `0rem` for no gap.

### Sidebar description

Optional — delete the text to hide it entirely. Accepts basic HTML: links, `<strike>`, `<b>`, `<u>`, `<i>`.

---

## Text fields: Sections

Renames the tabs in your section navigation. Delete a field's text to disable that section entirely.

**Please note:** deleting the text in **Section Blog** hides the entire section navigation and tab system — not just the Blog tab.

**Please note:** for Blogroll to display, enable _Share the Tumblrs you're following_ in your main blog's settings — it will not work on a sideblog.

| Field             | Default  |
| ----------------- | -------- |
| Section Blog      | Blog     |
| Section About     | About    |
| Section Tags      | Tags     |
| Section Updates   | Updates  |
| Section Following | Blogroll |

---

## Text fields: Navigation

### Main navigation

Each nav link has a label and an icon name (see _Changing icons_ below). The Ask and Submit links only appear if you've enabled them under `tumblr.com/settings/blog/[YOUR-BLOG-URL]`.

| Field       | Default label | Default icon |
| ----------- | ------------- | ------------ |
| Home        | Home          | `home`       |
| Ask         | Ask           | `mail`       |
| Submit      | Submit        | `upload`     |
| Custom Link | Custom Link   | `star`       |
| Archive     | Archive       | `archive`    |

The Custom Link also has a **Custom Link URL** field (default `/custom-link`).

### Adding your own pages

For a page to appear in navigation, edit the page in Tumblr's page editor and toggle **Show a link to this page**, then give it a link title. If you need to link elsewhere (e.g. a tag page, or anywhere on the internet), select the "Link" page type instead and set a link title the same way.

---

## Text fields: Updates (section)

Edited directly in the customisation panel. Delete a field's text to hide that line.

| Field             | Default                      |
| ----------------- | ---------------------------- |
| Update Text       | Here is an update.           |
| Activity 1 / icon | watching / `device-tv-old`   |
| Activity 2 / icon | listening / `disc`           |
| Activity 3 / icon | reading / `books`            |
| Activity 4 / icon | playing / `device-gamepad-2` |

---

## Editing sections directly in the code

The **About** and **Tags** sections are edited directly in the theme's HTML. Open **Edit HTML** in the customisation panel, then use Ctrl+F (Windows) or Cmd+F (Mac) to jump to a section.

### Tags section

Each tag group is wrapped in `<!-- TAG GROUP START -->` and `<!-- TAG GROUP END -->`. Each `<li><a href="url-here">Label</a></li>` is one tag link — replace both the URL and the label.

Add `pills` or `column` as a class on `.custom-tags` to change the link style:

```html
<div class="custom-tags pills">
    <h3>Actors</h3>
    <ul role="list">
        <li><a href="url-here">Emma Thompson</a></li>
    </ul>
</div>
```

### About section

**Stats** — copy a `<!-- STAT START -->` / `<!-- STAT END -->` block to add more. Icon names come from [tabler.io/icons](https://tabler.io/icons).

**About image** — add classes to `.about--bio` to style the image:

- `border-on` — adds an accent-coloured border
- `rounded` — rounds the corners
- `circle` — makes it a circle

Remove any of these classes you don't need. The image is 35% of your chosen post width.

**Bio text** — wrap paragraphs in `<p></p>`. For coloured text, wrap it in a span:

```html
<span style="color:var(--color--accent)">accent text</span>
<span style="color:var(--color--accent-alt)">accent alt text</span>
```

**Bio links** — copy a `<!-- LINK START -->` / `<!-- LINK END -->` block to add more. Replace the URL, hover title, and icon name.

**Likes/dislikes** — wrap each item in `<span></span>` inside the `.about--likes` container.

---

## Changing icons

Stereo uses [Tabler Icons](https://tabler.io/icons) throughout, applied via the `data-tabler-icon` attribute.

1. Go to [tabler.io/icons](https://tabler.io/icons).
2. Search for the icon you want.
3. Click it and copy the icon's name (shown in the popup).
4. Paste that name into the relevant text field, or directly into the `data-tabler-icon="..."` attribute in the code (used for About section stats and links).

Example:

```html
<span data-tabler-icon="home"></span>
```
