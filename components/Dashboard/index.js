'use client'

import { useState } from 'react';

import Graph from "@/components/Graph";
import RangePicker from "@/components/RangePicker";
import Table from "@/components/Table";

import styles from "./index.module.scss";


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
					rows={rows}
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
