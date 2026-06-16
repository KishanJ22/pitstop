import { Scalar } from "@scalar/hono-api-reference";
import { Hono } from "hono";

export const docsGet = new Hono();

docsGet.get(
	"/docs",
	Scalar({
		pageTitle: "API Documentation",
		theme: "purple",
		sources: [
			{
				title: "Pitstop API",
				url: "/openapi",
				default: true,
			},
			{
				title: "Auth",
				url: "/auth/open-api/generate-schema",
			},
		],
	}),
);
