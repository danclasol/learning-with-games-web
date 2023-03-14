import styles from './GameCard.module.css';

const GAME_TYPE_ICONS = {
	'finding-pairs': { text: 'Finding Pairs ', image: '/images/game-cards.png' },
	hangman: { text: 'Hangman', image: '/images/game-letters.png' },
	quiz: { text: 'Quiz', image: '/images/game-quiz.png' },
	gambling: { text: 'Gambling', image: '/images/game-gambling.png' }
};

const GameCard = ({ game }) => {
	const { text, image } = GAME_TYPE_ICONS[game.type];

	return (
		<div className={styles.card}>
			<img className={styles.image} src={image}></img>

			<div className={styles.info}>
				<span className={styles.title}>{game.title}</span>
				<span className={styles.type}>{text}</span>
				<span className={styles.text}>{`Created by: ${game.userId}`}</span>
				<span className={styles.text}>{`${game.pairs.length} pairs`}</span>
			</div>
		</div>
	);
};

export default GameCard;
