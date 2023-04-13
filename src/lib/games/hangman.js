import { isSpecialValidChar } from '../utils/regex';

export const generateAlphabet = () => {
	return String.fromCharCode(...Array(123).keys())
		.slice(97)
		.split('');
};

export const checkLetterPressed = (letter, pressedLetters) => {
	return pressedLetters.find(item => item === letter);
};

export const checkLetterExists = (letter, word) => {
	return word.split('').find(item => item === letter);
};

export const checkFinishGame = (word, resolvedLetters) => {
	const letter = word.replaceAll(isSpecialValidChar, '');
	const lettersArray = letter.split('');

	return lettersArray.every(letter =>
		resolvedLetters.find(item => item === letter)
	);
};
