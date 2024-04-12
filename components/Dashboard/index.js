'use client'

import { useMemo, useState } from 'react';

import Graph from "@/components/Graph";
import RangePicker from "@/components/RangePicker";
import Table from "@/components/Table";
import { formatDate, newDateWithoutTZ } from '@/utils/functions';

import styles from "./index.module.scss";


const parseRows = (rows) => {
	const newData = [];
	const initDate = newDateWithoutTZ(rows[0].date);

	for (let i = 0; i < rows.length; i++) {
		const currentDate = newDateWithoutTZ(rows[i].date);

		while (initDate < currentDate) {
			newData.push({ date: formatDate(initDate) });
			initDate.setDate(initDate.getDate() + 1);
		}

		newData.push(rows[i]);
		initDate.setDate(initDate.getDate() + 1);
	}

	return newData;
}

export default function Dashboard(props) {
	const cols = props.cols;
	const originalRows = props.rows;

	const [rows, setRows] = useState(originalRows.slice(-7));

	return (
		<>
			<section>
				<RangePicker
					originalRows={originalRows}
					rows={rows}
					setRows={setRows}
				/>
			</section>

			<section className="md:mt-16 mt-8">
				<Graph
					cols={cols}
					rows={useMemo(() => parseRows(rows), [rows])}
				/>
			</section>

			<section className="md:mt-16 mt-8">
				<Table
					cols={cols}
					rows={rows}
				/>
			</section>
		</>
	);
}
