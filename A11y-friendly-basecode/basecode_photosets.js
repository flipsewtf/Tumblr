// Photosets (NPF + legacy), legacy lightbox,

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

// +++ Remove truly empty <p> tags
for (const p of document.querySelectorAll('.post-content p')) {
    if (p.innerHTML.trim() === '') {
        p.remove();
    }
}

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

// +++ LIGHTBOX + ARIA (legacy only, NPF just keeps ARIA)
document.querySelectorAll('.unified-photo').forEach((wrapper) => {
    const items = wrapper.querySelectorAll('a');

    // Only attach lightbox if it's a legacy photo
    if (wrapper.classList.contains('legacy-photo') && items.length) {
        items.forEach((item, idx) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                openLightbox(items, idx + 1);
            });
        });
    }

    // ARIA: still set for all unified-photo wrappers
    if (items.length > 1) {
        wrapper.setAttribute('role', 'group');
        wrapper.setAttribute('aria-label', 'Photoset');
    } else {
        wrapper.removeAttribute('role');
        wrapper.removeAttribute('aria-label');
    }
});
