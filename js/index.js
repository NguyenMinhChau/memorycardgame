const imagePaths = [
	'../assets/image/01.jpg',
	'../assets/image/02.jpg',
	'../assets/image/03.jpg',
	'../assets/image/04.jpg',
	'../assets/image/05.jpg',
	'../assets/image/06.jpg',
	'../assets/image/07.jpg',
];
let cards = [...imagePaths, ...imagePaths];
let flippedCards = [];
let matchedCards = [];
let flips = 0;

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

function createCard(imagePath, index) {
	const card = document.createElement('div');
	card.classList.add('card');
	card.innerHTML = `
      <div class="card-face front-face" style="position: absolute; z-index: 9999">
          <img src="${imagePath}" alt="Card Image">
      </div>
      <div class="card-face back-face" style="position: relative">
        <div class="index_card" style="position: absolute; top: 50%; left: 50%; z-index: 999; font-weight: bold; font-size: 20px; color: #FFF; transform: translateX(-50%) translateY(-50%);">${
					index + 1
				}</div>
      </div>
      <div class="card-heart-container"></div>
  `;
	card.addEventListener('click', () => flipCard(card));
	return card;
}

function setupGame() {
	const gameContainer = document.getElementById('gameContainer');
	// <div class="wedding-names">🔥❤️ Mai Anh & Minh Tuấn ❤️🔥</div>
	gameContainer.innerHTML = `
      <div class="heart-container" id="heartContainer"></div>
      <div class="wedding-container" id="weddingContainer">
					<div class="scroll_image" style="display: flex; gap: 5px; align-items: center; max-width: 95%; overflow: scroll">
          	<img class="wedding-image" src="../assets/image/06.jpg" alt="IMAGE">
          	<img class="wedding-image" src="../assets/image/07.jpg" alt="IMAGE">
          	<img class="wedding-image" src="../assets/image/08.jpg" alt="IMAGE">
          	<img class="wedding-image" src="../assets/image/09.jpg" alt="IMAGE">
          	<img class="wedding-image" src="../assets/image/10.jpg" alt="IMAGE">
					</div>
          <div style="margin-top: 10px" class="wedding-message">Chúc mừng hạnh phúc hai bạn. Chúc hai bạn bên nhau đầu bạc răng long, sớm có thiên thần nhỏ nhé!</div>
      </div>
  `;
	shuffle(cards).forEach((imagePath, index) => {
		const card = createCard(imagePath, index);
		gameContainer.appendChild(card);
	});
	flips = 0;
	updateScoreBoard();
	document.getElementById('heartContainer').style.display = 'none';
	document.getElementById('weddingContainer').style.display = 'none';
	document.getElementById('resetButton').style.display = 'none';
}

function flipCard(card) {
	if (
		flippedCards.length < 2 &&
		!flippedCards.includes(card) &&
		!card.classList.contains('matched')
	) {
		card.classList.add('flipped');
		flippedCards.push(card);

		if (flippedCards.length === 2) {
			flips++;
			updateScoreBoard();
			checkMatch();
		}
	}
}

function checkMatch() {
	const [card1, card2] = flippedCards;
	const imagePath1 = card1.querySelector('.front-face img').src;
	const imagePath2 = card2.querySelector('.front-face img').src;

	if (imagePath1 === imagePath2) {
		card1.classList.add('matched');
		card2.classList.add('matched');
		matchedCards.push(card1, card2);

		startCardHeartAnimation(card1);
		startCardHeartAnimation(card2);
		setTimeout(() => {
			// card1.style.display = 'none';
			// card2.style.display = 'none';
			card1.style.visibility = 'hidden';
			card2.style.visibility = 'hidden';
		}, 1500);

		flippedCards = [];
		updateScoreBoard();

		if (matchedCards.length === cards.length) {
			setTimeout(() => {
				startHeartAnimation();
				document.getElementById('weddingContainer').style.display = 'flex';
				document.getElementById('resetButton').style.display = 'block';
			}, 1000);
		}
	} else {
		setTimeout(() => {
			card1.classList.remove('flipped');
			card2.classList.remove('flipped');
			flippedCards = [];
		}, 1000);
	}
}

function updateScoreBoard() {
	document.getElementById('matches').textContent = matchedCards.length / 2;
	document.getElementById('flips').textContent = flips;
}

function startCardHeartAnimation(card) {
	const heartContainer = card.querySelector('.card-heart-container');

	function createCardHeart() {
		const heart = document.createElement('div');
		heart.classList.add('card-heart');
		heart.innerHTML = '❤️';
		heart.style.left = `${Math.random() * 100}%`;
		heart.style.fontSize = `${0.8 + Math.random() * 0.7}rem`;
		heart.style.animationDuration = `${1 + Math.random() * 0.5}s`;
		heart.style.animationDelay = `${Math.random() * 0.3}s`;
		heart.style.setProperty('--direction', Math.random() > 0.5 ? 1 : -1);
		heartContainer.appendChild(heart);

		setTimeout(() => {
			heart.remove();
		}, 1500);
	}

	for (let i = 0; i < 5; i++) {
		setTimeout(createCardHeart, i * 100);
	}
}

function startHeartAnimation() {
	const heartContainer = document.getElementById('heartContainer');
	heartContainer.style.display = 'block';

	function createHeart() {
		const heart = document.createElement('div');
		heart.classList.add('heart');
		heart.innerHTML = '❤️';
		heart.style.left = `${Math.random() * 100}%`;
		heart.style.fontSize = `${1 + Math.random() * 1.5}rem`;
		heart.style.animationDuration = `${2 + Math.random() * 2}s`;
		heart.style.animationDelay = `${Math.random() * 0.5}s`;
		heart.style.setProperty('--direction', Math.random() > 0.5 ? 1 : -1);
		heartContainer.appendChild(heart);

		// setTimeout(() => {
		// 	heart.remove();
		// }, 4000);
	}

	for (let i = 0; i < 50; i++) {
		setTimeout(createHeart, i * 100);
	}
}

function resetGame() {
	flippedCards = [];
	matchedCards = [];
	setupGame();
}

setupGame();
