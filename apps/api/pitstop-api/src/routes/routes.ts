import type { App } from "../app.js";
import githubReposGet from "./github/repos.get.js";

export const registerRoutes = (app: App) => {
	app.openapiRoutes([githubReposGet] as const);
};
