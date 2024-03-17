import { sql } from '@vercel/postgres';


const POST_WEIGHT_MEASUREMENT = async (data) => {
	const parseNum = (value) => {
		return parseFloat(value).toFixed(1);
	}

	const { date, weight, bodyFat, bodyWeight } = data;
	const result = await sql`
		INSERT INTO WEIGHT_MEASUREMENTS (date, weight, body_fat, body_muscle)
		VALUES (${date}, ${parseNum(weight)}, ${parseNum(bodyFat)}, ${parseNum(bodyWeight)});
	`;

	return result;
}

const GET_WEIGHT_MEASUREMENT = async () => {
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
