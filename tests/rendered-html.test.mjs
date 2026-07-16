import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("seo-test", `${pathname}-${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200);
  return response.text();
}

test("residential page exposes local SEO metadata and structured data", async () => {
  const html = await render("/");
  assert.match(html, /Frameless Shower Doors Atlanta, GA/);
  assert.match(html, /rel="canonical" href="https:\/\/sabtrixus\.github\.io\/glassXperts\/"/);
  assert.match(html, /FAQPage/);
  assert.match(html, /Custom Frameless Shower Door Installation/);
  assert.match(html, /Frameless shower doors, custom measured for Atlanta homes/);
});

test("commercial page exposes commercial SEO metadata and structured data", async () => {
  const html = await render("/commercial");
  assert.match(html, /Commercial Glass Repair Atlanta, GA/);
  assert.match(html, /rel="canonical" href="https:\/\/sabtrixus\.github\.io\/glassXperts\/commercial\/"/);
  assert.match(html, /Commercial Glass Repair and Replacement in Atlanta/);
  assert.match(html, /Storefront glass repair, commercial doors and office glass/);
});

test("crawler discovery files include search and AI crawlers", async () => {
  const robots = await readFile(new URL("../public/robots.txt", import.meta.url), "utf8");
  const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  const llms = await readFile(new URL("../public/llms.txt", import.meta.url), "utf8");
  assert.match(robots, /OAI-SearchBot/);
  assert.match(robots, /Googlebot/);
  assert.match(sitemap, /\/commercial\//);
  assert.match(llms, /Commercial glass services/);
});
