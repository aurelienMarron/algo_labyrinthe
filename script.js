let taille = "7";
let ex = "ex-1";
let structure_lab = labyrinthe[taille][ex];


function createLines() {
    let idCadre = document.getElementById('cadre')
    for (let i = 0; i <= structure_lab[structure_lab.length - 1].posY; i++) {
        let nvldiv = document.createElement('div');
        idCadre.append(nvldiv);
        nvldiv.classList.add("ligne");
        nvldiv.setAttribute("id", i)
        for (let j = 0; j <= structure_lab[structure_lab.length - 1].posY; j++) {
            let carre = document.createElement('div');
            nvldiv.append(carre);
            carre.classList.add("case");
            carre.setAttribute("id", i + "-" + j)
            let idcarre = carre.getAttribute("id");
            let separation = idcarre.indexOf('-');
            let foundelement = structure_lab.find(el => el.posX == idcarre.substring(separation + 1, idcarre.length) && el.posY == idcarre.substring(0, separation))
            createWalls(foundelement, carre);
        }
    }
    depart();
    arrivee();
}

function createWalls(array, element) {
    createTopWall(array, element);
    createRightWall(array, element);
    createBottomWall(array, element);
    createLeftWall(array, element);
}

function createTopWall(array, element) {
    if (array.walls[0]) {
        element.style.borderTop = "red solid ";
        // element.setAttribute("style",{border-top:green solid ;2px})
    }
}

function createRightWall(array, element) {
    if (array.walls[1] === true) {
        element.style.borderRight = "red solid ";
        // element.setAttribute("style","border-right:green solid ;2px")
    }
}

function createBottomWall(array, element) {
    if (array.walls[2] === true) {
        element.style.borderBottom = "red solid ";
        // element.setAttribute("style","border-bottom:green solid ;2px")
    }
}

function createLeftWall(array, element) {
    if (array.walls[3] === true) {
        element.style.borderLeft = "red solid ";
        // element.setAttribute("style","border-left:green solid ;2px")
    }
}

function depart() {
    let caseDepart = document.getElementById("0-0");
    caseDepart.style.backgroundColor = "orange";
}

function arrivee() {
    let caseArrivee = document.getElementById(structure_lab[structure_lab.length - 1].posX + "-" + structure_lab[structure_lab.length - 1].posY);
    caseArrivee.style.backgroundColor = "green";
}

createLines();


async function resolution() {
    let positionFinal = {
        "posX": structure_lab[structure_lab.length - 1].posX,
        "posY": structure_lab[structure_lab.length - 1].posY
    }
    let position = {"posX": 0, "posY": 0};
    structure_lab.find(element => element.posY === position.posY && element.posX === position.posX).visited = "true"
    let ligneStructure = structure_lab.find(element => element = position);
    position = await avancee(position, ligneStructure);
    console.log(position)
    structure_lab.find(element => element.posY === position.posY && element.posX === position.posX).visited = "true"
    ligneStructure = structure_lab.find(element => element.posY === position.posY && element.posX === position.posX);
    while (!(position.posX === positionFinal.posX && position.posY === positionFinal.posY)) {
        let nbMur = compteMur(ligneStructure);
        if (nbMur === 1) {
            if (ligneStructure.intersection === undefined) {
                structure_lab.find(element => element.posY === position.posY && element.posX === position.posX).intersection = "true"
            }
        }
        if (nbMur === 3) {
            let idCase = position.posY + "-" + position.posX;
            document.getElementById(idCase).style.backgroundColor = "#5499C7";
            let arrayInter = structure_lab.filter(element => element.intersection === "true");
            position.posX = arrayInter[0].posX;
            position.posY = arrayInter[0].posY;
            ligneStructure = structure_lab.find(element => element.posY === position.posY && element.posX === position.posX);
            ligneStructure.intersection = "false"
            idCase = position.posY + "-" + position.posX;
            document.getElementById(idCase).style.backgroundColor = "#D35400";
            console.log(position)
        } else {
            position = await avancee(position, ligneStructure);
            structure_lab.find(element => element.posY === position.posY && element.posX === position.posX).visited = "true"
            ligneStructure = structure_lab.find(element => element.posY === position.posY && element.posX === position.posX);
            console.log(position)
        }
    }
    let idCase = position.posY + "-" + position.posX;
    document.getElementById(idCase).style.backgroundColor = "gold";
    console.log(position)
}

