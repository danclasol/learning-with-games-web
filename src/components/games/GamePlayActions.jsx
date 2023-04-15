import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../buttons/Button';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import MaximamizeIcon from '../icons/MaximizeIcon';
import MinimizeIcon from '../icons/MinimizeIcon';
import RefreshIcon from '../icons/RefreshIcon';
import styles from './GamePlayActions.module.css';

const GamePlayActions = ({ resetGame }) => {
	const navigate = useNavigate();
	const [isFullScreen, setIsFullScreen] = useState(false);

	const handleClicGoBack = () => {
		navigate(-1);
	};

	const toggleFullScreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		} else if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	};

	const exitFullScreen = () => {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	};

	useEffect(() => {
		const fullScreenChanged = ev => {
			setIsFullScreen(prevState => !prevState);
		};

		document.addEventListener('fullscreenchange', fullScreenChanged);

		return () => {
			exitFullScreen();
			document.removeEventListener('fullscreenchange', fullScreenChanged);
		};
	}, []);

	return (
		<div className={styles.actions}>
			<div className={styles.actions__buttons}>
				<Button onClick={handleClicGoBack}>
					<div className={styles.button__content}>
						<ArrowLeftIcon className={styles.icon} />
						<span className={styles.button__text}>Go back</span>
					</div>
				</Button>
			</div>
			<div className={styles.actions__buttons}>
				<Button onClick={toggleFullScreen}>
					<div className={styles.button__content}>
						{!isFullScreen ? (
							<MaximamizeIcon className={styles.icon} />
						) : (
							<MinimizeIcon className={styles.icon} />
						)}
						<span className={styles.button__text}>
							{!isFullScreen ? 'Full Screen' : 'Minimize'}
						</span>
					</div>
				</Button>
				<Button onClick={resetGame} kind='secondary'>
					<div className={styles.button__content}>
						<RefreshIcon className={styles.icon} />
						<span className={styles.button__text}>Reset</span>
					</div>
				</Button>
			</div>
		</div>
	);
};

export default GamePlayActions;
