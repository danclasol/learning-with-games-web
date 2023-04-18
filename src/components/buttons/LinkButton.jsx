import { Link } from 'react-router-dom';
import styles from './LinkButton.module.css';

const KIND_CLASSNAME = {
	primary: styles.primary,
	secondary: styles.secondary
};

const LinkButton = ({ kind = 'primary', to, className, ...props }) => {
	return (
		<Link
			{...props}
			to={to}
			className={`${styles.button} ${KIND_CLASSNAME[kind]} ${className || ''}}`}
		></Link>
	);
};

export default LinkButton;
