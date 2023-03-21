import styles from './GamePlay.module.css';

const GamePlay = ({ game }) => {
	return (
		<section className={styles.container}>
			<h1 className={styles.title}>{game.title}</h1>
			<h2>Hangman</h2>
		</section>
	);
};

export default GamePlay;
