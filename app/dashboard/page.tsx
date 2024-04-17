import { ReactNode } from "react";
import type { FieldDef, QueryResultRow } from "@vercel/postgres";

import Dashboard from "@/components/Dashboard";
import { formatDate } from "@/utils/functions";
import { GET_WEIGHT_MEASUREMENT } from "@/utils/weight-measurement";


type Col = {
	field: string;
}

type Row = QueryResultRow & {
	id: number;
}

export default async function PageDashboard(): Promise<ReactNode> {
	const parseCols = (cols: FieldDef[]): Col[] => {
		return cols.map(({ name }) => ({ field: name }));
	}

	const parseRows = (rows: QueryResultRow[]): Row[] => {
		return rows.map((row, index) => {
			const data = Object.assign({ id: index }, row);
			if (data.date) {
				data.date = formatDate(new Date(data.date));
			}
			return data;
		});
	}

	const data = await GET_WEIGHT_MEASUREMENT();
	const cols = parseCols(data.fields);
	const rows = parseRows(data.rows);

	return (
		<Dashboard
			cols={cols}
			rows={rows}
			data={data}
		/>
	);
}
