import { prepareCards } from '../../../lib/games/findingPairs';
import Deck from './Deck';
import styles from './GamePlay.module.css';

const GamePlay = ({ game }) => {
	const pairsSuffled = prepareCards(game?.pairs);

	return (
		<section className={styles.container}>
			<h1 className={styles.title}>{game.title}</h1>
			<Deck pairsInit={pairsSuffled} />
		</section>
	);
};

export default GamePlay;
