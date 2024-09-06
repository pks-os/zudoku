import fs from "node:fs/promises";
import path from "node:path";
import {
  type getRoutesByConfig,
  type render as serverRender,
} from "../app/entry.server.js";
import { type ZudokuConfig } from "../config/validators/validate.js";
import { joinPath } from "../lib/util/joinPath.js";

export class FileWritingResponse {
  private buffer = "";
  private dontSave = false;
  private resolve = () => {};
  private resolved = new Promise<void>((res) => (this.resolve = res));

  set() {}
  status(status: number) {
    if (status >= 300) {
      this.dontSave = true;
    }
  }
  on() {}

  constructor(private readonly fileName: string) {}

  redirect() {
    this.buffer = "redirected";
    this.dontSave = true;
    this.resolve();
  }

  send = async (chunk: string) => {
    this.write(chunk);
    await this.end();
  };

  write(chunk: string, _encoding?: string) {
    this.buffer += chunk;
  }

  async end(chunk = "") {
    if (!this.dontSave) {
      await fs.mkdir(path.dirname(this.fileName), { recursive: true });
      await fs.writeFile(this.fileName, this.buffer + chunk);
    }
    this.resolve();
  }

  isSent() {
    return this.resolved;
  }
}

const routesToPaths = (routes: ReturnType<typeof getRoutesByConfig>) => {
  const paths: string[] = [];
  const addPaths = (routes: ReturnType<typeof getRoutesByConfig>) => {
    for (const route of routes) {
      if (route.path) {
        paths.push(route.path.startsWith("/") ? route.path : `/${route.path}`);
      }
      if (route.children) {
        addPaths(route.children);
      }
    }
  };
  addPaths(routes);
  return paths;
};

export const prerender = async (html: string, dir: string) => {
  // eslint-disable-next-line no-console
  console.log("Prerendering...");
  const config: ZudokuConfig = await import(
    path.join(dir, "dist/server/zudoku.config.js")
  ).then((m) => m.default);

  const module = await import(path.join(dir, "dist/server/entry.server.js"));
  const render = module.render as typeof serverRender;

  const getRoutes = module.getRoutesByConfig as typeof getRoutesByConfig;

  const routes = getRoutes(config);
  const paths = routesToPaths(routes);

  const writtenFiles: string[] = [];
  for (const urlPath of paths) {
    const req = new Request(
      new URL(joinPath(config.basePath, urlPath), "http://localhost").href,
    );

    const filename = urlPath === "/" ? "/index.html" : `${urlPath}.html`;

    const response = new FileWritingResponse(path.join(dir, "dist/", filename));

    await render({ template: html, request: req, response, config });
    await response.isSent();
    writtenFiles.push(filename);
  }

  // eslint-disable-next-line no-console
  console.log(`Prerendered ${paths.length} pages`);

  if (config.sitemap) {
    const toUrlLoc = (path?: string) => {
      try {
        if (!path || path.includes("*")) return [];
        return `<url><loc>${new URL(joinPath(config.basePath, path), config.sitemap!.baseUrl)}</loc></url>`;
      } catch {
        // skip invalid urls
        return [];
      }
    };

    const sitemapXml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...paths.flatMap(toUrlLoc),
      "</urlset>",
    ].join("\n");

    const sitemapPath = path.join(
      dir,
      "dist",
      config.sitemap.outfile ?? "sitemap.xml",
    );
    await fs.writeFile(sitemapPath, sitemapXml);

    // eslint-disable-next-line no-console
    console.log(`Wrote sitemap to ${sitemapPath}`);
  }

  return writtenFiles;
};
