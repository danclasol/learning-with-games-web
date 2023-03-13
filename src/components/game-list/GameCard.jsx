import styles from './GameCard.module.css';

const GameCard = ({ game }) => {
	return (
		<div className={styles.card}>
			<img className={styles.image} src={'/images/game.svg'}></img>

			<div className={styles.info}>
				<span className={styles.title}>{game.title}</span>
				<span className={styles.text}>{`Created by: ${game.author}`}</span>
				<span className={styles.text}>{`${game.pairs.length} pairs`}</span>
			</div>
		</div>
	);
};

export default GameCard;
