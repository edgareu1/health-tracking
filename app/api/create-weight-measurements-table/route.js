import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
	try {
		const result = await sql`CREATE TABLE WEIGHT_MEASUREMENTS (date DATE, weight NUMERIC(3,1), body_fat NUMERIC(3,1), body_muscle NUMERIC(3,1));`;
		return NextResponse.json({ result }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
