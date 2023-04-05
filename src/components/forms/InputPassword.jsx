import styles from './InputText.module.css';

const InputPassword = ({
	name,
	label,
	className,
	register,
	validate,
	error,
	...props
}) => {
	return (
		<label className={`${styles.wrapper} ${className || ''}`}>
			<span className={styles.label}>{label}</span>
			<input
				{...props}
				type='password'
				autoComplete='on'
				className={`${styles.input} ${error ? styles.borderError : ''}`}
				name={name}
				{...register(name, validate)}
			/>
			{error && <span className={styles.error}>{error}</span>}
		</label>
	);
};
export default InputPassword;
