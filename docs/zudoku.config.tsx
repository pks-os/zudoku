import type { ZudokuConfig } from "zudoku";
import { sidebar } from "./sidebar";
import PreviewBanner from "./src/PreviewBanner";

const config: ZudokuConfig = {
  page: {
    logo: {
      src: {
        light: "/docs-static/logos/zudoku-light.svg",
        dark: "/docs-static/logos/zudoku-dark.svg",
      },
      width: "99px",
    },
    banner: {
      message: <PreviewBanner />,
    },
  },
  metadata: {
    title: "%s | Zudoku",
    favicon: "https://cdn.zudoku.dev/logos/favicon.svg",
  },
  docs: {
    files: "/pages/**/*.{md,mdx}",
  },
  redirects: [
    { from: "/", to: "/docs/introduction" },
    { from: "/docs", to: "/docs/introduction" },
    { from: "/docs/getting-started", to: "/docs/app-quickstart" },
  ],
  topNavigation: [{ id: "docs", label: "Documentation" }],
  sidebar,
};

export default config;
