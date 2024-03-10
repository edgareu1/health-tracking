'use client'

import { useState } from "react";

import styles from "./index.module.scss";

const formatDate = (date) => {
	const year = date.getFullYear();
	const month = `0${date.getMonth() + 1}`.slice(-2);
	const day = `0${date.getDate()}`.slice(-2);

	return `${year}-${month}-${day}`;
}

const labelClass = 'flex items-center justify-items-stretch gap-4 bg-white text-nowrap p-2 border border-blue-dark rounded';
const labelStyle = {
	"--tw-border-opacity": 0.5
};
const inpuClass = 'w-full p-2 border border-blue-dark rounded';
const inputStyle = {
	"--tw-border-opacity": 0.25
};

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
		console.log(e);
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
		<form
			className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray py-6 px-4 rounded"
			onSubmit={handleSubmit}
		>
			<label
				className={labelClass}
				style={labelStyle}
				htmlFor="date"
			>
				Date

				<input
					className={inpuClass}
					style={inputStyle}
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
				className="col-span-full text-white hover:text-blue bg-blue hover:bg-transparent py-3 px-6 border-2 rounded cursor-pointer"
				type="submit"
				value="Submit"
			/>
		</form>
	);
}

const NumberInput = ({ label, name, min, max, value, handleChange }) => (
	<label
		className={labelClass}
		style={labelStyle}
		htmlFor={name}
	>
		{label}

		<input
			className={inpuClass}
			style={inputStyle}
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
