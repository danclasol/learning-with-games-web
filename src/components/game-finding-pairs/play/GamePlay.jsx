import { useEffect, useState } from 'react';
import { prepareCards, suffle } from '../../../lib/games/findingPairs';
import GamePlayActions from '../../games/GamePlayActions';
import Modal from '../../shared/Modal';
import FinishedGame from './FinishedGame';
import styles from './GamePlay.module.css';
import PairCardList from './PairCardList';

const GamePlay = ({ game }) => {
	const { modalContent, closeModal, openModal } = useModal();
	const [movs, setMoves] = useState(0);
	const [flippedCards, setFlippledCards] = useState([]);
	const [resolvedCards, setResolvedCards] = useState([]);
	const [pairs, setPairs] = useState(prepareCards(game?.pairs));
	const [restart, setRestart] = useState();

	const checkDeckFinished = () => {
		if (pairs.length === 0) return;

		return resolvedCards.length === pairs.length / 2;
	};

	const evaluate = () => {
		const [first, second] = flippedCards;
		const newMovs = movs + 1;

		setMoves(newMovs);

		if (pairs[first].text === pairs[second].text) {
			setResolvedCards(prev => [...prev, pairs[first].text]);
			setFlippledCards([]);
		}
	};

	const resetGame = () => {
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
		if (checkDeckFinished()) openModal(movs, resetGame);
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
			<section className={styles.container}>
				<GamePlayActions resetGame={resetGame} />

				<div className={styles.game}>
					<h1 className={styles.title}>{game.title}</h1>
					<div className={styles.stats}>
						<p className={styles.text}>Number of movements: {movs}</p>
					</div>
					<PairCardList
						pairs={pairs}
						resolvedCards={resolvedCards}
						flippedCards={flippedCards}
						setFlippledCards={setFlippledCards}
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
