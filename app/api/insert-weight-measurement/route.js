import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
	try {
		const { date, weight, bodyFat, bodyWeight } = await request.json();
		const result = await sql`INSERT INTO WEIGHT_MEASUREMENTS (date, weight, body_fat, body_muscle) VALUES (${date}, ${weight.toFixed(1)}, ${bodyFat.toFixed(1)}, ${bodyWeight.toFixed(1)});`;
		return NextResponse.json({ result }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
