import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//a functional component for search
const SearchBox = ({ placeholder, handlechange }) => {
	return (
		/*e.target.value is the value of the search input */
		<input
			className="search"
			type="serach"
			placeholder={placeholder}
			onChange={handlechange}
			style={{ float: 'right', textAlign: 'center' }}
		/>
	);
};

// a functional component for the list
const Exercise = (props) => (
	<tr>
		<td>{props.exercise.username}</td>
		<td>{props.exercise.description}</td>
		<td>{props.exercise.duration}</td>
		<td>{props.exercise.date.substring(0, 10)}</td>
		<td>
			<Link to={'/edit/' + props.exercise._id}>edit</Link> |{' '}
			<a
				href="#"
				onClick={() => {
					props.deleteExercise(props.exercise._id);
				}}
			>
				delete
			</a>
		</td>
	</tr>
);

export default class ExersicesList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			exercises: [],
			searchField: ''
		};
	}

	//setting the state at app startup to the store all exercises from db
	componentDidMount() {
		axios
			.get('http://localhost:5000/exercises/')
			.then((response) => {
				this.setState({ exercises: response.data }); //retreive all exercises from db to the state
			})
			.catch((error) => {
				console.log(error);
			});
	}

	deleteExercise = (id) => {
		axios.delete('http://localhost:5000/exercises/' + id).then((res) => console.log(res.data));
		this.setState({
			exercises: this.state.exercises.filter((el) => el._id !== id)
		});
	};

	exerciseList(e) {
		return e.map((currentexercise) => {
			return (
				<Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />
			);
		});
	}
	//
	handlechange = (e) => {
		this.setState({ searchField: e.target.value });
	};

	render() {
		//
		const { exercises, searchField } = this.state;
		const filteredExercises = exercises.filter((exercise) =>
			exercise.username.toLowerCase().includes(searchField.toLowerCase())
		);
		console.log(filteredExercises);

		return (
			<div>
				<SearchBox
					placeholder="Search Exercises"
					/*e.target.value is the value of the search input */
					handlechange={this.handlechange}
				/>

				<h3>Logged Exercises</h3>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Username</th>
							<th>Description</th>
							<th>Duration</th>
							<th>Date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>{this.exerciseList(filteredExercises)}</tbody>
				</table>
			</div>
		);
	}
}
