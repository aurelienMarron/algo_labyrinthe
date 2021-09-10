let structure_lab =
    [{"posX": 0, "posY": 0, "walls": [true, true, false, true]},
        {"posX": 1, "posY": 0, "walls": [true, false, true, true]},
        {"posX": 2, "posY": 0, "walls": [true, false, false, false]},
        {"posX": 3, "posY": 0, "walls": [true, true, true, false]},
        {"posX": 4, "posY": 0, "walls": [true, false, false, true]},
        {"posX": 5, "posY": 0, "walls": [true, true, false, false]},
        {"posX": 0, "posY": 1, "walls": [false, false, true, true]},
        {"posX": 1, "posY": 1, "walls": [true, true, false, false]},
        {"posX": 2, "posY": 1, "walls": [false, false, true, true]},
        {"posX": 3, "posY": 1, "walls": [true, false, true, false]},
        {"posX": 4, "posY": 1, "walls": [false, true, true, false]},
        {"posX": 5, "posY": 1, "walls": [false, true, false, true]},
        {"posX": 0, "posY": 2, "walls": [true, true, false, true]},
        {"posX": 1, "posY": 2, "walls": [false, true, false, true]},
        {"posX": 2, "posY": 2, "walls": [true, false, false, true]},
        {"posX": 3, "posY": 2, "walls": [true, true, false, false]},
        {"posX": 4, "posY": 2, "walls": [true, false, false, true]},
        {"posX": 5, "posY": 2, "walls": [false, true, true, false]},
        {"posX": 0, "posY": 3, "walls": [false, true, false, true]},
        {"posX": 1, "posY": 3, "walls": [false, true, false, true]},
        {"posX": 2, "posY": 3, "walls": [false, true, false, true]},
        {"posX": 3, "posY": 3, "walls": [false, true, false, true]},
        {"posX": 4, "posY": 3, "walls": [false, false, true, true]},
        {"posX": 5, "posY": 3, "walls": [true, true, false, false]},
        {"posX": 0, "posY": 4, "walls": [false, true, false, true]},
        {"posX": 1, "posY": 4, "walls": [false, false, true, true]},
        {"posX": 2, "posY": 4, "walls": [false, true, true, false]},
        {"posX": 3, "posY": 4, "walls": [false, false, true, true]},
        {"posX": 4, "posY": 4, "walls": [true, true, false, false]},
        {"posX": 5, "posY": 4, "walls": [false, true, false, true]},
        {"posX": 0, "posY": 5, "walls": [false, false, true, true]},
        {"posX": 1, "posY": 5, "walls": [true, false, true, false]},
        {"posX": 2, "posY": 5, "walls": [true, false, true, false]},
        {"posX": 3, "posY": 5, "walls": [true, false, true, false]},
        {"posX": 4, "posY": 5, "walls": [false, false, true, false]},
        {"posX": 5, "posY": 5, "walls": [false, true, true, false]}]

function createLines() {
    let idCadre = document.getElementById('cadre')
    for (let i = 0; i <= structure_lab[structure_lab.length - 1].posY; i++) {
        let nvldiv = document.createElement('div');

        idCadre.append(nvldiv);
        nvldiv.classList.add("ligne");
        nvldiv.setAttribute("id",  i)
        for (let j = 0; j <= structure_lab[structure_lab.length - 1].posY; j++) {
            let carre = document.createElement('div');
            nvldiv.append(carre);
            carre.classList.add("case");
            carre.setAttribute("id", i +""+j)
            let idcarre = carre.getAttribute("id");
            const foundelement = structure_lab.find(el => findLeBon(el, idcarre));
            createWalls(foundelement, carre);
        }
    }
    depart();
    arrivee();
}

function findLeBon(element, idcarre) {
    return (element.posX == idcarre.charAt(1) && element.posY == idcarre.charAt(0))
}

function createWalls(array, element) {
    createTopWall(array, element);
    createRightWall(array, element);
    createBottomWall(array, element);
    createLeftWall(array, element);
}

function createTopWall(array, element) {
    if (array.walls[0] === true) {
        element.style.borderTop = "blue solid ";
        // element.setAttribute("style",{border-top:green solid ;2px})
    }
}

function createRightWall(array, element) {
    if (array.walls[1] === true) {
        element.style.borderRight = "blue solid ";
        // element.setAttribute("style","border-right:green solid ;2px")
    }
}

