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
	'Houston we have a problem',
	'Just keep swimming',
	'Toto, Ive got a feeling were not in Kansas anymore',
	'May the Force be with you',
	'im king of the world'
]

function addPhraseToDisplay () {
	const getRandomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    const stringArray = getRandomPhrase.split('');
      for (let i = 0; i < stringArray.length; i++) {
          let li = document.createElement('li');
          li.innerHTML = stringArray[i];
          if (isLetter(stringArray[i])) {
              li.className = 'letter';
          } else {
              li.className = 'space';
          }
          phraseUl.appendChild(li);
      }
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function game () {
	const buttonClicked = event.target;
	const letterClicked = buttonClicked.innerHTML;
	const gameFunctions = {
		checkLetter: () => {
			const letterArray = document.querySelectorAll('.letter')
			let letterTracker = 0;
			for (let i = 0; i < letterArray.length; i++) {
				if (letterArray[i].innerHTML.toLowerCase() === letterClicked) {
					letterArray[i].classList.add('show');
					letterTracker++;
				}
			}
    		if (letterTracker <= 0) {
				letterFound = 0;
    		} else {
				letterFound = 1;
			}
		},
		
		CheckWinLose: () => {
			const letters = document.querySelectorAll('.letter');
			const lettersSelected = document.querySelectorAll('.show')
			if (lettersSelected.length === letters.length) {
				document.querySelector('#win').classList.remove("hide-overlay");
				document.querySelector('#win').classList.add("show-overlay");
			} else if (wrongGuess === 5) {
				document.querySelector('#lose').classList.remove("hide-overlay");
				document.querySelector('#lose').classList.add("show-overlay");
			}
		},
		
		disableButton: () => {
			if (isLetter(letterClicked)) {
				buttonClicked.setAttribute('disabled', '');
				buttonClicked.style.opacity = '0.5';
				buttonClicked.style.transform = 'rotate(5deg)';
			}
		},
		
		removeLives: () => {
			if (letterFound === 0) {
				wrongGuess++;
				function removeLives (guess) {
				if (guess >= 0) {
				lives[(guess - 1)].src = "images/lostHeart.png"
			}
			letterFound = 1;
		}
	}		
}



//function checkLetter (letter) {
//	const letterArray = document.querySelectorAll('.letter')
//	let letterTracker = 0;
//	for (let i = 0; i < letterArray.length; i++) {
//		if (letterArray[i].innerHTML.toLowerCase() === letter) {
//			letterArray[i].classList.add('show');
//			letterTracker++;
//		}
//	}
//    if (letterTracker <= 0) {
//		letterFound = 0;
//    } else {
//		letterFound = 1;
//	}
//
//}
//
//function removeLives (guess) {
//	if (guess >= 0) {
//		lives[(guess - 1)].src = "images/lostHeart.png"
//	}
//}
//
//
//qwerty.addEventListener('click', (event) => {
//	const buttonClicked = event.target;
//	const letterClicked = buttonClicked.innerHTML;
//	checkLetter(letterClicked)
//	if (isLetter(letterClicked)) {
//	buttonClicked.setAttribute('disabled', '');
//	buttonClicked.style.opacity = '0.5';
//	buttonClicked.style.transform = 'rotate(5deg)';
//	if (letterFound === 0) {
//		wrongGuess++;
//		removeLives(wrongGuess);
//    }
//	letterFound = 1;
//	checkWinLose();
//	}
//    
//})
//
//function checkWinLose () {
//	const letters = document.querySelectorAll('.letter');
//	const lettersSelected = document.querySelectorAll('.show')
//	if (lettersSelected.length === letters.length) {
//		document.querySelector('#win').classList.remove("hide-overlay");
//		document.querySelector('#win').classList.add("show-overlay");
//	} else if (wrongGuess === 5) {
//		document.querySelector('#lose').classList.remove("hide-overlay");
//		document.querySelector('#lose').classList.add("show-overlay");
//	}
//}

function restartGame (overlay) {
	document.querySelector(overlay).classList.remove("show-overlay");
	document.querySelector(overlay).classList.add("hide-overlay");
	wrongGuess = 0;
	const disabledButtons = document.querySelectorAll('[disabled]')
	const phraseletters = document.querySelectorAll('.letter, .space')
	for (let i = 0; i < disabledButtons.length; i++) {
		disabledButtons[i].removeAttribute('disabled', '');
		disabledButtons[i].style.cssText = 'opacity: 1; transform: rotate(0deg);';
	}
	for (let i = 0; i < lives.length; i++) {
		lives[i].src = "images/liveHeart.png"
	}
    for (let i = 0; i < phraseletters.length; i++) {
    phraseletters[i].remove();
	} 
	addPhraseToDisplay();
}

addPhraseToDisplay();
qwerty.addEventListener('click', () => { });
restartGameBtn[0].addEventListener('click', () => restartGame('#win'));
restartGameBtn[1].addEventListener('click', () => restartGame('#lose'));
startGameBtn.addEventListener('click', () => gameOverlay[0].classList.add("hide-overlay"));