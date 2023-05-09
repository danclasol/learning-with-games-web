import { useEffect, useState } from 'react';
import Button from '../buttons/Button';
import LinkButton from '../buttons/LinkButton';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import MaximamizeIcon from '../icons/MaximizeIcon';
import MinimizeIcon from '../icons/MinimizeIcon';
import RefreshIcon from '../icons/RefreshIcon';
import styles from './GamePlayActions.module.css';

const GamePlayActions = ({ resetGame }) => {
	const [isFullScreen, setIsFullScreen] = useState(false);

	const toggleFullScreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		} else if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	};

	const exitFullScreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		}
	};

	useEffect(() => {
		const fullScreenChanged = () => {
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
			<div className={styles.actions__left}>
				<LinkButton to={-1}>
					<ArrowLeftIcon className={styles.icon} />
					<span>Go back</span>
				</LinkButton>
			</div>
			<div className={styles.actions__right}>
				<div className={styles.actions__buttons}>
					<Button onClick={toggleFullScreen}>
						{!isFullScreen ? (
							<MaximamizeIcon className={styles.icon} />
						) : (
							<MinimizeIcon className={styles.icon} />
						)}
						<span>{!isFullScreen ? 'Full Screen' : 'Minimize'}</span>
					</Button>
					<Button onClick={resetGame} kind='secondary'>
						<RefreshIcon className={styles.icon} />
						<span>Reset</span>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default GamePlayActions;
