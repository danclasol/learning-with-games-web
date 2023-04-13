export const prepareCards = (pairs = []) => {
	return suffle([...pairs, ...pairs]);
};

export const suffle = (pairs = []) => {
	return [...pairs].sort(() => Math.random() - 0.5);
};

export const checkDeckFinished = (resolvedCards, numberPairs) => {
	if (numberPairs === 0) return;

	return resolvedCards.length === numberPairs / 2;
};
