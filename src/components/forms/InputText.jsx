import CloseIcon from '../icons/CloseIcon';
import styles from './InputText.module.css';

const InputText = ({
	name,
	label,
	className,
	onClean,
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
				type='text'
				className={`${styles.input} ${error ? styles.borderError : ''}`}
				name={name}
				{...register(name, validate)}
			/>
			<CloseIcon className={styles.icon__reset} onClick={onClean} />
			{error && <span className={styles.error}>{error}</span>}
		</label>
	);
};
export default InputText;
