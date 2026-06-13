import type { App } from "./app.js";
import config, { openApiConfig } from "./config.js";
import { logger } from "./logger.js";

export const generateSpec = async (app: App) => {
  if (config.server.environment === "local") {
    const document = app.getOpenAPIDocument(openApiConfig);
    await Bun.write("./docs/openapi.json", JSON.stringify(document, null, 2));
    logger.info("Generated docs/openapi.json");
  } else {
    logger.warn("Unable to generate openapi spec");
  }
};
