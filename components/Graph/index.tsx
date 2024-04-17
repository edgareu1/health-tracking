'use client'

import clsx from 'clsx';
import { CSSProperties, Dispatch, ReactNode, SetStateAction, useEffect, useId, useMemo, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

import type { DashboarCol, DashboarRow } from '@/app/dashboard/page';

import styles from "./index.module.scss";


type Props = {
	cols: DashboarCol[];
	rows: DashboarRow[];
}

type CheckBoxProps = {
	label: string;
	color: string;
	value: boolean;
	setter: Dispatch<SetStateAction<boolean>>;
}

type CustomCSSProperties = CSSProperties & {
    "--checkbox-color": string;
}

const parseRows = (rows: DashboarRow[], key: string): number[] => {
	const result = [];
	let lastValue = rows[0][key];

	for (let i = 0; i < rows.length; i++) {
		let value = rows[i][key];
		if (!value) {
			value = lastValue;
		}
		value = parseFloat(value);

		result.push(value);
		lastValue = value;
	}

	return result;
}

export default function Graph({ cols, rows }: Props): ReactNode {
	const arrDates = useMemo(() => rows.map(x => x.date), [rows]);
	const arrBodyFat = useMemo(() => parseRows(rows, 'body_fat'), [rows]);
	const arrBodyMuscle = useMemo(() => parseRows(rows, 'body_muscle'), [rows]);
	const arrWeight = useMemo(() => parseRows(rows, 'weight'), [rows]);

	const [displayFat, setDisplayFat] = useState(true);
	const [displayMuscle, setDisplayMuscle] = useState(true);
	const [displayWeight, setDisplayWeight] = useState(true);

	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		}

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const series = [];
	if (displayFat) {
		series.push({
			data: arrBodyFat,
			connectNulls: true,
			color: '#FF8360',
			label: 'Fat (%)',
			yAxisKey: 'bodyFatAxis',
		});
	}
	if (displayMuscle) {
		series.push({
			data: arrBodyMuscle,
			connectNulls: true,
			color: '#0B2027',
			label: 'Muscle (%)',
			yAxisKey: 'bodyMuscleAxis',
		});
	}
	if (displayWeight) {
		series.push({
			data: arrWeight,
			connectNulls: true,
			color: '#0093E9',
			label: 'Weight (kg)',
			area: true,
			yAxisKey: 'weightAxis',
		});
	}

	return (
		<>
		<div className={clsx(styles.checkboxWrapper)}>
			<CheckBox
				label="Fat (%)"
				color="#FF8360"
				value={displayFat}
				setter={setDisplayFat}
			/>

			<CheckBox
				label="Muscle (%)"
				color="#0B2027"
				value={displayMuscle}
				setter={setDisplayMuscle}
			/>

			<CheckBox
				label="Weight (kg)"
				color="#0093E9"
				value={displayWeight}
				setter={setDisplayWeight}
			/>
		</div>

		<LineChart
			xAxis={[{
				scaleType: 'band',
				data: arrDates,
			}]}
			yAxis={[
				{
					id: 'bodyFatAxis',
					label: 'Fat (%)'
				},
				{
					id: 'bodyMuscleAxis',
					label: 'Muscle (%)'
				},
				{
					id: 'weightAxis',
					label: 'Weight (kg)',
					min: Math.floor(Math.min(...arrWeight)),
					max: Math.ceil(Math.max(...arrWeight)),
				},
			]}
			series={series}
			leftAxis="bodyMuscleAxis"
			rightAxis="bodyFatAxis"
			slotProps={{ legend: { hidden: true } }}
			height={isMobile ? 300 : 400}
			sx={{
				[`.${axisClasses.left} .${axisClasses.label}`]: {
					transform: 'translateX(-10px)',
				},
				[`.${axisClasses.right} .${axisClasses.label}`]: {
					transform: 'translateX(10px)',
				}
			}}
		/>
		</>
	);
}

const CheckBox = ({ label, color, value, setter }: CheckBoxProps): ReactNode => {
	const name = useId();

	const customStyles: CustomCSSProperties = {
        "--checkbox-color": color
    };

	return (
		<label
			htmlFor={name}
			className={clsx({
				[styles.checked]: value
			})}
			style={customStyles}
		>
			<input
				type="checkbox"
				id={name}
				name={name}
				checked={value}
				onChange={() => setter(!value)}
			/>
			{label}
		</label>
	);
}
