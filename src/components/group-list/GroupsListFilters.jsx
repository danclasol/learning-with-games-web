import InputSearch from '../forms/InputSearch';
import SelectSearch from '../forms/SelectSearch';
import SortIcon from '../icons/SortIcon';
import styles from './GroupsListFilters.module.css';

const GroupsListFilters = ({ search, sortBy, setSearch, setSortBy, reset }) => {
	const handleSearchChange = ev => {
		setSearch(ev.target.value);
	};

	const cleanSearch = () => {
		setSearch('');
	};

	const handleSortByChange = ev => {
		setSortBy(ev.target.value);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.filters}>
				<InputSearch
					value={search}
					placeholder='Search...'
					onChange={handleSearchChange}
					onCleanSearch={cleanSearch}
					className={styles.filter}
				/>

				<div className={styles.filter}>
					<SortIcon className={styles.icon} />
					<SelectSearch
						value={sortBy}
						className={styles.filter}
						onChange={handleSortByChange}
					>
						<option value='0'>By date asc</option>
						<option value='1'>By date desc</option>
						<option value='2'>By name</option>
					</SelectSearch>
				</div>
			</div>
		</div>
	);
};

export default GroupsListFilters;
