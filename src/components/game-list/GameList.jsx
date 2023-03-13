import { useState } from 'react';
import { useGames } from '../../lib/hooks/useGames.js';
import styles from './GameList.module.css';
import GamesFilters from './GamesFilters.jsx';
import GamesRows from './GamesRows.jsx';
// import filterBySearch from '../../lib/games/filterGames.js';

const GameList = () => {
	const [search, setSearch] = useState('');

	const { games, count, error, loading } = useGames({ search });

	return (
		<section className={styles.container}>
			<h1 className={styles.title}>Game List</h1>
			<GamesFilters search={search} setSearch={setSearch} />
			<GamesRows games={games} />
		</section>
	);
};

export default GameList;
