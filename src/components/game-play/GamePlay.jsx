import { useGame } from '../../lib/hooks/useGame';
import Loading from '../shared/Loading';
import Deck from './Deck';
import styles from './GamePlay.module.css';

const GamePlay = ({ id }) => {
	const { game, loading, error } = useGame({ id });

	console.log({ game });
	console.log(game?.pairs);

	// const [pairs, setPairs] = useState(game.pairs);

	// const clonedPairs = [...pairs, ...pairs];
	// const suffledPairs = suffleCards(clonedPairs);

	const restart = () => {
		const suffledPairs = suffleCards(pairs);

		setPairs(suffledPairs);
	};

	const preparePairs = ({ pairs }) => {
		console.log('preparePairs', { pairs });

		if (!pairs || pairs.length === 0) return [];

		const clonedPairs = [...pairs, ...pairs];
		const suffledPairs = suffleCards(clonedPairs);

		return suffledPairs;
	};

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

	const pairs = preparePairs({ pairs: game?.pairs });
	console.log(pairs);

	return (
		<section className={styles.container}>
			{!loading && (
				<>
					<h1 className={styles.title}>{game.title}</h1>
					<Deck cards={pairs} restart={restart} />
				</>
			)}
		</section>
	);
};

const suffleCards = pairs => {
	return [...pairs].sort(() => Math.random() - 0.5);
};

export default GamePlay;
