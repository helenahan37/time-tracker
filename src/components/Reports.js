import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import app from '../firebase/config';
import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import Task from './Task';

//create auth instance
const auth = getAuth(app);
//create database instance
const db = getFirestore(app);

function Reports() {
	//track the state of the tasks
	const [loaindg, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [tasks, setTasks] = useState([]);
	const [thisWeekTotal, setThisWeekTotal] = useState(0);
	const [thisMonthTotal, setThisMonthTotal] = useState(0);
	const [totalTime, setTotalTime] = useState(0);

	//Fetch all tasks
	useEffect(() => {
		const fetchData = () => {
			try {
				setLoading(true);
				setError(null);
				//check if user is logged in
				if (auth.currentUser) {
					//make query
					const firebaseQuery = query(collection(db, 'tasks'), where('userId', '==', auth.currentUser.uid));

					//onSnapshot
					const unSubscribe = onSnapshot(firebaseQuery, (querySnapshot) => {
						//fetch data from firestore
						setTasks(
							querySnapshot.docs.map((doc) => {
								return {
									...doc.data(),
									id: doc.id,
									date: new Date(doc.data().startTime).toISOString(),
								};
							})
						);
					});
				} else {
					setError('Please sign in to continue');
					setLoading(false);
				}
			} catch (error) {
				setError(error.message);
				setLoading(false);
			}
		};
		const unSubscribe = fetchData();
		return () => {
			if (unSubscribe) {
				unSubscribe();
			}
		};
	}, []);
	return (
		<div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
			<div className="container mx-auto px-4 py-10">
				<header className="flex justify-between py-6">
					<h1 className="text-4xl font-bold text-white">Time Tracker</h1>
					<button className="text-white" title="Logout">
						<AiOutlineLogout className="text-2xl" />
					</button>
				</header>
				<div className="bg-white p-4 my-6 rounded-md text-black max-w-md mx-auto">
					<h2 className="text-lg font-semibold mb-2">User Profile</h2>
					<div className="flex items-center">
						<img className="h-16 w-16 rounded-full" src="" alt="profile" />
						<div className="ml-4">
							<h3 className="text-lg font-semibold">Username</h3>
							<p className="text-gray-600">Email</p>
							<p className="text-gray-600">Last Login</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center mb-8">
					<div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-md text-white shadow-lg">
						<h2 className="text-lg font-semibold">This Week</h2>
						<p className="text-2xl font-bold">20</p>
					</div>
					<div className="bg-gradient-to-r from-purple-400 to-pink-500 p-4 rounded-md text-white shadow-lg">
						<h2 className="text-lg font-semibold">This Month</h2>
						<p className="text-2xl font-bold">10</p>
					</div>
					<div className="bg-gradient-to-r from-red-400 to-yellow-500 p-4 rounded-md text-white shadow-lg">
						<h2 className="text-lg font-semibold">Total</h2>
						<p className="text-2xl font-bold">30</p>
					</div>
				</div>

				<div className="bg-gradient-to-r from-red-400 to-yellow-500 p-4 rounded-md shadow-lg max-w-3xl mx-auto">
					<div className="flex flex-col sm:flex-row justify-between mb-4">
						<Link
							to="/create-task"
							className="w-full sm:w-auto bg-gradient-to-r sm:mr-4 mb-4 sm:mb-0 from-red-500 to-pink-500 p-2 rounded text-white">
							Add New Task
						</Link>
						<button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded text-white">
							Export
						</button>
					</div>

					<div className="space-y-4">
						{tasks.map((task) => (
							<Task key={task.id} task={task} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Reports;
