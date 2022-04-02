let colorsQty = 8;
const colorFirst = ['black'];
// random color https://flaviocopes.com/how-to-shuffle-array-javascript/
let colorRand = ['red', 'blue', 'green', 'orange', 'yellow', 'purple', 'lime', 'pink'];
colorRand = colorRand.sort(() => Math.random() - 0.5);
const colorName = colorFirst.concat(colorRand);
const pixelSize = '40px';
let boardSize = 5;
let matrixSize = (parseInt(pixelSize, 10) * boardSize) + (boardSize * 2); // ultima conta relacionada às margens de 1 pixel
const selectedColor = 'black';
const selectedClass = 'color selected';

function limitBoard() {
  if (boardSize > 50) {
    boardSize = 50;
  } else if (boardSize < 5) {
    boardSize = 5;
  }
  return boardSize;
}
function setColor(event) {
  const colorId = event.target.id;
  const colorCell = document.querySelectorAll('.color');
  if (colorsQty > 9) colorsQty = 9;
  for (let i = 0; i < colorsQty; i += 1) {
    colorCell[i].className = 'color';
  }
  colorCell[colorId].className = selectedClass;
}

function setPixel(event) {
  const pixelId = event.target.id;
  const pixelCell = document.querySelectorAll('.pixel');
  const colorCell = document.querySelectorAll('.color');
  if (colorsQty > 9) colorsQty = 9;
  for (let i = 0; i < colorsQty; i += 1) {
    if (colorCell[i].className === selectedClass) {
      pixelCell[pixelId].style.backgroundColor = colorCell[i].style.backgroundColor;
      break;
    } else {
      pixelCell[pixelId].style.backgroundColor = selectedColor;
    }
  }
}

function createPalette() {
  const colorsContent = document.querySelector('.colors__content');
  const thePalette = document.createElement('div');
  thePalette.id = 'color-palette';
  colorsContent.appendChild(thePalette);
  if (colorsQty > 9) colorsQty = 9;
  for (let i = 0; i < colorsQty; i += 1) {
    const theColors = document.createElement('div');
    theColors.className = 'color';
    if (selectedColor === colorName[i]) theColors.className = selectedClass;
    theColors.id = i;
    theColors.style.backgroundColor = colorName[i];
    document.querySelector('#color-palette').appendChild(theColors);
    // event listener em cada div aguardando clique
    const allPalette = document.querySelectorAll('.color');
    allPalette[i].addEventListener('click', setColor);
  }
}

createPalette();

function createBoard(theSize, theMatrix) {
  if (theSize) boardSize = theSize;
  if (theMatrix) matrixSize = theMatrix;
  limitBoard();
  const gridContent = document.querySelector('.grid__content');
  const pixelBoard = document.createElement('div');
  pixelBoard.id = 'pixel-board';
  pixelBoard.style = `width: ${matrixSize}px; height: ${matrixSize}px;`;
  gridContent.appendChild(pixelBoard);
  for (let i = 0; i < (boardSize * boardSize); i += 1) {
    const pixelDiv = document.createElement('div');
    pixelDiv.className = 'pixel';
    pixelDiv.id = i;
    pixelDiv.style = `width: ${pixelSize}; height: ${pixelSize}; background-color: white;`;
    document.querySelector('#pixel-board').appendChild(pixelDiv);
    const selectPixel = document.querySelectorAll('.pixel');
    selectPixel[i].addEventListener('click', setPixel);
  }
}

createBoard();

const btnBoardSize = document.createElement('input');
btnBoardSize.type = 'number';
btnBoardSize.id = 'board-size';
btnBoardSize.maxLength = 2;
btnBoardSize.min = 1;
const btnGenerateBoard = document.createElement('button');
btnGenerateBoard.id = 'generate-board';
btnGenerateBoard.innerText = 'Set Board Size';
const colorsDiv = document.querySelector('.colors');
colorsDiv.appendChild(btnBoardSize);
colorsDiv.appendChild(btnGenerateBoard);

function setBoardSize() {
  const sizeNumber = document.querySelector('#board-size');
  if ((sizeNumber.value === '') || (sizeNumber.value < 5) || (sizeNumber.value > 50)){
    alert('Invalid Board Size!');
  } else {
    const element = document.querySelector('#pixel-board');
    element.remove();
    boardSize = sizeNumber.value;
    matrixSize = (parseInt(pixelSize, 10) * boardSize) + (boardSize * 2);
    createBoard(boardSize, matrixSize);
  }
}

btnGenerateBoard.addEventListener('click', setBoardSize);

const btnClear = document.createElement('button');
btnClear.id = 'clear-board';
btnClear.innerText = 'Reset';
colorsDiv.appendChild(btnClear);

function clearBoard() {
  for (let i = 0; i < (boardSize * boardSize); i += 1) {
    const theBoard = document.querySelectorAll('.pixel');
    theBoard[i].style.backgroundColor = 'white';
  }
  const colorCell = document.querySelectorAll('.color');
  if (colorsQty > 9) colorsQty = 9;
  for (let i = 0; i < colorsQty; i += 1) {
    // console.log(colorCell[i]);
    colorCell[i].className = 'color';
    if (colorName[i] === 'black') {
      colorCell[i].className = 'color selected';
    }
  }
}
btnClear.addEventListener('click', clearBoard);
