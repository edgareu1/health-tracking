'use client'

import type { ReactNode } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { DashboarCol, DashboarRow } from '@/app/dashboard/page';

import styles from "./index.module.scss";


type Props = {
	cols: DashboarCol[];
	rows: DashboarRow[];
}

export default function Table({ cols, rows }: Props): ReactNode {
	const colHeaderMap = {
		date: 'Date',
		weight: 'Weight (kg)',
		body_fat: 'Fat (%)',
		body_muscle: 'Muscle (%)'
	}

	return (
		<DataGrid
			columns={cols.map(col => ({
				...col,
				headerName: colHeaderMap[col.field],
				width: 150,
			}))}
			rows={rows}
			initialState={{
				pagination: { paginationModel: { pageSize: 5 } },
				sorting: {
					sortModel: [{ field: 'date', sort: 'desc' }]
				},
			}}
			pageSizeOptions={[5, 10, 25, 50, 100]}
			sx={{
				color: '#0B2027',
				bgcolor: '#FAFAFACC',
				borderRadius: 1,
				p: 2
			}}
		/>
	);
}
