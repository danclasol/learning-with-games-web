import { useEffect, useState } from 'react';
import { suffle } from '../../../lib/games/findingPairs';
import Button from '../../buttons/Button';
import Modal from '../../shared/Modal';
import Card from './Card';
import styles from './Deck.module.css';
import FinishedGame from './FinishedGame';

const Deck = ({ pairsInit }) => {
	const { modalContent, closeModal, openModal } = useModal();
	const [movs, setMoves] = useState(0);
	const [flippedCards, setFlippledCards] = useState([]);
	const [resolvedCards, setResolvedCards] = useState([]);
	const [pairs, setPairs] = useState(pairsInit);
	const [restart, setRestart] = useState();

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

	const reset = () => {
		setMoves(0);
		setFlippledCards([]);
		setResolvedCards([]);
		setRestart(true);
	};

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

	return (
		<>
			<Modal onClose={closeModal}>{modalContent}</Modal>
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

			<div className={styles.actions}>
				<Button onClick={reset}>Reset</Button>
			</div>
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

export default Deck;
