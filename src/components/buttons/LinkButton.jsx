import { Link } from 'react-router-dom';
import styles from './LinkButton.module.css';

const KIND_CLASSNAME = {
	primary: styles.primary,
	secondary: styles.secondary
};

const LinkButton = ({
	icon: Icon,
	kind = 'primary',
	to,
	className,
	children,
	...props
}) => {
	return (
		<Link
			{...props}
			to={to}
			className={`${styles.button} ${KIND_CLASSNAME[kind]} ${className || ''}}`}
		>
			{Icon && <Icon className={styles.icon} />}
			{children}
		</Link>
	);
};

export default LinkButton;
