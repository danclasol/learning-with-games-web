import { generateAlphabet } from '../../../lib/games/hangman';
import Letter from './Letter';
import styles from './Letters.module.css';

const LETTERS = generateAlphabet();

const Letters = ({ resolvedLetters, pressedLetters, checkLetter }) => {
	const isResolved = letter => {
		return resolvedLetters.find(item => item === letter);
	};

	const isPressed = letter => {
		return pressedLetters.find(item => item === letter);
	};

	return (
		<div className={styles.wrapper}>
			{LETTERS.map((letter, index) => (
				<Letter
					key={index}
					letter={letter}
					isResolved={isResolved(letter)}
					isPressed={isPressed(letter)}
					checkLetter={checkLetter}
				/>
			))}
		</div>
	);
};

export default Letters;
