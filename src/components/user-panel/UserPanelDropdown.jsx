import { forwardRef, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../lib/context/AuthContext';
import styles from './UserPanelDropdown.module.css';

const UserPanelDropdown = forwardRef(({ hideDropdown }, ref) => {
	const { logout } = useContext(AuthContext);

	const handleToggle = () => {
		hideDropdown();
	};

	return (
		<div className={styles.dropdown} ref={ref}>
			<ul className={styles.dropdown__list}>
				<li className={styles.dropdown__item}>
					<NavLink
						className={styles.dropdown__link}
						to='/profile'
						onClick={handleToggle}
					>
						Profile
					</NavLink>
				</li>
				<li className={styles.dropdown__item}>
					<NavLink
						className={styles.dropdown__link}
						to='/settings'
						onClick={handleToggle}
					>
						Settings
					</NavLink>
				</li>
				<li className={styles.dropdown__item}>
					<NavLink className={styles.dropdown__link} to='#' onClick={logout}>
						Sign out
					</NavLink>
				</li>
			</ul>
		</div>
	);
});

export default UserPanelDropdown;
