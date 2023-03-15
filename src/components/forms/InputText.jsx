import styles from './InputText.module.css';

const InputText = ({ name, label, className, register, error, ...props }) => {
	return (
		<label className={`${styles.wrapper} ${className || ''}`}>
			<span className={styles.label}>{label}</span>
			<input
				{...props}
				type='text'
				className={`${styles.input} ${error ? styles.borderError : ''}`}
				{...register(name, {
					required: 'Field required',
					minLenght: 4
				})}
			/>
			{error && <span className={styles.error}>{error}</span>}
		</label>
	);
};

export default InputText;
