'use client'

import { useState } from "react";

const formatDate = (date) => {
	const year = date.getFullYear();
	const month = `0${date.getMonth() + 1}`.slice(-2);
	const day = `0${date.getDate()}`.slice(-2);

	return `${year}-${month}-${day}`;
}

export default function Form() {
	const todayDate = new Date();
	const todayFormattedDate = formatDate(todayDate);

	const [date, setDate] = useState(todayFormattedDate);
	const [weight, setWeight] = useState(0);
	const [bodyFat, setBodyFat] = useState(0);
	const [bodyWeight, setBodyWeight] = useState(0);

	const setters = {
		date: setDate,
		weight: setWeight,
		body_fat: setBodyFat,
		body_muscle: setBodyWeight
	}

	const handleSubmit = (e) => {
		e.preventDefault();
	}

	const handleChange = (e) => {
		const setter = setters[e.target.name];
		const type = e.target.type;

		let value = e.target.value;
		let min = e.target.min;
		let max = e.target.max;
		if (type == 'number') {
			min = parseInt(min);
			max = parseInt(max);
		} else if (type == 'date') {
			value = new Date(value);
			min = new Date(min);
			max = new Date(max);
		}

		value = Math.max(Math.min(value, max), min);

		if (type == 'date') {
			value = formatDate(new Date(value));
		}

		setter(value);
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="date">
				Date

				<input
					type="date"
					id="date"
					name="date"
					min="2024-03-01"
					max={todayFormattedDate}
					value={date}
					onChange={handleChange}
				/>
			</label>

			<NumberInput
				label="Weight"
				name="weight"
				min="0"
				max="100"
				value={weight}
				handleChange={handleChange}
			/>

			<NumberInput
				label="Body Fat"
				name="body_fat"
				min="0"
				max="100"
				value={bodyFat}
				handleChange={handleChange}
			/>

			<NumberInput
				label="Body Muscle"
				name="body_muscle"
				min="0"
				max="100"
				value={bodyWeight}
				handleChange={handleChange}
			/>

			<input type="submit" value="Submit" />
		</form>
	);
}

const NumberInput = ({ label, name, min, max, value, handleChange }) => (
	<label htmlFor={name}>
		{label}

		<input
			type="number"
			id={name}
			name={name}
			min={min}
			max={max}
			value={value}
			onChange={handleChange}
		/>
	</label>
);
