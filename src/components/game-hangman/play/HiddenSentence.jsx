import styles from './HiddenSentence.module.css';
import Word from './Word';

const HiddenSentence = ({ sentence = '', resolvedLetters }) => {
	const worldList = sentence?.split(' ');

	if (sentence === '')
		return <p className={styles.text}>The game doesn&apos;t have any words.</p>;

	return (
		<div className={styles.wrapper}>
			{worldList.map((word, index) => {
				return (
					<Word key={index} word={word} resolvedLetters={resolvedLetters} />
				);
			})}
		</div>
	);
};

export default HiddenSentence;
