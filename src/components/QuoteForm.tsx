"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

const enquiryOptions = [
	"Kwikstage standards",
	"Ledgers",
	"Transoms",
	"Bracing",
	"Complete scaffold package",
	"Other scaffold components",
];

type Status = { kind: "idle" | "sending" | "success" | "error"; message?: string };

export function QuoteForm() {
	// The enquiry text lives in cart context so "Proceed to order" can pre-fill it.
	const { quoteMessage, setQuoteMessage, items, clearCart } = useCart();
	const [status, setStatus] = useState<Status>({ kind: "idle" });

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;
		const data = new FormData(form);

		setStatus({ kind: "sending" });

		try {
			const response = await fetch("/api/quote", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: data.get("name"),
					company: data.get("company"),
					phone: data.get("phone"),
					email: data.get("email"),
					enquiry: data.get("enquiry"),
					message: data.get("message"),
					cart: items,
				}),
			});

			if (!response.ok) {
				const body = (await response.json().catch(() => null)) as { error?: string } | null;
				throw new Error(body?.error ?? "Something went wrong. Please try again.");
			}

			form.reset();
			setQuoteMessage("");
			clearCart();
			setStatus({
				kind: "success",
				message: "Thanks — your enquiry has been received. We'll be in touch shortly.",
			});
		} catch (error) {
			setStatus({
				kind: "error",
				message:
					error instanceof Error ? error.message : "Something went wrong. Please try again.",
			});
		}
	}

	return (
		<form className="quote-form" onSubmit={handleSubmit}>
			<label className="visually-hidden" htmlFor="name">
				Your name
			</label>
			<input id="name" name="name" placeholder="Your name" required />

			<label className="visually-hidden" htmlFor="company">
				Company name
			</label>
			<input id="company" name="company" placeholder="Company name" />

			<label className="visually-hidden" htmlFor="phone">
				Phone number
			</label>
			<input id="phone" name="phone" type="tel" placeholder="Phone number" required />

			<label className="visually-hidden" htmlFor="email">
				Email address
			</label>
			<input id="email" name="email" type="email" placeholder="Email address" required />

			<label className="visually-hidden" htmlFor="enquiry">
				What are you enquiring about?
			</label>
			<select id="enquiry" name="enquiry" className="full" defaultValue="">
				<option value="">What are you enquiring about?</option>
				{enquiryOptions.map((option) => (
					<option key={option}>{option}</option>
				))}
			</select>

			<label className="visually-hidden" htmlFor="message">
				Details of your enquiry
			</label>
			<textarea
				id="message"
				name="message"
				placeholder="Tell us what you need — quantities, sizes, project requirements, delivery/collection details, etc."
				value={quoteMessage}
				onChange={(event) => setQuoteMessage(event.target.value)}
			/>

			{status.message ? (
				<p
					className={`form-status ${status.kind === "success" ? "success" : "error"}`}
					role="status"
				>
					{status.message}
				</p>
			) : null}

			<button className="btn btn-primary full" type="submit" disabled={status.kind === "sending"}>
				{status.kind === "sending" ? "SENDING…" : "SEND QUOTE ENQUIRY"}
			</button>
		</form>
	);
}
