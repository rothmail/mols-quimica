(() => {
    const pairs = [
        { id: 1, type: 'q', text: "Quantos átomos de oxigênio existem em 2 mols de H2SO4?" },
        { id: 1, type: 'a', text: "8 átomos" },
        { id: 2, type: 'q', text: "Qual a massa de 1 mol de gás ozônio (O3)?" },
        { id: 2, type: 'a', text: "48 g/mol" },
        { id: 3, type: 'q', text: "Qual a massa molar da sacarose (C12H22O11)?" },
        { id: 3, type: 'a', text: "342 g/mol" },
        { id: 4, type: 'q', text: "Qual a massa de 1 mol de Fe2O3?" },
        { id: 4, type: 'a', text: "160 g/mol" },
        { id: 5, type: 'q', text: "Quantos mols há em 120g de Ca?" },
        { id: 5, type: 'a', text: "3 mol" },
        { id: 6, type: 'q', text: "Qual a massa molar do gás butano (C4H10)?" },
        { id: 6, type: 'a', text: "58 g/mol" },
        { id: 7, type: 'q', text: "Quantas moléculas existem em 2 mols de NH3?" },
        { id: 7, type: 'a', text: "1.204 x 10^24" },
        { id: 8, type: 'q', text: "Qual a massa de 3 mols de NaCl?" },
        { id: 8, type: 'a', text: "177 g" },
        { id: 9, type: 'q', text: "Qual o número de moléculas em 0,5 mol de H2O?" },
        { id: 9, type: 'a', text: "3.01 x 10^23" },
        { id: 10, type: 'q', text: "Qual a massa de 2 mols de água (H2O)?" },
        { id: 10, type: 'a', text: "36 g" },
        { id: 11, type: 'q', text: "Quantos íons há em 3 mols de NaCl completamente dissociado?" },
        { id: 11, type: 'a', text: "6 mols de íons" },
        { id: 12, type: 'q', text: "Qual o número de moléculas presentes em 0,75 mol de C2H6?" },
        { id: 12, type: 'a', text: "4.51 x 10^23" },
    ];

    const board = document.getElementById('board');
    const resultMessage = document.getElementById('result-message');
    const restartBtn = document.getElementById('restart-btn');
    let flippedCards = [];
    let matchedCount = 0;
    let lockBoard = false;
    let attempts = 0;

    function shuffle(array) {
        for (let pass = 0; pass < 3; pass++) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        return array;
    }

    function createBoard() {
        board.innerHTML = '';
        matchedCount = 0;
        attempts = 0;
        updateGameInfo();
        resultMessage.style.display = 'none';
        restartBtn.style.display = 'none';

        const cards = shuffle([...pairs]);

        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.id = card.id;
            cardElement.dataset.type = card.type;

            const frontFace = document.createElement('div');
            frontFace.classList.add('front');
            frontFace.textContent = '❓';

            const backFace = document.createElement('div');
            backFace.classList.add('back');
            backFace.textContent = card.text;

            cardElement.appendChild(frontFace);
            cardElement.appendChild(backFace);

            cardElement.addEventListener('click', onCardClick);

            board.appendChild(cardElement);
        });
    }

    function updateGameInfo() {
        const gameInfo = document.getElementById('game-info');
        gameInfo.textContent = `Pares encontrados: ${matchedCount / 2} / 12  —  Tentativas: ${attempts}`;
    }

    function onCardClick(e) {
        if (lockBoard) return;
        const clicked = e.currentTarget;

        if (clicked.classList.contains('flip') || clicked.classList.contains('matched')) return;

        clicked.classList.add('flip');
        flippedCards.push(clicked);

        if (flippedCards.length === 2) {
            lockBoard = true;
            attempts++;
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;

        const isMatch =
            card1.dataset.id === card2.dataset.id &&
            card1.dataset.type !== card2.dataset.type;

        if (isMatch) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCount += 2;
            resetTurn();
            updateGameInfo();
            if (matchedCount === pairs.length) {
                gameOver();
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flip');
                card2.classList.remove('flip');
                resetTurn();
                updateGameInfo();
            }, 1200);
        }
    }

    function resetTurn() {
        flippedCards = [];
        lockBoard = false;
    }

    function gameOver() {
        resultMessage.style.display = 'block';
        resultMessage.textContent = `Parabéns! Você terminou o jogo em ${attempts} tentativas. 🎉`;
        restartBtn.style.display = 'inline-block';
    }

    restartBtn.addEventListener('click', () => {
        createBoard();
    });

    createBoard();
})();