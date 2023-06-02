import styles from './Button.module.css';

const KIND_CLASSNAME = {
	primary: styles.primary,
	secondary: styles.secondary
};

const Button = ({
	icon: Icon,
	kind = 'primary',
	className,
	children,
	...props
}) => {
	return (
		<button
			{...props}
			className={`${styles.button} ${KIND_CLASSNAME[kind]} ${className || ''}}`}
		>
			{Icon && <Icon className={styles.icon} />}
			{children}
		</button>
	);
};

export default Button;
