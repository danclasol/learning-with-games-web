import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../lib/context/AuthContext';
import GameIcon from '../icons/GameIcon';
import HomeIcon from '../icons/HomeIcon';
import UserPanel from '../user-panel/UserPanel';
import styles from './MainHeader.module.css';

const MainHeader = () => {
	const { accessToken } = useContext(AuthContext);

	if (!accessToken) return;

	return (
		<header className={styles.header}>
			<div className={styles.header__links}>
				<NavLink
					to=''
					className={({ isActive }) =>
						`${styles.link} ${isActive ? styles['link--active'] : ''}`
					}
				>
					<HomeIcon className={styles.icon}></HomeIcon>
					Home
				</NavLink>
				<NavLink
					to='games'
					className={({ isActive }) =>
						`${styles.link} ${isActive ? styles['link--active'] : ''}`
					}
				>
					<GameIcon className={styles.icon}></GameIcon>
					Games
				</NavLink>
			</div>
			<UserPanel />
		</header>
	);
};

export default MainHeader;
