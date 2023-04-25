import PairCard from './PairCard';
import styles from './PairCardList.module.css';

const PairCardList = ({
	mode,
	isFinish,
	pairs,
	resolvedCards,
	flippedCards,
	onClickCard
}) => {
	const checkIsFlipped = index =>
		flippedCards.includes(index) || resolvedCards.includes(pairs[index].text);

	const checkIsResolved = text => resolvedCards.includes(text);

	if (pairs.length === 0) return;

	return (
		<div className={styles.cards}>
			{pairs.map((pair, index) => (
				<PairCard
					key={index}
					mode={mode}
					id={pair.id}
					text={pair.text}
					image={pair.image}
					index={index}
					isResolved={checkIsResolved(pair.text)}
					isFlipped={checkIsFlipped(index)}
					isFinish={isFinish}
					onClick={() => onClickCard(index)}
				>
					{pair.id}
				</PairCard>
			))}
		</div>
	);
};

export default PairCardList;
