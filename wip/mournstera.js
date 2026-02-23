// don't :) this is a WIP, not for you to steal or use - yet!

// ********** TOOLTIPS
(function () {
    'use strict';

    const NOTES_SELECTOR = 'ol.notes';
    const NOWRAP_CONTAINER = 'tooltip-nowrap';
    const PADDING = 12;
    const MAX_WIDTH = 280;
    const H_OFFSET = 8;
    const V_OFFSET = 6;

    const tooltip = document.createElement('div');
    tooltip.className = 'tmblr-tooltip';
    document.body.appendChild(tooltip);

    let activeEl = null;

    function bind(el) {
        el.addEventListener('mouseover', onEnter);
        el.addEventListener('mouseout', onLeave);
        el.addEventListener('mousemove', onMove);
    }

    function scanNode(node) {
        if (!(node instanceof HTMLElement)) return;
        if (node.hasAttribute('title') || node.hasAttribute('data-tooltip')) bind(node);
        node.querySelectorAll?.('[title],[data-tooltip]').forEach(bind);
    }

    window.bindTooltipNode = scanNode;

    function onEnter(event) {
        const el = event.currentTarget;
        const text = el.getAttribute('data-tooltip') || el.getAttribute('title');
        if (!text) return;

        activeEl = el;

        if (el.hasAttribute('title')) {
            el.dataset.title = text;
            el.removeAttribute('title');
        }

        tooltip.textContent = text;

        if (el.closest(`.${NOWRAP_CONTAINER}`)) {
            tooltip.classList.add('nowrap-tooltip');
        } else {
            tooltip.classList.remove('nowrap-tooltip');
        }

        tooltip.classList.add('is-active');
    }

    function onMove(event) {
        if (!activeEl) return;

        const viewportWidth = document.documentElement.clientWidth;

        tooltip.style.left = '-9999px';
        tooltip.style.top = '0px';
        tooltip.style.visibility = 'hidden';
        tooltip.style.maxWidth = '';

        if (!tooltip.classList.contains('nowrap-tooltip')) {
            tooltip.style.maxWidth = Math.min(MAX_WIDTH, viewportWidth - 2 * PADDING) + 'px';
        }

        tooltip.classList.add('is-active'); // I FEEL STUPID but it's needed

        const rect = tooltip.getBoundingClientRect();

        let left = event.pageX + PADDING + H_OFFSET;
        let top = event.pageY - rect.height - PADDING - V_OFFSET;

        if (top < window.scrollY + PADDING) {
            top = event.pageY + PADDING + V_OFFSET * 3;
        }

        if (left + rect.width + PADDING > window.scrollX + viewportWidth) {
            left = window.scrollX + viewportWidth - rect.width - PADDING;
        }

        if (left < window.scrollX + PADDING) {
            left = window.scrollX + PADDING;
        }

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        tooltip.style.visibility = 'visible';
    }

    function onLeave(event) {
        const el = event.currentTarget;

        if (el.dataset.title) {
            el.setAttribute('title', el.dataset.title);
            delete el.dataset.title;
        }

        activeEl = null;
        tooltip.classList.remove('is-active');
    }

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            mutation.addedNodes.forEach(scanNode);
        }
    });

    function initNotesObserver() {
        const notes = document.querySelector(NOTES_SELECTOR);
        if (!notes) return false;

        scanNode(notes);
        observer.observe(notes, { childList: true, subtree: true });

        return true;
    }

    const timer = setInterval(() => {
        if (initNotesObserver()) clearInterval(timer);
    }, 300);

    scanNode(document.body);

    const tooltipObserver = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
            if (m.type === 'attributes' && m.attributeName === 'data-tooltip') {
                if (activeEl && m.target === activeEl) {
                    tooltip.textContent = activeEl.getAttribute('data-tooltip') || '';
                }
            }
        });
    });

    tooltipObserver.observe(document.body, {
        subtree: true,
        attributes: true,
        attributeFilter: ['data-tooltip'],
    });
})();

