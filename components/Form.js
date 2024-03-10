'use client'

import { useState } from "react";

export default function Form() {
	const todayDate = new Date();
	const todayYear = todayDate.getFullYear();
	const todayMonth = `0${todayDate.getMonth() + 1}`.slice(-2);
	const todayDay = `0${todayDate.getDate()}`.slice(-2);
	const todayFormattedDate = `${todayYear}-${todayMonth}-${todayDay}`;

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
		setter(e.target.value);
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
