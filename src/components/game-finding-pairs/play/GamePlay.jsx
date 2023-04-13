import { useEffect, useState } from 'react';
import { prepareCards, suffle } from '../../../lib/games/findingPairs';
import GamePlayActions from '../../games/GamePlayActions';
import Modal from '../../shared/Modal';
import FinishedGame from './FinishedGame';
import styles from './GamePlay.module.css';
import PairCardList from './PairCardList';

const GamePlay = ({ game }) => {
	const { modalContent, closeModal, openModal } = useModal();
	const [moves, setMoves] = useState(0);
	const [flippedCards, setFlippledCards] = useState([]);
	const [resolvedCards, setResolvedCards] = useState([]);
	const [pairs, setPairs] = useState(prepareCards(game?.pairs));
	const [restart, setRestart] = useState();

	const pairsNumber = pairs.length;

	const handleCardClick = index => {
		const flippedArray = [...flippedCards];
		const resolvedArray = [...resolvedCards];
		let movesNew;

		// flipped cards
		if (flippedArray.length === 1) {
			movesNew = moves + 1;
			setMoves(movesNew);

			flippedArray.push(index);
			setFlippledCards(flippedArray);
		} else {
			setFlippledCards([index]);
		}

		// check card match
		if (flippedArray.length !== 2) return;

		const [first, second] = flippedArray;

		if (pairs[first].text === pairs[second].text) {
			resolvedArray.push(pairs[first].text);
			setResolvedCards(resolvedArray);
			setFlippledCards([]);

			// check end game
			if (resolvedArray.length === pairsNumber / 2) {
				openModal({ moves: movesNew, resetGame });
			}
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

		const intervalId = setTimeout(() => {
			setFlippledCards([]);
		}, 1500);

		return () => {
			clearInterval(intervalId);
		};
	}, [flippedCards]);

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
	}, [restart, pairs]);

	return (
		<>
			<Modal onClose={closeModal}>{modalContent}</Modal>
			<section className={styles.container}>
				<GamePlayActions resetGame={resetGame} />

				<div className={styles.game}>
					<h1 className={styles.title}>{game.title}</h1>
					<div className={styles.stats}>
						<p className={styles.text}>Number of movements: {moves}</p>
					</div>

					<PairCardList
						pairs={pairs}
						resolvedCards={resolvedCards}
						flippedCards={flippedCards}
						onClickCard={handleCardClick}
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

	const openModal = ({ moves, resetGame }) => {
		setModalContent(
			<FinishedGame
				numberMovs={moves}
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
