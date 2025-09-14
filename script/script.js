const colorPicker = new iro.ColorPicker("#color-picker", {
  width: 240,
  borderWidth: 10,
  layout: [{ component: iro.ui.Wheel, options: {} }],
});

const targetColorDiv = document.getElementById("target-color");
const scoreSpan = document.getElementById("score");
const roundSpan = document.getElementById("round");
const overlay = document.getElementById("popup-overlay");
const popup = document.getElementById("score-popup");
const popupScore = document.getElementById("popup-score");
const closePopupBtn = document.getElementById("next-round-btn");
const pickedColorResultDiv = document.getElementById("user-color-result");
const targetColorResultDiv = document.getElementById("target-color-result");

let round = 1;
let totalScore = 0.0;
let targetColor = generateRandomColor();

targetColorDiv.style.background = targetColor.rgbString;

function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b, rgbString: `rgb(${r}, ${g}, ${b})` };
}

function calculateScore(target, selected) {
  if (
    !target ||
    !selected?.rgb ||
    !Number.isFinite(target.r) ||
    !Number.isFinite(selected.rgb.r)
  ) {
    console.error("Invalid color data");
    return "0.0";
  }
  const rDiff = Math.abs(target.r - selected.rgb.r);
  const gDiff = Math.abs(target.g - selected.rgb.g);
  const bDiff = Math.abs(target.b - selected.rgb.b);
  const distance = Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
  const maxDistance = Math.sqrt(255 * 255 * 3);
  return (((maxDistance - distance) / maxDistance) * 100).toFixed(1);
}

function showPopup(score, target, selected) {
  popupScore.textContent = `${score}`;
  pickedColorResultDiv.style.background = selected.rgbString;
  targetColorResultDiv.style.background = target.rgbString;
  overlay.classList.add("active");
  popup.classList.add("active");
}

function hidePopup() {
  overlay.classList.remove("active");
  popup.classList.remove("active");
}

colorPicker.on("input:end", function (color) {
  const score = calculateScore(targetColor, color);
  totalScore += parseFloat(score);
  scoreSpan.textContent = totalScore.toFixed(3);
  showPopup(score, targetColor, color);
});

closePopupBtn.addEventListener("click", () => {
  hidePopup();
  round++;
  roundSpan.textContent = round;
  targetColor = generateRandomColor();
  targetColorDiv.style.background = targetColor.rgbString;
});
