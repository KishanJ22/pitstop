import { Hono } from "hono";
import { requestId } from "hono/request-id";
import * as pkgJson from "../package.json";
import { customHonoLogLayer } from "./logger";

const app = new Hono();

app.use("*", requestId());
app.use(customHonoLogLayer);

app.get("/health", (c) => {
  return c.json({
    status: "healthy",
    version: pkgJson.version,
  });
});

export default app;
