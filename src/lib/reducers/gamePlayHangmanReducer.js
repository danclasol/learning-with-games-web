import { GAMEPLAY_HANGMAN_ACTIONS } from '../../constants/gamePlayHangmanActions';
import { isSpecialValidChar } from '../utils/regex';

export const GAMEPLAY_INITIAL_STATE = {
	resolvedLetters: [],
	pressedLetters: [],
	isFinish: false,
	currentWordIndex: 0,
	moves: 0
};

export const gameplayHangmanReducer = (state, { type, payload }) => {
	switch (type) {
		case GAMEPLAY_HANGMAN_ACTIONS.RESTART: {
			return { ...GAMEPLAY_INITIAL_STATE, currentWordIndex: payload };
		}

		case GAMEPLAY_HANGMAN_ACTIONS.CHANGE_WORD: {
			return { ...GAMEPLAY_INITIAL_STATE, currentWordIndex: payload };
		}

		case GAMEPLAY_HANGMAN_ACTIONS.CORRECT_LETTER: {
			const newPressedLetter = [...state.pressedLetters];
			newPressedLetter.push(payload.letter);

			const newResolvedLetter = [...state.resolvedLetters];
			newResolvedLetter.push(payload.letter);

			const letter = payload.word.replace(isSpecialValidChar, '');
			const lettersArray = letter.split('');

			const isFinish = lettersArray.every(char =>
				newResolvedLetter.find(item => item === char)
			);

			return {
				...state,
				pressedLetters: newPressedLetter,
				resolvedLetters: newResolvedLetter,
				isFinish
			};
		}

		case GAMEPLAY_HANGMAN_ACTIONS.WRONG_LETTER: {
			const newPressedLetter = [...state.pressedLetters];
			newPressedLetter.push(payload);

			const newMovs = state.moves + 1;

			return {
				...state,
				pressedLetters: newPressedLetter,
				moves: newMovs
			};
		}

		default:
			throw new Error('Invalid action type');
	}
};
