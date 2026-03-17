// UI HELPERS
// Tooltips, dark mode toggle, Tumblr controls, and scroll-to-top button.

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
    const storageKey = 'storaged-theme';

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

        // Use double requestAnimationFrame to delay removing .no-transition
        // This lets the browser apply system-theme styles first, preventing
        // unwanted CSS transitions if the theme matches the device system
        // instead of being toggled by the button.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                root.classList.remove('no-transition');
            });
        });
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
