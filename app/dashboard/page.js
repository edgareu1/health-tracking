'use client'

import { useEffect, useState } from "react";

import Table from "@/components/Table";


export default function Dashboard() {
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
			fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/weight-measurement`)
				.then(async (data) => await data.json())
				.then(({ fields, rows}) => {
					setCols(parseCols(fields));
					setRows(parseRows(rows));
				});
		}

		fetchData();
	}, []);

	return (
		<section>
			<Table
				cols={cols}
				rows={rows}
			/>
		</section>
	);
}
