import { createContext } from 'react';
import { useDrag } from '../hooks/useDrag';

export const DragAndDropContext = createContext();

export function DragAndDropContextProvider({ children, swap }) {
	const { dragItem, dragOverItem, drag, dragEnter, dragEnd } = useDrag(swap);

	return (
		<DragAndDropContext.Provider
			value={{ dragItem, dragOverItem, drag, dragEnter, dragEnd }}
		>
			{children}
		</DragAndDropContext.Provider>
	);
}
