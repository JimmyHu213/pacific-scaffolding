import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// eslint-config-next 16 ships native flat configs. The FlatCompat wrapper the
// scaffold generates cannot load them (it crashes inside the eslintrc validator),
// so the presets are imported directly.
const eslintConfig = [
	{
		ignores: [".next/**", ".open-next/**", ".wrangler/**", "node_modules/**"],
	},
	...nextCoreWebVitals,
	...nextTypescript,
];

export default eslintConfig;