// ********** DARK MODE
// localStorage-part of the script inside <head> with is:inline
(() => {
    const buttons = document.querySelectorAll('.theme-toggle');
    if (!buttons.length) return;

    const root = document.documentElement;
    const storageKey = 'mournstera-theme';

    const getStoredTheme = () => localStorage.getItem(storageKey);
    const getSystemTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const getTooltipText = (theme) => (theme === 'dark' ? 'Enable light mode' : 'Enable dark mode');

    const applyTheme = (theme) => {
        root.classList.add('no-transition');
        root.setAttribute('data-theme', theme);

        buttons.forEach((btn) => {
            btn.setAttribute('aria-pressed', theme === 'dark');
            btn.setAttribute('aria-label', getTooltipText(theme));
            btn.setAttribute('data-tooltip', getTooltipText(theme));
        });

        void root.offsetWidth;
        root.classList.remove('no-transition');
    };

    const setUserTheme = (theme) => localStorage.setItem(storageKey, theme);

    applyTheme(getStoredTheme() || getSystemTheme());

    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            const next = current === 'dark' ? 'light' : 'dark';

            applyTheme(next);
            setUserTheme(next);
        });
    });

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    mql.addEventListener('change', (e) => {
        const systemTheme = e.matches ? 'dark' : 'light';
        applyTheme(systemTheme);
        localStorage.setItem(storageKey, systemTheme);
    });
})();

// ********** TUMBLR CONTROLS
(function () {
    'use strict';

    const controls = document.querySelector('button.tumblr-controls');
    if (!controls) return;

    controls.addEventListener('click', function () {
        const isPressed = controls.classList.contains('pressed');

        controls.classList.toggle('pressed', !isPressed);
        controls.setAttribute('aria-expanded', String(!isPressed));
        controls.setAttribute('aria-label', !isPressed ? 'Close Tumblr controls' : 'Open Tumblr controls');

        const tooltipText = !isPressed ? 'Close Tumblr controls' : 'Open Tumblr controls';
        controls.setAttribute('data-tooltip', tooltipText);

        const tooltipEl = document.querySelector('.tmblr-tooltip');
        if (tooltipEl && tooltipEl.classList.contains('is-active')) {
            tooltipEl.textContent = tooltipText;
        }

        const iframe = document.querySelector('iframe.tmblr-iframe');
        if (!iframe) return;

        iframe.classList.toggle('pressed', !isPressed);
        iframe.setAttribute('aria-hidden', String(isPressed));
    });
})();

// ********** SCROLL TO TOP
const html = document.documentElement;
const scrollButton = document.querySelector('.scroll-to-top');

if (scrollButton) {
    document.addEventListener('scroll', function () {
        const isVisible = html.scrollTop > 30;
        scrollButton.classList.toggle('visible', isVisible);
        scrollButton.setAttribute('aria-hidden', String(!isVisible));
    });

    scrollButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });
}

// ********** FORMAT LEGACY ASK TEXT (wrap text in <p>)
document.querySelectorAll('.ask-body').forEach((q) => {
    if (!q.querySelector('*') && q.textContent.trim()) {
        const p = document.createElement('p');
        p.textContent = q.textContent;
        q.textContent = '';
        q.appendChild(p);
    }
});

// ********** FORMAT TIMESTAMP
(function () {
    const now = Math.floor(Date.now() / 1000);
    const elements = document.querySelectorAll('.timestamp');

    const units = [
        { limit: 10, label: 'n' }, // now
        { limit: 60, label: 's', divisor: 1 }, // seconds
        { limit: 3600, label: 'm', divisor: 60 }, // minutes
        { limit: 86400, label: 'h', divisor: 3600 }, // hours
        { limit: 604800, label: 'd', divisor: 86400 }, // days
        { limit: 2620800, label: 'w', divisor: 604800 }, // weeks (~1 month)
        { limit: 31449600, label: 'mo', divisor: 2620800 }, // months (~30.33 days)
        { limit: Infinity, label: 'y', divisor: 31449600 }, // years
    ];

    elements.forEach((el) => {
        const timestamp = parseInt(el.textContent, 10);
        if (isNaN(timestamp)) return;

        const diff = now - timestamp;

        for (const unit of units) {
            if (diff < unit.limit) {
                if (unit.label === 'n') {
                    el.textContent = 'n';
                } else {
                    const value = Math.floor(diff / unit.divisor);
                    el.textContent = value + unit.label;
                }
                break;
            }
        }
    });
})();

