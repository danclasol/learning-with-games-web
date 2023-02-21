import { useEffect, useState } from 'react';
import Button from '../buttons/Button';
import Modal from '../shared/Modal';
import Card from './Card';
import styles from './Deck.module.css';
import FinishedGame from './FinishedGame';

const Deck = ({ cards, restart }) => {
	const [movs, setMoves] = useState(0);
	const { modalContent, closeModal, openModal } = useModal();
	const [openCards, setOpenCards] = useState([]);
	const [clearedCards, setClearedCards] = useState([]);

	const checkIsFlipped = index => {
		return openCards.includes(index);
	};

	const checkIsInactive = value => {
		return clearedCards.includes(value);
	};

	const evaluate = () => {
		const newMovs = movs + 1;
		setMoves(newMovs);

		const [first, second] = openCards;

		if (cards[first].value === cards[second].value) {
			setClearedCards(prev => [...prev, cards[first].value]);
			setOpenCards([]);

			if (clearedCards.length + 1 === cards.length / 2) {
				openModal(newMovs, reset);
			}
		}
	};

	const reset = () => {
		setMoves(0);
		setOpenCards([]);
		setClearedCards([]);
		restart();
	};

	const handleCardClick = index => {
		if (openCards.length === 1) {
			setOpenCards(prev => [...prev, index]);
		} else {
			setOpenCards([index]);
		}
	};

	useEffect(() => {
		if (openCards.length !== 2) return;

		evaluate();
	}, [openCards]);

	useEffect(() => {
		if (openCards.length !== 2) return;

		const intervalId = setTimeout(() => {
			setOpenCards([]);
		}, 1500);

		return () => {
			clearInterval(intervalId);
		};
	}, [openCards]);

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
						isInactive={checkIsInactive(pair.value)}
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
