import { useGamesFilters } from '../../lib/hooks/useGamesFilters.js';
import { useGroups } from '../../lib/hooks/useGroups.js';
import PageSelector from '../game-list/PageSelector.jsx';
import styles from './GroupsList.module.css';
import GroupsListFilters from './GroupsListFilters.jsx';
import GroupsListRows from './GroupsListRows.jsx';

const GroupsList = () => {
	const { filters, setSearch, setType, setSortBy, setPage, resetFilters } =
		useGamesFilters();

	const { groups, count, error, loading } = useGroups({ filters });

	return (
		<section className={styles.container}>
			<h2 className={styles.title}>Groups</h2>
			<div className={styles.groups__list}>
				<GroupsListFilters
					search={filters.search}
					type={filters.type}
					sortBy={filters.sortBy}
					setSearch={setSearch}
					setType={setType}
					setSortBy={setSortBy}
					reset={resetFilters}
				/>
				<GroupsListRows
					groups={groups}
					error={error}
					loading={loading}
					reset={resetFilters}
				/>
				<PageSelector
					page={filters.page}
					totalPages={Math.ceil(count / filters.itemsPerPage)}
					setPage={newPage => setPage(newPage)}
				/>
			</div>
		</section>
	);
};

export default GroupsList;
