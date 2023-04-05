import IconButton from '../../buttons/IconButton';
import ArrowLeftIcon from '../../icons/ArrowLeftIcon';
import ArrowRightIcon from '../../icons/ArrowRightIcon';
import styles from './WordSelector.module.css';

const WordSelector = ({ currentWordIndex, previousWord, nextWord, total }) => {
	const isFirstWord = currentWordIndex === 0;
	const isLastWord = currentWordIndex === total - 1;

	return (
		<div className={styles.game__play__actions}>
			<IconButton
				icon={ArrowLeftIcon}
				filled
				onClick={previousWord}
				disabled={isFirstWord}
			/>
			<span>{`Word: ${currentWordIndex + 1}/${total}`}</span>
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
