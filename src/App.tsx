import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './shared/Navbar';
import Ps1652 from './pages/ps1652';

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route
					path='/'
					element={<Navigate to='/ps/1652' />}
				/>
				<Route
					path='/ps/1652'
					element={<Ps1652 />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
