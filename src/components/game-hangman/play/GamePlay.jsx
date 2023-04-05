import { useEffect, useReducer, useState } from 'react';
import {
	changeWord,
	correctWord,
	restart,
	wrongWord
} from '../../../lib/actions/gamePlayHangmanActions';
import {
	GAMEPLAY_INITIAL_STATE,
	gameplayHangmanReducer
} from '../../../lib/reducers/gameplayHangmanReducer';
import { isSpecialValidChar } from '../../../lib/utils/regex';
import GamePlayActions from '../../games/GamePlayActions';
import Modal from '../../shared/Modal';
import CounterTries from './CounterTries';
import FinishedGame from './FinishedGame';
import styles from './GamePlay.module.css';
import HiddenWord from './HiddenWord';
import Letters from './Letters';
import WordSelector from './WordSelector';

const GamePlay = ({ game }) => {
	const { modalContent, closeModal, openModal } = useModal();
	const [state, dispatchFilters] = useReducer(
		gameplayHangmanReducer,
		GAMEPLAY_INITIAL_STATE
	);

	const totalWords = game?.words.length;
	const isFirstWord = state.currentWordIndex === 0;
	const isLastWord = state.currentWordIndex === game?.words.length - 1;

	const currentWord = game?.words[state.currentWordIndex].word.toLowerCase();
	const maxTries = game?.words[state.currentWordIndex].maxTries;

	const nextWord = () => {
		dispatchFilters(changeWord(state.currentWordIndex + 1));
	};

	const checkLetter = letter => {
		if (state.isFinished) return;
		if (state.pressedLetters.find(item => item === letter)) return;

		if (currentWord.split('').find(item => item === letter)) {
			dispatchFilters(correctWord({ letter, word: currentWord }));
		} else {
			dispatchFilters(wrongWord(letter));
		}
	};

	const resetGame = () => {
		dispatchFilters(restart(state.currentWordIndex));
	};

	useEffect(() => {
		if (state.moves === maxTries) {
			openModal({
				moves: state.moves,
				isWinner: false,
				isLastWord,
				nextWord,
				resetGame
			});
		}
	}, [state.moves]);

	useEffect(() => {
		const letter = currentWord.replace(isSpecialValidChar, '');
		const lettersArray = letter.split('');

		const finishGame = lettersArray.every(letter =>
			state.resolvedLetters.find(item => item === letter)
		);

		if (finishGame) {
			openModal({
				moves: state.moves,
				isWinner: true,
				isLastWord,
				nextWord,
				resetGame
			});
		}
	}, [state.resolvedLetters]);

	return (
		<>
			<Modal onClose={closeModal}>{modalContent}</Modal>
			<section className={styles.container}>
				<GamePlayActions resetGame={resetGame} />
				<div className={styles.game}>
					<h1 className={styles.title}>{game.title}</h1>
					<WordSelector
						currentWordIndex={state.currentWordIndex}
						isFirstWord={isFirstWord}
						isLastWord={isLastWord}
						previousWord={() =>
							dispatchFilters(changeWord(state.currentWordIndex - 1))
						}
						nextWord={() =>
							dispatchFilters(changeWord(state.currentWordIndex + 1))
						}
						total={totalWords}
					/>
					<HiddenWord
						word={currentWord}
						resolvedLetters={state.resolvedLetters}
					/>
					<CounterTries maxTries={maxTries} tries={state.moves} />
					<Letters
						resolvedLetters={state.resolvedLetters}
						pressedLetters={state.pressedLetters}
						checkLetter={checkLetter}
					/>
				</div>
			</section>
		</>
	);
};

const useModal = () => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => {
		setModalContent();
	};

	const openModal = ({ moves, isWinner, isLastWord, nextWord, resetGame }) => {
		setModalContent(
			<FinishedGame
				numberMovs={moves}
				isWinner={isWinner}
				closeModal={closeModal}
				isLastWord={isLastWord}
				nextWord={nextWord}
				resetGame={resetGame}
			/>
		);
	};

	return {
		modalContent,
		closeModal,
		openModal
	};
};

export default GamePlay;
