export const LIST_GAMES = [
	{ type: 'finding-pairs', name: 'Finding Pairs' },
	{ type: 'hangman', name: 'Hangman' },
	{ type: 'quiz', name: 'Quiz' }
];

export const IMAGES_GAMES_TYPES = {
	'finding-pairs': '/images/game-cards.png',
	hangman: '/images/game-letters.png',
	quiz: '/images/game-questions.png'
};

export const getTypeNameGame = type => {
	return LIST_GAMES.find(item => item.type === type).name;
};
