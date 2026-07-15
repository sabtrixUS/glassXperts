import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGitHubPages ? "/glassXperts" : "",
  assetPrefix: isGitHubPages ? "/glassXperts/" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? "/glassXperts" : "",
  },
};

export default nextConfig;
