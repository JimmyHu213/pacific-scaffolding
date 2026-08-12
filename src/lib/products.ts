export type Product = {
	sku: string;
	name: string;
	description: string;
	/** Displayed price. Swap `PRICE TBC` for real pricing before launch. */
	price: string;
	priceNote: string;
	image: string;
	imageAlt: string;
};

export const products: Product[] = [
	{
		sku: "standard",
		name: "Kwikstage Standards",
		description: "Vertical scaffold standards. Select your required size when pricing is added.",
		price: "PRICE TBC",
		priceNote: "current price",
		image: "/images/kwikstage-system.webp",
		imageAlt: "Kwikstage standard",
	},
	{
		sku: "ledger",
		name: "Kwikstage Ledgers",
		description: "Horizontal scaffold members. Add the length/finish selector before launch.",
		price: "PRICE TBC",
		priceNote: "current price",
		image: "/images/kwikstage-system.webp",
		imageAlt: "Kwikstage ledger",
	},
	{
		sku: "transom",
		name: "Transoms",
		description: "Platform support components for Kwikstage scaffold systems.",
		price: "PRICE TBC",
		priceNote: "current price",
		image: "/images/kwikstage-system.webp",
		imageAlt: "Kwikstage transom and components",
	},
	{
		sku: "brace",
		name: "Bracing",
		description: "Diagonal bracing and related scaffold components.",
		price: "PRICE TBC",
		priceNote: "current price",
		image: "/images/kwikstage-diagram.jpg",
		imageAlt: "Kwikstage bracing and components",
	},
	{
		sku: "base",
		name: "Base Plates / Jacks",
		description: "Base support components for scaffold standards.",
		price: "PRICE TBC",
		priceNote: "current price",
		image: "/images/kwikstage-system.webp",
		imageAlt: "Kwikstage base jack",
	},
	{
		sku: "board",
		name: "Boards & Platform Parts",
		description: "Scaffold platform and edge protection components.",
		price: "PRICE TBC",
		priceNote: "current price",
		image: "/images/kwikstage-diagram.jpg",
		imageAlt: "Scaffold boards and toe boards",
	},
	{
		sku: "other",
		name: "Other Components",
		description: "Can't find it? Add the item to your enquiry and tell us what you need.",
		price: "QUOTE",
		priceNote: "on request",
		image: "/images/kwikstage-system.webp",
		imageAlt: "Kwikstage scaffold accessories",
	},
];

/** Cart line items store the display name so the drawer stays readable. */
export const cartNames: Record<string, string> = {
	standard: "Kwikstage Standard",
	ledger: "Kwikstage Ledger",
	transom: "Kwikstage Transom",
	brace: "Kwikstage Brace",
	base: "Kwikstage Base Plate / Jack",
	board: "Scaffold Boards / Platform Parts",
	other: "Other Scaffold Components",
};

export const galleryImages = [
	{ src: "/images/kwikstage-system.webp", alt: "Kwikstage scaffold system", big: true },
	{ src: "/images/kwikstage-system.webp", alt: "Kwikstage scaffold components", big: false },
	{ src: "/images/kwikstage-diagram.jpg", alt: "Kwikstage component diagram", big: false },
	{ src: "/images/kwikstage-specs.jpg", alt: "Kwikstage product specifications", big: false },
	{ src: "/images/kwikstage-system.webp", alt: "Kwikstage standard", big: false },
];