async function avancee(position, ligneStructure) {
    if (ligneStructure.walls[0] === false && structure_lab.find(element => element.posY === position.posY - 1 && element.posX === position.posX).visited === undefined) {
        position.posY--
    } else if (ligneStructure.walls[3] === false && structure_lab.find(element => element.posY === position.posY && element.posX === position.posX - 1).visited === undefined) {
        position.posX--
    } else if (ligneStructure.walls[2] === false && structure_lab.find(element => element.posY === position.posY + 1 && element.posX === position.posX).visited === undefined) {
        position.posY++
    } else if (ligneStructure.walls[1] === false && structure_lab.find(element => element.posY === position.posY && element.posX === position.posX + 1).visited === undefined) {
        position.posX++
    }
    await delay(200);
    displayPion(position);
    return position
}

function compteMur(ligneStructure) {
    return ligneStructure.walls.filter(murs => murs === true).length
}

function displayPion(position) {
    let idCase = position.posY + "-" + position.posX;
    document.getElementById(idCase).setAttribute("class", "pion");
}

async function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}


async function dfs() {
    let positionFinal = {
        "posX": structure_lab[structure_lab.length - 1].posX,
        "posY": structure_lab[structure_lab.length - 1].posY
    };
    let position = {"posX": 0, "posY": 0};
    let ligneStructure = structure_lab.find(element => element = position);
    let stack = [];
    let trajet = [];
    stack.push(position);
    while (stack.length !== 0) {
        position = stack.pop();
        ligneStructure = structure_lab.find(element => element.posY === position.posY && element.posX === position.posX);
        structure_lab.find(element => element.posY === position.posY && element.posX === position.posX).visited = "true";
        trajet.push(position)
        console.log(position)
        if (position.posX === positionFinal.posX && position.posY === positionFinal.posY) {
            for (let i = 0; i < trajet.length; i++) {
                ligneStructure = structure_lab.find(element => element.posY === trajet[i].posY && element.posX === trajet[i].posX);
                if (ligneStructure.walls.filter(murs => murs === true).length === 3) {
                    document.getElementById(trajet[i].posY + "-" + trajet[i].posX).style.backgroundColor = "purple";
                } else {
                    let idCase = trajet[i].posY + "-" + trajet[i].posX;
                    await delay(200)
                    document.getElementById(idCase).setAttribute("class", "pion");
                }
            }
            document.getElementById(structure_lab[structure_lab.length - 1].posY + "-" + structure_lab[structure_lab.length - 1].posX).style.backgroundColor = "gold";
        } else {
            if (ligneStructure.walls[0] === false && structure_lab.find(element => element.posY === position.posY - 1 && element.posX === position.posX).visited === undefined) {
                let voisin = {"posX": position.posX, "posY": position.posY - 1}
                stack.push(voisin)
            }
            if (ligneStructure.walls[1] === false && structure_lab.find(element => element.posY === position.posY && element.posX === position.posX + 1).visited === undefined) {
                let voisin = {"posX": position.posX + 1, "posY": position.posY}
                stack.push(voisin)
            }
            if (ligneStructure.walls[2] === false && structure_lab.find(element => element.posY === position.posY + 1 && element.posX === position.posX).visited === undefined) {
                let voisin = {"posX": position.posX, "posY": position.posY + 1}
                stack.push(voisin)
            }
            if (ligneStructure.walls[3] === false && structure_lab.find(element => element.posY === position.posY && element.posX === position.posX - 1).visited === undefined) {
                let voisin = {"posX": position.posX - 1, "posY": position.posY}
                stack.push(voisin)
            }
        }
    }
}


