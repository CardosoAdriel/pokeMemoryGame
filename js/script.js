const memory = document.querySelector('.memoria'); /* Coletando a classe da section aonde vai ser inserido os elementos dinamicamente */
const images =[]; /* vetor que irá carregar o nome das imagens */

let cardHTML = ''; /* variável que recebera os elementos html que serão carregados dinamicamente */


/* Esta função carrega o nome das imagens em uma array */
(function chargerImages(){
    let s = 1
    for(let i=0; i<6; i++){
        images[i] = `c${s}.svg`
        s++;
    }
})()


/* Esta função vai varrer a Array aonde esta os nomes das imagens 
e adicionar elementos html dinamicamente com as respectivas imagens */
images.forEach(img => {
    
    cardHTML += `
        <section class="memoria__memory_card" data-card="${img}">
            <img class="memory_card-front" src="img/${img}">
            <img class="memory_card-back"src="img/pokeball.svg">
        </section>
    `
});

memory.innerHTML = cardHTML + cardHTML; /* adicionando os elementos na section dinamicamente */

/** FINALIZADA A RENDEREIZAÇÃO HTML **/

const cards = document.querySelectorAll('.memoria__memory_card');
const acertos = document.querySelector('.titles__acertos');
let firstCard, secondCard;
let lockCards = false;
let ta = 1

function flipCard(){

    if(lockCards) return false;
    this.classList.add('flip');

    if(!firstCard){
        firstCard = this
        return false
    }    
    secondCard = this  

    checkedForMatch();  
}


function checkedForMatch(){
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    
    if(!isMatch) disableCard();

    if(isMatch){
        resetCards(isMatch);
        pontuacao();
    }    
    
}

function pontuacao(){
    acertos.innerText=ta;
    ta++

    if(ta === 7) {
        removeflipCards();
        ta=1;
    }
}

function disableCard(){
    lockCards = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

       resetCards();
    }, 1000)
    
}

(function shuffle(){
    
    cards.forEach(card => {
        let rand = Math.floor(Math.random() * 12);
        card.style.order = rand;
    });

})();

function resetCards(isMatch){
    if(isMatch){
        firstCard.removeEventListener('click',flipCard)
        secondCard.removeEventListener('click',flipCard)
    }
    [firstCard, secondCard, lockCards] = [null, null, false];
}

function removeflipCards(){  

    setTimeout(() => {
        cards.forEach(rem => {
            rem.classList.remove('flip');
        })
        acertos.innerText = '0'
        carregaClick();
        shuffle();
    }, 1000)

    
}

(function carregaClick(){
cards.forEach(card => card.addEventListener('click', flipCard));
})();