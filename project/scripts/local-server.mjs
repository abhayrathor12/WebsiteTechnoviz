// Runs the built site on your computer the way Vercel runs it:
// real files from dist/ first, everything else through api/render.js.
// Usage: npm run serve:local   (builds first, then open http://localhost:3000)

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const port = Number(process.env.PORT) || 3000;

// Use the same backend as the frontend build (.env.local), if one is set
const envFile = path.join(root, ".env.local");
if (fs.existsSync(envFile) && !process.env.BLOG_API_URL) {
  const match = fs.readFileSync(envFile, "utf8").match(/^VITE_API_BASE_URL=(.+)$/m);
  if (match) process.env.BLOG_API_URL = `${match[1].trim().replace(/\/$/, "")}/api/blogs`;
}

const { default: render } = await import(pathToFileURL(path.join(root, "api/render.js")).href);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
  ".pdf": "application/pdf",
  ".mp4": "video/mp4",
};

http
  .createServer(async (req, res) => {
    const { pathname } = new URL(req.url, "http://localhost");
    const file = path.join(dist, pathname === "/" ? "index.html" : decodeURIComponent(pathname));

    if (file.startsWith(dist) && fs.existsSync(file) && fs.statSync(file).isFile()) {
      res.setHeader("Content-Type", TYPES[path.extname(file).toLowerCase()] || "application/octet-stream");
      fs.createReadStream(file).pipe(res);
      return;
    }

    req.url = `/api/render?path=${encodeURIComponent(pathname.slice(1))}`;
    try {
      await render(req, res);
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.end("Render error, see terminal");
    }
  })
  .listen(port, () => {
    console.log(`Site running at http://localhost:${port}`);
    console.log(`Blog data from: ${process.env.BLOG_API_URL || "the live PythonAnywhere backend"}`);
  });
