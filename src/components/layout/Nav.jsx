import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import IconButton from '../buttons/IconButton';
import CloseIcon from '../icons/CloseIcon';
import GameIcon from '../icons/GameIcon';
import GroupIcon from '../icons/GroupIcon';
import NavIcon from '../icons/NavIcon';
import styles from './Nav.module.css';

const Nav = () => {
	const [showMenu, setShowMenu] = useState(false);

	const handleToggle = () => {
		setShowMenu(!showMenu);
	};

	return (
		<nav className={styles.nav}>
			<div className={styles.nav__toggle}>
				<IconButton
					icon={showMenu ? CloseIcon : NavIcon}
					onClick={handleToggle}
				/>
			</div>
			<div className={styles.nav__links}>
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
			{showMenu && (
				<ul className={styles.menu}>
					<Link
						className={styles.menu__item}
						to='groups'
						onClick={() => setShowMenu(false)}
					>
						Groups
					</Link>
					<Link
						className={styles.menu__item}
						to='games'
						onClick={() => setShowMenu(false)}
					>
						Games
					</Link>
				</ul>
			)}
		</nav>
	);
};

export default Nav;
