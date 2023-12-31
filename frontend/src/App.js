import logo from './logo.svg';
import './App.css';
import TaskList from './components/TaskList';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	let backURL = 'http://localhost:4000';
	const [tasks, setTasks] = useState([]);
	const [title, setTitle] = useState('');

	const createTask = function () {
		const data = { title: title };
		axios.post(`${backURL}/tasks`, data)
			.then(function (resp) {
				console.log(resp);
				setTitle('');
				getAllTasks();
			})
			.catch(function (err) {
				console.log(err);
			});
	};

	const getAllTasks = function () {
		axios.get(`${backURL}/tasks`)
			.then(function (response) {
				// console.log(response);
				setTasks(response.data.alltasks);
			})
			.catch(function (err) {
				console.log(err);
			});
	};

	useEffect(function () {
		getAllTasks();
	}, []);

	return (
		<div className='App container mt-4'>
			<h2 className='mb-3'>Task Manager Application</h2>
			<div>
				<input
					className='form-control'
					value={title}
					type='text'
					onChange={(e) => setTitle(e.target.value)}
				/>
				<button
					className='btn btn-primary col-12 my-3'
					onClick={createTask}>
					Submit
				</button>
			</div>
			<TaskList tasks={tasks} setTasks={setTasks} />
		</div>
	);
}

export default App;
