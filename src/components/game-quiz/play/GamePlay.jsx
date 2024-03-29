import { useState } from 'react';
import Button from '../../buttons/Button';
import LinkButton from '../../buttons/LinkButton';
import PencilIcon from '../../icons/PencilIcon';
import RefreshIcon from '../../icons/RefreshIcon';
import styles from './GamePlay.module.css';
import Question from './Question';
import QuestionPoints from './QuestionPoints';
import QuestionSelector from './QuestionSelector';

const GamePlay = ({ game }) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [isResolved, setIsResolved] = useState(false);
	const [userAnswer, setUserAnswer] = useState();
	const [points, setPoints] = useState(0);

	const questions = game?.questions;
	const totalQuestions = questions.length;
	const totalPoints = questions.reduce(
		(total, currentValue) => total + currentValue.points,
		0
	);
	const isLastQuestion = currentQuestionIndex === questions.length - 1;
	const currentQuestion = questions[currentQuestionIndex];

	const moveToQuestion = currentIndex => {
		setIsResolved(false);
		setUserAnswer();
		setCurrentQuestionIndex(currentIndex);
	};

	const resetGame = () => {
		setIsResolved(false);
		setUserAnswer();
		setPoints(0);
		setCurrentQuestionIndex(0);
	};

	return (
		<>
			<section className={styles.container}>
				<div className={styles.game}>
					<div className={styles.game__panel}>
						<h1 className={styles.game__panel__header}>{game.title}</h1>
						<div className={styles.game__panel_content}>
							{totalQuestions === 0 && (
								<div className={styles.message}>
									<p className={styles.message__text}>
										The game doesn&apos;t have any questions.
									</p>
									<div>
										<LinkButton to={`/games/${game.id}/edit`} icon={PencilIcon}>
											Add question
										</LinkButton>
									</div>
								</div>
							)}

							{totalQuestions > 0 && (
								<>
									<div className={styles.game__stats}>
										{isLastQuestion && isResolved && totalPoints !== 0 && (
											<QuestionPoints points={points} total={totalPoints} />
										)}
										<QuestionSelector
											currentQuestionIndex={currentQuestionIndex}
											isLastQuestion={isLastQuestion}
											isResolved={isResolved}
											retryQuestion={() => moveToQuestion(currentQuestionIndex)}
											nextQuestion={() =>
												moveToQuestion(currentQuestionIndex + 1)
											}
											total={totalQuestions}
										/>
									</div>
									<div className={styles.game__questions}>
										<Question
											index={currentQuestionIndex}
											question={currentQuestion}
											userAnswer={userAnswer}
											setUserAnswer={setUserAnswer}
											setPoints={setPoints}
											isResolved={isResolved}
											setIsResolved={setIsResolved}
											nextQuestion={() =>
												moveToQuestion(currentQuestionIndex + 1)
											}
											isLastQuestion={isLastQuestion}
										/>
									</div>
									{isLastQuestion && isResolved && (
										<div className={styles.actions}>
											<Button onClick={resetGame} icon={RefreshIcon}>
												Retry
											</Button>
										</div>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default GamePlay;
