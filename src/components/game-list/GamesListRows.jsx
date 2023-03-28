import Loading from '../shared/Loading';
import GameCard from './GameCard';
import styles from './GamesListRows.module.css';

const GamesListRows = ({ games, error, loading, reset }) => {
	if (error)
		return (
			<p className={styles.text}>
				Something went wrong. Please try again later.
			</p>
		);

	if (loading) return <Loading label='Loading' />;

	if (games.length === 0)
		return <p className={styles.text}>There are no games to display</p>;

	return (
		<div className={styles.rows}>
			{games.map(game => (
				<GameCard key={game.id} game={game} reset={reset} />
			))}
		</div>
	);
};

export default GamesListRows;
