import { PAGINATION } from '../../constants/pagination';
import InputSelect from '../forms/InputSelect';
import styles from './GamesListPagination.module.css';
import PageSelector from './PageSelector';

const GamesListPagination = ({
	page,
	itemsPerPage,
	setPage,
	setItemsPerPage,
	total
}) => {
	const handleOnChange = ev => {
		console.log('newItemsPerPage', ev.target.value);
		console.log(setPage);
		setItemsPerPage(ev.target.value);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.itemsPerPage}>
				<InputSelect value={itemsPerPage} onChange={handleOnChange}>
					{PAGINATION.ITEMS_PER_PAGE_VALUES.map(item => (
						<option key={item} value={item}>
							{item}
						</option>
					))}
				</InputSelect>
				<span className={styles.text}>Elementos por página</span>
			</div>
			<PageSelector
				page={page}
				totalPages={Math.ceil(total / itemsPerPage)}
				setPage={newPage => setPage(newPage)}
			/>
		</div>
	);
};

export default GamesListPagination;
