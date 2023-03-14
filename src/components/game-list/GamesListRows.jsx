import React from 'react';
import GameCard from './GameCard';
import styles from './GamesListRows.module.css';

const GamesListRows = ({ games }) => {
	console.log(games, games.length);

	if (games.length === 0)
		return <p className={styles.text}>No hay ningun juego.</p>;

	return (
		<div className={styles.rows}>
			{games.map(game => (
				<GameCard key={game.id} game={game} />
			))}
		</div>
	);
};

export default GamesListRows;
