import { betterAuth } from "better-auth";
import { bearer, jwt, openAPI, username } from "better-auth/plugins";
import config from "../config";
import { createPool } from "../db/db";
import { logger } from "../logger";

export const auth = betterAuth({
	appName: "Pitstop API",
	basePath: "/auth",
	baseURL: config.auth.baseUrl,
	secret: config.auth.secret,
	database: createPool("-c search_path=auth"),
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		},
	},
	experimental: {
		joins: true,
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
	},
	plugins: [
		jwt({
			jwt: {
				expirationTime: "1h",
			},
		}),
		bearer(),
		username(),
		openAPI(),
	],
	telemetry: {
		enabled: false,
	},
	logger: {
		level: "info",
		log: (level, message, ...args) => {
			switch (level) {
				case "info":
					logger.info(message, ...args);
					break;
				case "warn":
					logger.warn(message, ...args);
					break;
				case "error":
					logger.error(message, ...args);
					break;
			}
		},
	},
});
