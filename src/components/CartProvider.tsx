"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	useSyncExternalStore,
} from "react";
import {
	addItem,
	clearItems,
	getServerSnapshot,
	getSnapshot,
	removeItem,
	subscribe,
	type CartItem,
} from "@/lib/cartStore";

export type { CartItem };

type CartContextValue = {
	items: CartItem[];
	count: number;
	isOpen: boolean;
	/** Body of the quote form — the cart drawer pre-fills it on "Proceed to order". */
	quoteMessage: string;
	addToCart: (item: Omit<CartItem, "qty">, qty: number) => void;
	removeFromCart: (sku: string) => void;
	clearCart: () => void;
	openCart: () => void;
	closeCart: () => void;
	setQuoteMessage: (message: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	const [isOpen, setIsOpen] = useState(false);
	const [quoteMessage, setQuoteMessage] = useState("");

	const openCart = useCallback(() => setIsOpen(true), []);
	const closeCart = useCallback(() => setIsOpen(false), []);

	const addToCart = useCallback(
		(item: Omit<CartItem, "qty">, qty: number) => {
			addItem(item, qty);
			setIsOpen(true);
		},
		[],
	);

	const removeFromCart = useCallback((sku: string) => removeItem(sku), []);
	const clearCart = useCallback(() => clearItems(), []);

	// Close the drawer on Escape.
	useEffect(() => {
		if (!isOpen) return;
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsOpen(false);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [isOpen]);

	const count = useMemo(() => items.reduce((sum, line) => sum + line.qty, 0), [items]);

	const value = useMemo<CartContextValue>(
		() => ({
			items,
			count,
			isOpen,
			quoteMessage,
			addToCart,
			removeFromCart,
			clearCart,
			openCart,
			closeCart,
			setQuoteMessage,
		}),
		[items, count, isOpen, quoteMessage, addToCart, removeFromCart, clearCart, openCart, closeCart],
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used inside a CartProvider");
	}
	return context;
}
