import { useEffect, useState } from 'react';
import { isSpecialValidChar } from '../../../lib/utils/regex';
import Modal from '../../shared/Modal';
import CounterTries from './CounterTries';

import FinishedGame from './FinishedGame';
import styles from './GamePlay.module.css';
import GamePlayActions from './GamePlayActions';
import HiddenWord from './HiddenWord';
import Letters from './Letters';
import WordSelector from './WordSelector';

const GamePlay = ({ game }) => {
	const { modalContent, closeModal, openModal } = useModal();
	const [resolvedLetters, setResolvedLetters] = useState([]);
	const [pressedLetters, setPressedLetters] = useState([]);
	const [isFinished, setIsFinished] = useState(false);
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [moves, setMoves] = useState(0);

	const isFirstWord = currentWordIndex === 0;
	const isLastWord = currentWordIndex === game?.words.length - 1;

	const currentWord = game?.words[currentWordIndex].word;
	const maxTries = game?.words[currentWordIndex].maxTries;

	const nextWord = () => {
		setCurrentWordIndex(currentWordIndex + 1);
	};

	const checkLetter = letter => {
		if (isFinished) return;

		if (pressedLetters.find(item => item === letter)) return;

		const newPressedLetter = [...pressedLetters];
		newPressedLetter.push(letter);
		setPressedLetters(newPressedLetter);

		if (currentWord.split('').find(item => item === letter)) {
			const newResolvedLetter = [...resolvedLetters];
			newResolvedLetter.push(letter);

			setResolvedLetters(newResolvedLetter);
		} else {
			setMoves(moves + 1);
		}
	};

	const resetGame = () => {
		setPressedLetters([]);
		setResolvedLetters([]);
		setIsFinished(false);
		setMoves(0);
	};

	useEffect(() => {
		resetGame();
	}, [currentWordIndex]);

	useEffect(() => {
		if (moves === maxTries) {
			openModal({ moves, isWinner: false, isLastWord, nextWord, resetGame });
			setIsFinished(true);
		}
	}, [moves]);

	useEffect(() => {
		const letter = currentWord.replace(isSpecialValidChar, '');
		const lettersArray = letter.split('');

		const finishGame = lettersArray.every(letter =>
			resolvedLetters.find(item => item === letter)
		);

		if (finishGame) {
			openModal({ moves, isWinner: true, isLastWord, nextWord, resetGame });
			setIsFinished(true);
		}
	}, [resolvedLetters]);

	return (
		<>
			<Modal onClose={closeModal}>{modalContent}</Modal>
			<section className={styles.container}>
				<GamePlayActions resetGame={resetGame} />
				<div className={styles.game}>
					<h1 className={styles.title}>{game.title}</h1>
					<WordSelector
						currentWordIndex={currentWordIndex}
						isFirstWord={isFirstWord}
						isLastWord={isLastWord}
						setCurrentWordIndex={setCurrentWordIndex}
						total={game?.words.length}
					/>
					<HiddenWord word={currentWord} resolvedLetters={resolvedLetters} />
					<CounterTries
						maxTries={game?.words[currentWordIndex].maxTries}
						tries={moves}
					/>
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
