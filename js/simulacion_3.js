document.addEventListener("DOMContentLoaded", () => {
  const voltajeInput = document.getElementById('voltaje');
  const resistenciaInput = document.getElementById('resistencia');
  const corrienteSpan = document.getElementById('corriente');
  const vLabel = document.getElementById('vLabel');
  const rLabel = document.getElementById('rLabel');
  const canvas = document.getElementById('circuito');
  const ctx = canvas.getContext('2d');

  function dibujarCircuito(I) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Batería
    ctx.fillStyle = '#333';
    ctx.fillRect(50, 80, 10, 40);
    ctx.fillRect(70, 60, 10, 60);

    // Resistencia estilo zigzag
    ctx.beginPath();
    ctx.moveTo(100, 100);
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(110 + i * 10, 90 + (i % 2 === 0 ? -10 : 10));
    }
    ctx.lineTo(170, 100);
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Alambres
    ctx.beginPath();
    ctx.moveTo(60, 100);
    ctx.lineTo(100, 100);
    ctx.moveTo(170, 100);
    ctx.lineTo(550, 100);
    ctx.lineTo(550, 150);
    ctx.lineTo(60, 150);
    ctx.lineTo(60, 100);
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Flechas de corriente
    for (let i = 180; i < 530; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 105);
      ctx.lineTo(i + 20, 105);
      ctx.lineTo(i + 15, 100);
      ctx.moveTo(i + 20, 105);
      ctx.lineTo(i + 15, 110);
      ctx.strokeStyle = I > 0.5 ? '#e63946' : '#1d3557';
      ctx.lineWidth = I * 2;
      ctx.stroke();
    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000';
  }

  function actualizar() {
    const V = parseFloat(voltajeInput.value);
    const R = parseFloat(resistenciaInput.value);
    const I = V / R;

    corrienteSpan.textContent = I.toFixed(2);
    vLabel.textContent = V;
    rLabel.textContent = R;
    dibujarCircuito(I);
  }

  voltajeInput.addEventListener("input", actualizar);
  resistenciaInput.addEventListener("input", actualizar);

  actualizar();

  // ⬇️ Hacemos accesibles funciones si el HTML las llama
  window.actualizar = actualizar;
});