function createBottomWall(array, element) {
    if (array.walls[2] === true) {
        element.style.borderBottom = "blue solid ";
        // element.setAttribute("style","border-bottom:green solid ;2px")
    }
}

function createLeftWall(array, element) {
    if (array.walls[3] === true) {
        element.style.borderLeft = "blue solid ";
        // element.setAttribute("style","border-left:green solid ;2px")
    }
}

function depart() {
    let caseDepart = document.getElementById("00");
    caseDepart.style.backgroundColor = "orange";
}

function arrivee() {
    let caseArrivee = document.getElementById(structure_lab[structure_lab.length - 1].posX + "" + structure_lab[structure_lab.length - 1].posY);
    caseArrivee.style.backgroundColor = "green";
}

// function getInfoCase(caseCourante){
//     stylesDansTab(caseCourante);
//     stockID(caseCourante);
// }
//
// function stylesDansTab(caseCourante) {
//     let styleCase = caseCourante.style;
//     return tableauStyles = Object.values(styleCase);
// }
//
// function stockID(caseCourante){
//     let idCaseString=caseCourante.getAttribute("id");
//     return idCase=parseFloat(idCaseString);
// }
//
// function avancee(caseActuelle){
//     getInfoCase(caseActuelle)
//     console.log(tableauStyles)
//     if (tableauStyles.includes(element => element = 'border-bottom-style') === false) {
//         let futurId=idCase+10;
//         caseActuelle = document.getElementById(futurId);
//         caseActuelle.innerHTML = '<div id="pion"></div>';
//     }else if(tableauStyles.includes(element => element = 'border-left-style') === false){
//         let futurId=idCase-1;
//         caseActuelle = document.getElementById(futurId);
//         caseActuelle.innerHTML = '<div id="pion"></div>';
//     }else if(tableauStyles.includes(element => element = 'border-top-style') === false){
//         let futurId=idCase-10;
//         caseActuelle = document.getElementById(futurId);
//         caseActuelle.innerHTML = '<div id="pion"></div>';
//     }else if(tableauStyles.includes(element => element = 'border-right-style') === false){
//         let futurId=idCase+1;
//         caseActuelle = document.getElementById(futurId);
//         caseActuelle.innerHTML = '<div id="pion"></div>';
//     }else{
//     }
//     return caseActuelle
// }
//
// function resolution() {
//     let caseActuelle = document.getElementById("00")
//     caseActuelle.innerHTML = '<div id="pion"></div>';
//    caseActuelle=avancee(caseActuelle);
//    console.log(caseActuelle.getAttribute("id"))
//     caseActuelle=avancee(caseActuelle);
//     console.log(caseActuelle.getAttribute("id"))
//     caseActuelle=avancee(caseActuelle);
//     console.log(caseActuelle.getAttribute("id"))
// }

createLines();
console.log(structure_lab)
console.log(structure_lab[0])

function resolution(){
    let positionFinal={"posX":structure_lab[structure_lab.length - 1].posX ,"posY":structure_lab[structure_lab.length - 1].posY  }
    let position={"posX":0 , "posY":0}
    let ligneStructure=structure_lab.find(element=>element=position);
    // console.log(ligneStructure)
    // position=avancee(position, ligneStructure)
    // console.log(position)
    //  ligneStructure=structure_lab.find(element=>element.posY===position.posY && element.posX===position.posX);
    // console.log(ligneStructure)
    // position=avancee(position, ligneStructure)
    // ligneStructure=structure_lab.find(element=>element=position);
    while(position!==positionFinal) {
        position=avancee(position, ligneStructure);
        ligneStructure=structure_lab.find(element=>element.posY===position.posY && element.posX===position.posX);
    }
}

function avancee(position,ligneStructure){
    let grain2riz;
    nbMur=compteMur(ligneStructure);
    csORinter(nbMur,position,grain2riz);
    if(ligneStructure.walls[0]===false){
        position.posY--
    }else if(ligneStructure.walls[1]===false){
        position.posX++
    }else if(ligneStructure.walls[2]===false){
        position.posY++
    }else if(ligneStructure.walls[3]===false){
        position.posX--
    }
    console.log(position)
    return position
}

function compteMur(ligneStructure){
     return nbMur=ligneStructure.walls.filter(murs=>murs===true).length
}

function csORinter(nbMur,position,grain2riz){
    if(nbMur<=1){
        return grain2riz=position;
    }
    else if(nbMur===3){
         return position=grain2riz;
    }
}