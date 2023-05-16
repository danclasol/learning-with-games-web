import PencilIcon from '../icons/PencilIcon';
import Loading from '../shared/Loading';
import styles from './InputImage.module.css';

const InputImage = ({
	image,
	alt,
	loading,
	success,
	error,
	className,
	...props
}) => {
	if (loading) {
		return (
			<div className={styles.loading}>
				<Loading />
			</div>
		);
	}

	return (
		<div className={`${styles.wrapper} ${className}`}>
			<img
				className={styles.image}
				src={image || '/images/image.svg'}
				alt={alt}
			/>
			{error && <span className={styles.error}>{error}</span>}
			<label className={styles.label}>
				<PencilIcon className={styles.icon} />
				<span className={styles.text}>Choose photo</span>
				<input
					{...props}
					className={styles.input}
					type='file'
					accept='image/*'
				/>
			</label>
		</div>
	);
};

export default InputImage;
