import React from 'react';
import axios from 'axios';

function Task(props) {
	let backURL = 'http://localhost:4000';
	const getAllTasks = function () {
		axios.get(`${backURL}/tasks`)
			.then(function (response) {
				// console.log(response);
				props.setTasks(response.data.alltasks);
			})
			.catch(function (err) {
				console.log(err);
			});
	};
	const deleteTask = function (taskId) {
		axios.delete(`${backURL}/tasks/${taskId}`)
			.then(function (resp) {
				// console.log(resp);
				getAllTasks();
			})
			.catch(function (err) {
				console.log(err);
			});
	};
	return (
		<p>
			Task Id: {props.data._id}, Task Name: {props.data.title}
			<button
				className='mx-3 btn btn-danger'
				onClick={() => deleteTask(props.data._id)}>
				X
			</button>
		</p>
	);
}

export default Task;
