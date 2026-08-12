import Image from "next/image";
import { CartDrawer } from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartProvider";
import { ProductGrid } from "@/components/ProductGrid";
import { QuoteForm } from "@/components/QuoteForm";
import { ShopBar } from "@/components/ShopBar";
import { SiteHeader } from "@/components/SiteHeader";
import { galleryImages } from "@/lib/products";

const reasons = [
	{
		num: "01",
		title: "Kwikstage Specialists",
		body: "Focused on Kwikstage scaffold components, systems and complete packages.",
	},
	{
		num: "02",
		title: "Component Sales",
		body: "Source standards, ledgers, transoms, braces, base plates and other scaffold components.",
	},
	{
		num: "03",
		title: "Package Quotes",
		body: "Tell us the job requirements and request a tailored scaffold package quotation.",
	},
	{
		num: "04",
		title: "Australian Market",
		body: "Website content designed specifically for Australian scaffolding customers and contractors.",
	},
	{
		num: "05",
		title: "Trade Focused",
		body: "Clear product categories and fast quote enquiries without unnecessary distractions.",
	},
	{
		num: "06",
		title: "Built for Growth",
		body: "Ready to add pricing, stock levels, delivery areas, photos and online ordering later.",
	},
];

const steps = [
	{
		num: "01",
		title: "Tell Us the Job",
		body: "Give us the project type, approximate dimensions and what you need scaffold for.",
	},
	{
		num: "02",
		title: "Build the List",
		body: "We can work from your component list or help identify the products required.",
	},
	{
		num: "03",
		title: "Get Your Quote",
		body: "Receive a package quotation based on the information supplied.",
	},
	{
		num: "04",
		title: "Arrange Supply",
		body: "Confirm your order and arrange the applicable collection or delivery details.",
	},
];

const howItWorks = [
	{ title: "Browse", body: "Find the scaffold components or package you are looking for." },
	{ title: "Enquire", body: "Send your requirements through the quote form." },
	{ title: "Order", body: "Confirm the quotation and organise supply." },
];

export default function Home() {
	return (
		<CartProvider>
			<a className="skip-link" href="#main">
				Skip to main content
			</a>

			<div className="topbar" id="top">
				<div className="container">
					<span>AUSTRALIAN KWIKSTAGE SCAFFOLDING SALES</span>
					<span>Pacific Scaffolding Pty Ltd</span>
				</div>
			</div>

			<SiteHeader />
			<ShopBar />

			<main id="main">
				<section className="hero">
					<div className="container hero-grid">
						<div>
							<div className="badge">KWIKSTAGE • SCAFFOLD SALES • AUSTRALIA</div>
							<h1>Kwikstage Scaffolding. Built for the Job.</h1>
							<p>
								Buy quality Kwikstage scaffolding components and complete scaffold packages from
								Pacific Scaffolding Pty Ltd.
							</p>
							<div className="buttons">
								<a className="btn btn-primary" href="#contact">
									REQUEST A QUOTE
								</a>
								<a className="btn btn-outline" href="#products">
									VIEW PRODUCTS
								</a>
							</div>
						</div>
						<div className="scaffold-visual" aria-hidden="true">
							<div className="frame">
								<div className="bar b1" />
								<div className="bar b2" />
								<div className="bar b3" />
								<div className="bar b4" />
								<div className="cross x1" />
								<div className="cross x2" />
								<div className="cross x3" />
								<div className="cross x4" />
								<div className="cross x5" />
								<div className="cross x6" />
							</div>
						</div>
					</div>
				</section>

				<section className="section">
					<div className="container">
						<h2>Why Buy From Pacific Scaffolding?</h2>
						<p className="lead">
							A dedicated scaffolding sales website focused on making it easy to find the
							components you need and request a package price.
						</p>
						<div className="cards">
							{reasons.map((reason) => (
								<div className="card" key={reason.num}>
									<div className="icon">{reason.num}</div>
									<h3>{reason.title}</h3>
									<p>{reason.body}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section id="products" className="section alt">
					<div className="container">
						<h2>Shop Kwikstage Scaffolding</h2>
						<p className="lead">
							Choose your component, select the quantity and add it to your cart. Prices below are
							set up as editable examples — replace them with Pacific Scaffolding&apos;s current
							pricing before going live.
						</p>

						<div className="gallery">
							{galleryImages.map((image, index) => (
								<div
									className={`gallery-cell${image.big ? " big" : ""}`}
									// The gallery intentionally repeats source images; index keeps keys unique.
									key={`${image.src}-${index}`}
								>
									<Image
										src={image.src}
										alt={image.alt}
										width={800}
										height={400}
										priority={index === 0}
										sizes="(max-width: 850px) 50vw, 33vw"
									/>
								</div>
							))}
						</div>

						<ProductGrid />
					</div>
				</section>

				<section id="packages" className="section">
					<div className="container">
						<h2>Complete Scaffold Packages</h2>
						<p className="lead">
							Instead of buying components one at a time, send through your requirements and ask
							for a complete package quote.
						</p>
						<div className="steps">
							{steps.map((step) => (
								<div className="step" key={step.num}>
									<div className="num">{step.num}</div>
									<h3>{step.title}</h3>
									<p>{step.body}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className="section nation">
					<div className="container nation-grid">
						<div>
							<h2>Supply Nation Registered Company</h2>
							<p>
								Pacific Scaffolding Pty Ltd proudly presents its Supply Nation registered company
								status as part of its business identity.
							</p>
							<p>
								Use this section to display your verified registration details, certification
								information and any procurement information you want customers to see.
							</p>
						</div>
						<div className="nation-badge">
							<strong>SUPPLY NATION</strong>
							<span>Registered Company</span>
						</div>
					</div>
				</section>

				<section id="how" className="section alt">
					<div className="container">
						<h2>Scaffold Sales Made Simple</h2>
						<p className="lead">
							Designed to turn visitors searching for Kwikstage scaffolding into quote enquiries.
						</p>
						<div className="cards">
							{howItWorks.map((item) => (
								<div className="card" key={item.title}>
									<h3>{item.title}</h3>
									<p>{item.body}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				<section id="contact" className="section quote">
					<div className="container">
						<h2>Request a Kwikstage Quote</h2>
						<p>
							Send through your requirements and Pacific Scaffolding Pty Ltd can get back to you
							with the next steps.
						</p>
						<QuoteForm />
					</div>
				</section>
			</main>

			<CartDrawer />

			<footer>
				<div className="container footer-grid">
					<div>
						<strong>Pacific Scaffolding Pty Ltd</strong>
						<br />
						Kwikstage Scaffolding Sales
					</div>
					<div>Scaffold Sales • Components • Packages</div>
					<div>© {new Date().getFullYear()} Pacific Scaffolding Pty Ltd</div>
				</div>
			</footer>
		</CartProvider>
	);
}
