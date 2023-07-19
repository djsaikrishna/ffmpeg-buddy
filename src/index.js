import quoteFilename from "./lib/quote-filename.js";
import getScaleFlag from "./lib/get-scale-flag.js";
import preloadImage from "./lib/preload-image.js";

let copyButtonState = "waiting";
let copyButtonTimeout = null;

function render() {
  if (copyButtonState === "copying") {
    copyButtonEl.className = "waiting";
  } else {
    copyButtonEl.className = copyButtonState;
  }

  const inputFilename = inputFilenameEl.value.trim() || "input.mp4";
  const outputFilename = outputFilenameEl.value.trim() || "output.gif";

  const hasVideo = !disableVideoEl.checked;
  const hasAudio = !disableAudioEl.checked;

  const videoFlags = [];
  if (hasVideo) {
    const scaleFlag = getScaleFlag(scaleWidthEl.value, scaleHeightEl.value);
    const framerate = parseInt(framerateEl.value.trim(), 10) || null;
    const rotation = rotateEl.value;
    const flip = flipEl.value;
    if (scaleFlag) {
      videoFlags.push(scaleFlag);
    }
    if (framerate) {
      videoFlags.push(`-r ${framerate}`);
    }
    if (rotation !== "no rotation") {
      videoFlags.push(rotation);
    }
    if (flip !== "no flip") {
      videoFlags.push(flip);
    }
  } else {
    videoFlags.push("-vn");
  }

  const startAt = startAtEl.value.trim();
  const endAt = endAtEl.value.trim();

  outputEl.innerText = [
    "ffmpeg",
    "-i",
    quoteFilename(inputFilename),
    ...videoFlags,
    ...(hasAudio ? [] : ["-an"]),
    ...(startAt ? [`-ss '${startAt}'`] : []),
    ...(endAt ? [`-to '${endAt}'`] : []),
    quoteFilename(outputFilename),
  ].join(" ");

  for (const el of document.getElementsByClassName("needs-video")) {
    if (hasVideo) {
      el.removeAttribute("hidden");
    } else {
      el.setAttribute("hidden", "hidden");
    }
  }
}

function onFormChange() {
  copyButtonState = "waiting";
  clearTimeout(copyButtonTimeout);
  render();
}

formEl.addEventListener("input", onFormChange);
formEl.addEventListener("change", onFormChange);
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  render();
});

copyButtonEl.addEventListener("click", async (event) => {
  event.preventDefault();

  if (copyButtonState === "copying") {
    return;
  }
  copyButtonState = "copying";

  clearTimeout(copyButtonTimeout);

  let newState = "copied";
  try {
    await navigator.clipboard.writeText(outputEl.textContent);
  } catch (err) {
    console.error(err);
    newState = "failed";
  }

  copyButtonState = newState;
  render();

  copyButtonTimeout = setTimeout(() => {
    copyButtonState = "waiting";
    render();
  }, 3000);
});

render();

preloadImage("vendor/check.svg");
