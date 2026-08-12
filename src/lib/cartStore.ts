export type CartItem = {
	sku: string;
	name: string;
	qty: number;
};

const STORAGE_KEY = "pacificCart";
const EMPTY: CartItem[] = [];

let cache: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function isCartItem(value: unknown): value is CartItem {
	if (typeof value !== "object" || value === null) return false;
	const item = value as CartItem;
	return (
		typeof item.sku === "string" &&
		typeof item.name === "string" &&
		Number.isFinite(item.qty) &&
		item.qty > 0
	);
}

/** localStorage is user-writable, so anything malformed is discarded. */
function readStorage(): CartItem[] {
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return EMPTY;
		const parsed: unknown = JSON.parse(raw);
		if (!Array.isArray(parsed)) return EMPTY;
		const items = parsed.filter(isCartItem);
		return items.length ? items : EMPTY;
	} catch {
		return EMPTY;
	}
}

function writeStorage(items: CartItem[]) {
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	} catch {
		// Private browsing or a full quota — the cart still works for this session.
	}
}

function emit() {
	for (const listener of listeners) listener();
}

function commit(items: CartItem[]) {
	cache = items;
	loaded = true;
	writeStorage(items);
	emit();
}

export function subscribe(listener: () => void): () => void {
	listeners.add(listener);

	// Keep multiple tabs of the shop in sync.
	const onStorage = (event: StorageEvent) => {
		if (event.key !== null && event.key !== STORAGE_KEY) return;
		cache = readStorage();
		loaded = true;
		emit();
	};
	window.addEventListener("storage", onStorage);

	return () => {
		listeners.delete(listener);
		window.removeEventListener("storage", onStorage);
	};
}

/**
 * Returns a stable reference between mutations, as useSyncExternalStore requires.
 * The first client call hydrates the cache from localStorage.
 */
export function getSnapshot(): CartItem[] {
	if (!loaded) {
		cache = readStorage();
		loaded = true;
	}
	return cache;
}

/** The server has no localStorage, so it always renders an empty cart. */
export function getServerSnapshot(): CartItem[] {
	return EMPTY;
}

export function addItem(item: Omit<CartItem, "qty">, qty: number) {
	const safeQty = Math.max(1, Math.floor(Number(qty) || 1));
	const current = getSnapshot();
	const existing = current.find((line) => line.sku === item.sku);

	commit(
		existing
			? current.map((line) =>
					line.sku === item.sku ? { ...line, qty: line.qty + safeQty } : line,
				)
			: [...current, { ...item, qty: safeQty }],
	);
}

export function removeItem(sku: string) {
	commit(getSnapshot().filter((line) => line.sku !== sku));
}

export function clearItems() {
	commit(EMPTY);
}
