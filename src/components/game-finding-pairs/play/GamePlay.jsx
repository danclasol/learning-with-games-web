import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';
import { prepareCards, suffle } from '../../../lib/games/findingPairs';
import Button from '../../buttons/Button';
import LinkButton from '../../buttons/LinkButton';
import PencilIcon from '../../icons/PencilIcon';
import RefreshIcon from '../../icons/RefreshIcon';
import styles from './GamePlay.module.css';
import PairCardList from './PairCardList';

const GamePlay = ({ game }) => {
	const [moves, setMoves] = useState(0);
	const [flippedCards, setFlippledCards] = useState([]);
	const [resolvedCards, setResolvedCards] = useState([]);
	const [pairs, setPairs] = useState(
		prepareCards({ pairs: game?.pairs, mode: game?.mode })
	);
	const [restart, setRestart] = useState();
	const [isFinished, setIsFinished] = useState(false);

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
				finishGame();
			}
		}
	};

	const finishGame = () => {
		setIsFinished(true);

		confetti({
			particleCount: 250,
			spread: 150
		});
	};

	const resetGame = () => {
		confetti.reset();
		setMoves(0);
		setFlippledCards([]);
		setResolvedCards([]);
		setRestart(true);
		setIsFinished(false);
	};

	useEffect(() => {
		return () => confetti.reset();
	}, []);

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
			<section className={styles.container}>
				<div className={styles.game}>
					<div className={styles.game__panel}>
						<h1 className={styles.game__panel__header}>{game.title}</h1>

						<div className={styles.game__panel__content}>
							<div className={styles.message}>
								{pairs.length === 0 && (
									<>
										<p className={styles.message__text}>
											The game doesn&apos;t have any pairs.
										</p>
										<div>
											<LinkButton
												to={`/games/${game.id}/edit`}
												icon={PencilIcon}
											>
												Add pair
											</LinkButton>
										</div>
									</>
								)}
								{pairs.length !== 0 && (
									<p className={styles.message__text}>
										Number of movements: {moves}
									</p>
								)}
							</div>

							<PairCardList
								mode={game.mode}
								pairs={pairs}
								resolvedCards={resolvedCards}
								flippedCards={flippedCards}
								isFinish={isFinished}
								onClickCard={handleCardClick}
							/>
							{isFinished && (
								<div className={styles.actions}>
									<Button onClick={resetGame} icon={RefreshIcon}>
										Retry
									</Button>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default GamePlay;
