// V7: THE "COOL-DOWN" FIX (NO LAG)
// ------------------------------------------------------

let forceUnmuteMode = false;
let interactionPause = false; 
let pauseTimer = null;

document.addEventListener('click', (e) => {
    // MMEDIATELY STOP THE LOOP
    // As soon as you click, we tell the enforcer to BACK OFF.
    interactionPause = true;

    // don't wake up too early if you click fast
    if (pauseTimer) clearTimeout(pauseTimer);

    // wait 600ms after your last click to check what happened.
    pauseTimer = setTimeout(() => {

        // Find the active playing video
        const videos = Array.from(document.querySelectorAll('video'));
        const activeVideo = videos.find(v => !v.paused);

        if (activeVideo) {
            if (activeVideo.muted === false) {
                forceUnmuteMode = true;
                chrome.runtime.sendMessage({ action: "TURN_ON_LIGHT" });
            } else {
                forceUnmuteMode = false;
                chrome.runtime.sendMessage({ action: "TURN_OFF_LIGHT" });
            }
        }
        interactionPause = false;

    }, 600); // 0.6 seconds cool-down
}, true);


setInterval(() => {
    // If user is clicking (Paused) OR doesn't want sound... DO NOTHING.
    if (interactionPause || !forceUnmuteMode) return;

    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (!video.paused && video.muted) {
            video.muted = false;
        }
    });
}, 500);