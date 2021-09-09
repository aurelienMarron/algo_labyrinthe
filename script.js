let structure_lab =
    [
        {"posX": 0, "posY": 0, "walls": [true, true, false, true]},
        {"posX": 1, "posY": 0, "walls": [true, false, false, true]},
        {"posX": 2, "posY": 0, "walls": [true, true, false, false]},
        {"posX": 0, "posY": 1, "walls": [false, true, false, true]},
        {"posX": 1, "posY": 1, "walls": [false, true, false, true]},
        {"posX": 2, "posY": 1, "walls": [false, true, false, true]},
        {"posX": 0, "posY": 2, "walls": [false, false, true, true]},
        {"posX": 1, "posY": 2, "walls": [false, true, true, false]},
        {"posX": 2, "posY": 2, "walls": [false, true, true, true]}
    ]

function createLines() {
    let idCadre = document.getElementById('cadre')
    for (let i = 0; i <= structure_lab[structure_lab.length - 1].posY; i++) {
        let nvldiv = document.createElement('div');

        idCadre.append(nvldiv);
        nvldiv.classList.add("ligne");
        nvldiv.setAttribute("id", "y=" + i)
        for (let j = 0; j <= structure_lab[structure_lab.length - 1].posY; j++) {
            let carre = document.createElement('div');
            nvldiv.append(carre);
            carre.classList.add("case");
            carre.setAttribute("id", "x=" + j + "y=" + i)
            let idcarre = carre.getAttribute("id");

            const foundelement = structure_lab.find(el=>findLeBon(el,idcarre));
            console.log(foundelement.walls)
            createWalls(foundelement, carre);

        }
    }
    depart();
    arrivee();
}

function findLeBon(element,idcarre) {
    return (element.posX == idcarre.charAt(2) && element.posY == idcarre.charAt(5))
}

function createWalls(array, element) {
    createTopWall(array,element);
    createRightWall(array,element);
    createBottomWall(array,element);
    createLeftWall(array,element);
}

function createTopWall(array,element){
    if (array.walls[0] === true) {
        element.style = "border-top:green solid ;2px";
}}

function createRightWall(array,element){
    if (array.walls[1] === true) {
        element.style = "border-right:green solid ;2px";
    }}

function createBottomWall(array,element){
    if (array.walls[2] === true) {
        element.style = "border-bottom:green solid ;2px";
    }}

function createLeftWall(array,element){
    if (array.walls[3] === true) {
        element.style = "border-left:green solid ;2px";
    }}

function depart(){
    let caseDepart=document.getElementById("x=0y=0");
    caseDepart.style.backgroundColor="yellow";
}

function arrivee(){
    let caseArrivee=document.getElementById("x="+structure_lab[structure_lab.length - 1].posX+"y="+structure_lab[structure_lab.length - 1].posY);
    caseArrivee.style.backgroundColor="green";
                 }

createLines();
