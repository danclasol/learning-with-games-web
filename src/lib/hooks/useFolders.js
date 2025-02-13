import { useEffect, useState } from 'react';
import { getUserGames } from '../api/games';
export const useGames = ({
	foldersInitial,
	groupId,
	collectionId,
	filters
}) => {
	const [folders, setFolders] = useState({
		data: [],
		count: 0
	});

	const setData = (newData, newCount) =>
		setFolders({
			data: newData,
			count: newCount
		});

	useEffect(() => {
		const controller = new AbortController();

		loadGames({
			groupId,
			collectionId,
			setData,
			filters,
			signal: controller.signal
		});

		return () => controller.abort();
	}, [groupId, collectionId, filters]);

	return {
		folders: folders.data,
		count: folders.count,
		refresh
	};
};

const filterFolders = async ({ groupId, collectionId, setData, filters }) => {
	const { games, count } = await getUserGames({
		groupId,
		collectionId,
		filters
	});

	if (games) {
		setData(games, count);
	}
};

const foldersFiltered = foldersInit.filter(item => item.parentId === parentId);

const foldersSorted = [...foldersFiltered].sort((a, b) =>
	a.name.localeCompare(b.name)
);
