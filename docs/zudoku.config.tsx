import type { ZudokuConfig } from "zudoku";
import { Button } from "zudoku/ui/Button.js";
import DiscordIcon from "./src/DiscordIcon";
import { DocusaurusDocsLicense } from "./src/DocusaurusDocsLicense";
import GithubIcon from "./src/GithubIcon";
import PreviewBanner from "./src/PreviewBanner";

const config: ZudokuConfig = {
  basePath: "/docs",
  page: {
    banner: {
      message: <PreviewBanner />,
      dismissible: true,
    },
  },
  theme: {
    light: {
      primary: "#1D48E5",
      primaryForeground: "#FFFFFF",
    },
    dark: {
      primary: "#1D48E5",
      primaryForeground: "#FFFFFF",
    },
  },
  mdx: {
    components: { DocusaurusDocsLicense },
  },
  metadata: {
    title: "%s | Zudoku",
    favicon: "https://cdn.zudoku.dev/logos/favicon.svg",
  },
  docs: {
    files: "/pages/**/*.{md,mdx}",
  },
  sitemap: {
    siteUrl: "https://zudoku.dev",
  },
  search: {
    type: "inkeep",
    apiKey: "2c941c4469ab259f1ba676d2b6ee595559230399ad90a074",
    integrationId: "cm4sn77nj00h4jvirrkbe01d1",
    organizationId: "org_dDOlt2uJlMWM8oIS",
    primaryBrandColor: "#ff00bd",
    organizationDisplayName: "Zudoku",
  },
  redirects: [
    { from: "/", to: "/introduction" },
    { from: "/getting-started", to: "/app-quickstart" },
    { from: "/components", to: "/components/callout" },
  ],
  topNavigation: [
    { id: "docs", label: "Documentation" },
    { id: "components", label: "Components" },
  ],
  sidebar: {
    docs: [
      {
        type: "category",
        label: "Getting started",
        icon: "sparkles",
        items: ["introduction", "app-quickstart", "html-quickstart"],
      },
      {
        type: "category",
        label: "Configuration",
        icon: "cog",
        link: "configuration/overview",
        items: [
          "configuration/api-reference",
          "configuration/api-catalog",
          "configuration/navigation",
          "configuration/search",
          "configuration/authentication",
          "configuration/customization",
          "configuration/sentry",
          "configuration/vite-config",
        ],
      },
      {
        type: "category",
        label: "Markdown",
        icon: "book-open-text",
        link: "markdown/overview",
        items: ["markdown/mdx", "markdown/admonitions", "markdown/code-blocks"],
      },
      {
        type: "category",
        label: "Guide",
        icon: "monitor-check",
        items: ["environment-variables", "custom-pages", "using-multiple-apis"],
      },
      {
        type: "category",
        label: "Deployment",
        icon: "cloud-upload",
        link: "deployment",
        items: [
          "deploy/cloudflare-pages",
          "deploy/github-pages",
          "deploy/vercel",
          "deploy/direct-upload",
        ],
      },
      {
        type: "category",
        label: "Extending",
        icon: "blocks",
        items: ["custom-plugins", "api-keys"],
      },
    ],
    components: [
      {
        icon: "component",
        type: "category",
        label: "Components",
        items: ["components/callout", "components/icons", "components/shadcn"],
      },
    ],
  },
  UNSAFE_slotlets: {
    "head-navigation-end": () => (
      <div className="flex items-center border-r pr-2">
        <Button variant="ghost" size="icon" asChild>
          <a href="https://github.com/zuplo/zudoku">
            <GithubIcon className="w-4 h-4 dark:invert" />
          </a>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <a href="https://discord.gg/stPRhjbA55">
            <DiscordIcon className="w-5 h-5 dark:invert" />
          </a>
        </Button>
      </div>
    ),
  },
};

export default config;
