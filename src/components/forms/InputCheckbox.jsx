import CheckIcon from '../icons/CheckIcon';
import styles from './InputCheckbox.module.css';

const InputCheckbox = ({ label, className, ...props }) => {
	return (
		<div className={styles.wrapper}>
			<label className={`${styles.label} ${className || ''}`}>
				<input {...props} type="checkbox" className={styles.input}></input>
				<CheckIcon className={styles.check} />
			</label>
			{label && <span className={styles.text}>{label}</span>}{' '}
		</div>
	);
};

export default InputCheckbox;
