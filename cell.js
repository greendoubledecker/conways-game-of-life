class Cell {
  constructor() {
    this.previousIsAlive = random() < 0.5;
    this.isAlive = this.previousIsAlive;
    this.liveNeighbors = 0;
  }

  isClicked() {
    if (this.isAlive === false) {
      this.isAlive = true;
    } else {
      this.isAlive = false;
    }
  }

  cellIsAlive() {
    return this.isAlive;
  }
  
  checkNextState() {
    if (this.previousIsAlive) {
      if (this.liveNeighbors > 3 || this.liveNeighbors < 2) {
        this.isAlive = false;
      } 
    } else {
      if (this.liveNeighbors === 3) {
        this.isAlive = true;
      }
    }
    this.previousIsAlive = this.isAlive;
  }
  
  setLiveNeighbors(liveNeighbors) {
    this.liveNeighbors = liveNeighbors;
  }
}