// ********** FORMAT NOTES
document.querySelectorAll('.count').forEach((el) => {
    const originalText = el.textContent.trim();

    const rawNumber = originalText.replace(/,/g, '').match(/\d+/);
    if (!rawNumber) return;

    let count = parseInt(rawNumber[0], 10);
    if (isNaN(count)) return;

    let formatted;

    if (count >= 1_000_000) {
        const val = count / 1_000_000;
        formatted = val % 1 === 0 ? `${val}m` : `${val.toFixed(2)}m`;
    } else if (count >= 1000) {
        const val = count / 1_000;
        formatted = val % 1 === 0 ? `${val}k` : `${val.toFixed(1)}k`;
    } else {
        formatted = count.toString();
    }

    const notesSuffix = window.NOTES_SUFFIX ?? ' notes';

    if (el.classList.contains('count--notes') && el.classList.contains('has-label')) {
        el.textContent = `${formatted}${notesSuffix}`;
    } else {
        el.textContent = formatted;
    }
});

// ********** RESPONSIVE VIDEO / EMBED IFRAMES HELL
(function () {
    'use strict';

    const AUDIO_IFRAMES = [
        'spotify_audio_player',
        'soundcloud_audio_player',
        'bandcamp_audio_player', //you are the the reason i screamed today
        'tumblr_audio_player',
    ];

    const SELECTOR =
        'figure.tmblr-embed iframe, ' + '.legacy-iframe-container iframe, ' + '.tumblr_video_container iframe'; // maybe we encase all legacy in section.media and scope up high idk

    function processIframe(iframe) {
        if (iframe.dataset.responsiveHandled === 'true') return;

        if (AUDIO_IFRAMES.some((cls) => iframe.classList.contains(cls))) return;

        let w = parseInt(iframe.getAttribute('width'), 10);
        let h = parseInt(iframe.getAttribute('height'), 10);

        if ((!w || !h) && iframe.dataset.width && iframe.dataset.height) {
            w = parseInt(iframe.dataset.width, 10);
            h = parseInt(iframe.dataset.height, 10);
        }

        if (!w || !h) return;

        const wrapper = iframe.closest('figure, .tumblr_video_container, .legacy-iframe-container');
        if (!wrapper) return;

        iframe.dataset.responsiveHandled = 'true';
        wrapper.classList.add('tmblr-responsive-embed');

        // remove Tumblr's fixed sizing because wtf (700px etc.)
        wrapper.style.removeProperty('width');
        wrapper.style.removeProperty('height');

        // force that responsive behavior
        wrapper.style.width = '100%';
        wrapper.style.maxWidth = '100%';
        wrapper.style.height = 'auto';
        wrapper.style.aspectRatio = `${w} / ${h}`;

        // make iframe fill wrapper
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.display = 'block';
    }

    document.querySelectorAll(SELECTOR).forEach(processIframe);
})();

// ********** UNIFY LINK POSTS  - kinda boring, rewrite it, maybe listener wait for on-load this time as well
document.addEventListener('DOMContentLoaded', () => {
    const handleNPFLinks = () => {
        document.querySelectorAll('.npf-link-block').forEach((block) => {
            if (block.dataset.converted) return;
            block.dataset.converted = 'true';

            const link = block.querySelector('a');
            const href = link?.getAttribute('href') || '#';

            const title =
                block.querySelector('.title')?.textContent.trim() ||
                block.querySelector('.link-title')?.textContent.trim() ||
                '';

            const description = block.querySelector('.description')?.textContent.trim() || '';
            const siteName = block.querySelector('.site-name')?.textContent.trim() || '';

            block.classList.remove('npf-link-block');
            block.classList.add('custom-link-block');

            block.innerHTML = '';

            const anchor = document.createElement('a');
            anchor.className = 'link-header';
            anchor.href = href;
            anchor.target = '_blank';

            const titleWrap = document.createElement('div');
            titleWrap.className = 'link-title-wrap';

            const titleSpan = document.createElement('span');
            titleSpan.className = 'link-title';
            titleSpan.textContent = title;
            titleWrap.appendChild(titleSpan);

            if (siteName) {
                const hostSpan = document.createElement('span');
                hostSpan.className = 'site-url';
                hostSpan.setAttribute('aria-label', `Host: ${siteName}`);
                hostSpan.textContent = siteName;
                titleWrap.appendChild(hostSpan);
            }

            anchor.appendChild(titleWrap);

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('class', 'link-icon');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttribute('viewBox', '0 0 24 24');

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', 'm9 18 6-6-6-6');
            svg.appendChild(path);

            anchor.appendChild(svg);

            block.appendChild(anchor);

            if (description) {
                const maxChars = 100;
                let shortDescription = description;

                if (description.length > maxChars) {
                    shortDescription = description.slice(0, maxChars).trim() + '…';
                }

                const descP = document.createElement('p');
                descP.className = 'link-description';
                descP.textContent = shortDescription;
                block.appendChild(descP);
            }
        });
    };

    handleNPFLinks();

    const observer = new MutationObserver(() => {
        handleNPFLinks();
    });
    observer.observe(document.body, { childList: true, subtree: true });
});

