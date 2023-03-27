import { useEffect, useState } from 'react';
import { isImageValid } from '../../../lib/utils/images';
import styles from './PairCardImage.module.css';

const PairCardImage = ({ image, error }) => {
	const [imageSrc, setImageSrc] = useState('');

	useEffect(() => {
		if (!image) setImageSrc('/images/image.svg');
		else
			isImageValid(image)
				.then(res => {
					if (res) setImageSrc(image);
					else setImageSrc('/images/image-error.svg');
				})
				.catch(() => {
					setImageSrc('/images/image-error.svg');
				});
	}, [image]);

	return (
		<div className={`${styles.card__image} ${error ? styles.borderError : ''}`}>
			<img className={styles.image} src={imageSrc} />
		</div>
	);
};

export default PairCardImage;
