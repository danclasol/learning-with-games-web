import { useNavigate } from 'react-router-dom';
import Button from '../buttons/Button';
import styles from './MainHeader.module.css';

const MainHeader = () => {
	const navigate = useNavigate();

	const handlerOnClick = () => {
		navigate(`/games/`);
	};

	return (
		<header className={styles.header}>
			<Button onClick={handlerOnClick}>My Games</Button>
		</header>
	);
};

export default MainHeader;