// ********** UNIFY AUDIO POSTS - _desperately_ needs rewriting this is embaressing
document.addEventListener('DOMContentLoaded', function () {
    const playSVG =
            "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' class='play-audio'><path d='M6 4v16a1 1 0 0 0 1.524.852l13-8a1 1 0 0 0 0-1.704l-13-8A1 1 0 0 0 6 4z'></path></svg>",
        pauseSVG =
            "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' class='pause-audio'><path d='M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z'/><path d='M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z'/></svg>";

    const handleAudioPosts = () => {
        document.querySelectorAll('.tmblr-full').forEach((post) => {
            const caption = post.querySelector('.audio-caption'),
                nativePlayer = post.querySelector('.audio_player'),
                audio = post.querySelector('audio');

            if (nativePlayer && !nativePlayer.dataset.handled) {
                nativePlayer.dataset.handled = true;
                nativePlayer.style.display = 'none';

                const audioSrc = nativePlayer.querySelector('iframe').src;
                const legacyAudio = document.createElement('audio');
                legacyAudio.src = getAudioSource(audioSrc);
                legacyAudio.dataset.handled = true;
                setupCustomPlayer(legacyAudio, caption);
            }

            if (audio && caption && !audio.dataset.npfHandled) {
                audio.dataset.npfHandled = true;
                audio.style.display = 'none';
                setupCustomAudioPlayer(audio, caption);
            }
        });
    };

    const setupCustomPlayer = (audio, container) => {
        if (container.querySelector('.custom-audio-player-container')) return;

        const playerHTML = `<button class="play-pause">${playSVG}</button>`;
        const customPlayerContainer = document.createElement('div');
        customPlayerContainer.classList.add('custom-audio-player-container');
        customPlayerContainer.innerHTML = playerHTML;

        const audioInfo = container.querySelector('.audio-info');
        audioInfo.insertBefore(customPlayerContainer, audioInfo.firstChild);

        const progressBarContainer = document.createElement('div');
        progressBarContainer.classList.add('progress-bar-container');
        progressBarContainer.innerHTML = `
            <input type="range" class="progress-bar" value="0" min="0" max="100">
            <div class="time-display">
                <span class="current-time">0:00</span> / <span class="duration">0:00</span>
            </div>
        `;
        container.appendChild(progressBarContainer);

        const playPauseButton = customPlayerContainer.querySelector('.play-pause');
        const progressBar = progressBarContainer.querySelector('.progress-bar');
        const currentTimeElem = progressBarContainer.querySelector('.current-time');
        const durationElem = progressBarContainer.querySelector('.duration');

        audio.addEventListener('loadedmetadata', () => {
            durationElem.textContent = formatTime(audio.duration);
        });

        audio.addEventListener('timeupdate', () => {
            progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
            currentTimeElem.textContent = formatTime(audio.currentTime);
        });

        playPauseButton.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playPauseButton.innerHTML = pauseSVG;
            } else {
                audio.pause();
                playPauseButton.innerHTML = playSVG;
            }
        });

        progressBar.addEventListener('input', (e) => {
            const newTime = (e.target.value / 100) * audio.duration;
            audio.currentTime = newTime;
        });

        audio.addEventListener('ended', () => {
            playPauseButton.innerHTML = playSVG;
        });
    };

    const setupCustomAudioPlayer = (audio, container) => {
        if (container.querySelector('.custom-audio-player-container')) return;

        const metadata = container.querySelector('.tmblr-audio-meta.audio-details');
        const albumCover = container.querySelector('.album-cover');

        // rethink innerHTML. perhaps needed, but it's HEAVY
        const playerHTML = `
            <div class="audio-info">
                <div class="custom-audio-player-container">
                    <button class="play-pause">${playSVG}</button>
                </div>
                <span class="tmblr-audio-meta audio-details">${metadata?.innerHTML || ''}</span>
                ${albumCover ? `<img class="album-cover" src="${albumCover.src}" alt="${albumCover.alt}">` : ''}
            </div>
            <div class="progress-bar-container">
                <input type="range" class="progress-bar" value="0" min="0" max="100">
                <div class="time-display">
                    <span class="current-time">0:00</span> / <span class="duration">0:00</span>
                </div>
            </div>
        `;

        container.innerHTML = playerHTML;

        const playPauseButton = container.querySelector('.play-pause');
        const progressBar = container.querySelector('.progress-bar');
        const currentTimeElem = container.querySelector('.current-time');
        const durationElem = container.querySelector('.duration');

        // i hate it here..
        const checkMetadata = () => {
            if (!isNaN(audio.duration) && audio.duration > 0) {
                durationElem.textContent = formatTime(audio.duration);
            } else {
                setTimeout(checkMetadata, 100);
            }
        };
        checkMetadata();

        audio.addEventListener('timeupdate', () => {
            progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
            currentTimeElem.textContent = formatTime(audio.currentTime);
        });

        playPauseButton.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playPauseButton.innerHTML = pauseSVG;
            } else {
                audio.pause();
                playPauseButton.innerHTML = playSVG;
            }
        });

        progressBar.addEventListener('input', (e) => {
            const newTime = (e.target.value / 100) * audio.duration;
            audio.currentTime = newTime;
        });

        audio.addEventListener('ended', () => {
            playPauseButton.innerHTML = playSVG;
        });
    };

    const getAudioSource = (src) => {
        const audioSrc = decodeURIComponent(src).split('audio_file=')[1]?.split('&color=')[0];
        return audioSrc.includes('.mp3') ? audioSrc : `https://a.tumblr.com/${audioSrc.split('/').pop()}o1.mp3`;
    };

    const formatTime = (seconds) => {
        if (isNaN(seconds) || seconds < 0) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    handleAudioPosts();

    const observer = new MutationObserver(() => {
        handleAudioPosts();
    });
    observer.observe(document.body, { childList: true, subtree: true });
});

