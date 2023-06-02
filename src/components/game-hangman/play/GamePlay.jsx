import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';
import {
	checkFinishGame,
	checkLetterExists,
	checkLetterPressed
} from '../../../lib/games/hangman';
import Button from '../../buttons/Button';
import LinkButton from '../../buttons/LinkButton';
import PencilIcon from '../../icons/PencilIcon';
import RefreshIcon from '../../icons/RefreshIcon';
import CounterTries from './CounterTries';
import styles from './GamePlay.module.css';
import HiddenSentence from './HiddenSentence';
import Letters from './Letters';
import WordSelector from './WordSelector';

const GamePlay = ({ game }) => {
	const [resolvedLetters, setResolvedLetters] = useState([]);
	const [pressedLetters, setPressedLetters] = useState([]);
	const [isFinished, setIsFinished] = useState(false);
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [moves, setMoves] = useState(0);
	const [isWinner, setIsWinner] = useState(false);

	const words = game?.words;
	const totalWords = words.length;
	const isLastWord = currentWordIndex === words.length - 1;

	const currentWord = words[currentWordIndex]?.word?.toLowerCase();
	const maxTries = words[currentWordIndex]?.maxTries;

	const moveToWord = currentIndex => {
		setResolvedLetters([]);
		setPressedLetters([]);
		setIsFinished(false);
		setCurrentWordIndex(currentIndex);
		setMoves(0);
	};

	const finishGame = ({ isWinner }) => {
		setIsFinished(true);
		setIsWinner(isWinner);

		if (isWinner) {
			confetti({
				particleCount: 250,
				spread: 150
			});
		} else {
			setResolvedLetters(currentWord.split(''));
		}
	};

	const checkLetter = letter => {
		if (totalWords === 0 || isFinished) return;
		if (checkLetterPressed(letter, pressedLetters)) return;

		const newPressedLetter = [...pressedLetters];
		newPressedLetter.push(letter);
		setPressedLetters(newPressedLetter);

		let newMoves = moves;

		if (checkLetterExists(letter, currentWord)) {
			const newResolvedLetter = [...resolvedLetters];
			newResolvedLetter.push(letter);
			setResolvedLetters(newResolvedLetter);

			if (checkFinishGame(currentWord, newResolvedLetter)) {
				finishGame({ isWinner: true, moves: newMoves });
			}
		} else {
			setMoves(++newMoves);
		}

		if (newMoves === maxTries) {
			finishGame({ isWinner: false, moves: newMoves });
		}
	};

	useEffect(() => {
		return () => confetti.reset();
	}, []);

	return (
		<section className={styles.container}>
			<div className={styles.game}>
				<div className={styles.game__panel}>
					<div className={styles.game__panel__header}>
						<h1 className={styles.title}>{game.title}</h1>
					</div>
					<div className={styles.game__panel__content}>
						{totalWords === 0 && (
							<div className={styles.message}>
								<p className={styles.message__text}>
									The game doesn&apos;t have any words.
								</p>
								<div>
									<LinkButton to={`/games/${game.id}/edit`} icon={PencilIcon}>
										Add words
									</LinkButton>
								</div>
							</div>
						)}

						{totalWords > 0 && (
							<>
								<WordSelector
									currentWordIndex={currentWordIndex}
									isLastWord={isLastWord}
									previousWord={() => moveToWord(currentWordIndex - 1)}
									nextWord={() => moveToWord(currentWordIndex + 1)}
									total={totalWords}
								/>
								<HiddenSentence
									sentence={currentWord}
									resolvedLetters={resolvedLetters}
									isFinished={isFinished}
									isWinner={isWinner}
								/>
								<CounterTries maxTries={maxTries} tries={moves} />
								{isFinished && (
									<div className={styles.actions}>
										<Button
											onClick={() => moveToWord(currentWordIndex)}
											icon={RefreshIcon}
										>
											Retry
										</Button>
									</div>
								)}
							</>
						)}
					</div>
				</div>

				<div className={styles.game__letters}>
					<Letters
						resolvedLetters={resolvedLetters}
						pressedLetters={pressedLetters}
						checkLetter={checkLetter}
					/>
				</div>
			</div>
		</section>
	);
};

export default GamePlay;
