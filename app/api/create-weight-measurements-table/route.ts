import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';


export async function GET(request: NextRequest): Promise<NextResponse> {
	try {
		const result = await sql`CREATE TABLE WEIGHT_MEASUREMENTS (date DATE, weight NUMERIC(3,1), body_fat NUMERIC(3,1), body_muscle NUMERIC(3,1));`;
		return NextResponse.json({ result }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
