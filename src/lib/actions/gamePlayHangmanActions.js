import { GAMEPLAY_HANGMAN_ACTIONS } from '../../constants/gamePlayHangmanActions';

export const restart = currentIndex => ({
	type: GAMEPLAY_HANGMAN_ACTIONS.RESTART,
	payload: currentIndex
});

export const changeWord = currentIndex => ({
	type: GAMEPLAY_HANGMAN_ACTIONS.CHANGE_WORD,
	payload: currentIndex
});

export const correctWord = index => ({
	type: GAMEPLAY_HANGMAN_ACTIONS.CORRECT_LETTER,
	payload: index
});

export const wrongWord = index => ({
	type: GAMEPLAY_HANGMAN_ACTIONS.WRONG_LETTER,
	payload: index
});
