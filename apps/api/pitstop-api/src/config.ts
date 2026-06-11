import { type Static, Type } from "@sinclair/typebox";
import pkgJson from "../package.json";
import "dotenv/config";

export const openApiConfig = {
	openapi: "3.1.0",
	info: {
		version: pkgJson.version,
		title: pkgJson.name,
	},
};

const configSchema = Type.Object({
	database: Type.Object({
		host: Type.String({ minLength: 1 }),
		port: Type.Number({ minimum: 1 }),
		user: Type.String({ minLength: 1 }),
		password: Type.String({ minLength: 1 }),
		name: Type.String({ minLength: 1 }),
		keepAlive: Type.Boolean(),
		maxConnections: Type.Number({ minimum: 1 }),
	}),
	server: Type.Object({
		port: Type.Number({ minimum: 1 }),
		environment: Type.Union([
			Type.Literal("local"),
			Type.Literal("development"),
			Type.Literal("test"),
			Type.Literal("production"),
		]),
		devMode: Type.Boolean(),
	}),
	auth: Type.Object({
		baseUrl: Type.String({ minLength: 1 }),
		secret: Type.String({ minLength: 1 }),
	}),
	mail: Type.Object({
		host: Type.String({ minLength: 1 }),
		port: Type.Number({ minimum: 1 }),
		user: Type.String({ minLength: 1 }),
		password: Type.String({ minLength: 1 }),
	}),
	codebases: Type.Object({
		github: Type.Object({
			apiVersion: Type.String(),
			devAuthToken: Type.String(),
		}),
	}),
});

type ConfigSchema = Static<typeof configSchema>;

export const config: ConfigSchema = {
	auth: {
		baseUrl: process.env.BETTER_AUTH_BASE_URL!,
		secret: process.env.BETTER_AUTH_SECRET!,
	},
	database: {
		host: process.env.DATABASE_HOST!,
		port: Number(process.env.DATABASE_PORT!),
		user: process.env.DATABASE_USER!,
		password: process.env.DATABASE_PASSWORD!,
		name: process.env.DATABASE_NAME!,
		keepAlive: process.env.DATABASE_KEEP_ALIVE === "true",
		maxConnections: Number(process.env.DATABASE_MAX_CONNECTIONS) || 10,
	},
	server: {
		port: Number(process.env.PORT) || 2000,
		environment: (process.env
			.ENVIRONMENT as ConfigSchema["server"]["environment"])!,
		devMode: process.env.DEV_MODE === "true",
	},
	mail: {
		host: process.env.MAIL_SERVER_HOST!,
		port: Number(process.env.MAIL_SERVER_PORT!),
		user: process.env.MAIL_SERVER_USER!,
		password: process.env.MAIL_SERVER_PASSWORD!,
	},
	codebases: {
		github: {
			apiVersion: process.env.GITHUB_API_VERSION!,
			devAuthToken: process.env.GITHUB_DEV_AUTH_TOKEN!,
		},
	},
};

export default config;
