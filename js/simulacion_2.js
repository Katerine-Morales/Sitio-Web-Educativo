let cargas = [];
let tipoCarga = 1;

function cambiarTipoCarga() {
  tipoCarga *= -1;
  document.getElementById("tipo").textContent = tipoCarga === 1 ? "Positiva" : "Negativa";
}

function borrarCargas() {
  cargas = [];
  dibujar();
}

function calcularPotencial(x, y) {
  let V = 0;
  for (let carga of cargas) {
    const dx = x - carga.x;
    const dy = y - carga.y;
    const r = Math.sqrt(dx * dx + dy * dy);
    if (r > 1) V += (carga.q * 1000) / r;
  }
  return V;
}

function calcularCampo(x, y) {
  let Ex = 0, Ey = 0;
  for (let carga of cargas) {
    const dx = x - carga.x;
    const dy = y - carga.y;
    const r2 = dx * dx + dy * dy;
    const r = Math.sqrt(r2);
    if (r > 5) {
      const E = (carga.q * 100000) / r2;
      Ex += E * dx / r;
      Ey += E * dy / r;
    }
  }
  return { Ex, Ey };
}

function colorPotencial(V) {
  const max = 100;
  const val = Math.max(-max, Math.min(max, V));
  if (val >= 0) {
    return { r: 255, g: 255 - (val / max) * 255, b: 255 - (val / max) * 255 };
  } else {
    return { r: 255 + (val / max) * 255, g: 255 + (val / max) * 255, b: 255 };
  }
}

function dibujarCampo(ctx, canvas) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  const paso = 25;

  for (let y = paso / 2; y < canvas.height; y += paso) {
    for (let x = paso / 2; x < canvas.width; x += paso) {
      const campo = calcularCampo(x, y);
      const Ex = campo.Ex;
      const Ey = campo.Ey;
      const mag = Math.sqrt(Ex * Ex + Ey * Ey);
      if (mag > 0.1) {
        const escala = 8 / mag;
        const fx = x + escala * Ex;
        const fy = y + escala * Ey;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(fx, fy);
        ctx.stroke();

        const ang = Math.atan2(fy - y, fx - x);
        const puntaX = fx - 3 * Math.cos(ang - 0.3);
        const puntaY = fy - 3 * Math.sin(ang - 0.3);
        ctx.lineTo(puntaX, puntaY);
        ctx.stroke();
      }
    }
  }
}

function dibujar() {
  const canvas = document.getElementById("lienzo");
  const ctx = canvas.getContext("2d");

  const imageData = ctx.createImageData(canvas.width, canvas.height);
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const V = calcularPotencial(x, y);
      const color = colorPotencial(V);
      const index = (y * canvas.width + x) * 4;
      imageData.data[index] = color.r;
      imageData.data[index + 1] = color.g;
      imageData.data[index + 2] = color.b;
      imageData.data[index + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);

  dibujarCampo(ctx, canvas);

  for (let carga of cargas) {
    ctx.beginPath();
    ctx.arc(carga.x, carga.y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = carga.q > 0 ? "red" : "blue";
    ctx.fill();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("lienzo");
  const infoCargas = document.getElementById("info-cargas");

  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cargas.push({ x, y, q: tipoCarga });
    dibujar();
  });

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const V = calcularPotencial(x, y);
    infoCargas.textContent = `Potencial eléctrico en (${Math.round(x)}, ${Math.round(y)}): ${V.toFixed(2)} V`;
  });

  dibujar();
});

