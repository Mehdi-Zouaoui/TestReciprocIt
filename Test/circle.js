const data = [{
    name: "fournisseur informatique",
    label: "P1",
    category: "Prestataires",
    penetration: 2.1,
    exposition: 6,
    reliability: 5
},
{
    name: "Pharmacie",
    label: "C1",
    category: "Clients",
    penetration: 4,
    exposition: 3,
    reliability: 3
}];

let width = window.innerWidth;
let height = window.innerHeight;


//Création du Canvas pour dessiner les cercles
let paper = Raphael("container", width, height);
console.log(window.innerWidth);

// Responsive
window.onresize = function(event){

    width = window.innerWidth
    height = window.innerHeight
    //Suppression du canas quand l'écran change de taille
    paper.canvas.parentNode.removeChild(paper.canvas);
    //Crétion du canvas avec les nouvelles dimenssions
    paper = Raphael("container", width, height);
    //Génération du Radar après resizing 
    generateRadar(6)
    data.forEach(item => {
        generateClient(item.exposition, item.penetration, item.reliability)
    });   
}

// Création de l'attribut penetration pour chaque cercle du radar
paper.customAttributes.penetration = function (num) {
    return num;
}

//Fonction qui génère le cercle pour un client par defaut
function generateClient(exposition, penetration, reliability) {

    let color = "";

    //Changement de couleur selon la fiabilité du client
    switch (true) {
        case (reliability < 4):
            color = "#FF0000";
            break;
        case (reliability >= 4 && reliability <= 5):
            color = "#d97e8f";
            break;
        case (reliability >= 6 && reliability <= 7):
            color = "#b1d4e9";
            break;
        case (reliability > 7):
            color = "#808080"
            break
    }

    //Génération du cercle sur le radar
    const client = paper.circle(width / 2, height / 2 + penetration * 50, exposition*2).attr({
        fill: color,
        stroke: color,
        "stroke-width": 10
    });
}

//Fonction qui créer le radar 
function generateRadar(circleNumber) {

    const danger = paper.circle(width / 2, height / 2, 160).attr({
        stroke: "#E3394A",
        "stroke-width": 10
    });
    const medium = paper.circle(width/ 2, height / 2, 250).attr({
    
        stroke: "#F6E742",
        "stroke-width": 10
    });
    const low = paper.circle(width / 2, height / 2, 280).attr({
        stroke: "#00A7A2",
        "stroke-width": 10
    });

    for (let i = 0; i < circleNumber + 1; i++) {

        const dot = paper.circle(width / 2, height / 2, 50 * i).attr({
            penetration: i,
            "stroke-width": 1
        });
    }
}

// Création du Radar
generateRadar(6)
// Pour chaque données des clients , on génère le cercle associé 
data.forEach(item => {
    generateClient(item.exposition, item.penetration, item.reliability)
});

