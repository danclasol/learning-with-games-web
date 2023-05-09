import { Link } from 'react-router-dom';
import styles from './IconButton.module.css';

const CLASSNAMES_KIND = {
	primary: {
		normal: styles.primary,
		filled: styles.primaryFilled
	},
	secondary: {
		normal: styles.secondary,
		filled: styles.secondaryFilled
	}
};

const CLASSNAMES_SIZE = {
	large: {
		button: styles.large,
		icon: styles.iconLarge
	},
	medium: {
		button: styles.medium,
		icon: styles.iconMedium
	},
	small: {
		button: styles.small,
		icon: styles.iconSmall
	}
};

const LinkIconButton = ({
	kind = 'primary',
	size = 'medium',
	filled,
	className,
	icon: Icon,
	...props
}) => {
	const kindClassNames = CLASSNAMES_KIND[kind];
	const classNameKey = filled ? 'filled' : 'normal';
	const kindClassName = kindClassNames[classNameKey];

	const sizeClassNames = CLASSNAMES_SIZE[size];
	const sizeButtonClassName = sizeClassNames.button;
	const sizeIconClassName = sizeClassNames.icon;

	return (
		<Link
			{...props}
			className={`${styles.button} ${kindClassName} ${sizeButtonClassName} ${className}`}
		>
			<Icon className={`${styles.icon} ${sizeIconClassName}`}></Icon>
		</Link>
	);
};

export default LinkIconButton;
