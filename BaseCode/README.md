# A Rich, jQuery-free Tumblr Basecode template
Most of us theme-makers have used jQuery since the beginning of Tumblr because many scripts reqired it, but ~~I'm~~ we're finally at a point where stuff can be done without. This is designed for you to not rely on jQuery at all.

## Terms of use
+   This is a basecode template, not a full theme, so do not use it as such.
+   Please make significant changes to it, (make literally whatever you want with this), but with a credit link in the code or on your credits page back to mournstera.tumblr.com.
+   I generally do not provide coding support (as per my FAQ,) But I did make this basecode so if you're a theme-maker, do not hesitate to ask.

## Credits
In this basecode I've used the following resources:

**For displaying tumblr photosets npf:**
+ [@eggdesign](https://egg.design)'s [reverse compatible template](https://github.com/cornetespoir/npf-theme-base/blob/main/reverse-compatible-template.html)
+ [@eossa](https://eossa.studio)'s [reverse compatible template add-on](https://codepen.io/juliasteiwer/pen/yLGvKjV) *(if you have more than one photoset in a post, wrap photosets in divs)*

**For displaying tumblr photosets legacy:**
+ [@Spacetchi](https://spacetchi.tumblr.com)'s [5ppi Flexible (legacy) Photoset](https://github.com/Spacetchi/tumblr-flexible-photoset/tree/master)

**Other**
+ [Phosphor Icons](https://phosphoricons.com)
+ Tooltips by [Tippy.js](https://atomiks.github.io/tippyjs)
+ Dark mode by me [@mournstera](https://mournstera.tumblr.com) *(a modified version of [this plugin](https://mournstera.tumblr.com/plugins/darkmode))*
+  UnifyAudio by me [@mournstera](https://mournstera.tumblr.com) this [this plugin](https://github.com/flipsewtf/UnifyAudio)
+ Custom like and reblog button, modified vesion of [this](https://stackoverflow.com/questions/21708662/customise-tumblrs-new-like-button-iframe-likebutton/21715659#21715659)


> [!IMPORTANT]
> It's vital for me to appreciate @eggdesign and @Spacetchi's work. without it, a jQuery-free theme wouldn't be possible!

## Comments

I've tried to include different kinds of JavaScript snippets such as a slide-down toggle menu, hide tumblr controls behind an icon, an update tab, tags on click, a dark mode toggle and shorten notecount, etc.

This basecode utilizes [CSS Variables](https://www.w3schools.com/css/css3_variables.asp), (especially for the dark/light mode, and it's also just easier in the long run because it saves time), as well as Tippy.js for the tooltips.

Phosphor Icons has been initialized just as an icon example (especially for custom like and reblog icons).

I've made *a lot* of comments in this document, I'm sorry if it's a bit much, but I hope it's helpful!
      
If you don't already, please use chrome devtools or firefox inspect to really get a handle on this basecode, the classes and such.

## Suggestions & help
If you're looking to use [@bychloethemes](https://bychloethemes.tumblr.com/plugins/timeago)'s Timeago plugin, I wrote a jQuery-free one [here](https://github.com/flipsewtf/TimeAgo)

Pure Javascript isn't more difficult than jQuery, it just takes a few more lines of code, but on the other hand you don't have to loade an entire library just to make a navigation toggle 😁 
