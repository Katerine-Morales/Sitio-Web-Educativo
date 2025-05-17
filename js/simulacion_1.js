const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const epsilon0 = 8.85e-12;
const k = 1 / (4 * Math.PI * epsilon0);

const centerX = 150;
const centerY = canvas.height / 2;

let t = 0;
let paused = false;

function draw() {
  const Q = parseFloat(document.getElementById("Q").value);
  const R = parseFloat(document.getElementById("R").value);

  const rPixel = 50 + 200 * Math.abs(Math.sin(t));
  const rMetro = rPixel;

  let E, dentro = false;
  if (rMetro >= R) {
    E = k * Q / (rMetro * rMetro);
  } else {
    E = k * Q * rMetro / Math.pow(R, 3);
    dentro = true;
  }

  const arrowLength = Math.min(E * 1e8, 200);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(centerX, centerY, R, 0, 2 * Math.PI);
  ctx.fillStyle = "#FFCCCC";
  ctx.fill();
  ctx.strokeStyle = "#AA0000";
  ctx.stroke();

  const testX = centerX + rPixel;
  ctx.beginPath();
  ctx.arc(testX, centerY, 6, 0, 2 * Math.PI);
  ctx.fillStyle = "#0077ff";
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(testX, centerY);
  ctx.lineTo(testX + arrowLength, centerY);
  ctx.strokeStyle = "green";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(testX + arrowLength, centerY);
  ctx.lineTo(testX + arrowLength - 10, centerY - 5);
  ctx.lineTo(testX + arrowLength - 10, centerY + 5);
  ctx.closePath();
  ctx.fillStyle = "green";
  ctx.fill();

  document.getElementById("info-ley").innerHTML = `
    ${dentro ? "🟢 Dentro de la esfera" : "🔵 Fuera de la esfera"}<br>
    Distancia r = ${rMetro.toFixed(1)} m<br>
    Campo E = ${E.toExponential(2)} N/C
  `;

  if (!paused) {
    t += 0.015;
    requestAnimationFrame(draw);
  }
}

document.getElementById("toggleBtn").addEventListener("click", () => {
  paused = !paused;
  document.getElementById("toggleBtn").textContent = paused ? "▶ Reanudar" : "⏸ Pausar";
  if (!paused) draw();
});

draw();

