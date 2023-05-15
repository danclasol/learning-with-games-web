import { useState } from 'react';

export const useDrag = swap => {
	const [dragItem, setDragItem] = useState();
	const [dragOverItem, setDragOverItem] = useState();

	const drag = position => {
		setDragItem(position);
	};

	const dragEnter = position => {
		setDragOverItem(position);
	};

	const dragEnd = () => {
		if (dragItem !== null && dragOverItem !== null) {
			swap(dragItem, dragOverItem);
		}

		setDragItem(null);
		setDragOverItem(null);
	};

	return { dragItem, dragOverItem, drag, dragEnter, dragEnd };
};
