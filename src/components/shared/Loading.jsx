import styles from './Loading.module.css';
import LoadingSpinner from './LoadingSpinner';

const Loading = ({ label }) => {
	return (
		<div className={styles.wrapper}>
			{label && <span className={styles.title}>{label}</span>}
			<LoadingSpinner />
		</div>
	);
};

export default Loading;
