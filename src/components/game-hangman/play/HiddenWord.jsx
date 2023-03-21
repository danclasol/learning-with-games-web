import styles from './HiddenWord.module.css';

const HiddenWord = ({ word = '', resolvedLetters }) => {
	const letters = word.split('');

	const isResolved = letter => {
		return resolvedLetters.find(item => item === letter);
	};

	return (
		<div className={styles.wrapper}>
			{letters.map((letter, index) => (
				<div
					key={index}
					className={`${styles.card} ${
						isResolved(letter) ? '' : styles['card--hidden']
					}`}
				>
					<span
						className={`${styles.letter} ${
							isResolved(letter) ? '' : styles['letter--hidden']
						}`}
					>
						{letter}
					</span>
				</div>
			))}
		</div>
	);
};

export default HiddenWord;
