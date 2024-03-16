import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
	const parseNum = (value) => {
		return parseInt(value).toFixed(1);
	}

	try {
		const { date, weight, bodyFat, bodyWeight } = await request.json();
		const result = await sql`
			INSERT INTO WEIGHT_MEASUREMENTS (date, weight, body_fat, body_muscle)
			VALUES (${date}, ${parseNum(weight)}, ${parseNum(bodyFat)}, ${parseNum(bodyWeight)});
		`;
		return NextResponse.json({ result }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function GET(request) {
	try {
		const { fields, rows } = await sql`
			SELECT * FROM WEIGHT_MEASUREMENTS;
		`;
		return NextResponse.json({ fields, rows }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
