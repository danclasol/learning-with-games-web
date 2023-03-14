import { useState } from 'react';
import { useGames } from '../../lib/hooks/useGames.js';
import styles from './GamesList.module.css';
import GamesFilters from './GamesListFilters.jsx';
import GamesListRows from './GamesListRows.jsx';
// import filterBySearch from '../../lib/games/filterGames.js';

const GameList = () => {
	const [filters, setFilters] = useState({});

	const { games, count, error, loading } = useGames({ filters });

	return (
		<section className={styles.container}>
			<h1 className={styles.title}>Game List</h1>
			<GamesFilters filters={filters} setFilters={setFilters} />
			<GamesListRows games={games} error={error} loading={loading} />
		</section>
	);
};

export default GameList;
