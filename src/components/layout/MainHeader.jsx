import { useContext } from 'react';
import { AuthContext } from '../../lib/context/AuthContext';
import UserPanel from '../user-panel/UserPanel';
import styles from './MainHeader.module.css';
import Nav from './Nav';

const MainHeader = () => {
	const { accessToken } = useContext(AuthContext);

	if (!accessToken) return;

	return (
		<header className={styles.header}>
			<Nav />
			<UserPanel />
		</header>
	);
};

export default MainHeader;
