import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import StarIcon from '../../icons/StarIcon';
import styles from './QuestionPoints.module.css';

const QuestionPoints = ({ points, total }) => {
	const totalMark = (points / total) * 100;
	const { text, markStyle } = getTotalMarkStyle(totalMark);

	useEffect(() => {
		if (totalMark < 50) return;

		confetti({
			particleCount: 5 * totalMark,
			spread: 360
		});

		return () => {
			confetti.reset();
		};
	}, [totalMark]);

	return (
		<div className={styles.selector}>
			<div className={`${styles.selector__content} ${markStyle}`}>
				<StarIcon className={styles.icon} />
				<span
					className={styles.selector__text}
				>{`${totalMark} % (${text})`}</span>
			</div>
		</div>
	);
};

const getTotalMarkStyle = totalMark => {
	if (totalMark < 50) {
		return { text: 'Bad', markStyle: styles['mark--bad'] };
	}
	if (totalMark < 70) {
		return { text: 'Good', markStyle: styles['mark--good'] };
	}
	if (totalMark < 100) {
		return { text: 'Very Good', markStyle: styles['mark--very-good'] };
	}
	if (totalMark === 100) {
		return { text: 'Perfect', markStyle: styles['mark--perfect'] };
	}
};

export default QuestionPoints;
