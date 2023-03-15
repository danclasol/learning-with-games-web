import React from 'react';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import styles from './InputSelect.module.css';

const InputSelect = React.forwardRef(
	({ name, label, error, onChange, onBlur, ...props }, ref) => {
		const styleSelect = `${styles.input} ${error && styles.borderError}`;

		return (
			<div className={styles.wrapper}>
				<div className={styles.select}>
					{label && <span className={styles.label}>{label}</span>}
					<select
						{...props}
						className={styleSelect}
						name={name}
						ref={ref}
						onChange={onChange}
						onBlur={onBlur}
					></select>
					<ArrowDownIcon className={styles.dropdown} />
				</div>
				{error && <span className={styles.error}>{error}</span>}
			</div>
		);
	}
);
export default InputSelect;
