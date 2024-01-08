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
	//handle update
	const handleUpdate = () => {};

	//handle render task description
	const renderTaskDescription = () => {};

	//handle start
	const handleStart = () => {};

	//handle pause
	const handlePause = () => {};

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
			case 'unstarted':
				return <AiOutlineReload className="text-2xl text-green-400 cursor-pointer" onClick={handleStart} />;
		}
	};

	return (
		<div className="bg-white p-4 rounded-md text-black shadow-lg flex flex-col md:flex-row md:items-center justify-between">
			<div className="md:space-x-2 space-y-2 md:space-y-0">
				{/* render buttons */}
				<div className="flex items-center space-x-2">
					<AiOutlineCalendar className="text-gray-600" />
					<p className="text-gray-600">{task.task}</p>
				</div>
			</div>
			<div className="flex items-center space-x-2 justify-center">
				<BsCircleFill />
				<p>status</p>
			</div>
			<div className="flex items-center space-x-2 justify-center md:justify-end">
				{handleRenderButtons()}
				<AiOutlineEdit className="text-2xl text-purple-400" />
				<AiOutlineDelete className="text-2xl text-red-500" />
			</div>
		</div>
	);
}

export default Task;
