import IconButton from '../../buttons/IconButton';
import ArrowLeftIcon from '../../icons/ArrowLeftIcon';
import ArrowRightIcon from '../../icons/ArrowRightIcon';
import styles from './WordSelector.module.css';

const WordSelector = ({ currentWordIndex, previousWord, nextWord, total }) => {
	const isFirstWord = currentWordIndex === 0;
	const isLastWord = currentWordIndex === total - 1;

	return (
		<div className={styles.selector}>
			<IconButton
				icon={ArrowLeftIcon}
				filled
				onClick={previousWord}
				disabled={isFirstWord}
			/>
			<span className={styles.selector__text}>{`${
				currentWordIndex + 1
			} of ${total}`}</span>
			<IconButton
				icon={ArrowRightIcon}
				filled
				onClick={nextWord}
				disabled={isLastWord}
			/>
		</div>
	);
};

export default WordSelector;
