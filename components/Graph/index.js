import { useMemo } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

import styles from "./index.module.scss";


export default function Graph({ cols, rows }) {
	const arrDates = useMemo(() => rows.map(x => x.date), [rows]);
	const arrBodyFat = useMemo(() => rows.map(x => parseFloat(x.body_fat)), [rows]);
	const arrBodyMuscle = useMemo(() => rows.map(x => parseFloat(x.body_muscle)), [rows]);
	const arrWeight = useMemo(() => rows.map(x => parseFloat(x.weight)), [rows]);

	return (
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
			series={[
				{
					data: arrBodyFat,
					color: '#FF8360',
					label: 'Fat (%)',
					yAxisKey: 'bodyFatAxis',
					},
				{
					data: arrBodyMuscle,
					color: '#0B2027',
					label: 'Muscle (%)',
					yAxisKey: 'bodyMuscleAxis',
				},
				{
					data: arrWeight,
					color: '#0093E9',
					label: 'Weight (kg)',
					area: true,
					yAxisKey: 'weightAxis',
				},
			]}
			leftAxis="bodyMuscleAxis"
			rightAxis="bodyFatAxis"
			height={400}
		/>
	);
}
