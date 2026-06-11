import { fetch } from "bun";
import createClient from "openapi-fetch";
import config from "../../config.js";
import type { paths } from "./github-openapi-spec.js";

const headers = new Headers();

headers.set("Accept", "application/vnd.github+json");
headers.set("X-GitHub-Api-Version", config.codebases.github.apiVersion);

export const githubApiClient = () =>
	createClient<paths>({
		baseUrl: "https://api.github.com",
		headers,
		fetch,
	});
