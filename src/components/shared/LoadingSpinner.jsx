import styles from './LoadingSpinner.module.css';

function LoadingSpinner({ size }) {
	return (
		<div
			className={`${styles.spinner} ${
				size === 'small' ? styles['spinner--small'] : styles['spinner--big']
			}`}
		></div>
	);
}

export default LoadingSpinner;
