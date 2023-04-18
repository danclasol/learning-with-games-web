export const getLetterOptionFromIndex = index => {
	return String.fromCharCode(...Array(123).keys())
		.slice(97)
		.split('')
		.slice(index, index + 1)[0]
		.toUpperCase();
};
