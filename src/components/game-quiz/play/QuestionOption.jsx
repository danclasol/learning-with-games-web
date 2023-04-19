import { getLetterOptionFromIndex } from '../../../lib/games/quiz';
import styles from './QuestionOption.module.css';

const KIND_CLASSNAME = {
	selected: {
		index: styles['index--selected'],
		option: styles['option--selected']
	},
	correct: {
		index: styles['index--correct'],
		option: styles['option--correct']
	},
	wrong: { index: styles['index--wrong'], option: styles['option--wrong'] }
};

const QuestionOption = ({
	index,
	option,
	isSelected,
	isResolved,
	isCorrect,
	setUserAnswer
}) => {
	let status = '';

	if (!isResolved && isSelected) status = 'selected';
	if (isResolved && isCorrect) status = 'correct';
	if (isResolved && !isCorrect && isSelected) status = 'wrong';

	const kindClassNames = KIND_CLASSNAME[status];
	const indexStyles = `${styles.index} ${kindClassNames?.index}`;
	const optionStyles = `${styles.option} ${kindClassNames?.option} ${
		isResolved ? styles['option--resolved'] : ''
	}`;

	const handleClick = () => {
		if (isResolved) return;

		setUserAnswer(index);
	};

	return (
		<li key={index} className={optionStyles} onClick={handleClick}>
			<span className={indexStyles}>{getLetterOptionFromIndex(index)}</span>
			<span className={styles.text}>{option.text}</span>
		</li>
	);
};

export default QuestionOption;
