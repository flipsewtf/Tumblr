// ********** USERNAME FORMATTING
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.user-header__name').forEach((node) => {
        const text = node.textContent.trim();

        // ---------- ORIGINAL POSTER (normalize blog URL)
        if (node.hasAttribute('data-original')) {
            const match = text.match(/^https:\/\/([^\.]+)\.tumblr\.com\/?/);

            if (match) node.textContent = match[1];

            node.classList.remove('preload-hidden');
            return;
        }

        // ---------- USERNAME CONTAINS "-deactivated"
        if (text.includes('-deactivated')) {
            const cleanUsername = text.split('-deactivated')[0];

            // If already a span (Tumblr block:IsDeactivated)
            if (node.tagName === 'SPAN') {
                node.textContent = cleanUsername;
                return;
            }

            // If it's a link → convert to span
            if (node.tagName === 'A') {
                const span = document.createElement('span');
                span.className = 'user-header__name deactivated';
                span.setAttribute('data-tooltip', 'Deactivated');
                span.setAttribute('aria-label', 'User is deactivated');
                span.textContent = cleanUsername;

                node.replaceWith(span);

                if (typeof window.bindTooltipNode === 'function') {
                    window.bindTooltipNode(span);
                }

                return;
            }
        }

        // ---------- EMPTY USERNAME (weird rare Tumblr edge case)
        if (!text) {
            const span = document.createElement('span');
            span.className = 'user-header__name deactivated';
            span.setAttribute('data-tooltip', 'Deactivated');
            span.setAttribute('aria-label', 'User is deactivated');
            span.innerHTML = 'deactivated';

            node.replaceWith(span);

            if (typeof window.bindTooltipNode === 'function') {
                window.bindTooltipNode(span);
            }
        }
    });
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

    function formatNumber(count) {
        if (count >= 1_000_000) {
            const val = Math.floor(count / 1_000_000);
            return `${val}m`;
        } else if (count >= 1000) {
            const val = Math.floor(count / 1_000);
            return `${val}k`;
        }
        return count.toString();
    }

    const notesSuffix = window.NOTES_SUFFIX ?? ' notes';

    if (el.classList.contains('count--notes') && el.classList.contains('has-label')) {
        el.textContent = `${formatNumber(count)}${notesSuffix}`;
    } else {
        el.textContent = formatNumber(count);
    }
});

// ********** RESPONSIVE VIDEO / EMBED IFRAMES
(function () {
    'use strict';

    // List of known audio iframe classes to skip.
    // Some audio players (Spotify, SoundCloud, Bandcamp, Tumblr) are inserted
    // as iframes, but they are not meant to be resized like video embeds.
    // Older posts might have Bandcamp iframes inside legacy video blocks,
    // so we need to detect and skip them.
    // Direct uploaded Videos are easily handled in CSS.

    const AUDIO_IFRAMES = [
        'spotify_audio_player',
        'soundcloud_audio_player',
        'bandcamp_audio_player',
        'tumblr_audio_player',
    ];

    // Selector for all iframes that may need responsive behavior
    const SELECTOR =
        'figure.tmblr-embed iframe, ' + '.legacy-iframe-container iframe, ' + '.tumblr_video_container iframe';

    function processIframe(iframe) {
        // Already handled? skip
        if (iframe.dataset.responsiveHandled === 'true') return;

        // Skip audio iframes
        if (AUDIO_IFRAMES.some((cls) => iframe.classList.contains(cls))) return;

        // Get iframe dimensions (fallback to data-* attributes)
        let w = parseInt(iframe.getAttribute('width'), 10);
        let h = parseInt(iframe.getAttribute('height'), 10);
        if ((!w || !h) && iframe.dataset.width && iframe.dataset.height) {
            w = parseInt(iframe.dataset.width, 10);
            h = parseInt(iframe.dataset.height, 10);
        }

        // No dimensions? skip
        if (!w || !h) return;

        // Find the wrapper element around the iframe
        const wrapper = iframe.closest('figure.tmblr-embed, .tumblr_video_container, .legacy-iframe-container');
        if (!wrapper) return;

        // Mark as handled
        iframe.dataset.responsiveHandled = 'true';
        wrapper.classList.add('made-responsive');

        // Remove Tumblr's fixed width/height
        wrapper.style.removeProperty('width');
        wrapper.style.removeProperty('height');

        // Apply responsive aspect ratio
        wrapper.style.aspectRatio = `${w} / ${h}`;
    }

    document.querySelectorAll(SELECTOR).forEach(processIframe);
})();

// ********** UNIFY LINK POSTS
// will do for now - kinda boring. rewrite it, maybe with `addEventListener`
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

