// JavaScript Document

const startGameBtn = document.querySelector('.btn-start');
const restartGameBtn = document.querySelectorAll('.btn-restart');
const gameOverlay = document.querySelectorAll('.overlay');
const phraseUl = document.querySelector('#phrase');
const qwerty = document.querySelector('#qwerty');
let letterFound = 1;
let wrongGuess = 0;
const lives = document.querySelectorAll('.tries img');
const phrases = [
	'You will never touch this',
	'Its just a flesh wound',
	'Im in a glass case of emotion',
	'Excuse me i belive you have my stapler',
	'Show me the money',
	'To infinity and beyond',
	'Shaken not stirred',
	'Houston we have a problem'
]

function getRandomArray (array) {
	const arrayNumber = Math.floor(Math.random() * array.length);
	return array[arrayNumber]
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function addStringToDisplay (string) {
	const stringArray = string.split('');
	for (let i = 0; i < stringArray.length; i++) {
		let li = document.createElement('li');
		li.innerHTML = string[i];
		if (isLetter(string[i])) {
			li.className = 'letter';
		} else {
			li.className = 'space';
		}
		phraseUl.appendChild(li);
	}
}

function checkLetter (letter) {
	const letterArray = document.querySelectorAll('.letter')
	let letterTracker = 0;
	for (let i = 0; i < letterArray.length; i++) {
		if (letterArray[i].innerHTML.toLowerCase() === letter) {
			letterArray[i].classList.add('show');
			letterTracker++;
		}
	}
    if (letterTracker <= 0) {
		letterFound = 0;
    } else {
		letterFound = 1;
	}

}

function removeLives (guess) {
	if (guess >= 0) {
		lives[(guess - 1)].src = "images/lostHeart.png"
	}
}

addStringToDisplay(getRandomArray(phrases));

startGameBtn.addEventListener('click', () => {
	gameOverlay[0].style.display = 'none';
});

qwerty.addEventListener('click', (event) => {
	const buttonClicked = event.target;
	const letterClicked = buttonClicked.innerHTML;
	checkLetter(letterClicked)
	if (isLetter(letterClicked)) {
	buttonClicked.setAttribute('disabled', '');
	buttonClicked.style.opacity = '0.5';
	if (letterFound === 0) {
		wrongGuess++;
		removeLives(wrongGuess);
    }
	letterFound = 1;
	checkWinLose();
	}
    
})

function checkWinLose () {
	const letters = document.querySelectorAll('.letter');
	const lettersSelected = document.querySelectorAll('.show')
	if (lettersSelected.length === letters.length) {
		document.querySelector('#win').style.display = 'flex'
	} else if (wrongGuess === 5) {
		document.querySelector('#lose').style.display = 'flex'
	}
}

restartGameBtn[0].addEventListener('click', () => {
	gameOverlay[1].style.display = 'none';
	wrongGuess = 0;
	const disabledButtons = document.querySelectorAll('[disabled]')
	const phraseletters = document.querySelectorAll('.letter, .space')
	for (let i = 0; i < disabledButtons.length; i++) {
		disabledButtons[i].removeAttribute('disabled', '');
		disabledButtons[i].style.opacity = '1';
	}
	for (let i = 0; i < lives.length; i++) {
		lives[i].src = "images/liveHeart.png"
	}
    for (let i = 0; i < phraseletters.length; i++) {
    phraseletters[i].remove();
	} 
	addStringToDisplay(getRandomArray(phrases));
})

restartGameBtn[1].addEventListener('click', () => {
	gameOverlay[2].style.display = 'none';
	wrongGuess = 0;
	const disabledButtons = document.querySelectorAll('[disabled]')
	const phraseletters = document.querySelectorAll('.letter, .space')
	for (let i = 0; i < disabledButtons.length; i++) {
		disabledButtons[i].removeAttribute('disabled', '');
		disabledButtons[i].style.opacity = '1';
	}
	for (let i = 0; i < lives.length; i++) {
		lives[i].src = "images/liveHeart.png"
	}
    for (let i = 0; i < phraseletters.length; i++) {
    phraseletters[i].remove();
	} 
	addStringToDisplay(getRandomArray(phrases));
})