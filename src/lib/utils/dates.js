export const formatDate = date => {
	return date.substring(0, 10);
};

export const formatDateLocale = date => {
	return new Date(date).toLocaleDateString();
};
