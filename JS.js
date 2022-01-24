const DEFAULT_COLOR = '#FF0000'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

function setCurrentColor(newColor) {
    currentColor = newColor
}

function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
}

function setCurrentSize(newSize) {
    currentSize = newSize
}

const colorBtn = document.getElementById('colorBtn')
const rainbowBtn = document.getElementById('rainbowBtn')
const eraserBtn = document.getElementById('eraserBtn')
const clearBtn = document.getElementById('cltBtn')

const body = document.querySelector("body");
const colorcode = document.getElementById("colorode");
const textSize = document.querySelector(".text-size")
const range = document.getElementById("range")
const grid = document.getElementById("grid")
const checkBox = document.getElementById("checkbox")
const gridPart = document.querySelector("gridPart")





/*range.addEventListener("change", function sizing(range) {
    const msg = `${range} X ${range}`;
    return textSize.innerText = msg;
});*/

colorBtn.onclick = () => setCurrentMode('color')
rainbowBtn.onclick = () => setCurrentMode('rainbow')
eraserBtn.onclick = () => setCurrentMode('eraser')
clearBtn.onclick = () => reloadGrid()
range.onmousemove = (e) => updateSizeValue(e.target.value)
range.onchange = (e) => changeSize(e.target.value)



function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
}

function reloadGrid() {
    clearGrid()
    setupGrid(currentSize)
    
}

function clearGrid() {
    grid.innerHTML = ''
}

function updateSizeValue(value) {
    textSize.innerText = `${value} X ${value}`
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
  
    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div')
        gridElement.setAttribute('class', 'gridPart')
        gridElement.addEventListener('mouseover', changeColor)
        grid.appendChild(gridElement)
        
        
    }
    
    
}



function changeColor(e) {
    if (currentMode === 'rainbow') {
      const randomR = Math.floor(Math.random() * 256)
      const randomG = Math.floor(Math.random() * 256)
      const randomB = Math.floor(Math.random() * 256)
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
      e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
      e.target.style.backgroundColor = '#fefefe'
    }
}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
      rainbowBtn.classList.remove('active')
    } else if (currentMode === 'color') {
      colorBtn.classList.remove('active')
    } else if (currentMode === 'eraser') {
      eraserBtn.classList.remove('active')
    }
  
    if (newMode === 'rainbow') {
      rainbowBtn.classList.add('active')
    } else if (newMode === 'color') {
      colorBtn.classList.add('active')
    } else if (newMode === 'eraser') {
      eraserBtn.classList.add('active')
    }
}



//COLOR CHOOSER 
var colorPicker = new iro.ColorPicker("#picker", {
    width: 200,
    color: "#f00"
});

colorPicker.on('color:change', function(color) {
    colorcode.style.backgroundColor = color.hexString;
    currentColor = color.hexString;
        
})

window.onload = () => {
    setupGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
}

