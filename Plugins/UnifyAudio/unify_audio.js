/*
UnifyAudio Tumblr plugin
-  https://mournstera.tumblr.com
-  https://github.com/flipsewtf/Tumblr
-  Version 1.0.0
*/

document.addEventListener("DOMContentLoaded", function () {
    const playSVG =
            "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 24 24' fill='currentColor' class='play-audio'><path d='M6 4v16a1 1 0 0 0 1.524.852l13-8a1 1 0 0 0 0-1.704l-13-8A1 1 0 0 0 6 4z'></path></svg>",
        pauseSVG =
            "<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 24 24' fill='currentColor' class='pause-audio'><path d='M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z'/><path d='M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z'/></svg>";

    // Function to handle both legacy and NPF audio posts
    const handleAudioPosts = () => {
        document.querySelectorAll(".tmblr-full").forEach((post) => {
            const caption = post.querySelector(".audio-caption"),
                nativePlayer = post.querySelector(".audio_player"),
                audio = post.querySelector("audio");

            // Handle legacy audio posts (iframe-based)
            if (nativePlayer && !nativePlayer.dataset.handled) {
                nativePlayer.dataset.handled = true;
                nativePlayer.style.display = "none"; // Hide the native player

                const audioSrc = nativePlayer.querySelector("iframe").src;
                const legacyAudio = document.createElement("audio");
                legacyAudio.src = getAudioSource(audioSrc);
                legacyAudio.dataset.handled = true;
                setupCustomPlayer(legacyAudio, caption); // Setup custom player
            }

            // Handle NPF audio posts (audio element-based)
            if (audio && caption && !audio.dataset.npfHandled) {
                audio.dataset.npfHandled = true;
                audio.style.display = "none"; // Hide the native player
                setupCustomAudioPlayer(audio, caption); // Setup custom player
            }
        });
    };

    // Function to set up the custom audio player for both legacy and NPF posts
    const setupCustomPlayer = (audio, container) => {
        if (container.querySelector(".custom-audio-player-container")) return; // avoid duplicates

        const playerHTML = `<button class="play-pause">${playSVG}</button>`;
        const customPlayerContainer = document.createElement("div");
        customPlayerContainer.classList.add("custom-audio-player-container");
        customPlayerContainer.innerHTML = playerHTML;

        const audioInfo = container.querySelector(".audio-info");
        audioInfo.insertBefore(customPlayerContainer, audioInfo.firstChild);

        const progressBarContainer = document.createElement("div");
        progressBarContainer.classList.add("progress-bar-container");
        progressBarContainer.innerHTML = `
            <input type="range" class="progress-bar" value="0" min="0" max="100">
            <div class="time-display">
                <span class="current-time">0:00</span> / <span class="duration">0:00</span>
            </div>
        `;
        container.appendChild(progressBarContainer);

        const playPauseButton =
            customPlayerContainer.querySelector(".play-pause");
        const progressBar = progressBarContainer.querySelector(".progress-bar");
        const currentTimeElem =
            progressBarContainer.querySelector(".current-time");
        const durationElem = progressBarContainer.querySelector(".duration");

        audio.addEventListener("loadedmetadata", () => {
            durationElem.textContent = formatTime(audio.duration);
        });

        audio.addEventListener("timeupdate", () => {
            progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
            currentTimeElem.textContent = formatTime(audio.currentTime);
        });

        playPauseButton.addEventListener("click", () => {
            if (audio.paused) {
                audio.play();
                playPauseButton.innerHTML = pauseSVG;
            } else {
                audio.pause();
                playPauseButton.innerHTML = playSVG;
            }
        });

        progressBar.addEventListener("input", (e) => {
            const newTime = (e.target.value / 100) * audio.duration;
            audio.currentTime = newTime;
        });

        audio.addEventListener("ended", () => {
            playPauseButton.innerHTML = playSVG;
        });
    };

    // Function to set up the custom player *specifically* for NPF posts
    const setupCustomAudioPlayer = (audio, container) => {
        if (container.querySelector(".custom-audio-player-container")) return; // Avoid duplicates

        const metadata = container.querySelector(
            ".tmblr-audio-meta.audio-details"
        );
        const albumCover = container.querySelector(".album-cover");

        const playerHTML = `
            <div class="audio-info">
                <div class="custom-audio-player-container">
                    <button class="play-pause">${playSVG}</button>
                </div>
                <span class="tmblr-audio-meta audio-details">${
                    metadata?.innerHTML || ""
                }</span>
                ${
                    albumCover
                        ? `<img class="album-cover" src="${albumCover.src}" alt="${albumCover.alt}">`
                        : ""
                }
            </div>
            <div class="progress-bar-container">
                <input type="range" class="progress-bar" value="0" min="0" max="100">
                <div class="time-display">
                    <span class="current-time">0:00</span> / <span class="duration">0:00</span>
                </div>
            </div>
        `;
        // Insert the custom player HTML into the container
        container.innerHTML = playerHTML;

        const playPauseButton = container.querySelector(".play-pause");
        const progressBar = container.querySelector(".progress-bar");
        const currentTimeElem = container.querySelector(".current-time");
        const durationElem = container.querySelector(".duration");

        // Delay metadata loading for NPF posts if needed, for duration to set properly
        const checkMetadata = () => {
            if (!isNaN(audio.duration) && audio.duration > 0) {
                durationElem.textContent = formatTime(audio.duration);
            } else {
                setTimeout(checkMetadata, 100);
            }
        };
        checkMetadata();

        audio.addEventListener("timeupdate", () => {
            progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
            currentTimeElem.textContent = formatTime(audio.currentTime);
        });

        playPauseButton.addEventListener("click", () => {
            if (audio.paused) {
                audio.play();
                playPauseButton.innerHTML = pauseSVG;
            } else {
                audio.pause();
                playPauseButton.innerHTML = playSVG;
            }
        });

        progressBar.addEventListener("input", (e) => {
            const newTime = (e.target.value / 100) * audio.duration;
            audio.currentTime = newTime;
        });

        audio.addEventListener("ended", () => {
            playPauseButton.innerHTML = playSVG;
        });
    };

    const getAudioSource = (src) => {
        const audioSrc = decodeURIComponent(src)
            .split("audio_file=")[1]
            ?.split("&color=")[0];
        return audioSrc.includes(".mp3")
            ? audioSrc
            : `https://a.tumblr.com/${audioSrc.split("/").pop()}o1.mp3`;
    };

    // Format time to MM:SS
    const formatTime = (seconds) => {
        if (isNaN(seconds) || seconds < 0) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    handleAudioPosts();

    const observer = new MutationObserver(() => {
        handleAudioPosts();
    });
    observer.observe(document.body, { childList: true, subtree: true });
});
