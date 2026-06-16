import { Hono } from "hono";
import app from "../app";
import { openApiConfig } from "../config";

export const openAPIGet = new Hono();

openAPIGet.get("/openapi", (c) => {
	const spec = app.getOpenAPI31Document(openApiConfig);

	return c.json(spec);
});
