import styles from './InputSwitch.module.css';

const InputSwitch = ({ name, label, className, register, ...props }) => {
	return (
		<label className={`${styles.toggle} ${className}`}>
			<input
				{...props}
				type='checkbox'
				className={styles.toggle__checkbox}
				name={name}
				{...register(name)}
			/>
			<div className={styles.toggle__switch}></div>
			{label && <span className={styles.toggle__label}>{label}</span>}
		</label>
	);
};

export default InputSwitch;
