# Kuiper — Theme Guide

Please read this guide carefully before sending me any inquiries.

> **License & terms**
>
> All themes distributed by **Mournstera** are licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International](https://creativecommons.org/licenses/by-nc-nd/4.0/) licence. Please carefully read my [terms of use](https://mournstera.tumblr.com/themes) before installing a theme.

Kuiper is a responsive, single-column Tumblr theme with a two-column layout: a navigation sidebar and an info sidebar, orderable left or right. Optional dark mode, search bar, a slide-in About panel, and an update tab are included. Full support of NPF posts.

Options include custom post width, a custom title with its own font and size, custom description, font size, and custom links. There is also a choice between sharp or rounded corners (for both content and photos separately) and the ability to change certain icons.

Browse through the guide to see all available options and customisable functions.

---

# Getting started

Kuiper is responsive, so depending on your screen size, the customisation panel may take up a lot of space and cause the theme to render differently while you're editing. The Tumblr preview window also doesn't always reflect the real thing. Before messaging me, please:

- Change and toggle the options in the customisation panel.
- Hit save, then view your actual blog URL.

## Mobile theme

Tumblr provides its own mobile theme (the one that resembles the app or dashboard). If you'd like Kuiper to be used on mobile as well:

1. In the theme editor, scroll to the bottom of the customisation panel and open **Advanced options**.
2. Toggle off **Use default mobile theme**.

---

# Installation

1. Click the link for the code in the theme post. You will be directed to the theme's GitHub file.
2. Click the **Copy raw file** button in the top-right area of the GitHub file.
3. Go to `tumblr.com/customize/[YOUR-BLOG-URL]` and you will be redirected to your blog's customisation page.
4. **Please note:** if you have a previous theme's code installed, first reset your theme options by going to Browse themes → Tumblr Official → Use → Save.
5. Click **Edit HTML**, delete all existing code, then paste in Kuiper's code.
6. Click **Update**, then **Save**.

---

# Upload images

Here you can upload the images for the theme.

If you wish to offer a Dark mode option to your theme, there are separate images for light and dark mode. If you want to use the same image in both modes, simply upload it twice.

The sidebar image is optional. Its dimensions depend on the **Sidebar image size** you choose below.

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

| Option              | Colour    |
| ------------------- | --------- |
| Text                | `#404040` |
| Link                | `#a5a5a5` |
| Background          | `#ffffff` |
| Background 2        | `#f8f8f8` |
| Borders             | `#eeeeee` |
| Accent              | `#c3d5aa` |
| Slide in background | `#121212` |
| Slide in text       | `#ffffff` |

#### Dark mode

| Option              | Colour    |
| ------------------- | --------- |
| Text                | `#fcfcfc` |
| Link                | `#b1b1b1` |
| Background          | `#0b0b0b` |
| Background 2        | `#252525` |
| Borders             | `#434343` |
| Accent              | `#94a679` |
| Slide in background | `#252525` |
| Slide in text       | `#fcfcfc` |

_Slide in background/text apply to the slide-in About panel and its overlay, independent of your main background/text colours._

---

# Select options

Here you can select a variety of options from dropdown menus.

### Blog Layout

Choose which side your navigation sidebar sits on:

| **Option**  | **Description**                                   |
| ----------- | ------------------------------------------------- |
| nav \| info | Navigation on the left, info sidebar on the right |
| info \| nav | Info sidebar on the left, navigation on the right |

### Font Size

Choose between 11px to 18px.

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

### Sidebar Image Size

Choose between `60px`, `80px`, and `100px`.

### Sidebar Image Shape

Choose between:

| **Option** | **Description**      |
| ---------- | -------------------- |
| Square     | Square image shape   |
| Rounded    | Rounded image shape  |
| Circle     | Circular image shape |
| Blob       | Blob image shape     |

### Post Info

Post info includes the dates, note count, and interactives like tags, reblog, and like buttons.

| **Option** | **Description**        |
| ---------- | ---------------------- |
| Icons      | icons across the board |
| Text       | text across the board  |

### Display Tags

Choose how your tags are displayed:

| **Option**  | **Description**               |
| ----------- | ----------------------------- |
| Always      | Always display the tags       |
| Upon toggle | Hide the tags behind a toggle |

---

# Boolean options

Here you can toggle a variety of options on or off.

### Dark Mode

If you decide to offer dark mode, toggle this on.

The dark mode detects whether the visitor's operating system is using dark mode and uses that preference on their first visit. Visitors can then toggle between light and dark mode.

### Hide Tumblr Controls

Toggle this on to hide Tumblr's default controls behind a toggle instead of displaying them directly.

### Round Content Corners

This controls the corners of the content throughout the theme.

- **Off** — sharp, square corners.
- **On** — rounded corners.

### Round Photo Corners

This controls the corners of photos and photosets specifically, separate from the content corners above.

- **Off** — sharp, square corners.
- **On** — rounded corners.

### Slide-in About Section

Toggle this on to enable a slide-in panel containing your About title, bio, and (if enabled) the update tab. It's opened via a toggle button in the sidebar (desktop) or corner controls (mobile).

See [Text fields: About & Update Tab](#text-fields-about--update-tab) for information about customising its content.

### Update Tab

The Update Tab is displayed inside the slide-in About panel — enabling this on its own does nothing unless **Slide-in About Section** is also toggled on.

### Search Bar

Toggle this on to display a search bar in the navigation sidebar.

---

# Text fields: Customisation

The following options are text fields where you type text to change things, or delete text to hide them.

### Body Font

You can freely choose a Google Font for the main text of your blog.

Go to [fonts.google.com](https://fonts.google.com/) and copy the name of the font you want into the text field.

The default font is `Inter`.

### Custom Title Font

The font used specifically for your Custom Title in the sidebar.

Go to [fonts.google.com](https://fonts.google.com/) and copy the name of the font you want into the text field.

The default font is `Playfair Display`.

### Custom Title Size

Controls the font size of your Custom Title.

Keep a valid CSS length value in this field. The default is: `2.5rem`

### Post Margin

The post margin controls the gap between posts.

Keep a valid CSS length value in this field.

The default is: `140px`

### Custom Title

The optional title displayed in the sidebar.

The default is: `lorem ipsum`

### Custom Description

The optional description text. HTML is allowed, including links, ~~strikethrough~~, **bold**, <u>underline</u>, and _italic_ text.

The default is: `This is where your description text goes. Links and html is allowed.`

---

# Text fields: Navigation

The following text fields concern the navigation links.

| **Text Field**     | **Default** | **Description**                                 |
| ------------------ | ----------- | ----------------------------------------------- |
| Home Link Title    | `home`      | The label for the link to your blog's home page |
| Ask Link Title     | `ask`       | The label for your Ask link                     |
| Archive Link Title | `archive`   | The label for your archive link                 |

The **Ask** link will only show up on your blog if you have enabled the respective option in your Tumblr blog settings.

Go to:

`tumblr.com/settings/blog/[YOUR-BLOG-URL]`

and enable the option there.

Your Tumblr pages are automatically displayed in the navigation when you have created pages with **Show a link to this page** enabled.

The Submit link uses Tumblr's built-in `{SubmitLabel}` and is displayed when submissions are enabled.

---

# Text fields: About & Update Tab

These fields control the content of the slide-in About panel, which must be enabled via **Slide-in About Section** under Boolean options.

### About Link Title & About Icon

The **About Link Title** is used as the hover title and accessible label for the toggle button that opens the slide-in panel. **About Icon** sets the icon shown on that button — see [Change icons](#change-icons) for how to find icon names.

The default title is `about & update tab`, and the default icon is `user`.

### About Title & About Bio

The **About Title** and **About Bio** are displayed at the top of the slide-in panel. Delete the text in either field to hide it.

The defaults are:

| **Text Field** | **Default**           |
| -------------- | --------------------- |
| About Title    | `Lorem ipsum`         |
| About Bio      | `bio text goes here.` |

### Update Tab

If **Update Tab** is also toggled on (see Boolean options), the update tab is displayed underneath the About Title and Bio, inside the same slide-in panel.

HTML like links can be used in the **Update Tab text** and activity text fields.

The default fields are:

| **Text Field**   | **Default**                                | **Description**                                 |
| ---------------- | ------------------------------------------ | ----------------------------------------------- |
| Update Tab Title | `Updates`                                  | The heading shown above the update tab text     |
| Update Tab text  | `updates text. Links and html is allowed.` | The text displayed at the top of the Update Tab |
| Activity 1 Icon  | `television-simple`                        | The icon for Activity 1                         |
| Activity 1       | `watching`                                 | The text for Activity 1                         |
| Activity 2 Icon  | `headphones`                               | The icon for Activity 2                         |
| Activity 2       | `listening`                                | The text for Activity 2                         |
| Activity 3 Icon  | `books`                                    | The icon for Activity 3                         |
| Activity 3       | `reading`                                  | The text for Activity 3                         |
| Activity 4 Icon  | `game-controller`                          | The icon for Activity 4                         |
| Activity 4       | `playing`                                  | The text for Activity 4                         |

You can change both the icon and the text to whatever you want. Deleting the text from an activity field hides that activity.

---

# Change icons

You're able to change the About icon and the four activity icons in the Update Tab.

Kuiper uses **Phosphor Icons**.

1. Go to [phosphoricons.com](https://phosphoricons.com/).
2. Search for the icon you want.
3. Click your chosen icon to open its information panel.
4. Copy the icon name.
5. Paste the name into the corresponding **Icon** text field.

For example:

```text
television-simple
```

The icon name should be entered into the respective **Activity [#] Icon** field, or the **About Icon** field.
