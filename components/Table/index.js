'use client'

import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';


export default function Table() {
	const [cols, setCols] = useState([]);
	const [rows, setRows] = useState([]);

	useEffect(() => {
		const parseCols = (cols) => {
			return cols.map(({ name }) => ({ field: name }));
		}

		const parseRows = (rows) => {
			return rows.map((row, index) => {
				const data = Object.assign({ id: index }, row);
				if (data.date) {
					data.date = data.date.slice(0, 10);
				}
				return data;
			});
		}

		const fetchData = async () => {
			fetch('http://localhost:3000/api/weight-measurement')
				.then(async (data) => await data.json())
				.then(({ fields, rows}) => {
					setCols(parseCols(fields));
					setRows(parseRows(rows));
				});
		}

		fetchData();
	}, []);

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
