import { betterAuth } from "better-auth";
import { createPool } from "../db/db";

export const auth = betterAuth({
	appName: "Pitstop API",
	basePath: "/auth",
	database: createPool("-c search_path=auth"),
});
