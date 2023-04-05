import ErrorIcon from '../icons/ErrorIcon';
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ error }) => (
	<span className={styles.error}>
		<ErrorIcon className={styles.icon} />
		{error}
	</span>
);

export default ErrorMessage;