let positionFinal = {
    "posX": structure_lab[structure_lab.length - 1].posX,
    "posY": structure_lab[structure_lab.length - 1].posY
};
let position = {"posX": 0, "posY": 0};
let stack = [];
let trajet = [];
stack.push(position);
trajet.push(position)

async function dfsrecursive() {
    if (stack.length !== 0) {
        position = stack.pop();
        let ligneStructure = structure_lab.find(element => element.posY === position.posY && element.posX === position.posX);
        structure_lab.find(element => element.posY === position.posY && element.posX === position.posX).visited = "true";
        trajet.push(position)
        console.log(position)
        if (position.posX === positionFinal.posX && position.posY === positionFinal.posY) {
            for (let i = 0; i < trajet.length; i++) {
                ligneStructure = structure_lab.find(element => element.posY === trajet[i].posY && element.posX === trajet[i].posX);
                if (ligneStructure.walls.filter(murs => murs === true).length === 3) {
                    document.getElementById(trajet[i].posY + "-" + trajet[i].posX).style.backgroundColor = "purple";
                } else {
                    let idCase = trajet[i].posY + "-" + trajet[i].posX;
                    await delay(200)
                    document.getElementById(idCase).setAttribute("class", "pion");
                }
            }
            document.getElementById(structure_lab[structure_lab.length - 1].posY + "-" + structure_lab[structure_lab.length - 1].posX).style.backgroundColor = "gold";
        } else {
            if (ligneStructure.walls[0] === false && structure_lab.find(element => element.posY === position.posY - 1 && element.posX === position.posX).visited === undefined) {
                let voisin = {"posX": position.posX, "posY": position.posY - 1}
                stack.push(voisin)
            }
            if (ligneStructure.walls[1] === false && structure_lab.find(element => element.posY === position.posY && element.posX === position.posX + 1).visited === undefined) {
                let voisin = {"posX": position.posX + 1, "posY": position.posY}
                stack.push(voisin)
            }
            if (ligneStructure.walls[2] === false && structure_lab.find(element => element.posY === position.posY + 1 && element.posX === position.posX).visited === undefined) {
                let voisin = {"posX": position.posX, "posY": position.posY + 1}
                stack.push(voisin)
            }
            if (ligneStructure.walls[3] === false && structure_lab.find(element => element.posY === position.posY && element.posX === position.posX - 1).visited === undefined) {
                let voisin = {"posX": position.posX - 1, "posY": position.posY}
                stack.push(voisin)
            }
        }
        await dfsrecursive(stack, trajet)
    }
}

