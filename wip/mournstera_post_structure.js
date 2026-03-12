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

// ********** PHOTOS + PHOTOSETS
// (HAVE UNIFIED NPF AND LEGACY WITH `unified-photo` CLASS)

// Lightbox helpers
function buildLightboxArray(items) {
    return Array.from(items).map((item) => ({
        width: item.dataset.width,
        height: item.dataset.height,
        low_res: item.dataset.lowres,
        high_res: item.dataset.highres,
    }));
}

function openLightbox(items, currentIndex = 1) {
    Tumblr.Lightbox.init(buildLightboxArray(items), currentIndex);
}

// +++ Remove empty <p> tags
document.querySelectorAll('.post-content p').forEach((p) => {
    if (!p.textContent.trim() || p.innerHTML === '<br>') p.remove();
});

// +++ LEGACY SINGLE PHOTOS
document.querySelectorAll('.legacy-photo__single').forEach((photo) => {
    photo.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox([photo], 1);
    });
});

// +++ LEGACY PHOTOSETS (row layout + lightbox prep)
document.querySelectorAll('.legacy-photo__photoset').forEach((photoset) => {
    const items = photoset.getElementsByClassName('legacy_col');
    const layout = photoset.dataset.layout;

    for (let i = 0; i < layout.length; i++) {
        const cols = Number(layout[i]);
        const row = document.createElement('div');
        row.classList.add('legacy_row', 'legacy_row__' + cols);

        for (let j = 0; j < cols; j++) {
            row.appendChild(items[0]);
        }

        photoset.appendChild(row);
    }
});

// +++ NPF PHOTOSETS (wrap rows)
document.querySelectorAll('.post-content').forEach((post) => {
    let wrapper = null;
    Array.from(post.querySelectorAll('.npf_row')).forEach((row) => {
        if (!row.previousElementSibling || !row.previousElementSibling.classList.contains('npf-photo')) {
            wrapper = document.createElement('div');
            wrapper.classList.add('npf-photo', 'unified-photo');
            row.parentNode.insertBefore(wrapper, row);
        }
        wrapper.appendChild(row);
    });
});

// +++ LIGHTBOX + ARIA (all unified-photo)
document.querySelectorAll('.unified-photo').forEach((wrapper) => {
    const items = wrapper.querySelectorAll('a');
    if (!items.length) return;

    // Attach lightbox
    items.forEach((item, idx) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(items, idx + 1);
        });
    });

    // ARIA: only if multiple items
    if (items.length > 1) {
        wrapper.setAttribute('role', 'group');
        wrapper.setAttribute('aria-label', 'Photoset');
    } else {
        wrapper.removeAttribute('role');
        wrapper.removeAttribute('aria-label');
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
    // Direct uploaded Videos are handled in CSS.

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
        wrapper.classList.add('tmblr-responsive-embed');

        // Remove Tumblr's fixed width/height
        wrapper.style.removeProperty('width');
        wrapper.style.removeProperty('height');

        // Apply responsive aspect ratio
        wrapper.style.aspectRatio = `${w} / ${h}`;
    }

    document.querySelectorAll(SELECTOR).forEach(processIframe);
})();
