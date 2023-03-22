import ArrowDownIcon from '../icons/ArrowDownIcon';
import styles from './InputSelect.module.css';

const SelectSearch = ({ name, label, className, ...props }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.select}>
				{label && <span className={styles.label}>{label}</span>}
				<select {...props} className={styles.input} name={name}></select>
				<ArrowDownIcon className={styles.dropdown} />
			</div>
		</div>
	);
};
export default SelectSearch;
