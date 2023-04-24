import IconButton from '../../buttons/IconButton';
import ArrowRightIcon from '../../icons/ArrowRightIcon';
import RefreshIcon from '../../icons/RefreshIcon';
import styles from './WordSelector.module.css';

const WordSelector = ({
	currentWordIndex,
	retryWord,
	nextWord,
	total,
	isFinished
}) => {
	const isLastWord = currentWordIndex === total - 1;

	return (
		<div className={styles.selector}>
			<IconButton
				icon={RefreshIcon}
				filled
				onClick={retryWord}
				disabled={!isFinished}
			/>
			<span className={styles.selector__text}>{`${
				currentWordIndex + 1
			} of ${total}`}</span>
			<IconButton
				icon={ArrowRightIcon}
				filled
				onClick={nextWord}
				disabled={isLastWord || !isFinished}
			/>
		</div>
	);
};

export default WordSelector;
