import SeparatorIcon from '../icons/SeparatorIcon';
import styles from './PathFolder.module.css';

const PathFolder = ({ path, goToFolder }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.item}>
				<a className={styles.link__main} onClick={() => goToFolder({})}>
					Folders
				</a>
			</div>
			{path.map((item, index) => {
				return (
					<div key={index} className={styles.item}>
						<SeparatorIcon className={styles.icon} />
						<a
							className={styles.link}
							onClick={() => goToFolder({ id: item.id })}
						>
							{item.name}
						</a>
					</div>
				);
			})}
		</div>
	);
};

export default PathFolder;
