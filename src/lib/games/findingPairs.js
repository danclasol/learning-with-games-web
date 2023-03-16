export const prepareCards = (pairs = []) => {
	return suffle([...pairs, ...pairs]);
};

export const suffle = (pairs = []) => {
	return [...pairs].sort(() => Math.random() - 0.5);
};
