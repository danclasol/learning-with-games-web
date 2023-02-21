import styles from './Button.module.css';

const KIND_CLASSNAME = {
	primary: styles.primary,
	secondary: styles.secondary
};

const Button = ({ kind = 'primary', className, ...props }) => {
	return (
		<button
			{...props}
			className={`${styles.button} ${KIND_CLASSNAME[kind]} ${className || ''}}`}
		></button>
	);
};

export default Button;
