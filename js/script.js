const cardsContent = ['Geralt de Rivia ⚔', 'Geralt de Rivia ⚔', 'Yennefer de Vengerberg 🔮', 'Yennefer de Vengerberg 🔮', 'Ciri 👸🏼⚔', 'Ciri 👸🏼⚔', 'Triss Merigold 🔥', 'Triss Merigold 🔥', 'Vesemir 🗡', 'Vesemir 🗡', 'Jaskier 🎭', 'Jaskier 🎭', 'Zoltan Chivay 🍻', 'Zoltan Chivay 🍻', 'Emyr Var Emreis 🔆', 'Emyr Var Emreis 🔆', 'Eredin ☠', 'Eredin ☠', 'Francesca Findabair 🧝🏼‍', 'Francesca Findabair 🧝🏼‍', 'Philippa Eilhart 🧙🏻‍', 'Philippa Eilhart 🧙🏻‍', 'Soskia 🐲', 'Soskia 🐲', 'Dijkstra 👁', 'Dijkstra 👁', 'Milva 🏹', 'Milva 🏹', 'Avallach 📚', 'Avallach 📚', 'Regis 🧛‍', 'Regis 🧛‍', 'Vernon Roche 👊🏼', 'Vernon Roche 👊🏼', 'John Natalis 🧠', 'John Natalis 🧠', 'Eithné 🧚‍', 'Eithné 🧚‍', 'Lambert 💬', 'Lambert 💬', 'Eskiel 🤺', 'Eskiel 🤺', 'Sheala de Tancarville 🥀', 'Sheala de Tancarville 🥀', 'Keira Metz 💁🏼‍', 'Keira Metz 💁🏼‍', 'Ves 💘', 'Ves 💘', 'Thaler 🧐', 'Thaler 🧐']; // VARIABLE QUE ENCIERRA EL CONTENIDO DE LAS CARTAS
let cardValor = []; 
let cardId = []; // VARIABLE 'PERSONAL' DE CADA CARTA
let cardInverse = 0; // VARIABLE QUE CONTIENE LA CARTA PAREJA

// FUNCIÓN QUE SE ENCARGA DE MEZCLAR LAS CARTAS (AL AZAR) CADA VEZ QUE SE REFRESCA LA PÁGINA EL USUARIO GANA
Array.prototype.mixCards = function() {
    for (let i = cardsContent.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = this[i];
        this[i] = this[j];
        this [j] = temp;
    }
};

// FUNCIÓN QUE SE ENCARGA DE REINICIAR EL TABLERO DE JUEGO CUANDO EL USUARIO FINALIZA EL JUEGO
function newTable() {
    cardsFlipped = 0;
    let output = '';
    cardsContent.mixCards();
    for (let i = 0; i < cardsContent.length; i++) {
        output += '<div id="carta' +i+ '" onclick="flipCard(this, \'' + cardsContent[i] + '\')"></div>';
    }
    document.getElementById('memoryTable').innerHTML = output;
}
newTable();

// FUNCIÓN QUE SE ENCARGA DE VIRAR LAS CARTAS
function flipCard(carta, val) {
    let e = function flipBack() {
        let carta1 = document.getElementById(cardId[0]);
        let carta2 = document.getElementById(cardId[1]);
        carta1.style.backgroundImage = "url('img/cardreverse.png')";
        carta1.innerHTML = '';
        carta2.style.backgroundImage = "url('img/cardreverse.png')";
        carta2.innerHTML = '';
        cardValor = [];
        cardId = [];
    };

// FUNCIONAMIENTO GENERAL DEL JUEGO (COINCIDENCIAS, DESACIERTOS, REINICIOS DE TABLERO, ETC)
    if (carta.innerHTML === "" && cardValor.length < 2) {
        carta.style.background = "#eadad2";
        carta.innerHTML = val;
        if (cardValor.length === 0) {
            cardValor.push(val);
            cardId.push(carta.id);
        } else if (cardValor.length == 1) {
            cardValor.push(val);
            cardId.push(carta.id);
            
            if (cardValor[0] == cardValor[1]) {
                cardInverse += 2;
                cardValor = [];
                cardId = [];
                if (cardInverse == cardsContent.length) {
                    alert("¡Enhorabuena! Has finalizado el juego");
                    document.getElementById('memoryTable').innerHTML = '';
                    newTable();
                }
            } else {
                e;
                setTimeout(e, 700);
            }
        }
    }
}