import styles from './QuestionSelector.module.css';

const QuestionSelector = ({ currentQuestionIndex, total }) => {
	return (
		<div className={styles.selector}>
			<div className={styles.selector__content}>
				<span className={styles.selector__text}>{`Question ${
					currentQuestionIndex + 1
				} of ${total}`}</span>
			</div>
		</div>
	);
};

export default QuestionSelector;
