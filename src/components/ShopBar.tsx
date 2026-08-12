"use client";

import { useCart } from "./CartProvider";

export function ShopBar() {
	const { count, openCart } = useCart();

	return (
		<div className="shopbar">
			<div className="container">
				<strong>SHOP KWIKSTAGE COMPONENTS</strong>
				<button className="cart-button" type="button" onClick={openCart}>
					CART{" "}
					<span className="cart-count" aria-hidden="true">
						{count}
					</span>
					<span className="visually-hidden">{count} items in cart</span>
				</button>
			</div>
		</div>
	);
}
