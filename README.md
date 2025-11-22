# X Audio Flow

I was getting bored scrolling through Twitter and got really annoyed that I had to click every single video just to hear the audio. The moment I scrolled to the next one, it would mute again. 

So, I built this small extension to fix it.

### How it works
It's very simple:
1. **Unmute one video:** The extension remembers this.
2. **Keep scrolling:** Every video after that will play with sound automatically.
3. **Want silence?** Just mute a video manually, and it goes back to default behavior.

That's it. No settings, just scroll with sound.

## ⚡ Features
* **Persistent Audio:** Keeps videos unmuted as you scroll.
* **Visual Indicator:** Adds a small green "ON" badge to the toolbar icon when the force-unmute mode is active.
* **Zero Lag:** Uses `setInterval` (500ms) and efficient Event Listeners to ensure no performance impact on scrolling.
* **Privacy Focused:** Runs entirely locally. No data is collected.

## 🛠 Installation (Developer Mode)
1. Download/Clone this repo.
2. Open Chrome and go to `chrome://extensions`.
3. Turn on **Developer Mode** (top right switch).
4. Click **Load Unpacked** and select this folder.
5. **Pin the extension** to your toolbar if you want to see the status light (Green = Audio On).

## 📂 Project Structure
* `manifest.json`: Extension configuration (Manifest V3).
* `content.js`: Logic for detecting clicks and enforcing audio state on the webpage.
* `background.js`: Manages the toolbar icon badge (The green "ON" light).
* `icon.png`: Toolbar icon.