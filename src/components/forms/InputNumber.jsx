import styles from './InputNumber.module.css';

const InputNumber = ({
	name,
	label,
	className,
	register,
	validate,
	error,
	...props
}) => {
	return (
		<label className={`${styles.container} ${className}`}>
			<span className={styles.label}>{label}</span>
			<input
				{...props}
				type='number'
				className={`${styles.input} ${error ? styles.borderError : ''}`}
				name={name}
				{...register(name, validate)}
			/>
			{error && <span className={styles.error}>{error}</span>}
		</label>
	);
};

export default InputNumber;
