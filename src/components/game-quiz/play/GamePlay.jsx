import { useState } from 'react';
import GamePlayActions from '../../games/GamePlayActions';
import Modal from '../../shared/Modal';
import FinishedGame from './FinishedGame';
import styles from './GamePlay.module.css';
import Question from './Question';

const GamePlay = ({ game }) => {
	const { modalContent, closeModal, openModal } = useModal();
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
		if (isLastQuestion) {
			openModal({ points, resetGame });
		} else {
			setIsResolved(false);
			setUserAnswer();
			setCurrentQuestionIndex(currentIndex);
		}
	};

	const resetGame = () => {
		setIsResolved(false);
		setUserAnswer();
		setPoints(0);
		setCurrentQuestionIndex(0);
	};

	return (
		<>
			<Modal onClose={closeModal}>{modalContent}</Modal>
			<section className={styles.container}>
				<GamePlayActions resetGame={resetGame} />
				<div className={styles.game}>
					<h1 className={styles.title}>{game.title}</h1>

					{totalQuestions === 0 && (
						<p className={styles.text}>
							The game doesn&apos;t have any questions.
						</p>
					)}

					{totalQuestions !== 0 && (
						<>
							<div className={styles.stats}>
								<span>{`Question: ${
									currentQuestionIndex + 1
								} / ${totalQuestions}`}</span>
								<span
									className={styles.stat}
								>{`Points: ${points} / ${totalPoints}`}</span>
							</div>

							<div className={styles.questions}>
								<Question
									index={currentQuestionIndex}
									question={currentQuestion}
									userAnswer={userAnswer}
									setUserAnswer={setUserAnswer}
									setPoints={setPoints}
									isResolved={isResolved}
									setIsResolved={setIsResolved}
									nextQuestion={() => moveToQuestion(currentQuestionIndex + 1)}
									isLastQuestion={isLastQuestion}
								/>
							</div>
						</>
					)}
				</div>
			</section>
		</>
	);
};

const useModal = () => {
	const [modalContent, setModalContent] = useState();

	const closeModal = () => {
		setModalContent();
	};

	const openModal = ({ points, resetGame }) => {
		setModalContent(
			<FinishedGame
				points={points}
				resetGame={resetGame}
				closeModal={closeModal}
			/>
		);
	};

	return {
		modalContent,
		closeModal,
		openModal
	};
};

export default GamePlay;
