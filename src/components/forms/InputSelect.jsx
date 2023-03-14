import React from 'react';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import styles from './InputSelect.module.css';

const InputSelect = React.forwardRef(
	({ onChange, onBlur, name, label, error, ...props }, ref) => {
		const styleSelect = `${styles.select} ${error && styles.error}`;

		return (
			<div className={styles.wrapper}>
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
		);
	}
);
export default InputSelect;
