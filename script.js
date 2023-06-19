// import Grid from  "grid.js"; 
const gridsize= 4;
const cellsize= 15;
const gap= 2;

class Grid{
    #cells
    constructor(gridElement){
     gridElement.style.setProperty("--grid-size", gridsize)
     gridElement.style.setProperty("--cell-size", `${cellsize}vmin`)
     gridElement.style.setProperty("--cell-gap", `${gap}vmin`)
    this.#cells = createCellElements(gridElement).map((cellElement,index) =>{
        return new Cell(
            cellElement,
            index%gridsize,
            Math.floor(index/gridsize)
            )
        })
    }
}
class Cell{
    #x
    #y
    #classElement
    constructor(classElement,x,y){
        this.#classElement=classElement;
        this.#x=x;
        this.#y=y;
    }
}
function createCellElements(gridElement){
    const cells=[];
    for(let i=0 ; i < gridsize * gridsize ; i++){
        const cell=document.createElement("div")
        cell.classList.add("cell");
        cells.push(cell);
        gridElement.append(cell) 
    }
    return cells;
}
const gameBoard=document.getElementById("game-board");
const grid = new Grid(gameBoard);  
