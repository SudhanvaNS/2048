const gridsize= 3;
const cellsize= 15;
const gap= 2;

export default class  Grid{
    constructor(gridElement){
     gridElement.style.setProperty("--grid-size", gridsize)
     gridElement.style.setProperty("--cell-size", `${cellsize}vmin`)
     gridElement.style.setProperty("--cell-gap", `${gap}vmin`)
    createCellElements(gridElement);
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