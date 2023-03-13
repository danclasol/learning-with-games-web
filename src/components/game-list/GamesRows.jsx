import React from 'react';
import GameCard from './GameCard';
import styles from './GamesRows.module.css';

const GamesRows = ({ games }) => {
	return (
		<div className={styles.rows}>
			{games.map(game => (
				<GameCard key={game.id} game={game} />
			))}
		</div>
	);
};

export default GamesRows;