async function bfs() {
    let positionFinal = {
        "posX": structure_lab[structure_lab.length - 1].posX,
        "posY": structure_lab[structure_lab.length - 1].posY
    };
    let position = {"posX": 0, "posY": 0};
    let ligneStructure = structure_lab.find(element => element = position);
    let queue = [];
    let trajet = [];
    queue.unshift(position);
    while (queue.length !== 0) {
        position = queue.shift();
        ligneStructure = structure_lab.find(element => element.posY === position.posY && element.posX === position.posX);
        structure_lab.find(element => element.posY === position.posY && element.posX === position.posX).visited = "true";
        trajet.push(position)
        console.log(position)
        if (position.posX === positionFinal.posX && position.posY === positionFinal.posY) {
            for (let i = 0; i < trajet.length; i++) {
                ligneStructure = structure_lab.find(element => element.posY === trajet[i].posY && element.posX === trajet[i].posX);
                if (ligneStructure.walls.filter(murs => murs === true).length === 3) {
                    document.getElementById(trajet[i].posY + "-" + trajet[i].posX).style.backgroundColor = "purple";
                } else {
                    let idCase = trajet[i].posY + "-" + trajet[i].posX;
                    await delay(500)
                    document.getElementById(idCase).setAttribute("class", "pion");
                }
            }
            document.getElementById(structure_lab[structure_lab.length - 1].posY + "" + structure_lab[structure_lab.length - 1].posX).style.backgroundColor = "gold";
        } else {
            if (ligneStructure.walls[0] === false && structure_lab.find(element => element.posY === position.posY - 1 && element.posX === position.posX).visited === undefined) {
                let voisin = {"posX": position.posX, "posY": position.posY - 1}
                queue.push(voisin)
            }
            if (ligneStructure.walls[1] === false && structure_lab.find(element => element.posY === position.posY && element.posX === position.posX + 1).visited === undefined) {
                let voisin = {"posX": position.posX + 1, "posY": position.posY}
                queue.push(voisin)
            }
            if (ligneStructure.walls[2] === false && structure_lab.find(element => element.posY === position.posY + 1 && element.posX === position.posX).visited === undefined) {
                let voisin = {"posX": position.posX, "posY": position.posY + 1}
                queue.push(voisin)
            }
            if (ligneStructure.walls[3] === false && structure_lab.find(element => element.posY === position.posY && element.posX === position.posX - 1).visited === undefined) {
                let voisin = {"posX": position.posX - 1, "posY": position.posY}
                queue.push(voisin)
            }
        }
    }
}

let queue = [];
queue.unshift(position);

async function bfsrecursive() {
    if (queue.length !== 0) {
        let position = queue.shift();
        let ligneStructure = structure_lab.find(element => element.posY === position.posY && element.posX === position.posX);
        structure_lab.find(element => element.posY === position.posY && element.posX === position.posX).visited = "true";
        trajet.push(position)
        console.log(position)
        if (position.posX === positionFinal.posX && position.posY === positionFinal.posY) {
            for (let i = 0; i < trajet.length; i++) {
                ligneStructure = structure_lab.find(element => element.posY === trajet[i].posY && element.posX === trajet[i].posX);
                if (ligneStructure.walls.filter(murs => murs === true).length === 3) {
                    document.getElementById(trajet[i].posY + "-" + trajet[i].posX).style.backgroundColor = "purple";
                } else {
                    let idCase = trajet[i].posY + "-" + trajet[i].posX;
                    await delay(50)
                    document.getElementById(idCase).setAttribute("class", "pion");
                }
            }
            document.getElementById(structure_lab[structure_lab.length - 1].posY + "-" + structure_lab[structure_lab.length - 1].posX).style.backgroundColor = "gold";
            while (position.parent !== undefined) {
                position = position.parent
                console.log(position)
                let idCase = position.posY + "-" + position.posX
                document.getElementById(idCase).style.backgroundColor = "#134464";
            }
        } else {
            if (ligneStructure.walls[0] === false && structure_lab.find(element => element.posY === position.posY - 1 && element.posX === position.posX).visited === undefined) {
                let voisin = {"posX": position.posX, "posY": position.posY - 1}
                voisin.parent = position
                queue.push(voisin)

            }
            if (ligneStructure.walls[1] === false && structure_lab.find(element => element.posY === position.posY && element.posX === position.posX + 1).visited === undefined) {
                let voisin = {"posX": position.posX + 1, "posY": position.posY}
                voisin.parent = position
                queue.push(voisin)
            }
            if (ligneStructure.walls[2] === false && structure_lab.find(element => element.posY === position.posY + 1 && element.posX === position.posX).visited === undefined) {
                let voisin = {"posX": position.posX, "posY": position.posY + 1}
                voisin.parent = position
                queue.push(voisin)
            }
            if (ligneStructure.walls[3] === false && structure_lab.find(element => element.posY === position.posY && element.posX === position.posX - 1).visited === undefined) {
                let voisin = {"posX": position.posX - 1, "posY": position.posY}
                voisin.parent = position
                queue.push(voisin)
            }
        }
        await bfsrecursive(queue, trajet)
    }
}