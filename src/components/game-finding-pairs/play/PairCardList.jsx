import PairCard from './PairCard';
import styles from './PairCardList.module.css';

const PairCardList = ({ pairs, resolvedCards, flippedCards, onClickCard }) => {
	const checkIsFlipped = index =>
		flippedCards.includes(index) || resolvedCards.includes(pairs[index].text);

	const checkIsResolved = text => resolvedCards.includes(text);

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
					onClick={() => onClickCard(index)}
				>
					{pair.id}
				</PairCard>
			))}
		</div>
	);
};

export default PairCardList;
