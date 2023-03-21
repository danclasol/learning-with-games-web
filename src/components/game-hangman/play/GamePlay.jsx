import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../buttons/Button';
import ArrowLeftIcon from '../../icons/ArrowLeftIcon';
import RefreshIcon from '../../icons/RefreshIcon';
import Modal from '../../shared/Modal';
import FinishedGame from './FinishedGame';
import styles from './GamePlay.module.css';
import HiddenWord from './HiddenWord';
import Letters from './Letters';

const GamePlay = ({ game }) => {
	const navigate = useNavigate();
	const { modalContent, closeModal, openModal } = useModal();
	const [movs, setMoves] = useState(game?.maxTries || 10);
	const [resolvedLetters, setResolvedLetters] = useState([]);
	const [pressedLetters, setPressedLetters] = useState([]);
	const [isFinished, setIsFinish] = useState(false);

	const handleClickReset = () => {
		navigate(`/games/${game.id}/play`);
	};

	const handleClicGoBack = () => {
		navigate('/games/');
	};

	const wordRender = game?.words[0];

	const checkLetter = letter => {
		if (isFinished) return;

		const newPressedLetter = [...pressedLetters];
		newPressedLetter.push(letter);

		setMoves(movs - 1);
		setPressedLetters(newPressedLetter);

		if (wordRender.split('').find(item => item === letter)) {
			const newResolvedLetter = [...resolvedLetters];
			newResolvedLetter.push(letter);

			setResolvedLetters(newResolvedLetter);
		}
	};

	const reset = () => {
		setMoves(game?.movs || 10);
		setPressedLetters([]);
		setResolvedLetters([]);
		setIsFinish(false);
	};

	useEffect(() => {
		if (movs === 0) {
			openModal(movs);
			setIsFinish(true);
		}
	}, [movs]);

	useEffect(() => {
		const lettersArray = wordRender.split('');
		const finishGame = lettersArray.every(letter =>
			resolvedLetters.find(item => item === letter)
		);

		if (finishGame) {
			openModal(movs, reset);
			setIsFinish(true);
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
						<Button onClick={reset} kind='secondary'>
							<div className={styles.button__content}>
								<RefreshIcon className={styles.icon} />
								<span>Reset</span>
							</div>
						</Button>
					</div>
				</div>
				<h1 className={styles.title}>{game.title}</h1>
				<HiddenWord word={wordRender} resolvedLetters={resolvedLetters} />
				<div className={styles.stats}>
					<span className={styles.text}>{`Number of tries left: ${movs}`}</span>
				</div>
				<Letters
					resolvedLetters={resolvedLetters}
					pressedLetters={pressedLetters}
					checkLetter={checkLetter}
				/>
			</section>
		</>
	);
};

const useModal = () => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => {
		setModalContent();
	};

	const openModal = (movs, reset) => {
		setModalContent(
			<FinishedGame numberMovs={movs} closeModal={closeModal} reset={reset} />
		);
	};

	return {
		modalContent,
		closeModal,
		openModal
	};
};

export default GamePlay;
