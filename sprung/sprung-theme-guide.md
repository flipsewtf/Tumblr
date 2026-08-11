# Sprung — Theme Guide

Please read this guide carefully before sending me any inquiries.

> **License & terms**
>
> All themes distributed by **Mournstera** are licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International](https://creativecommons.org/licenses/by-nc-nd/4.0/) licence. Please carefully read my [terms of use](https://mournstera.tumblr.com/themes) before installing a theme.

Sprung is a responsive Tumblr theme with a left or right sidebar layout. Optional dark mode, search bar, update tab, and full support of NPF posts are included.

Options include custom post width, font size and font families, sidebar image size and shape, photoset gutter, post information, tag display, custom navigation labels, and choices between sharp or rounded content and photoset corners.

Browse through the guide to see all available options and customisable functions.

---

# Getting started

Sprung is responsive, so depending on your screen size, the customisation panel may take up a lot of space and cause the theme to render differently while you're editing. The Tumblr preview window also doesn't always reflect the real thing. Before messaging me, please:

- Change and toggle the options in the customisation panel.
- Hit save, then view your actual blog URL.

## Mobile theme

Tumblr provides its own mobile theme (the one that resembles the app or dashboard). If you'd like Sprung to be used on mobile as well:

1. In the theme editor, scroll to the bottom of the customisation panel and open **Advanced options**.
2. Toggle off **Use default mobile theme**.

---

# Installation

1. Click the link for the code in the theme post. You will be directed to the theme's GitHub file.
2. Click the **Copy raw file** button in the top-right area of the GitHub file.
3. Go to `tumblr.com/customize/[YOUR-BLOG-URL]` and you will be redirected to your blog's customisation page.
4. **Please note:** if you have a previous theme's code installed, first reset your theme options by going to Browse themes → Tumblr Official → Use → Save.
5. Click **Edit HTML**, delete all existing code, then paste in Sprung's code.
6. Click **Update**, then **Save**.

---

# Upload images

Here you can upload the images for the theme.

If you wish to offer a Dark mode option to your theme, there are separate images for light and dark mode. If you want to use the same image in both modes, simply upload it twice.

The sidebar image is optional.

| Upload Images           |
| ----------------------- |
| Sidebar image           |
| Sidebar image dark mode |

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
| Text         | `#232323` |
| Link         | `#b1b1b1` |
| Background   | `#ffffff` |
| Background 2 | `#f0eeea` |
| Borders      | `#e4e2e2` |
| Accent       | `#b0b18a` |

#### Dark mode

| Option       | Colour    |
| ------------ | --------- |
| Text         | `#f4f2f0` |
| Link         | `#b1b1b1` |
| Background   | `#181716` |
| Background 2 | `#242220` |
| Borders      | `#534e48` |
| Accent       | `#bcc59a` |

---

# Select options

Here you can select a variety of options from dropdown menus.

### Font Size

Choose between 11px to 18px.

### Blog Layout

Choose between:

- **Left sidebar**
- **Right sidebar**

### Sidebar Image Size

Choose between `80px`, `100px` and `120px`.

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

| **Option**    | **Description**               |
| ------------- | ----------------------------- |
| Always        | Always display the tags       |
| Behind toggle | Hide the tags behind a toggle |

### Update Tab

Choose where the Update Tab is displayed:

| **Option**     | **Description**                             |
| -------------- | ------------------------------------------- |
| None           | No Update Tab                               |
| Left corner    | Display in the top-left corner of the theme |
| Inside sidebar | Display inside the sidebar                  |

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

### Center Post Column

Toggle this on to centre the post column on larger screens when using either sidebar layout.

### Round Content Corners

This controls the corners of the content throughout the theme.

- **Off** — sharp, square corners.
- **On** — rounded corners.

### Round Photoset Corners

This controls the corners of photos and photosets.

- **Off** — sharp, square corners.
- **On** — rounded corners.

### Search Bar

Toggle this on to display a search bar on your blog.

---

# Text fields: Customisation

The following options are text fields where you type text to change things, or delete text to hide them.

### Body Font

You can freely choose a Google Font for the main text of your blog.

Go to [fonts.google.com](https://fonts.google.com/) and copy the name of the font you want into the text field.

The default font is **Inter**.

### Accent Font

You can freely choose a Google Font for accent text throughout the theme, including tooltips, the footer, search bar, and note count.

Go to [fonts.google.com](https://fonts.google.com/) and copy the name of the font you want into the text field.

The default font is **Reddit Mono**.

### Post Margin

The post margin controls the gap between posts.

Keep a valid CSS length value in this field.

If you do not want any gap, enter: `0rem`

The default is: `15rem`

### Custom Title

The optional title displayed in the sidebar.

The default is: `title`

### Custom Description

The optional description text displayed in the sidebar.

HTML is allowed, including links, ~~strikethrough~~, **bold**, <u>underline</u>, and _italic_ text.

The default is: `This is where your description text goes. Links and html is allowed.`

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

The activity text fields and activity icon fields control the content displayed in the Update Tab.

The default fields are:

| **Text Field**  | **Default**        | **Description**         |
| --------------- | ------------------ | ----------------------- |
| Activity 1 Icon | `bell`             | The icon for Activity 1 |
| Activity 1      | `update text`      | The text for Activity 1 |
| Activity 2 Icon | `device-tv`        | The icon for Activity 2 |
| Activity 2      | `watching`         | The text for Activity 2 |
| Activity 3 Icon | `music`            | The icon for Activity 3 |
| Activity 3      | `listening`        | The text for Activity 3 |
| Activity 4 Icon | `books`            | The icon for Activity 4 |
| Activity 4      | `reading`          | The text for Activity 4 |
| Activity 5 Icon | `device-gamepad-2` | The icon for Activity 5 |
| Activity 5      | `playing`          | The text for Activity 5 |

You can change both the icon and the text to whatever you want. Deleting the text from an activity field hides that activity.

---

# Change icons

You're able to change the five activity icons in the Update Tab.

Sprung uses **Tabler Icons**.

1. Go to [tabler.io/icons](https://tabler.io/icons).
2. Search for the icon you want.
3. Click your chosen icon to open its information panel.
4. Copy the icon name.
5. Paste the name into the corresponding **Activity Icon** text field.

For example:

```text
bell
```

The icon name should be entered into the respective **Activity [#] Icon** field.
