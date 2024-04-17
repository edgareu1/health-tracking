import { ReactNode } from "react";
import type { FieldDef, QueryResultRow } from "@vercel/postgres";

import Dashboard from "@/components/Dashboard";
import { formatDate, newDateWithoutTZ } from "@/utils/functions";
import { GET_WEIGHT_MEASUREMENT } from "@/utils/weight-measurement";


export type DashboarCol = {
	field: string;
}

export type DashboarRow = QueryResultRow & {
	id: number;
	valid: boolean;
}

const parseCols = (cols: FieldDef[]): DashboarCol[] => {
	return cols.map(({ name }) => ({ field: name }));
}

const parseRows = (rows: QueryResultRow[]): DashboarRow[] => {
	const newData = [];
	const initDate = newDateWithoutTZ(rows[0].date);

	for (let i = 0; i < rows.length; i++) {
		const data = Object.assign({ id: i, valid: true }, rows[i]);
		if (data.date) {
			data.date = formatDate(new Date(data.date));
		}

		const currentDate = newDateWithoutTZ(data.date);

		while (initDate < currentDate) {
			newData.push({
				...newData[newData.length - 1],
				date: formatDate(initDate),
				valid: false
			});
			initDate.setDate(initDate.getDate() + 1);
		}

		newData.push(data);
		initDate.setDate(initDate.getDate() + 1);
	}

	return newData;
}

export default async function PageDashboard(): Promise<ReactNode> {
	const data = await GET_WEIGHT_MEASUREMENT();
	const cols = parseCols(data.fields);
	const rows = parseRows(data.rows);

	return (
		<Dashboard
			cols={cols}
			rows={rows}
		/>
	);
}
