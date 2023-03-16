import { useEffect, useState } from 'react';
import Button from '../buttons/Button';
import Modal from '../shared/Modal';
import Card from './Card';
import styles from './Deck.module.css';
import FinishedGame from './FinishedGame';

const Deck = ({ cards, restart }) => {
	const [movs, setMoves] = useState(0);
	const { modalContent, closeModal, openModal } = useModal();
	const [flippedCards, setFlippledCards] = useState([]);
	const [resolvedCards, setResolvedCards] = useState([]);

	const checkIsFlipped = index =>
		flippedCards.includes(index) || resolvedCards.includes(cards[index].value);

	const checkIsResolved = value => resolvedCards.includes(value);
	const checkDeckFinished = () => resolvedCards.length === cards.length / 2;

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

		if (cards[first].value === cards[second].value) {
			setResolvedCards(prev => [...prev, cards[first].value]);
			setFlippledCards([]);
		}
	};

	const reset = () => {
		setMoves(0);
		setFlippledCards([]);
		setResolvedCards([]);
		restart();
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

	return (
		<>
			<Modal onClose={closeModal}>{modalContent}</Modal>
			<div className={styles.stats}>
				<p className={styles.text}>Number of movements: {movs}</p>
			</div>
			<div className={styles.cards}>
				{cards.map((pair, index) => (
					<Card
						key={index}
						value={pair.value}
						text={pair.text}
						image={pair.image}
						index={index}
						isResolved={checkIsResolved(pair.value)}
						isFlipped={checkIsFlipped(index)}
						onClick={handleCardClick}
					>
						{pair.value}
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
