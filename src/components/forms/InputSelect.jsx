import ArrowDownIcon from '../icons/ArrowDownIcon';
import styles from './InputSelect.module.css';

const InputSelect = ({
	name,
	label,
	className,
	register,
	validate,
	error,
	...props
}) => {
	const styleSelect = `${styles.input} ${error && styles.borderError}`;

	return (
		<div className={styles.wrapper}>
			<div className={styles.select}>
				{label && <span className={styles.label}>{label}</span>}
				<select
					{...props}
					className={styleSelect}
					name={name}
					{...register(name, validate)}
				></select>
				<ArrowDownIcon className={styles.dropdown} />
			</div>
			{error && <span className={styles.error}>{error}</span>}
		</div>
	);
};
export default InputSelect;
