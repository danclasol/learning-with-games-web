import CloseIcon from '../icons/CloseIcon';
import SearchIcon from '../icons/SearchIcon';
import styles from './InputSearch.module.css';

const InputSearch = ({ className, onCleanSearch, ...props }) => {
	return (
		<div className={`${styles.wrapper} ${className || ''}`}>
			<SearchIcon className={styles.icon__search} />
			<input {...props} type='text' className={styles.input} />
			<CloseIcon className={styles.icon__cancel} onClick={onCleanSearch} />
		</div>
	);
};

export default InputSearch;
