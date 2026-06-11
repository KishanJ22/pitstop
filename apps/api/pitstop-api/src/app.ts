import { OpenAPIHono } from "@hono/zod-openapi";
import { requestId } from "hono/request-id";
import * as pkgJson from "../package.json";
import { openApiConfig } from "./config";
import { customHonoLogLayer } from "./logger";
import { registerRoutes } from "./routes/routes";

const app = new OpenAPIHono();

app.doc("/openapi", openApiConfig);

app.use("*", requestId());
app.use(customHonoLogLayer);

registerRoutes(app);

app.get("/", (c) => {
	return c.json({
		message: "Welcome to Pitstop API!",
	});
});

app.get("/health", (c) => {
	return c.json({
		status: "healthy",
		version: pkgJson.version,
	});
});

export default app;

export type App = typeof app;
