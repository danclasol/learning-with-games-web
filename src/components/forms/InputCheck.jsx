import CheckIcon from '../icons/CheckIcon';
import styles from './InputCheck.module.css';

const InputCheck = ({ name, label, className, register, ...props }) => {
	return (
		<label className={`${styles.label} ${className || ''}`}>
			<div className={styles.checkbox}>
				<input
					{...props}
					type='checkbox'
					className={styles.input}
					name={name}
					{...register(name)}
				></input>
				<CheckIcon className={styles.check} />
			</div>
			<div className={styles.text}>
				<span>{label}</span>
			</div>
		</label>
	);
};

export default InputCheck;
