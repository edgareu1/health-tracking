import { NextResponse } from 'next/server';

import { POST_WEIGHT_MEASUREMENT, GET_WEIGHT_MEASUREMENT } from '@/utils/weight-measurement';


export async function POST(request) {
	try {
		const data = await request.json();
		const result = await POST_WEIGHT_MEASUREMENT(data);

		return NextResponse.json({ result }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}

export async function GET(request) {
	try {
		const { fields, rows } = await GET_WEIGHT_MEASUREMENT();

		return NextResponse.json({ fields, rows }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
