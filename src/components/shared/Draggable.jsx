import React, { useContext, useState } from 'react';
import { DragAndDropContext } from '../../lib/context/DragAndDropContextProvider';
import styles from './Draggable.module.css';

const Draggable = ({ index, swap, children }) => {
	const [isDraggable, setIsDraggable] = useState(false);

	const { dragItem, dragOverItem, drag, dragEnter, dragEnd } =
		useContext(DragAndDropContext);

	const handleDragStart = () => {
		drag(index);
	};

	const handleDragEnter = () => {
		if (isDragging) return;

		dragEnter(index);
	};

	const handleDragEnd = () => {
		if (dragOverItem !== null) {
			dragEnd(swap);
		}

		setIsDraggable(false);
	};

	const toggleIsDraggable = () => {
		setIsDraggable(!isDraggable);
	};

	const isDragging = index === dragItem;
	const isDraggingOver = index === dragOverItem;

	const styleCard = `${styles.draggable} ${
		isDraggable ? styles.dragging : ''
	} ${isDraggingOver ? styles.dragover : ''}`;

	return (
		<div
			draggable={isDraggable}
			onDragStart={handleDragStart}
			onDragEnter={handleDragEnter}
			onDragEnd={handleDragEnd}
			onDragOver={ev => ev.preventDefault()}
			className={styleCard}
		>
			{React.cloneElement(children, { toggleIsDraggable })}
		</div>
	);
};

export default Draggable;
