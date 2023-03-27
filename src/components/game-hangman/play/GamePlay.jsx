import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../buttons/Button';
import IconButton from '../../buttons/IconButton';
import ArrowLeftIcon from '../../icons/ArrowLeftIcon';
import ArrowRightIcon from '../../icons/ArrowRightIcon';
import RefreshIcon from '../../icons/RefreshIcon';
import Modal from '../../shared/Modal';

import FinishedGame from './FinishedGame';
import styles from './GamePlay.module.css';
import HiddenWord from './HiddenWord';
import Letters from './Letters';

const GamePlay = ({ game }) => {
	const navigate = useNavigate();
	const { modalContent, closeModal, openModal } = useModal();
	const [resolvedLetters, setResolvedLetters] = useState([]);
	const [pressedLetters, setPressedLetters] = useState([]);
	const [isFinished, setIsFinished] = useState(false);
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [movs, setMoves] = useState(game?.words[currentWordIndex].maxTries);

	const isFirstWord = currentWordIndex === 0;
	const isLastWord = currentWordIndex === game?.words.length - 1;

	const handleClicGoBack = () => {
		navigate('/games/');
	};

	console.log({ game });

	const currentWord = game?.words[currentWordIndex].word;
	console.log({ currentWord });

	const checkLetter = letter => {
		if (isFinished) return;

		const newPressedLetter = [...pressedLetters];
		newPressedLetter.push(letter);
		setPressedLetters(newPressedLetter);

		if (currentWord.split('').find(item => item === letter)) {
			const newResolvedLetter = [...resolvedLetters];
			newResolvedLetter.push(letter);

			setResolvedLetters(newResolvedLetter);
		} else {
			setMoves(movs - 1);
		}
	};

	const previousWord = () => {
		// resetGame();
		setCurrentWordIndex(currentWordIndex - 1);
	};

	const nextWord = () => {
		// resetGame();
		setCurrentWordIndex(currentWordIndex + 1);
	};

	const resetGame = () => {
		setPressedLetters([]);
		setResolvedLetters([]);
		setIsFinished(false);
		setMoves(game?.words[currentWordIndex].maxTries);
	};

	useEffect(() => {
		resetGame();
	}, [currentWordIndex]);

	useEffect(() => {
		if (movs === 0) {
			openModal(movs);
			setIsFinished(true);
		}
	}, [movs]);

	useEffect(() => {
		const lettersArray = currentWord.split('');
		const finishGame = lettersArray.every(letter =>
			resolvedLetters.find(item => item === letter)
		);

		if (finishGame) {
			openModal(movs, nextWord, resetGame);
			setIsFinished(true);
		}
	}, [resolvedLetters]);

	return (
		<>
			<Modal onClose={closeModal}>{modalContent}</Modal>
			<section className={styles.container}>
				<div className={styles.actions}>
					<div className={styles.actions__buttons}>
						<Button onClick={handleClicGoBack}>
							<div className={styles.button__content}>
								<ArrowLeftIcon className={styles.icon} />
								<span>Go back</span>
							</div>
						</Button>
					</div>
					<div className={styles.actions__buttons}>
						<Button onClick={resetGame} kind='secondary'>
							<div className={styles.button__content}>
								<RefreshIcon className={styles.icon} />
								<span>Reset</span>
							</div>
						</Button>
					</div>
				</div>
				<div className={styles.game}>
					<h1 className={styles.title}>{game.title}</h1>
					<div className={styles.game__play__actions}>
						<IconButton
							icon={ArrowLeftIcon}
							filled
							onClick={previousWord}
							disabled={isFirstWord}
						/>
						<span>{`Word: ${currentWordIndex + 1}/${
							game?.words?.length
						}`}</span>
						<IconButton
							icon={ArrowRightIcon}
							filled
							onClick={nextWord}
							disabled={isLastWord}
						/>
					</div>
					<HiddenWord word={currentWord} resolvedLetters={resolvedLetters} />
					<div className={styles.stats}>
						<span
							className={styles.text}
						>{`Number of tries left: ${movs}`}</span>
					</div>
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

	const openModal = (movs, nextWord, reset) => {
		setModalContent(
			<FinishedGame
				numberMovs={movs}
				closeModal={closeModal}
				nextWord={nextWord}
				reset={reset}
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
