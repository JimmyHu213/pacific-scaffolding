"use client";

import { useCart } from "./CartProvider";

export function CartDrawer() {
	const { items, count, isOpen, closeCart, removeFromCart, setQuoteMessage } = useCart();

	function checkout() {
		if (!items.length) return;
		const orderText = [
			"I would like to order / enquire about:",
			...items.map((line) => `${line.name} x ${line.qty}`),
			"",
			"Please confirm current pricing, stock and delivery/collection.",
		].join("\n");

		setQuoteMessage(orderText);
		closeCart();

		document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
		window.setTimeout(() => document.getElementById("message")?.focus(), 700);
	}

	return (
		<>
			<div
				className={`overlay${isOpen ? " open" : ""}`}
				onClick={closeCart}
				aria-hidden="true"
			/>
			<aside
				className={`cart-drawer${isOpen ? " open" : ""}`}
				aria-label="Shopping cart"
				aria-hidden={!isOpen}
			>
				<div className="cart-head">
					<h2>Your Cart</h2>
					<button className="close-cart" type="button" onClick={closeCart} aria-label="Close cart">
						×
					</button>
				</div>

				{items.length === 0 ? (
					<p>Your cart is empty.</p>
				) : (
					<div>
						{items.map((line) => (
							<div className="cart-item" key={line.sku}>
								<div>
									<strong>{line.name}</strong>
									<span>Quantity: {line.qty}</span>
								</div>
								<button
									type="button"
									onClick={() => removeFromCart(line.sku)}
									aria-label={`Remove ${line.name} from cart`}
								>
									Remove
								</button>
							</div>
						))}
					</div>
				)}

				<div className="cart-total">Items: {count}</div>
				<button className="checkout" type="button" onClick={checkout} disabled={!items.length}>
					PROCEED TO ORDER
				</button>
				<p className="cart-note">
					For this prototype, checkout sends the selected items as an order enquiry. Once your
					payment gateway, delivery rates and live stock are connected, this can become a full
					online checkout.
				</p>
			</aside>
		</>
	);
}
