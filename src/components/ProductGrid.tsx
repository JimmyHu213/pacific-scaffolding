"use client";

import Image from "next/image";
import { useState } from "react";
import { cartNames, products, type Product } from "@/lib/products";
import { useCart } from "./CartProvider";

function ProductCard({ product }: { product: Product }) {
	const { addToCart } = useCart();
	const [qty, setQty] = useState("1");
	const qtyId = `qty-${product.sku}`;

	return (
		<div className="product">
			<div className="product-img">
				<Image
					src={product.image}
					alt={product.imageAlt}
					width={400}
					height={190}
					sizes="(max-width: 560px) 100vw, (max-width: 850px) 50vw, 25vw"
				/>
			</div>
			<div className="product-body">
				<h3>{product.name}</h3>
				<p>{product.description}</p>
				<div className="price">
					{product.price} <small>{product.priceNote}</small>
				</div>
				<div className="product-actions">
					<label className="visually-hidden" htmlFor={qtyId}>
						Quantity of {product.name}
					</label>
					<input
						className="qty"
						id={qtyId}
						type="number"
						min="1"
						value={qty}
						onChange={(event) => setQty(event.target.value)}
					/>
					<button
						className="add-cart"
						type="button"
						onClick={() =>
							addToCart(
								{ sku: product.sku, name: cartNames[product.sku] ?? product.name },
								Number(qty),
							)
						}
					>
						ADD TO CART
					</button>
				</div>
			</div>
		</div>
	);
}

export function ProductGrid() {
	return (
		<div className="products">
			{products.map((product) => (
				<ProductCard key={product.sku} product={product} />
			))}
		</div>
	);
}
