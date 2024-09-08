import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useContext } from 'react';

import { ThemeContext } from '@/context/ThemeContext';
import LogoSvg from './LogoSvg';

const Navbar = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<>
			<nav className='h-24 bg-background flex justify-center md:justify-between items-center px-10'>
				<h1 className='flex items-start flex-col'>
					<span className='h4 text-muted-foreground flex flex-col md:items-start items-center justify-center'>
						<span className='text-primary text-2xl md:text-4xl font-bold'>
							PS1652
						</span>
					</span>
				</h1>
				<LogoSvg
					className='hidden md:block'
					size='80px'
				/>
			</nav>
			<Button
				className='fixed bottom-0 left-0 right-0 rounded-none h-[2rem] bg-primary'
				onClick={toggleTheme}
			>
				{theme === 'dark' ? <Sun /> : <Moon />}
			</Button>
		</>
	);
};

export default Navbar;
