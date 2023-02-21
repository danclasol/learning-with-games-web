import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import IconButton from '../buttons/IconButton.jsx';
import CloseIcon from '../icons/CloseIcon.jsx';
import styles from './Modal.module.css';

const KIND_CLASSNAME = {
	light: styles.light,
	dark: styles.dark
};

const Modal = ({ kind = 'light', className, onClose, children }) => {
	const modalRef = useRef(null);

	const onClickHandlerModal = ev => {
		ev.stopPropagation();

		if (!modalRef.current.contains(ev.target)) {
			onClose();
		}
	};

	useEffect(() => {
		if (!children) return;

		document.body.classList.add(styles.bodyOverflow);

		return () => {
			document.body.classList.remove(styles.bodyOverflow);
		};
	}, [children]);

	if (!children) {
		return;
	}

	return createPortal(
		<div className={styles.overlay} onClick={onClickHandlerModal}>
			<div
				className={`${styles.modal} ${KIND_CLASSNAME[kind]} ${
					className || ''
				}}`}
				ref={modalRef}
			>
				<div className={styles.close}>
					<IconButton icon={CloseIcon} onClick={onClose} />
				</div>
				{children}
			</div>
		</div>,
		document.getElementById('portal')
	);
};

export default Modal;
