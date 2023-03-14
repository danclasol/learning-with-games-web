import { useFilters } from '../../lib/hooks/useFilters.js';
import { useGames } from '../../lib/hooks/useGames.js';
import styles from './GamesList.module.css';
import GamesFilters from './GamesListFilters.jsx';
import GamesListPagination from './GamesListPagination.jsx';
import GamesListRows from './GamesListRows.jsx';

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
			<GamesListPagination
				page={filters.page}
				itemsPerPage={filters.itemsPerPage}
				setPage={setPage}
				setItemsPerPage={setItemsPerPage}
				total={count}
			/>
		</section>
	);
};

export default GameList;
