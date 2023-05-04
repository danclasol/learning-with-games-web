import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../lib/context/AuthContext';
import GameIcon from '../icons/GameIcon';
import GroupIcon from '../icons/GroupIcon';
import UserPanel from '../user-panel/UserPanel';
import styles from './MainHeader.module.css';

const MainHeader = () => {
	const { accessToken } = useContext(AuthContext);

	if (!accessToken) return;

	return (
		<header className={styles.header}>
			<div className={styles.header__links}>
				{/* <NavLink
					to=''
					className={({ isActive }) =>
						`${styles.link} ${isActive ? styles['link--active'] : ''}`
					}
				>
					<HomeIcon className={styles.icon}></HomeIcon>
					Home
				</NavLink> */}
				<NavLink
					to='groups'
					className={({ isActive }) =>
						`${styles.link} ${isActive ? styles['link--active'] : ''}`
					}
				>
					<GroupIcon className={styles.icon} />
					Groups
				</NavLink>

				<NavLink
					to='games'
					className={({ isActive }) =>
						`${styles.link} ${isActive ? styles['link--active'] : ''}`
					}
				>
					<GameIcon className={styles.icon} />
					Games
				</NavLink>
			</div>
			<UserPanel />
		</header>
	);
};

export default MainHeader;
