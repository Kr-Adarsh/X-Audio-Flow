let forceUnmuteMode = false;
let interactionPause = false; 
let pauseTimer = null;

document.addEventListener('click', (e) => {
    interactionPause = true;
    if (pauseTimer) clearTimeout(pauseTimer);

    // wait 150ms after your last click to check what happened.
    pauseTimer = setTimeout(() => {

        // Find the active playing video
        const videos = Array.from(document.querySelectorAll("video"));
        const activeVideo = videos.find((v) => !v.paused);

        if (activeVideo) {
            if (activeVideo.muted === false) {
                if (!forceUnmuteMode) {
                    console.log("🔊 X Audio Flow ON");
                    forceUnmuteMode = true;
                    try {
                        chrome.runtime.sendMessage({ action: "TURN_ON_LIGHT" });
                    } catch (e) {
                        console.error(e);
                    }
                }
            } else if (forceUnmuteMode) {
                console.log("🔇 X Audio Flow OFF");
                forceUnmuteMode = false;
                try {
                chrome.runtime.sendMessage({ action: "TURN_OFF_LIGHT" });
                } catch (e) {
                console.error(e);
                }
            }
        }
        interactionPause = false;

    }, 150); // 0.15 seconds cool-down
}, true);


setInterval(() => {
    if (interactionPause || !forceUnmuteMode) return;

    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (!video.paused && video.muted) {
            video.muted = false;
        }
    });
}, 500);