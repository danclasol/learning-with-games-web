import { FINDING_PAIRS_MODES } from '../../constants/findingPairsModes';

export const prepareCards = ({ pairs = [], mode = 'duplicate_images' }) => {
	if (mode === FINDING_PAIRS_MODES.NO_DUPLICATE_IMAGES.type) {
		const pairsImage = pairs.map(pair => {
			return { ...pair };
		});
		const pairsText = pairs.map(pair => {
			return { ...pair, image: null };
		});

		return suffle([...pairsImage, ...pairsText]);
	}

	return suffle([...pairs, ...pairs]);
};

export const suffle = (pairs = []) => {
	return [...pairs].sort(() => Math.random() - 0.5);
};

export const checkDeckFinished = (resolvedCards, numberPairs) => {
	if (numberPairs === 0) return;

	return resolvedCards.length === numberPairs / 2;
};
