import { useEffect, useRef, useState } from 'react';
import DropdownIcon from '../icons/DropdownIcon';
import Avatar from '../user-panel/Avatar';
import styles from './UserPanel.module.css';
import UserPanelDropdown from './UserPanelDropdown';

const UserPanel = () => {
	const [showDropdown, setShownDropdown] = useState(false);
	const dropdownRef = useRef(null);
	const panelRef = useRef(null);

	useEffect(() => {
		if (!showDropdown) return;

		const handleClickOutside = ev => {
			if (
				!dropdownRef.current.contains(ev.target) &&
				!panelRef.current.contains(ev.target)
			) {
				setShownDropdown(false);
			}
		};

		document.addEventListener('click', handleClickOutside, { capture: true });

		return () =>
			document.removeEventListener('click', handleClickOutside, {
				capture: true
			});
	}, [showDropdown]);

	const onClickHandler = () => {
		setShownDropdown(!showDropdown);
	};

	const hideDropdown = () => {
		setShownDropdown(false);
	};

	const panelStyle = `${styles.panel} ${
		showDropdown ? styles['panel--active'] : ''
	}`;

	const toggleStyle = `${styles.icon} ${
		showDropdown ? styles['icon--toggle'] : ''
	}`;

	const { name, avatar } = {};
	const usernameRender = !name ? 'Invitado' : name;

	return (
		<>
			<div className={panelStyle} onClick={onClickHandler} ref={panelRef}>
				<Avatar
					kind='photo_and_name'
					image={avatar?.url}
					name={usernameRender}
				/>

				<div className={styles.panel__actions}>
					<DropdownIcon className={toggleStyle} />
				</div>
			</div>
			{showDropdown && (
				<UserPanelDropdown ref={dropdownRef} hideDropdown={hideDropdown} />
			)}
		</>
	);
};

export default UserPanel;
