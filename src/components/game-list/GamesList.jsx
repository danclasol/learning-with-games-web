import { useGames } from '../../lib/hooks/useGames.js';
import { useGamesFilters } from '../../lib/hooks/useGamesFilters.js';
import styles from './GamesList.module.css';
import GamesFilters from './GamesListFilters.jsx';
import GamesListRows from './GamesListRows.jsx';
import PageSelector from './PageSelector.jsx';

const GamesList = ({ groupId }) => {
	const { filters, setSearch, setType, setSortBy, setPage, resetFilters } =
		useGamesFilters();

	const { games, count, error, loading } = useGames({
		groupId,
		filters
	});

	return (
		<section className={styles.container}>
			<h2 className={styles.title}>Games</h2>
			<div className={styles.games__list}>
				<GamesFilters
					search={filters.search}
					type={filters.type}
					sortBy={filters.sortBy}
					setSearch={setSearch}
					setType={setType}
					setSortBy={setSortBy}
					reset={resetFilters}
					groupId={groupId}
				/>
				<GamesListRows
					games={games}
					error={error}
					loading={loading}
					reset={resetFilters}
					groupId={groupId}
				/>
				{games.length !== 0 && (
					<PageSelector
						page={filters.page}
						totalPages={Math.ceil(count / filters.itemsPerPage)}
						setPage={newPage => setPage(newPage)}
					/>
				)}
			</div>
		</section>
	);
};

export default GamesList;
