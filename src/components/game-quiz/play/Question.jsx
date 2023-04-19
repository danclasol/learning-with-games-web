import Button from '../../buttons/Button';
import styles from './Question.module.css';
import QuestionOption from './QuestionOption';

const Question = ({
	index,
	question,
	userAnswer,
	setUserAnswer,
	setPoints,
	isResolved,
	setIsResolved,
	nextQuestion,
	isLastQuestion
}) => {
	const onClickAnswerHandler = () => {
		if (userAnswer === question.answer) {
			setPoints(prevState => prevState + question.points);
		}

		setIsResolved(true);
	};

	const onClickNextHandler = () => {
		nextQuestion();
	};

	return (
		<article className={styles.question}>
			<header className={styles.question__header}>
				<h3 className={styles.question__title}>{`${index + 1}) ${
					question.question
				}`}</h3>
			</header>
			<main className={styles.question__body}>
				<ul className={styles.options}>
					{question.options.map((option, index) => (
						<QuestionOption
							key={index}
							index={index}
							option={option}
							isSelected={userAnswer === index}
							isResolved={isResolved}
							isCorrect={question.answer === index}
							setUserAnswer={setUserAnswer}
						/>
					))}
				</ul>
			</main>
			<footer className={styles.question__footer}>
				{!isResolved && (
					<Button kind='secondary' onClick={onClickAnswerHandler}>
						Check
					</Button>
				)}
				{isResolved && (
					<Button onClick={onClickNextHandler}>
						{isLastQuestion ? 'Finish' : 'Next'}
					</Button>
				)}
			</footer>
		</article>
	);
};

export default Question;
