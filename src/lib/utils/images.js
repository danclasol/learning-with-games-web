export const isImageValid = async src => {
	const img = new Image();
	img.src = src;

	return await new Promise((resolve, reject) => {
		img.onload = () => resolve(true);
		img.onerror = () => resolve(false);
	});
};
