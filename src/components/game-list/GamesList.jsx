import { useFilters } from '../../lib/hooks/useFilters.js';
import { useGames } from '../../lib/hooks/useGames.js';
import styles from './GamesList.module.css';
import GamesFilters from './GamesListFilters.jsx';
import GamesListRows from './GamesListRows.jsx';
import PageSelector from './PageSelector.jsx';

const GameList = () => {
	const {
		filters,
		setSearch,
		setType,
		setSortBy,
		setPage,
		setItemsPerPage,
		resetFilters
	} = useFilters();

	const { games, count, error, loading } = useGames({
		filters
	});

	return (
		<section className={styles.container}>
			<h1 className={styles.title}>Game List</h1>
			<GamesFilters
				search={filters.search}
				type={filters.type}
				sortBy={filters.sortBy}
				setSearch={setSearch}
				setType={setType}
				setSortBy={setSortBy}
				reset={resetFilters}
			/>
			<GamesListRows games={games} error={error} loading={loading} />
			<PageSelector
				page={filters.page}
				totalPages={Math.ceil(count / filters.itemsPerPage)}
				setPage={newPage => setPage(newPage)}
			/>
		</section>
	);
};

export default GameList;
