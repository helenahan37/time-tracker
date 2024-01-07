import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from './Loading';

const PrivateRoute = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const location = useLocation();

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setIsAuthenticated(!!user);
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	if (loading) {
		return <Loading />;
	}
	// if user is unauthenticated, redirect to login page
	return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
