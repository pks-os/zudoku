/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://zudoku.dev",
  generateRobotsTxt: true,
  exclude: ["/sitemap-*.xml", "/icon.svg"],
  additionalPaths: () => [{ loc: "/" }],
  robotsTxtOptions: {
    additionalSitemaps: ["https://zudoku.dev/docs/sitemap.xml"],
  },
};
