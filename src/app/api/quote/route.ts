import { NextResponse } from "next/server";

type CartLine = { sku: string; name: string; qty: number };

type QuotePayload = {
	name: string;
	company: string;
	phone: string;
	email: string;
	enquiry: string;
	message: string;
	cart: CartLine[];
};

const MAX_FIELD_LENGTH = 2000;

function asString(value: unknown): string {
	return typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
}

function isValidEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
	}

	const raw = (body ?? {}) as Record<string, unknown>;
	const payload: QuotePayload = {
		name: asString(raw.name),
		company: asString(raw.company),
		phone: asString(raw.phone),
		email: asString(raw.email),
		enquiry: asString(raw.enquiry),
		message: asString(raw.message),
		cart: Array.isArray(raw.cart)
			? (raw.cart as unknown[])
					.filter(
						(line): line is CartLine =>
							typeof line === "object" &&
							line !== null &&
							typeof (line as CartLine).sku === "string" &&
							Number.isFinite((line as CartLine).qty),
					)
					.slice(0, 100)
			: [],
	};

	if (!payload.name || !payload.phone || !payload.email) {
		return NextResponse.json(
			{ error: "Name, phone and email are required." },
			{ status: 400 },
		);
	}

	if (!isValidEmail(payload.email)) {
		return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
	}

	// TODO(launch): persist to D1 and deliver via Cloudflare Email Service.
	// Until then the enquiry lands in the Worker logs (`wrangler tail`), so nothing
	// a customer submits is silently dropped.
	console.log(
		"[quote-enquiry]",
		JSON.stringify({
			name: payload.name,
			company: payload.company,
			phone: payload.phone,
			email: payload.email,
			enquiry: payload.enquiry,
			message: payload.message,
			cart: payload.cart,
			receivedAt: new Date().toISOString(),
		}),
	);

	return NextResponse.json({ ok: true });
}
