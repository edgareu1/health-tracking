'use client'

import { ReactNode, useState } from 'react';

import type { DashboarCol, DashboarRow } from '@/app/dashboard/page';
import Graph from "@/components/Graph";
import RangePicker from "@/components/RangePicker";
import Table from "@/components/Table";

import styles from "./index.module.scss";


type Props = {
	cols: DashboarCol[];
	rows: DashboarRow[];
}

export default function Dashboard(props: Props): ReactNode {
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
					rows={rows.filter(({ valid }) => valid)}
				/>
			</section>
		</>
	);
}
