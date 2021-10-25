const colorsQty = 4;
const colorName = ['black', 'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'lime', 'brown', 'pink'];

function createPalette() {
  const colorsContent = document.querySelector('.colors__content');
  const thePalette = document.createElement('div');
  thePalette.id = 'color-palette';
  colorsContent.appendChild(thePalette);
  if (colorsQty > 10) colorsQty = 10;
  for (let i = 0; i < colorsQty; i += 1) {
    const theColors = document.createElement('div');
    theColors.className = 'color';
    theColors.id = i;
    theColors.style.backgroundColor = colorName[i];
    console.log(i);
    document.querySelector('#color-palette').appendChild(theColors);
  }
}

createPalette();