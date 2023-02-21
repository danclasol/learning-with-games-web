import { useState } from 'react';
import Deck from './Deck';
import styles from './Game.module.css';

const Game = ({ game }) => {
	const [pairs, setPairs] = useState(game.pairs);

	const clonedPairs = [...pairs, ...pairs];
	const suffledPairs = suffleCards(clonedPairs);

	const restart = () => {
		const suffledPairs = suffleCards(pairs);

		setPairs(suffledPairs);
	};

	return (
		<section className={styles.container}>
			<h1 className={styles.title}>{game.title}</h1>

			<Deck cards={suffledPairs} restart={restart} />
		</section>
	);
};

const suffleCards = pairs => {
	return [...pairs].sort(() => Math.random() - 0.5);
};

export default Game;
