let canvasWidth = 500;
let canvasHeight = 500;
let cells;
let cellSize = 10;
function keyPressed(){
  if (key  === 'o'){
    if (canvasWidth >= 350){
    canvasHeight -= 50;
    canvasWidth -= 50;
    cellSize --;
    }
    resizeCanvas(canvasWidth, canvasHeight);
  }
   if (key  === 'i'){
     if (canvasHeight <= 950){
       canvasHeight += 50;
       canvasWidth += 50;
       cellSize ++;
     }
    resizeCanvas(canvasWidth, canvasHeight);
  }
}
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  cells = new Array(canvasWidth / cellSize);
  for (let i = 0; i < canvasWidth / cellSize; i++) {
    cells[i] = new Array(canvasHeight / cellSize);
    for (let j = 0; j < canvasHeight / cellSize; j++) {
      cells[i][j] = new Cell()
    }
  }
}

function draw() {
  background(80,200,82);
  frameRate(1);
  for (var x = 0; x <= width; x += cellSize) {
    for (var y = 0; y <= height; y += cellSize) {
      stroke(0);
      strokeWeight(1);
      line(x, 0, x, height);
      line(0, y, width, y);
    }
  }
  checkLiveNeighbors();
  
  for (let i = 0; i < canvasWidth / cellSize; i++) {
    for (let j = 0; j < canvasHeight / cellSize; j++) {
      cells[i][j].checkNextState();
      if (cells[i][j].cellIsAlive()) {
        strokeWeight(cellSize);
        point(i * cellSize + cellSize/2, j * cellSize + cellSize/2);
      }
    }
  }
}

function mouseClicked() {
  let cellX = floor(mouseX / cellSize);
  let cellY = floor(mouseY / cellSize);
  cells[cellX][cellY].isClicked();
}

function checkLiveNeighbors() {
  for (let i = 0; i < canvasWidth / cellSize; i++) {
    for (let j = 0; j < canvasHeight / cellSize; j++) {
      let counter = 0;
      if (i + 1 < canvasWidth / cellSize && j + 1 < canvasHeight / cellSize && cells[i + 1][j + 1].cellIsAlive()) {
        counter++;
      }
      if (i + 1 < canvasWidth / cellSize && cells[i + 1][j].cellIsAlive()) {
        counter++;
      }
      if (i + 1 < canvasWidth / cellSize && j - 1 >= 0 && cells[i + 1][j - 1].cellIsAlive()) {
        counter++;
      }
      if (j - 1 >= 0 && cells[i][j - 1].cellIsAlive()) {
        counter++;
      }
      if (i - 1 >= 0 && j - 1 >= 0 && cells[i - 1][j - 1].cellIsAlive()) {
        counter++;
      }
      if (i - 1 >= 0 && cells[i - 1][j].cellIsAlive()) {
        counter++;
      }
      if (i - 1 >= 0 && j + 1 < canvasHeight / cellSize && cells[i - 1][j + 1].cellIsAlive()) {
        counter++;
      }
      if (j + 1 < canvasHeight / cellSize && cells[i][j + 1].cellIsAlive()) {
        counter++;
      }
      cells[i][j].setLiveNeighbors(counter);
    }
  }
}
