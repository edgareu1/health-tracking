'use client'

import { DataGrid } from '@mui/x-data-grid';

import styles from "./index.module.scss";


export default function Table({ cols, rows }) {
	return (
		<DataGrid
			columns={cols}
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
