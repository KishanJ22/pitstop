import { createRoute, defineOpenAPIRoute, z } from "@hono/zod-openapi";
import { githubApiClient } from "../../lib/github/githubApiClient";

// const githubReposGet = new OpenAPIHono();

const repoSchema = z.object({
	id: z.number(),
	name: z.string(),
});

type Repo = z.infer<typeof repoSchema>;

const successResponse = z.object({
	data: z.array(repoSchema),
});

const reposNotFoundResponse = z.object({
	message: z.literal("reposNotFound"),
});

type NotFound = z.infer<typeof reposNotFoundResponse>;

const route = createRoute({
	method: "get",
	path: "/github/repos",
	responses: {
		200: {
			description: "Successfully retrieve a list of repos",
			content: {
				"application/json": {
					schema: successResponse,
				},
			},
		},
		404: {
			description: "List of repos not found",
			content: {
				"application/json": {
					schema: reposNotFoundResponse,
				},
			},
		},
	},
});

const githubReposGet = defineOpenAPIRoute({
	route,
	handler: async (c) => {
		const repos = await githubApiClient()
			.GET("/users/{username}/repos", {
				params: {
					path: {
						username: "KishanJ22",
					},
					query: {
						type: "owner",
					},
				},
			})
			.then((res) => res.data);

		if (repos && repos.length > 1) {
			const formattedRepos = repos.reduce((acc, repo) => {
				acc.push({
					id: repo.id,
					name: repo.name,
				});
				return acc;
			}, [] as Repo[]);

			return c.json({ data: formattedRepos }, 200);
		}

		return c.json({ message: "reposNotFound" } as NotFound, 404);
	},
});

export default githubReposGet;
