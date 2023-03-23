export const isImageValid = async src => {
	const img = new Image();
	img.src = src;

	const res = await new Promise(resolve => {
		img.onerror = () => resolve('Invalid image');
		img.onload = () => resolve(true);
	});

	console.log({ res });

	return res;
};
