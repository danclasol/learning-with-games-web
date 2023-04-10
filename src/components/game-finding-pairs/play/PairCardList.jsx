import PairCard from './PairCard';
import styles from './PairCardList.module.css';

const PairCardList = ({
	pairs,
	resolvedCards,
	flippedCards,
	setFlippledCards
}) => {
	const checkIsFlipped = index =>
		flippedCards.includes(index) || resolvedCards.includes(pairs[index].text);

	const checkIsResolved = text => resolvedCards.includes(text);

	const handleCardClick = index => {
		if (flippedCards.length === 1) {
			setFlippledCards(prev => [...prev, index]);
		} else {
			setFlippledCards([index]);
		}
	};

	return (
		<div className={styles.cards}>
			{pairs.map((pair, index) => (
				<PairCard
					key={index}
					id={pair.id}
					text={pair.text}
					image={pair.image}
					index={index}
					isResolved={checkIsResolved(pair.text)}
					isFlipped={checkIsFlipped(index)}
					onClick={handleCardClick}
				>
					{pair.id}
				</PairCard>
			))}
		</div>
	);
};

export default PairCardList;
