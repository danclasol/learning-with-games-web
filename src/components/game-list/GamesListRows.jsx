import Loading from '../shared/Loading';
import GameCard from './GameCard';
import styles from './GamesListRows.module.css';

const GamesListRows = ({ games, error, loading }) => {
	if (error) return <p className={styles.text}>Ha ocurrido un error</p>;

	if (loading) return <Loading label='Loading' />;

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
