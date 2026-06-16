import type { App } from "../app.js";
import config from "../config.js";
import { authRouter } from "./authRoutes.js";
import { docsGet } from "./docs.get.js";
import githubReposGet from "./github/repos.get.js";
import { openAPIGet } from "./openapi.get.js";

export const registerRoutes = (app: App) => {
	app.openapiRoutes([githubReposGet] as const);
	app.route("/", authRouter);

	if (config.server.environment !== "production") {
		app.route("/", docsGet);
		app.route("/", openAPIGet);
	}
};
