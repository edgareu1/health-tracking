import Graph from "@/components/Graph";
import Table from "@/components/Table";
import { GET_WEIGHT_MEASUREMENT } from "@/utils/weight-measurement";


export default async function Dashboard() {
	const parseCols = (cols) => {
		return cols.map(({ name }) => ({ field: name }));
	}

	const parseRows = (rows) => {
		return rows.map((row, index) => {
			const data = Object.assign({ id: index }, row);
			if (data.date) {
				data.date = new Date(data.date).toISOString().slice(0, 10);
			}
			return data;
		});
	}

	const data = await GET_WEIGHT_MEASUREMENT();
	const cols = parseCols(data.fields);
	const rows = parseRows(data.rows);

	return (
		<>
			<section>
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