// ********** USERNAME FORMATTING FOR header.post-header
document.querySelectorAll('header.post-header').forEach((header) => {
    const link = header.querySelector('.user-header__name');
    if (!link) return;

    const text = link.textContent.trim();

    if (link.hasAttribute('data-original')) {
        // original poster: normalize blog URL
        const match = text.match(/^https:\/\/([^\.]+)\.tumblr\.com\/?/);
        if (match) link.textContent = match[1];
        link.style.visibility = 'visible';
    } else {
        // reblogged username: check if deactivated, and if true then we let that magic happen
        if (text.includes('-deactivated')) {
            const cleanUsername = text.split('-deactivated')[0];
            const span = document.createElement('span');
            span.className = 'user-header__name deactivated';
            span.setAttribute('data-tooltip', 'Deactivated');
            span.setAttribute('aria-label', 'User is deactivated');
            span.textContent = cleanUsername;

            link.replaceWith(span);

            if (typeof window.bindTooltipNode === 'function') {
                window.bindTooltipNode(span);
            }
        }
    }
});

// ********** LEGACY TYPE CONTAINER MAYBE?
// section.media.is-empty {display: none;}
//i'm still workshopping the the framework of npf text post & legacy, original reblogged body vs trail body, etc. this might be needed.

document.querySelectorAll('section.media').forEach((section) => {
    if (!section.textContent.trim() && section.children.length === 0) {
        section.classList.add('is-empty');
    }
});

// ********** LEGACY PHOTOS

// lightbox helpers
function buildLightboxArray(items) {
    let lightboxes = [];

    for (let i = 0; i < items.length; i++) {
        let item = items[i];

        lightboxes.push({
            width: item.dataset.width,
            height: item.dataset.height,
            low_res: item.dataset.lowres,
            high_res: item.dataset.highres,
        });
    }

    return lightboxes;
}

function openLightbox(items, currentIndex) {
    Tumblr.Lightbox.init(buildLightboxArray(items), currentIndex);
}

// photoset lightboxes
function makeLightboxes(photoset) {
    let items = photoset.getElementsByClassName('legacy-item');

    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function () {
            openLightbox(items, i + 1);
        });
    }
}

