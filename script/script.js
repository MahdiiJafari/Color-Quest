var colorPicker = new iro.ColorPicker("#color-picker", {
  width: 240,
  borderWidth: 10,
  layout: [
    {
      component: iro.ui.Wheel,
      options: {},
    },
  ],
});

const targetColorDiv = document.getElementById("target-color");
const scoreSpan = document.getElementById("score");
const roundSpan = document.getElementById("round");

let round = 1;
let totalScore = 0.0;
let targetColor = generateRandomColor();

targetColorDiv.style.background = targetColor.hex;

function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b, hex: `rgb(${r}, ${g}, ${b})` };
}

function calculateScore(target, selected) {
  const rDiff = Math.abs(target.rgb.r - selected.rgb.r);
  const gDiff = Math.abs(target.rgb.g - selected.rgb.g);
  const bDiff = Math.abs(target.rgb.b - selected.rgb.b);
  return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff).toFixed(3);
}
