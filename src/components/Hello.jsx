import styles from './Hello.module.css';

const Hello = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Hello World!</h1>

			<p className={styles.text}>
				Template for React.js projects build with Vite
			</p>
		</div>
	);
};

export default Hello;
