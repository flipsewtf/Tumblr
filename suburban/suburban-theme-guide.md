# Suburban — Theme Guide

Please read this guide carefully before sending me any inquiries.

> **License & terms**
>
> All themes distributed by **Mournstera** are licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International](https://creativecommons.org/licenses/by-nc-nd/4.0/) licence. Please carefully read my [terms of use](https://mournstera.tumblr.com/themes) before installing a theme.

Suburban is a responsive Tumblr theme with a fixed sidebar, an optional dark mode, search bar, update tab, and full support of NPF posts.

Options include custom post width, font size and font families, sidebar image shape, photoset gutter, post information, tag display, custom navigation labels, sidebar stats, and choices between sharp or rounded content and photoset corners.

Browse through the guide to see all available options and customisable functions.

---

# Getting started

Suburban is responsive, so depending on your screen size, the customisation panel may take up a lot of space and cause the theme to render differently while you're editing. The Tumblr preview window also doesn't always reflect the real thing. Before messaging me, please:

- Change and toggle the options in the customisation panel.
- Hit save, then view your actual blog URL.

## Mobile theme

Tumblr provides its own mobile theme (the one that resembles the app or dashboard). If you'd like Suburban to be used on mobile as well:

1. In the theme editor, scroll to the bottom of the customisation panel and open **Advanced options**.
2. Toggle off **Use default mobile theme**.

---

# Installation

1. Click the link for the code in the theme post. You will be directed to the theme's GitHub file.
2. Click the **Copy raw file** button in the top-right area of the GitHub file.
3. Go to `tumblr.com/customize/[YOUR-BLOG-URL]` and you will be redirected to your blog's customisation page.
4. **Please note:** if you have a previous theme's code installed, first reset your theme options by going to Browse themes → Tumblr Official → Use → Save.
5. Click **Edit HTML**, delete all existing code, then paste in Suburban's code.
6. Click **Update**, then **Save**.

---

# Upload images

Here you can upload the images for the theme.

If you wish to offer a Dark mode option to your theme, there are separate images for light and dark mode. If you want to use the same image in both modes, simply upload it twice.

The sidebar header and sidebar image are optional.

| Upload Images            |
| ------------------------ |
| Sidebar header           |
| Sidebar header dark mode |
| Sidebar image            |
| Sidebar image dark mode  |

---

# Colours

Here you can change the colours of the theme.

If you are not offering dark mode, you do not need to worry about the dark mode colours.

Click the colour circles in Tumblr's customisation panel to change a colour. A colour picker will appear.

The six-digit number preceded by `#` is a hexadecimal colour code.

For a more specific colour picker, you can use [RedKetchup's Color Picker](https://redketchup.io/color-picker). You can choose a colour and copy its hex code, or even pick a colour from a photo.

### Original colours

#### Light mode

| Option       | Colour    |
| ------------ | --------- |
| Text         | `#334155` |
| Link         | `#a8a9af` |
| Background   | `#ffffff` |
| Background 2 | `#f8fafc` |
| Borders      | `#e2e8f0` |
| Accent       | `#9bb1d0` |

#### Dark mode

| Option       | Colour    |
| ------------ | --------- |
| Text         | `#f0f0f4` |
| Link         | `#b1b1b1` |
| Background   | `#161618` |
| Background 2 | `#202024` |
| Borders      | `#3c3d45` |
| Accent       | `#a5c8f7` |

---

# Select options

Here you can select a variety of options from dropdown menus.

### Font Size

Choose between 11px to 18px.

### Sidebar Image Shape

Choose between:

| **Option** | **Description**      |
| ---------- | -------------------- |
| Square     | Square image shape   |
| Rounded    | Rounded image shape  |
| Circle     | Circular image shape |
| Blob       | Blob image shape     |

### Post Width

Choose between:

- `350px`
- `400px`
- `450px`
- `500px`
- `540px`

`540px` is the standard post width on the Tumblr dashboard.

### Photoset Gutter

The gutter is the gap between photos in photosets.

Choose between `1px` to `4px`.

`4px` is the standard gutter size on the Tumblr dashboard.

### Post Info

Post info includes the dates, note count, and interactives like tags, reblog, and like buttons.

| **Option** | **Description**        |
| ---------- | ---------------------- |
| Icons      | Icons across the board |
| Text       | Text across the board  |

### Display Tags

Choose how your tags are displayed:

| **Option**  | **Description**               |
| ----------- | ----------------------------- |
| Always      | Always display the tags       |
| Upon toggle | Hide the tags behind a toggle |

### Tumblr Controls

Choose whether Tumblr's controls are displayed directly or hidden behind a toggle.

| **Option**    | **Description**                          |
| ------------- | ---------------------------------------- |
| Display       | Display the Tumblr controls              |
| Behind toggle | Hide the Tumblr controls behind a toggle |

---

# Boolean options

Here you can toggle a variety of options on or off.

### Dark Mode

If you decide to offer dark mode, toggle this on.

The dark mode detects whether the visitor's operating system is using dark mode and uses that preference on their first visit. Visitors can then toggle between light and dark mode.

### Round Photoset Corners

This controls the corners of photos and photosets.

- **Off** — sharp, square corners.
- **On** — rounded corners.

### Round Content Corners

This controls the corners of the content throughout the theme.

- **Off** — sharp, square corners.
- **On** — rounded corners.

### Update Tab

Toggle this on to display the Update Tab in the top-right corner of the theme.

See [Text fields: Update Tab](#text-fields-update-tab) for information about customising the update tab.

### Search Bar

Toggle this on to display a search bar on your blog.

---

# Text fields: Customisation

The following options are text fields where you type text to change things, or delete text to hide them.

### Body Font

You can freely choose a Google Font for the main text of your blog.

Go to [fonts.google.com](https://fonts.google.com/) and copy the name of the font you want into the text field.

The default font is `Inter`.

### Accent Font

You can freely choose a Google Font for accent text throughout the theme, including the vertical text and search bar.

Go to [fonts.google.com](https://fonts.google.com/) and copy the name of the font you want into the text field.

The default font is `Roboto Mono`.

### Post Margin

The post margin controls the gap between posts. Keep a valid CSS length value in this field. If you do not want any gap, enter: `0rem`

The default is: `10rem`

### Vertical Text

The optional text displayed vertically beside your blog title.

The default is: `vertical text lorem ipsum`

### Custom Title

The optional title displayed in the sidebar.

The default is: `lorem ipsum`

### Custom Description

The optional description text displayed in the sidebar.

HTML is allowed, including links, ~~strikethrough~~, **bold**, <u>underline</u>, and _italic_ text.

The default is: `This is where your description text goes. Links and html is allowed.`

### Sidebar Stats

The two optional stats are displayed below the navigation. Deleting a stat's text hides that stat.

| **Text Field** | **Default**    | **Description**     |
| -------------- | -------------- | ------------------- |
| Stat 1 Icon    | `hash`         | The icon for Stat 1 |
| Stat 1 Text    | `tracking tag` | The text for Stat 1 |
| Stat 2 Icon    | `heart`        | The icon for Stat 2 |
| Stat 2 Text    | `likes`        | The text for Stat 2 |

---

# Text fields: Navigation

The following text fields concern the navigation links.

| **Text Field**     | **Default** | **Description**                 |
| ------------------ | ----------- | ------------------------------- |
| Home Link Label    | `home`      | label for the link to home page |
| Ask Link Label     | `ask`       | label for your Ask link         |
| Archive Link Label | `archive`   | label for your archive link     |

The **Ask** link will only show up on your blog if you have enabled the respective option in your Tumblr blog settings.

Go to:

`tumblr.com/settings/blog/[YOUR-BLOG-URL]`

and enable the option there.

Your Tumblr pages are automatically displayed in the navigation when you have created pages with **Show a link to this page** enabled.

The Submit link uses Tumblr's built-in `{SubmitLabel}` and is displayed when submissions are enabled.

---

# Text fields: Update Tab

The **Update Tab text**, activity text fields, and activity icon fields control the content displayed in the Update Tab.

HTML like links can be used in the **Update Tab text** and activity text fields.

The default fields are:

| **Text Field**  | **Default**                                | **Description**                                 |
| --------------- | ------------------------------------------ | ----------------------------------------------- |
| Update Tab text | `updates text. Links and html is allowed.` | The text displayed at the top of the Update Tab |
| Activity 1 Icon | `device-tv`                                | The icon for Activity 1                         |
| Activity 1      | `watching`                                 | The text for Activity 1                         |
| Activity 2 Icon | `music`                                    | The icon for Activity 2                         |
| Activity 2      | `listening`                                | The text for Activity 2                         |
| Activity 3 Icon | `books`                                    | The icon for Activity 3                         |
| Activity 3      | `reading`                                  | The text for Activity 3                         |
| Activity 4 Icon | `device-gamepad-2`                         | The icon for Activity 4                         |
| Activity 4      | `playing`                                  | The text for Activity 4                         |

You can change both the icon and the text to whatever you want. Deleting the text from an activity field hides that activity.

---

# Change icons

You're able to change the two stat icons and four activity icons.

Suburban uses **Tabler Icons**.

1. Go to [tabler.io/icons](https://tabler.io/icons).
2. Search for the icon you want.
3. Click your chosen icon to open its information panel.
4. Copy the icon name.
5. Paste the name into the corresponding **Stat Icon** or **Activity Icon** text field.

For example:

```text
device-tv
```

The icon name should be entered into the respective **Stat [#] Icon** or **Activity [#] Icon** field.
