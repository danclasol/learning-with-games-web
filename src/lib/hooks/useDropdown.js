import { useEffect, useRef, useState } from 'react';

export const useDropdown = () => {
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	useEffect(() => {
		if (!showDropdown) return;

		const handleClickOutside = ev => {
			if (!dropdownRef.current.contains(ev.target)) setShowDropdown(false);
		};

		document.addEventListener('click', handleClickOutside, { capture: true });

		return () =>
			document.removeEventListener('click', handleClickOutside, {
				capture: true
			});
	}, [showDropdown]);

	return {
		showDropdown,
		dropdownRef,
		toggleDropdown
	};
};
