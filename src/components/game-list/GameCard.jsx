import { formatDateLocale } from '../../lib/utils/dates';
import GameActions from './GameActions';
import styles from './GameCard.module.css';

const GAME_TYPE_ICONS = {
	'finding-pairs': { text: 'Finding Pairs ', image: '/images/game-cards.png' },
	hangman: { text: 'Hangman', image: '/images/game-letters.png' },
	quiz: { text: 'Quiz', image: '/images/game-quiz.png' },
	gambling: { text: 'Gambling', image: '/images/game-gambling.png' },
	other: { text: 'Other', image: '' }
};

const GameCard = ({ game, reset }) => {
	const { text, image } = game.type
		? GAME_TYPE_ICONS[game.type]
		: GAME_TYPE_ICONS.other;

	return (
		<div className={styles.card}>
			<img className={styles.image} src={image}></img>

			<div className={styles.card__info}>
				<span className={styles.title}>{game.title}</span>
				<span className={styles.type}>{text}</span>
				<span className={styles.user}>{game.userId}</span>
				<span className={styles.date}>
					{formatDateLocale(game.creationDate)}
				</span>
			</div>

			<GameActions game={game} reset={reset} />
		</div>
	);
};

export default GameCard;
