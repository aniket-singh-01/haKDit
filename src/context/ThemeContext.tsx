'use client';

import React, { useEffect } from 'react';

interface IThemeContext {
	theme: string;
	toggleTheme: () => void;
}

const ThemeContext = React.createContext<IThemeContext>({
	theme: '',
	toggleTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = React.useState<string>('dark');

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme != null) {
			setTheme(storedTheme);
			document.body.classList.add(storedTheme);
			return;
		}
		setTheme('light');
	}, []);

	const toggleTheme = () => {
		if (theme === 'dark') {
			setTheme('light');
			localStorage.setItem('theme', 'light');
			document.body.classList.remove('dark');
		} else {
			setTheme('dark');
			localStorage.setItem('theme', 'dark');
			document.body.classList.add('dark');
		}
	};

	return (
		<ThemeContext.Provider
			value={{
				theme,
				toggleTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export { ThemeProvider, ThemeContext };
