const displayWord = document.getElementById("word-display");

async function getWord() {
	const request = await fetch(
		"https://random-word-api.herokuapp.com/word?length=8"
	)
		.then((response) => response.json())
		.then((data) => {
			for (let i = 0; i < data[0].length; i++) {
				displayWord.innerHTML += `<div class="letter-box"></div>`;
				localStorage.setItem("word", data[0]);
			}
		});
}
getWord();

makeGuess = (letter) => {
	const word = localStorage.getItem("word");
	const letterBoxes = document.querySelectorAll(".letter-box");
	const wordArray = word.split("");
	letter = letter.toLowerCase();
	console.log(wordArray);
	console.log(letter);

	if (wordArray.includes(letter)) {
		wordArray.forEach((element, index) => {
			if (element === letter) {
				letterBoxes[index].innerText = letter.toUpperCase();
			}
		});
	}
};

//Creating alphabet buttons
window.onload = function () {
	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const buttonContainer = document.querySelector(".buttons");

	for (let i = 0; i < alphabet.length; i++) {
		const button = document.createElement("button");
		button.textContent = alphabet[i];
		button.addEventListener("click", function () {
			makeGuess(alphabet[i]);
		});
		buttonContainer.appendChild(button);
	}
};