// build photoset and ARIA
function makePhotoset(photoset) {
    photoset.style.display = 'none';

    let items = photoset.getElementsByClassName('legacy-item');
    let layout = photoset.dataset.layout;

    for (let i = 0; i < layout.length; i++) {
        let cols = parseInt(layout.charAt(i), 10);
        let row = document.createElement('div');

        row.classList.add('photo-row-' + cols, 'photo-row');

        for (let j = 0; j < cols; j++) {
            row.appendChild(items[0]);
        }

        photoset.appendChild(row);
    }

    // ARIA: set only if more than one item
    if (items.length > 1) {
        photoset.setAttribute('role', 'group');
        photoset.setAttribute('aria-label', 'Photoset');
    } else {
        photoset.removeAttribute('role');
        photoset.removeAttribute('aria-label');
    }

    photoset.style.display = 'block';
}

// single photo lightboxes (legacy-photo)
function setupSinglePhotoLightboxes() {
    let photos = document.getElementsByClassName('legacy-photo');

    for (let photo of photos) {
        photo.addEventListener('click', function (e) {
            e.preventDefault();

            openLightbox([this], 1);
        });
    }
}

// startup
function startupPhotosets() {
    let photosets = document.getElementsByClassName('legacy-photoset');

    for (let photoset of photosets) {
        makeLightboxes(photoset);
        makePhotoset(photoset);
    }
}

window.addEventListener(
    'load',
    function () {
        startupPhotosets();
        setupSinglePhotoLightboxes();
    },
    false,
);

// ********** NPF PHOTOSET
document.querySelectorAll('section.post-content').forEach((post) => {
    const rows = Array.from(post.querySelectorAll('.npf_row'));
    let wrapper = null;

    rows.forEach((row) => {
        if (!row.previousElementSibling || !row.previousElementSibling.classList.contains('npf-photo')) {
            wrapper = document.createElement('div');
            wrapper.classList.add('npf-photo');
            row.parentNode.insertBefore(wrapper, row);
        }

        wrapper.appendChild(row);
    });

    // set ARIA per wrapper
    post.querySelectorAll('.npf-photo').forEach((photoWrapper) => {
        const cols = photoWrapper.querySelectorAll('.npf_col');
        if (cols.length > 1) {
            photoWrapper.setAttribute('role', 'group');
            photoWrapper.setAttribute('aria-label', 'Photoset');
        } else {
            photoWrapper.removeAttribute('role');
            photoWrapper.removeAttribute('aria-label');
        }
    });
});

// ********** NPF POST TYPE DETECTOR
// based on first meaningful block excluding h1-h3(h4)
document.querySelectorAll('.post-container.text-post').forEach((article) => {
    const body = article.querySelector('.original-body') || article.querySelector('.reblogged-body');

    if (!body) return;

    const children = Array.from(body.children);

    const firstBlock = children.find((el) => {
        if (/^H[1-4]$/.test(el.tagName)) return false;

        if (el.tagName === 'P' && !el.textContent.trim()) return false;

        if (el.tagName === 'BR') return false;

        return true;
    });

    if (!firstBlock) return;

    let newType = null;

    // Video
    if (
        firstBlock.querySelector('video') ||
        firstBlock.matches('figure[data-npf*="video"]') ||
        firstBlock.matches('.tmblr-embed')
    ) {
        newType = 'video';
    }

    // Photo
    else if (firstBlock.matches('.npf-photo')) {
        newType = 'photo';
    }

    // Audio (Check both the block itself and its descendants because code needs to be babied)
    else if (
        firstBlock.matches(`
        figcaption.audio-caption,
        .spotify_audio_player,
        .soundcloud_audio_player,
        .bandcamp_audio_player,
        .tumblr_audio_player,
        figure[data-npf*='"type":"audio"']`) ||
        firstBlock.querySelector(`
        figcaption.audio-caption,
        .spotify_audio_player,
        .soundcloud_audio_player,
        .bandcamp_audio_player,
        .tumblr_audio_player,
        figure[data-npf*='"type":"audio"']`)
    ) {
        newType = 'audio';
    }
    // Link
    else if (firstBlock.matches('.npf-link-block, .custom-link-block')) {
        newType = 'link';
    }
    // Poll
    // NOT just "poll" - poll-post it is tumblr's own <div data-npf> class
    else if (firstBlock.matches('.poll-post')) {
        newType = 'container-poll';
    }

    if (newType) {
        article.classList.remove('text-post');
        article.classList.add(`${newType}-post`);
    }
});

// ********** remove empty p
document.querySelectorAll('section.post-content p').forEach((p) => {
    if (p.innerHTML === '' || p.innerHTML === '<br>') {
        p.remove();
    }
});
