import React, { useEffect, useState } from 'react';

import { BsCircleFill } from 'react-icons/bs';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineCalendar } from 'react-icons/ai';

function Task({ task }) {
	const [localState, setLocalState] = useState(task);
	const [isEditing, setIsEditing] = useState(false);
	const [newTaskDescription, setNewTaskDescription] = useState(localState.task);
	//handle editing
	const handleEdit = () => {
		setIsEditing(true);
	};

	//handle cancel edit
	const handleCancelEdit = () => {
		setIsEditing(false);
		// no need to change task description
		setNewTaskDescription(localState.task);
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
	const handleRenderButtons = () => {};

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
				{/* Render buttons */}
				<AiOutlineEdit className="text-2xl text-purple-400" />
				<AiOutlineDelete className="text-2xl text-red-500" />
			</div>
		</div>
	);
}

export default Task;
