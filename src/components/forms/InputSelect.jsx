import ArrowDownIcon from '../icons/ArrowDownIcon';
import styles from './InputSelect.module.css';

const InputSelect = ({ label, className, ...props }) => {
	return (
		<div className={styles.wrapper}>
			{label && <span className={styles.label}>{label}</span>}
			<select {...props} className={styles.select}></select>
			<ArrowDownIcon className={styles.dropdown} />
		</div>
	);
};

export default InputSelect;
