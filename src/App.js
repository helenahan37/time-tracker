import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Footer from './components/Footer';
import Login from './pages/Login';
import CreateTaskPage from './pages/CreateTask';
import Reports from './pages/Reports';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/create-task" element={<CreateTaskPage />} />
				<Route path="/reports" element={<Reports />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
