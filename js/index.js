const cards = document.querySelectorAll('.memory-card');

let score = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.toggle('flip');

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;

    checkForMatch();

    if(score == 6){
        setTimeout(() => {
            Swal.fire({
                title: '<strong>Hai vinto!</strong>',  
                imageUrl: 'img/icon.png',
                imageWidth: 150,
                imageHeight: 150,
                imageAlt: 'Custom image',
                html:
                  'Puoi scegliere se tornare al sito o rigiocare!',
                showCloseButton: false,
                showCancelButton: true,
                focusConfirm: true,
                confirmButtonText:
                  '<i class="fa fa-house"></i> Torniamo al sito!',
                confirmButtonAriaLabel: 'House, torno!',
                confirmButtonColor: '#ff6666',
                cancelButtonText:
                  '<i class="fa fa-arrows-rotate"></i> Rigioco!',
                cancelButtonAriaLabel: 'Refresh',
                cancelButtonColor: '#33ccff'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'https://www.fearines.com';
                } else {
                    location.reload();
                }
              })

        }, 500);
    }
}

function checkForMatch(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    score = score + 1;

    resetBoard();
}

function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 500);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}

(function shuffle(){
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
