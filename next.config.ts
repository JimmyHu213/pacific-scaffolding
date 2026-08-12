import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		// Workers has no sharp binary, so Next's default image optimiser can't run.
		// Images are served as-is from /public; swap in Cloudflare Images if optimisation
		// becomes necessary. See https://opennext.js.org/cloudflare/howtos/image
		unoptimized: true,
	},
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
