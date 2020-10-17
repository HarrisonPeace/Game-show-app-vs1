// JavaScript Document

const startGameBtn = document.querySelector('.btn-start');
const restartGameBtn = document.querySelectorAll('.btn-restart');
const gameOverlay = document.querySelectorAll('.overlay');
const phraseList = document.querySelector('#phrase');
const qwerty = document.querySelector('#qwerty');
let wrongGuess = 0;
const lives = document.querySelectorAll('.tries img');
const phrases = [ //phrases can only take lower case lettes between a-z (no special characters or capitals)
	'you will never touch this',
	'its just a flesh wound',
	'im in a glass case of emotion',
	'excuse me i belive you have my stapler',
	'show me the money',
	'to infinity and beyond',
	'shaken not stirred',
	'houston we have a problem',
	'just keep swimming',
	'toto ive got a feeling were not in kansas anymore',
	'may the force be with you',
	'im king of the world'
]

//add a phrase from phrases array to display
function addPhraseToDisplay () {
	const getRandomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
	const arraySplit = getRandomPhrase.split(' ');
	for (let i = 0; i < arraySplit.length; i++) {
		let ul = document.createElement('ul');
		const arraySplit2 = arraySplit[i].split('');
		for (let j = 0; j < arraySplit2.length; j++) {
			let li = document.createElement('li');
			li.innerHTML = arraySplit2[j];
            li.className = 'letter';
			ul.appendChild(li);
			phraseList.appendChild(ul);
		}
      }
}

// check if the string is a single letter
function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

//Main app functionality, listening for clicks on qwerty letters, showing those letters in the phrase, removing lives and checking for a win / lose. 
qwerty.addEventListener('click', () => {
	const buttonClicked = event.target;
	const letterClicked = buttonClicked.innerHTML;
	const letters = document.querySelectorAll('.letter')
	const appFunctions = {
		//disable letter buttons as they are clicked
		disableButton: () => {
			if (isLetter(letterClicked)) {
				buttonClicked.setAttribute('disabled', '');
				buttonClicked.style.opacity = '0.5';
				buttonClicked.style.transform = 'rotate(5deg)';
			}
		},
		//check the letter clicked against the phrase to show matched letters and remove a life if none are found
		checkLetter: () => {
			if (isLetter(letterClicked)) {
              let letterTracker = 0;
              for (let i = 0; i < letters.length; i++) {
                  if (letters[i].innerHTML === letterClicked) {
                      letters[i].classList.add('show');
                      letterTracker++;
                  }
              }
              if (letterTracker <= 0) {
                  wrongGuess++;
                  if (wrongGuess >= 0) {
                      lives[(wrongGuess - 1)].src = "images/lostHeart.png"
                  }
              }
			}
		},
		// Check to see if the player has won or lost the game
		checkWinLose: () => {
			const lettersSelected = document.querySelectorAll('.show')
			if (lettersSelected.length === letters.length) {
				document.querySelector('#win').classList.remove("hide-overlay");
				document.querySelector('#win').classList.add("show-overlay");
			} else if (wrongGuess === 5) {
				document.querySelector('#lose').classList.remove("hide-overlay");
				document.querySelector('#lose').classList.add("show-overlay");
			}
		}
	}
	// Run Game Functions
	appFunctions.disableButton();
	appFunctions.checkLetter();
	appFunctions.checkWinLose();
});

//restart game, reset lives lost, remove current phrase and add new one to display, remove disabled from all qwerty letters
function restartGame (overlay) {
	document.querySelector(overlay).classList.remove("show-overlay");
	document.querySelector(overlay).classList.add("hide-overlay");
	wrongGuess = 0;
	const disabledButtons = document.querySelectorAll('[disabled]')
	const phraseletters = document.querySelectorAll('.letter')
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
restartGameBtn[0].addEventListener('click', () => restartGame('#win'));
restartGameBtn[1].addEventListener('click', () => restartGame('#lose'));
startGameBtn.addEventListener('click', () => gameOverlay[0].classList.add("hide-overlay"));