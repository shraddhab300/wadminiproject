// script.js
const colorList = document.getElementById('colorList');
const paletteBoxes = document.getElementById('paletteBoxes');
const paletteSizeSelector = document.getElementById('paletteSize');
const newPaletteButton = document.getElementById('newPalette');
const savePaletteButton = document.getElementById('savePalette');

let selectedPaletteIndex = null;

function generateRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createColorBoxes(count = 100) {
  colorList.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const color = generateRandomColor();
    const div = document.createElement('div');
    div.className = 'color-box';
    div.style.backgroundColor = color;
    div.dataset.color = color;
    div.addEventListener('click', () => {
      if (selectedPaletteIndex !== null) {
        paletteBoxes.children[selectedPaletteIndex].style.backgroundColor = color;
        paletteBoxes.children[selectedPaletteIndex].dataset.color = color;
      }
    });
    colorList.appendChild(div);
  }
}

function createPaletteBoxes(count) {
  paletteBoxes.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const box = document.createElement('div');
    box.className = 'palette-box';
    box.addEventListener('click', () => {
      document.querySelectorAll('.palette-box').forEach(b => b.classList.remove('selected'));
      box.classList.add('selected');
      selectedPaletteIndex = i;
    });
    paletteBoxes.appendChild(box);
  }
  selectedPaletteIndex = null;
}

paletteSizeSelector.addEventListener('change', (e) => {
  createPaletteBoxes(Number(e.target.value));
});

newPaletteButton.addEventListener('click', () => {
  createPaletteBoxes(Number(paletteSizeSelector.value));
});

savePaletteButton.addEventListener('click', () => {
  html2canvas(paletteBoxes).then(canvas => {
    const link = document.createElement('a');
    link.download = 'palette.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});

// Load initial setup
document.addEventListener('DOMContentLoaded', () => {
  createColorBoxes();
  createPaletteBoxes(Number(paletteSizeSelector.value));
});
