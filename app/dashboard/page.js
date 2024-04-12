import Dashboard from "@/components/Dashboard";
import { formatDate } from "@/utils/functions";
import { GET_WEIGHT_MEASUREMENT } from "@/utils/weight-measurement";


export default async function PageDashboard() {
	const parseCols = (cols) => {
		return cols.map(({ name }) => ({ field: name }));
	}

	const parseRows = (rows) => {
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
