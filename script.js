// import Grid from  "grid.js"; 
const gridsize= 4;
const cellsize= 15;
const gap= 2;
//const colorarr=[0,"#eee4da","#ede0c8","#f2b179","#f59563","#f67c5f"]
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
    get cellsByColumn(){
        return this.#cells.reduce((cellGrid,cell) =>{
            cellGrid[cell.x]=cellGrid[cell.x] || []
            cellGrid[cell.x][cell.y]=cell
            return cellGrid;
        }, [])
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
        if(value == null) return;
        this.#tile.#x=this.#x;
        this.#tile.#y=this.#y;
    }
    get x(){
        return this.#x;
    }
    get y(){
        return this.#y;
    }
}

class Tile{
    #tileElement
    #x
    #y
    #value
    constructor(tileContainer,value= Math.random() > 0.5 ? 2:4){
        this.#tileElement=document.createElement("div");
        this.#tileElement.classList.add("tile");
        tileContainer.append(this.#tileElement);
        this.value=value;
    }
    set value(v){
        this.#value=v;
        this.#tileElement.textContent=v;
        const power=Math.log2(v);
        const backgroundlightness=100-power*9
        this.#tileElement.style.setProperty(
            "--background-lightness",
            `${backgroundlightness}%`)
        this.#tileElement.style.setProperty(
            "--text-lightness",
            `${backgroundlightness <=50 ? 90 :10}%`
        )            
}
    set x(value){
        this.#x=value;
        this.#tileElement.style.setProperty("--x",value)
    }
    set y(value){
        this.#y=value;
        this.#tileElement.style.setProperty("--y",value)
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
grid.randomEmptyCell.tile=new Tile(gameBoard);
//  grid.randomEmptyCell.tile=new Tile(gameBoard);
setinput()
 function setinput(){
    window.addEventListener("keydown" ,handleInput,{once : true})
 }
 console.log(grid.cellsByColumn);
 function handleInput(e){
    console.log(e.key);
    switch (e.key) {
        case "ArrowUp": moveup();
                        break;
        case "ArrowDown": movedown()
                        break;
        case "ArrowLeft": moveleft()
                        break;
        case "ArrowRight": moveright();
                    break;
        defualt : setupinput() ;
                    return;
    }
    setupinput();
 }
 function moveup(){
    slideTiles(grid.cellsByColumn);

 }