import styles from './Letter.module.css';

const Letter = ({ letter, isResolved, isPressed, checkLetter }) => {
	const handleClick = () => {
		checkLetter(letter);
	};

	return (
		<div
			className={`${styles.card} ${isPressed ? styles.pressed : ''} ${
				isResolved ? styles.resolved : ''
			}`}
			onClick={handleClick}
		>
			<span className={styles.letter}>{letter}</span>
		</div>
	);
};

export default Letter;
