import Button from '../buttons/Button';
import InputSearch from '../forms/InputSearch';
import styles from './GamesFilters.module.css';

const GamesFilters = ({ search, setSearch }) => {
	const handleOnChange = ev => {
		setSearch(ev.target.value);
	};

	const cleanSearch = () => {
		setSearch('');
	};

	return (
		<div className={styles.filters}>
			<InputSearch
				value={search}
				placeholder='Buscar...'
				onChange={handleOnChange}
				onCleanSearch={cleanSearch}
			/>
			<Button>Create game</Button>
		</div>
	);
};

export default GamesFilters;
