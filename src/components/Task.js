import React, { useEffect, useState } from 'react';

import { BsCircleFill } from 'react-icons/bs';
import {
	AiOutlineEdit,
	AiOutlineDelete,
	AiOutlineCalendar,
	AiOutlinePlayCircle,
	AiOutlinePauseCircle,
	AiOutlineReload,
} from 'react-icons/ai';
import { FaCheck, FaTimes } from 'react-icons/fa';
import app from '../firebase/config';
import { getFirestore, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { format } from 'date-fns';

//create firebase instance
const db = getFirestore(app);

function Task({ task }) {
	const [localTask, setLocalTask] = useState(task);
	const [isEditing, setIsEditing] = useState(false);
	const [newTaskDescription, setNewTaskDescription] = useState(localTask.task);
	//handle editing
	const handleEdit = () => {
		setIsEditing(true);
	};

	//handle cancel edit
	const handleCancelEdit = () => {
		setIsEditing(false);
		// no need to change task description
		setNewTaskDescription(localTask.task);
	};
	//handle paused
	const handlePause = async () => {
		try {
			const elapsedTime = localTask.startTime ? Date.now() - localTask.startTime : 0;
			const newTotalTime = (localTask.totalTime || 0) + elapsedTime;

			await updateDoc(doc(db, 'tasks', localTask.id), {
				status: 'paused',
				endTime: Date.now(),
				totalTime: newTotalTime,
			});
			const taskDoc = doc(db, 'tasks', localTask.id);
			onSnapshot(taskDoc, (doc) => {
				if (doc.exists()) {
					setLocalTask({
						...doc.data(),
						date: localTask.date,
						id: localTask.id,
					});
				}
			});
		} catch (error) {
			console.log('Error:', error.message);
		}
	};

	//handle render task description
	const renderTaskDescription = () => {
		if (isEditing) {
			return (
				<div className="flex space-x-2">
					<input
						value={newTaskDescription}
						onChange={(e) => setNewTaskDescription(e.target.value)}
						className="border border-purple-300 rounded px-2 py-2"
					/>
				</div>
			);
		}
		return <p className="text-gray-600">{task.task}</p>;
	};

	//handle start
	const handleStart = async () => {
		try {
			await updateDoc(doc(db, 'tasks', localTask.id), {
				status: 'in progress',
				startTime: Date.now(),
			});

			//listen for changes
			const taskDoc = doc(db, 'tasks', localTask.id);
			onSnapshot(taskDoc, (doc) => {
				if (doc.exists()) {
					setLocalTask({
						...doc.data(),
						id: doc.id,
						date: new Date(doc.data().startTime).toISOString(),
					});
				}
			});
		} catch (error) {
			console.log('Error:', error.message);
		}
	};

	//handle delete
	const handleDelete = () => {};

	//handle render buttons
	const handleRenderButtons = () => {
		switch (localTask.status) {
			case 'unstarted':
				return <AiOutlinePlayCircle className="text-2xl text-purple-400 cursor-pointer" onClick={handleStart} />;

			case 'in progress':
				return <AiOutlinePauseCircle className="text-2xl text-green-400 cursor-pointer" onClick={handlePause} />;

			default:
			// eslint-disable-next-line no-duplicate-case
			case 'unstarted':
				return <AiOutlineReload className="text-2xl text-green-400 cursor-pointer" onClick={handleStart} />;
		}
	};

	return (
		<div className="bg-white p-4 rounded-md text-black shadow-lg flex flex-col md:flex-row md:items-center justify-between">
			<div className="md:space-x-2 space-y-2 md:space-y-0">
				{renderTaskDescription()}
				<div className="flex items-center space-x-2">
					<AiOutlineCalendar className="text-gray-600" />
					<p className="text-gray-600">{format(new Date(localTask.date), 'do MMM yyyy')}</p>
				</div>
			</div>
			<div className="flex items-center space-x-2 justify-center">
				<BsCircleFill
					color={localTask.status === 'unstarted' ? 'gray' : localTask.status === 'in progress' ? 'green' : 'red'}
				/>
				<p>{localTask.status}</p>
			</div>
			<div className="flex items-center space-x-2 justify-center md:justify-end">
				{handleRenderButtons()}
				<AiOutlineEdit onClick={handleEdit} className="text-2xl text-purple-400" />
				<AiOutlineDelete className="text-2xl text-red-500" />
			</div>
		</div>
	);
}

export default Task;
