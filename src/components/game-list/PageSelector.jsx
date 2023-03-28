import IconButton from '../buttons/IconButton';
import LeftIcon from '../icons/ArrowLeftIcon';
import RightIcon from '../icons/ArrowRightIcon';
import styles from './PageSelector.module.css';

const PageSelector = ({ page, setPage, totalPages }) => {
	const isFirstPage = page === 1;
	const isLastPage = page === totalPages || totalPages === 0;

	const handleLeftClick = () => {
		setPage(page - 1);
	};
	const handleRightClick = () => {
		setPage(page + 1);
	};

	return (
		<div className={styles.wrapper}>
			<IconButton
				filled
				icon={LeftIcon}
				onClick={handleLeftClick}
				disabled={isFirstPage}
			/>
			<span className={styles.text}>{`Page ${page} / ${totalPages || 1}`}</span>
			<IconButton
				filled
				icon={RightIcon}
				onClick={handleRightClick}
				disabled={isLastPage}
			/>
		</div>
	);
};

export default PageSelector;
