// V6: WITH GREEN STATUS LIGHT
// ------------------------------------------------------

let forceUnmuteMode = false;

// 1. THE STATE SETTER & SIGNAL SENDER
document.addEventListener('click', (e) => {
    setTimeout(() => {
        const videos = Array.from(document.querySelectorAll('video'));
        const activeVideo = videos.find(v => !v.paused);

        if (activeVideo) {
            if (activeVideo.muted === false) {
                // Logic: User Unmuted -> Enable Force Mode
                if (!forceUnmuteMode) { // Only send signal if state CHANGED
                    forceUnmuteMode = true;
                    // Tell Background Script to turn ON the light
                    chrome.runtime.sendMessage({ action: "TURN_ON_LIGHT" });
                }
            } 
            else {
                // Logic: User Muted -> Disable Force Mode
                if (forceUnmuteMode) { // Only send signal if state CHANGED
                    forceUnmuteMode = false;
                    // Tell Background Script to turn OFF the light
                    chrome.runtime.sendMessage({ action: "TURN_OFF_LIGHT" });
                }
            }
        }
    }, 200);
}, true);


// 2. THE ENFORCER LOOP
setInterval(() => {
    if (!forceUnmuteMode) return;

    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (!video.paused && video.muted) {
            video.muted = false;
        }
    });
}, 500);