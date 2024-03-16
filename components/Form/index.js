'use client'

import { useState } from "react";

import styles from "./index.module.scss";

const formatDate = (date) => {
	const year = date.getFullYear();
	const month = `0${date.getMonth() + 1}`.slice(-2);
	const day = `0${date.getDate()}`.slice(-2);

	return `${year}-${month}-${day}`;
}

const labelClass = 'flex items-center justify-items-stretch gap-4 bg-white bg-opacity-80 text-nowrap p-2 border border-black border-opacity-50 rounded';
const inpuClass = 'w-full p-2 bg-white bg-opacity-80 border border-black border-opacity-25 rounded';

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

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch('/api/weight-measurement', {
			method: 'POST',
			body: JSON.stringify({
				date,
				weight,
				bodyFat,
				bodyWeight
			}),
		});
		console.log(response);
	}

	const handleChange = (e) => {
		const setter = setters[e.target.name];
		setter(e.target.value);
	}

	return (
		<form
			className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white bg-opacity-80 p-4 rounded"
			onSubmit={handleSubmit}
		>
			<label
				className={labelClass}
				htmlFor="date"
			>
				Date

				<input
					className={inpuClass}
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

			<input
				className="col-span-full text-white hover:text-blue bg-blue hover:bg-transparent py-3 px-6 border-2 border-blue rounded cursor-pointer"
				type="submit"
				value="Submit"
			/>
		</form>
	);
}

const NumberInput = ({ label, name, min, max, value, handleChange }) => (
	<label
		className={labelClass}
		htmlFor={name}
	>
		{label}

		<input
			className={inpuClass}
			type="number"
			id={name}
			name={name}
			min={min}
			max={max}
			step="0.1"
			value={value}
			onChange={handleChange}
		/>
	</label>
);