// ********** UNIFY AUDIO POSTS
// Tumblr audio are either legacy audio posts or NPF,
// and they do not look alike.. at all.
// This script normalizes them so they behave the same!
// Reliable, if not elegant.

document.addEventListener('DOMContentLoaded', function () {
    const playSVG =
        "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' class='custom-audio__play'><path d='M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z'/></svg>";

    const pauseSVG =
        "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' class='custom-audio__pause'><rect x='14' y='3' width='5' height='18' rx='1'/><rect x='5' y='3' width='5' height='18' rx='1'/></svg>";

    const handleAudioPosts = () => {
        document.querySelectorAll('.tmblr-full').forEach((post) => {
            const caption = post.querySelector('.audio-caption'),
                nativePlayer = post.querySelector('.audio_player'),
                audio = post.querySelector('audio');

            // ---------- LEGACY AUDIO POSTS ----------
            if (nativePlayer && !nativePlayer.dataset.handled) {
                nativePlayer.dataset.handled = true;
                nativePlayer.style.display = 'none';

                const audioSrc = nativePlayer.querySelector('iframe').src;
                const legacyAudio = document.createElement('audio');
                legacyAudio.src = getAudioSource(audioSrc);
                legacyAudio.dataset.handled = true;

                setupLegacyAudioPlayer(legacyAudio, caption);
            }

            // ---------- NPF AUDIO POSTS ----------
            if (audio && caption && !audio.dataset.npfHandled) {
                audio.dataset.npfHandled = true;
                audio.style.display = 'none';

                setupNPFAudioPlayer(audio, caption);
            }
        });
    };

    const setupLegacyAudioPlayer = (audio, container) => {
        // safety: avoid duplicate UI
        if (container.querySelector('.custom-audio__range-bar')) return;

        const playerHTML = `<button class="custom-audio__play-pause">${playSVG}</button>`;

        let controls = container.querySelector('.custom-audio__audio-controls');

        if (!controls) {
            // leave jic
            const header = container.querySelector('.custom-audio__header') || container.firstElementChild;

            controls = document.createElement('div');
            controls.className = 'custom-audio__audio-controls';
            controls.setAttribute('role', 'group');

            container.appendChild(controls);
        }

        // insert play button directly
        controls.insertAdjacentHTML('afterbegin', playerHTML);

        const progressBarContainer = document.createElement('div');
        progressBarContainer.classList.add('custom-audio__progress-bar');
        progressBarContainer.innerHTML = `
            <input type="range" class="custom-audio__range-bar" value="0" min="0" max="100">
            <div class="custom-audio__time">
                <span class="custom-audio__current-time">0:00</span> / <span class="custom-audio__duration">0:00</span>
            </div>
        `;
        controls.appendChild(progressBarContainer);

        const playPauseButton = controls.querySelector('.custom-audio__play-pause');
        const progressBar = controls.querySelector('.custom-audio__range-bar');
        const currentTimeElem = controls.querySelector('.custom-audio__current-time');
        const durationElem = controls.querySelector('.custom-audio__duration');

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
            audio.currentTime = (e.target.value / 100) * audio.duration;
        });

        audio.addEventListener('ended', () => {
            playPauseButton.innerHTML = playSVG;
        });
    };

    const setupNPFAudioPlayer = (audio, container) => {
        if (container.querySelector('.custom-audio__range-bar')) return;

        const metadata = container.querySelector('.tmblr-audio-meta.audio-details');
        const albumCover = container.querySelector('.album-cover');

        const playerHTML = `
            <div class="custom-audio__header">
                ${albumCover ? `<img class="custom-audio__album-cover" src="${albumCover.src}" alt="">` : ''}
                <span class="custom-audio__audio-details">${metadata?.innerHTML || ''}</span>
            </div>

            <div class="custom-audio__audio-controls" role="group">
                <button class="custom-audio__play-pause">${playSVG}</button>
                <div class="custom-audio__progress-bar">
                    <input type="range" class="custom-audio__range-bar" value="0" min="0" max="100">
                    <div class="custom-audio__time">
                        <span class="custom-audio__current-time">0:00</span> / <span class="custom-audio__duration">0:00</span>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = playerHTML;

        const playPauseButton = container.querySelector('.custom-audio__play-pause');
        const progressBar = container.querySelector('.custom-audio__range-bar');
        const currentTimeElem = container.querySelector('.custom-audio__current-time');
        const durationElem = container.querySelector('.custom-audio__duration');

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
            audio.currentTime = (e.target.value / 100) * audio.duration;
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
