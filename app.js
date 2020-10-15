// JavaScript Document

const startGameBtn = document.querySelector('.btn-start');
const gameOverlay = document.querySelector('#overlay');
const phraseUl = document.querySelector('#phrase');
const qwerty = document.querySelector('#qwerty');
const phrases = [
	'you will never touch this',
	'its just a flesh wound',
	'im in a glass case of emotion',
	'excuse me i belive you have my stapler',
	'show me the money',
	'to infinity and beyond',
	'shaken, not stirred',
	'houston we have a problem'
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
	for (let i = 0; i < letterArray.length; i++) {
		if (letterArray[i].innerHTML === letter) {
			letterArray[i].style.color = 'black';
		}
	}
}

addStringToDisplay(getRandomArray(phrases));

startGameBtn.addEventListener('click', () => {
	gameOverlay.style.display = 'none';
});

qwerty.addEventListener('click', (event) => {
	const buttonClicked = event.target;
	const letterClicked = buttonClicked.innerHTML;
	checkLetter(letterClicked)
	if (isLetter(letterClicked)) {
	buttonClicked.setAttribute('disabled', '');
	buttonClicked.style.opacity = '0.5';
	}
}) 