import { useState } from 'react';
import {
	checkFinishGame,
	checkLetterExists,
	checkLetterPressed
} from '../../../lib/games/hangman';
import GamePlayActions from '../../games/GamePlayActions';
import Modal from '../../shared/Modal';
import CounterTries from './CounterTries';
import FinishedGame from './FinishedGame';
import styles from './GamePlay.module.css';
import HiddenSentence from './HiddenSentence';
import Letters from './Letters';
import WordSelector from './WordSelector';

const GamePlay = ({ game }) => {
	const { modalContent, closeModal, openModal } = useModal();
	const [resolvedLetters, setResolvedLetters] = useState([]);
	const [pressedLetters, setPressedLetters] = useState([]);
	const [isFinished, setIsFinished] = useState(false);
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [moves, setMoves] = useState(0);

	const words = game?.words;
	const totalWords = words.length;
	const isFirstWord = currentWordIndex === 0;
	const isLastWord = currentWordIndex === words.length - 1;

	const currentWord = words[currentWordIndex]?.word?.toLowerCase();
	const maxTries = words[currentWordIndex]?.maxTries;

	const moveToWord = currentIndex => {
		setResolvedLetters([]);
		setPressedLetters([]);
		setIsFinished(false);
		setCurrentWordIndex(currentIndex);
		setMoves(0);
	};

	const finishGame = ({ isWinner, moves }) => {
		setIsFinished(true);

		openModal({
			moves,
			isWinner,
			isLastWord,
			nextWord: () => moveToWord(currentWordIndex + 1),
			resetGame: () => moveToWord(currentWordIndex)
		});
	};

	const checkLetter = letter => {
		if (totalWords === 0 || isFinished) return;
		if (checkLetterPressed(letter, pressedLetters)) return;

		const newPressedLetter = [...pressedLetters];
		newPressedLetter.push(letter);
		setPressedLetters(newPressedLetter);

		let newMoves = moves;

		if (checkLetterExists(letter, currentWord)) {
			const newResolvedLetter = [...resolvedLetters];
			newResolvedLetter.push(letter);
			setResolvedLetters(newResolvedLetter);

			if (checkFinishGame(currentWord, newResolvedLetter)) {
				finishGame({ isWinner: true, moves: newMoves });
			}
		} else {
			setMoves(++newMoves);
		}

		if (newMoves === maxTries) {
			finishGame({ isWinner: false, moves: newMoves });
		}
	};

	return (
		<>
			<Modal onClose={closeModal}>{modalContent}</Modal>
			<section className={styles.container}>
				<GamePlayActions resetGame={() => moveToWord(currentWordIndex)} />
				<div className={styles.game}>
					<h1 className={styles.title}>{game.title}</h1>
					{totalWords > 1 && (
						<WordSelector
							currentWordIndex={currentWordIndex}
							isFirstWord={isFirstWord}
							isLastWord={isLastWord}
							previousWord={() => moveToWord(currentWordIndex - 1)}
							nextWord={() => moveToWord(currentWordIndex + 1)}
							total={totalWords}
						/>
					)}
					<HiddenSentence
						sentence={currentWord}
						resolvedLetters={resolvedLetters}
					/>
					{totalWords > 0 && <CounterTries maxTries={maxTries} tries={moves} />}
					<Letters
						resolvedLetters={resolvedLetters}
						pressedLetters={pressedLetters}
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
				isLastWord={isLastWord}
				nextWord={nextWord}
				resetGame={resetGame}
				closeModal={closeModal}
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
