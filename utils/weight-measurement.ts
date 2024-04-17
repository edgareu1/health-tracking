import { unstable_noStore as noStore } from 'next/cache';
import { QueryResult, QueryResultRow, sql } from '@vercel/postgres';


type POST_WEIGHT_MEASUREMENT_PROPS = {
	date: string;
	weight: string;
	bodyFat: string;
	bodyWeight: string;
}

const POST_WEIGHT_MEASUREMENT = async (data: POST_WEIGHT_MEASUREMENT_PROPS): Promise<QueryResult<QueryResultRow>> => {
	const parseNum = (value: string): string => {
		return parseFloat(value).toFixed(1);
	}

	const { date, weight, bodyFat, bodyWeight } = data;
	const result = await sql`
		INSERT INTO WEIGHT_MEASUREMENTS (date, weight, body_fat, body_muscle)
		VALUES (${date}, ${parseNum(weight)}, ${parseNum(bodyFat)}, ${parseNum(bodyWeight)});
	`;

	return result;
}

const GET_WEIGHT_MEASUREMENT = async (): Promise<QueryResult<QueryResultRow>> => {
	noStore();

	const result = await sql`
		SELECT * FROM WEIGHT_MEASUREMENTS
		ORDER BY date ASC;
	`;

	return result;
}


export {
	POST_WEIGHT_MEASUREMENT,
	GET_WEIGHT_MEASUREMENT
};
