import styles from './InputSwitch.module.css';

const InputSwitch = ({ label, className, ...props }) => {
	console.log({ className });
	return (
		<label className={`${styles.toggle} ${className}`}>
			<input {...props} type='checkbox' className={styles.toggle__checkbox} />
			<div className={styles.toggle__switch}></div>
			{label && <span className={styles.toggle__label}>{label}</span>}
		</label>
	);
};

export default InputSwitch;
