'use client'

import { useEffect, useState } from "react";

export default function Table() {
	const [fields, setFields] = useState([]);
	const [rows, setRows] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			fetch('http://localhost:3000/api/weight-measurement')
				.then(async (data) => await data.json())
				.then(({ fields, rows}) => {
					setFields(fields.map(({ name }) => name));
					setRows(rows);
				});
		}

		fetchData();
	}, []);

	return (
		<table className="table-auto">
			<thead>
				<tr>
					{fields.map(field => (
						<th key={field}>
							{field}
						</th>
					))}
				</tr>
			</thead>

			<tbody>
				{rows.map((row, key) => (
					<tr key={key}>
						{fields.map(field => (
							<td key={field}>
								{row[field]}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
