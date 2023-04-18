import { getLetterOptionFromIndex } from '../../../lib/games/quiz';
import styles from './QuestionOption.module.css';

const QuestionOption = ({
	index,
	option,
	correctAnswer,
	isSelected,
	isResolved,
	setUserAnswer
}) => {
	const optionStyle = `${styles.option}
	${isSelected ? styles.userAnswer : ''}
	${isResolved ? styles['option--resolved'] : ''}
	${isResolved && correctAnswer === index ? styles.correctAnswer : ''}
    ${
			isResolved && correctAnswer !== index && isSelected
				? styles.incorrectAnswer
				: ''
		}`;

	const handleClick = () => {
		if (isResolved) return;

		setUserAnswer(index);
	};

	return (
		<li key={index} className={optionStyle} onClick={handleClick}>
			{`${getLetterOptionFromIndex(index)}) ${option.text}`}
		</li>
	);
};

export default QuestionOption;
