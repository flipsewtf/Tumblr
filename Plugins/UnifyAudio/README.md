# UnifyAudio
This is a little plugin to unify the design and style of Legacy and NPF Tumblr audio posts with some JS, HTML and CSS.

This is an example of the output for both Legacy and npf:

![image](https://github.com/user-attachments/assets/bb61cccd-a69f-40ef-95c7-afd7a112b3c6)

> [!IMPORTANT]
> <strong>Credit in your theme's code or credits page is a must.</strong>

## Javascript
Somewhere before `</body>` Place the script in a `<script>` tag. Use Tumblr's theme assets to upload it. It's important you do not insert the script directly into your Tumblr theme, as the Tumblr preview window does not handle it well.

```html
<script src="unify_audio.js"></script>
```


## HTML
We're going to copy the structure of Tumblr's own npf html audio output, that way we can style (and also manipulate the JS) so it looks alike. Replace the legacy audio with the html in the `legacy.html`

## CSS
The styling of the audio posts is needed as well. I've made some comments in the `style.css` and hopefully that's going to give you an idea. Use Chrome devtools/Firefox inspect to get a handle of it.

You're more than welcome do whatever you want with it, as long as you keep the structure of the html. For example, you can hide the progress-bar-container with CSS, if you don't want a track and time display, etc.

## Comments
I'm unaware how well this works with Infite scroll, I will not support this I'm afraid.
