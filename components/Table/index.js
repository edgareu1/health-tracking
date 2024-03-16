'use client'

import { useEffect, useState } from "react";


const cellClass = 'text-start p-2 border border-black border-opacity-25';

export default function Table() {
	const [fields, setFields] = useState([]);
	const [rows, setRows] = useState([]);

	useEffect(() => {
		const parseFields = (fields) => {
			return fields
				.map(({ name }) => ({
					key: name,
					label: name
						.split('_')
						.map(str => str[0].toUpperCase() + str.slice(1))
						.join(' ')
				}));
		}

		const parseRows = (rows) => {
			return rows.map(row => {
				const data = Object.assign({}, row);
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
					setFields(parseFields(fields));
					setRows(parseRows(rows));
				});
		}

		fetchData();
	}, []);

	return (
		<table className="max-w-screen-sm w-full bg-white bg-opacity-80 border border-black border-opacity-25 mx-auto">
			<thead>
				<tr>
					{fields.map(({ key, label }) => (
						<th
							key={key}
							className={cellClass}
						>
							{label}
						</th>
					))}
				</tr>
			</thead>

			<tbody>
				{rows.map((row, key) => (
					<tr key={key}>
						{fields.map(({ key }) => (
							<td
								key={key}
								className={cellClass}
							>
								{row[key]}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
