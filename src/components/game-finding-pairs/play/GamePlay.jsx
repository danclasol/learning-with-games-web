import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { prepareCards, suffle } from '../../../lib/games/findingPairs';
import Button from '../../buttons/Button';
import ArrowLeftIcon from '../../icons/ArrowLeftIcon';
import RefreshIcon from '../../icons/RefreshIcon';
import Modal from '../../shared/Modal';
import Card from './Card';
import FinishedGame from './FinishedGame';
import styles from './GamePlay.module.css';

const GamePlay = ({ game }) => {
	const { modalContent, closeModal, openModal } = useModal();
	const navigate = useNavigate();
	const [movs, setMoves] = useState(0);
	const [flippedCards, setFlippledCards] = useState([]);
	const [resolvedCards, setResolvedCards] = useState([]);
	const [pairs, setPairs] = useState(prepareCards(game?.pairs));
	const [restart, setRestart] = useState();

	const pairsSuffled = prepareCards(game?.pairs);

	const checkIsFlipped = index =>
		flippedCards.includes(index) || resolvedCards.includes(pairs[index].id);

	const checkIsResolved = id => resolvedCards.includes(id);
	const checkDeckFinished = () => {
		if (pairs.length === 0) return;

		return resolvedCards.length === pairs.length / 2;
	};

	const handleCardClick = index => {
		if (flippedCards.length === 1) {
			setFlippledCards(prev => [...prev, index]);
		} else {
			setFlippledCards([index]);
		}
	};

	const evaluate = () => {
		const [first, second] = flippedCards;
		const newMovs = movs + 1;

		setMoves(newMovs);

		if (pairs[first].id === pairs[second].id) {
			setResolvedCards(prev => [...prev, pairs[first].id]);
			setFlippledCards([]);
		}
	};

	const reset = () => {};

	useEffect(() => {
		if (flippedCards.length !== 2) return;

		evaluate();
	}, [flippedCards]);

	useEffect(() => {
		if (flippedCards.length !== 2) return;

		const intervalId = setTimeout(() => {
			setFlippledCards([]);
		}, 1500);

		return () => {
			clearInterval(intervalId);
		};
	}, [flippedCards]);

	useEffect(() => {
		if (checkDeckFinished()) openModal(movs, reset);
	}, [resolvedCards]);

	useEffect(() => {
		if (!restart) return;

		const intervalId = setTimeout(() => {
			const result = suffle(pairs);
			setPairs(result);
			setRestart(false);
		}, 200);

		return () => {
			clearInterval(intervalId);
		};
	}, [restart]);

	const handleClickReset = () => {
		setMoves(0);
		setFlippledCards([]);
		setResolvedCards([]);
		setRestart(true);
	};

	const handleClicGoBack = () => {
		navigate('/games/');
	};

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
						<Button onClick={handleClickReset} kind='secondary'>
							<div className={styles.button__content}>
								<RefreshIcon className={styles.icon} />
								<span>Reset</span>
							</div>
						</Button>
					</div>
				</div>

				<div className={styles.game}>
					<h1 className={styles.title}>{game.title}</h1>
					<div className={styles.stats}>
						<p className={styles.text}>Number of movements: {movs}</p>
					</div>

					<div className={styles.cards}>
						{pairs.map((pair, index) => (
							<Card
								key={index}
								id={pair.id}
								text={pair.text}
								image={pair.image}
								index={index}
								isResolved={checkIsResolved(pair.id)}
								isFlipped={checkIsFlipped(index)}
								onClick={handleCardClick}
							>
								{pair.id}
							</Card>
						))}
					</div>
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
