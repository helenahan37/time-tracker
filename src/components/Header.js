import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Header() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<header className="shadow-lg">
			<nav className="bg-white ">
				<div className="max-auto p-4 lg:mx-5 lg:px-12">
					<div className="flex justify-between items-center ">
						<Link to="/" className="flex items-center">
							<img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
							<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
								YoyoTaskTracker
							</span>
						</Link>
						<div className="flex items-center lg:order-2">
							{!isLoggedIn && (
								<div className="flex items-center lg:order-2">
									<Link
										to="/login"
										className="bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
										Get Start
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
