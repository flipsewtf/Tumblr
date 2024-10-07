/*
Legacy + npf Tumblr audio plugin
-  https://lushwave.tumblr.com
-  Version 1.0.0
*/

document.addEventListener("DOMContentLoaded", function () {
    const playSVG = `
    <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 512 512'>
      <g><path fill-rule='evenodd' d='M468.8 235.007 67.441 3.277A24.2 24.2 0 0 0 55.354-.008h-.07A24.247 24.247 0 0 0 43.19 3.279a24 24 0 0 0-12.11 20.992v463.456a24.186 24.186 0 0 0 36.36 20.994L468.8 276.99a24.238 24.238 0 0 0 0-41.983z' fill='currentColor'></path></g>
    </svg>
  `;

    const pauseSVG = `
    <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 47.607 47.607'>
      <g><path d='M17.991 40.976a6.631 6.631 0 0 1-13.262 0V6.631a6.631 6.631 0 0 1 13.262 0v34.345zM42.877 40.976a6.631 6.631 0 0 1-13.262 0V6.631a6.631 6.631 0 0 1 13.262 0v34.345z' fill='currentColor'></path></g>
    </svg>
  `;

    const handleAudioPosts = () => {
        const audioPosts = document.querySelectorAll(".tmblr-full");

        audioPosts.forEach((post) => {
            const caption = post.querySelector(".audio-caption");
            const audio = post.querySelector("audio");
            const nativePlayer = post.querySelector(".audio_player");

            // Handle regular audio posts
            if (caption && audio && !audio.dataset.handled) {
                audio.dataset.handled = true; // Prevent handling the same audio more than once

                // Hide the native audio controls
                audio.style.display = "none";

                // Create a custom play/pause button
                const customPlayer = document.createElement("div");
                customPlayer.classList.add("custom-audio-player");
                customPlayer.innerHTML = `
          <div class="custom-controls">
            <button class="play-pause">
              ${ playSVG }
            </button>
          </div>
        `;
                caption.appendChild(customPlayer);

                const playPauseButton =
                    customPlayer.querySelector(".play-pause");

                // Toggle play/pause functionality
                playPauseButton.addEventListener("click", () => {
                    if (audio.paused) {
                        audio.play();
                        playPauseButton.innerHTML = pauseSVG; // Change to pause icon
                    } else {
                        audio.pause();
                        playPauseButton.innerHTML = playSVG; // Change to play icon
                    }
                });

                // Update button on play/pause events
                audio.addEventListener("play", () => {
                    playPauseButton.innerHTML = pauseSVG; // Change to pause icon when audio starts
                });

                audio.addEventListener("pause", () => {
                    playPauseButton.innerHTML = playSVG; // Change to play icon when audio pauses
                });
            }

            // Handle legacy audio posts
            if (caption && nativePlayer && !nativePlayer.dataset.handled) {
                nativePlayer.dataset.handled = true; // Prevent handling the same audio more than once

                // Hide the native audio player
                nativePlayer.style.display = "none";

                // Create a custom audio element
                const audioSrc = nativePlayer.querySelector("iframe").src; // Get the iframe source
                const legacyAudio = document.createElement("audio");
                legacyAudio.src = getAudioSource(audioSrc); // Set the audio source

                // Create a custom play/pause button
                const customPlayer = document.createElement("div");
                customPlayer.classList.add("custom-audio-player");
                customPlayer.innerHTML = `
          <div class="custom-controls">
            <button class="play-pause">
              ${ playSVG }
            </button>
          </div>
        `;
                caption.appendChild(customPlayer);

                const playPauseButton =
                    customPlayer.querySelector(".play-pause");

                // Toggle play/pause functionality for legacy audio
                playPauseButton.addEventListener("click", () => {
                    if (legacyAudio.paused) {
                        legacyAudio.play();
                        playPauseButton.innerHTML = pauseSVG; // Change to pause icon
                    } else {
                        legacyAudio.pause();
                        playPauseButton.innerHTML = playSVG; // Change to play icon
                    }
                });

                // Update button on legacy audio play/pause events
                legacyAudio.addEventListener("play", () => {
                    playPauseButton.innerHTML = pauseSVG; // Change to pause icon when audio starts
                });

                legacyAudio.addEventListener("pause", () => {
                    playPauseButton.innerHTML = playSVG; // Change to play icon when audio pauses
                });

                legacyAudio.addEventListener("ended", () => {
                    playPauseButton.innerHTML = playSVG; // Reset to play icon when audio ends
                });
            }
        });
    };

    // Function to extract the audio source from the iframe src for legacy audio
    const getAudioSource = (src) => {
        let audioSrc = decodeURIComponent(src)
            .split("audio_file=")[1]
            .split("&color=")[0];
        if (!audioSrc.includes(".mp3")) {
            const tempSrc = audioSrc.split("/").pop();
            audioSrc = "https://a.tumblr.com/" + tempSrc + "o1.mp3";
        }
        return audioSrc;
    };

    handleAudioPosts();

    // Observe changes in the DOM for dynamically loaded content
    const observer = new MutationObserver(() => {
        handleAudioPosts();
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
