"use client";

import { useState } from "react";

const links = [
	{ href: "#products", label: "Products" },
	{ href: "#packages", label: "Packages" },
	{ href: "#how", label: "How It Works" },
	{ href: "#contact", label: "Contact" },
];

export function SiteHeader() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header>
			<div className="container nav">
				<a className="logo" href="#top">
					PACIFIC SCAFFOLDING<span>PTY LTD</span>
				</a>
				<nav className="desktop-nav">
					{links.map((link) => (
						<a key={link.href} href={link.href}>
							{link.label}
						</a>
					))}
				</nav>
				<a className="cta" href="#contact">
					GET A QUOTE
				</a>
				<button
					className="nav-toggle"
					type="button"
					aria-expanded={menuOpen}
					aria-controls="mobile-nav"
					aria-label="Toggle navigation menu"
					onClick={() => setMenuOpen((open) => !open)}
				>
					<span />
					<span />
					<span />
				</button>
			</div>
			<div className="container">
				<nav id="mobile-nav" className={`mobile-nav${menuOpen ? " open" : ""}`}>
					{links.map((link) => (
						<a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
							{link.label}
						</a>
					))}
					<a className="cta" href="#contact" onClick={() => setMenuOpen(false)}>
						GET A QUOTE
					</a>
				</nav>
			</div>
		</header>
	);
}
