import confetti from 'canvas-confetti';
import { useState } from 'react';
import {
	checkFinishGame,
	checkLetterExists,
	checkLetterPressed
} from '../../../lib/games/hangman';
import Button from '../../buttons/Button';
import GamePlayActions from '../../games/GamePlayActions';
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
	const isFirstWord = currentWordIndex === 0;
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

	return (
		<>
			<section className={styles.container}>
				<GamePlayActions resetGame={() => moveToWord(currentWordIndex)} />
				<div className={styles.game}>
					<h1 className={styles.title}>{game.title}</h1>
					{totalWords > 1 && (
						<WordSelector
							currentWordIndex={currentWordIndex}
							isFirstWord={isFirstWord}
							isLastWord={isLastWord}
							previousWord={() => moveToWord(currentWordIndex - 1)}
							nextWord={() => moveToWord(currentWordIndex + 1)}
							total={totalWords}
						/>
					)}
					<HiddenSentence
						sentence={currentWord}
						resolvedLetters={resolvedLetters}
						isFinished={isFinished}
						isWinner={isWinner}
					/>
					{totalWords > 0 && <CounterTries maxTries={maxTries} tries={moves} />}
					{isFinished && (
						<div className={styles.finish}>
							<h2 className={styles.finish__title}>
								{isWinner ? 'You win!!' : 'You loose'}
							</h2>
							<div className={styles.finish__actions}>
								{!isLastWord && (
									<Button onClick={() => moveToWord(currentWordIndex + 1)}>
										Next word
									</Button>
								)}
								<Button
									kind='secondary'
									onClick={() => moveToWord(currentWordIndex)}
								>
									Reset
								</Button>
							</div>
						</div>
					)}
					<Letters
						resolvedLetters={resolvedLetters}
						pressedLetters={pressedLetters}
						checkLetter={checkLetter}
					/>
				</div>
			</section>
		</>
	);
};

export default GamePlay;
