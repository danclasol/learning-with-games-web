import { prepareCards } from '../../lib/games/findingPairs';
import { useGame } from '../../lib/hooks/useGame';
import Loading from '../shared/Loading';
import Deck from './Deck';
import styles from './GamePlay.module.css';

const GamePlay = ({ id }) => {
	const { game, loading, error } = useGame({ id });

	if (loading) {
		return (
			<section className={styles.container}>
				<Loading label='Loading...' />;
			</section>
		);
	}

	if (error) {
		return <p>No existe juego</p>;
	}

	const pairsSuffled = prepareCards(game?.pairs);

	return (
		<section className={styles.container}>
			{!loading && (
				<>
					<h1 className={styles.title}>{game.title}</h1>
					<Deck pairsInit={pairsSuffled} />
				</>
			)}
		</section>
	);
};

export default GamePlay;
