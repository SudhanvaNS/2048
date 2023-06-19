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
    get #emptyCells(){
        return this.#cells.filter((cell)=> cell.tile==null)
    }
    randomEmptyCell(){
        const randomIndex=Math.floor(Math.random()*this.#emptyCells.length);
        return this.#emptyCells[randomIndex];
    }
}
class Cell{
    #x
    #y
    #cellElement
    #tile
    constructor(cellElement,x,y){
        this.#cellElement=cellElement;
        this.#x=x;
        this.#y=y;
    }
    get tile(){
        return this.#tile
    }
    set tile(value){
        this.#tile=value;
        if(value==null) return
        this.#tile.#x=this.#x;
        this.#tile.#y=this.#y;

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
console.log(grid.randomEmptyCell())
// grid.randomEmptyCell.tile=new Tile(gameBoard);
// grid.randomEmptyCell.tile=new Tile(gameBoard);