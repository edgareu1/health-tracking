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
	const todayFormattedDate = formatDate(new Date());
	const tomorrowDate = new Date();
	tomorrowDate.setDate(tomorrowDate.getDate() + 1);
	const tomorrowFormattedDate = formatDate(tomorrowDate);

	const [date, setDate] = useState(todayFormattedDate);
	const [weight, setWeight] = useState(null);
	const [bodyFat, setBodyFat] = useState(null);
	const [bodyWeight, setBodyWeight] = useState(null);

	const setters = {
		date: setDate,
		weight: setWeight,
		body_fat: setBodyFat,
		body_muscle: setBodyWeight
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/weight-measurement`, {
			method: 'POST',
			body: JSON.stringify({
				date,
				weight,
				bodyFat,
				bodyWeight
			}),
		});

		if (response.status == 200) {
			setDate(todayFormattedDate);
			setWeight(0);
			setBodyFat(0);
			setBodyWeight(0);
		}
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

			<DateInput
				label="Date"
				name="date"
				min="2024-03-01"
				max={tomorrowFormattedDate}
				value={date}
				handleChange={handleChange}
			/>

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

const DateInput = ({ label, name, min, max, value, handleChange }) => (
	<label
		className={labelClass}
		htmlFor={name}
	>
		<span className="min-w-24">
			{label}
		</span>

		<input
			className={inpuClass}
			type="date"
			id={name}
			name={name}
			placeholder={min}
			min={min}
			max={max}
			value={value}
			onChange={handleChange}
		/>
	</label>
);


const NumberInput = ({ label, name, min, max, value, handleChange }) => (
	<label
		className={labelClass}
		htmlFor={name}
	>
		<span className="min-w-24">
			{label}
		</span>

		<input
			className={inpuClass}
			type="number"
			id={name}
			name={name}
			placeholder={min}
			min={min}
			max={max}
			step="0.1"
			value={value}
			onChange={handleChange}
		/>
	</label>
);
