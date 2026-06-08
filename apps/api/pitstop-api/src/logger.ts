import { honoLogLayer } from "@loglayer/hono";
import { PinoTransport } from "@loglayer/transport-pino";
import {
  getSimplePrettyTerminal,
  moonlight,
} from "@loglayer/transport-simple-pretty-terminal";
import { LogLayer } from "loglayer";
import { pino } from "pino";
import { serializeError } from "serialize-error";

const pinoLogger = pino({
  level: "trace",
});

const prettyTransport = getSimplePrettyTerminal({
  runtime: "node",
  theme: moonlight,
  viewMode: "inline",
});

const pinoTransport = new PinoTransport({
  logger: pinoLogger,
});

const logger = new LogLayer({
  errorSerializer: serializeError,
  transport: pinoTransport,
});

export const customHonoLogLayer = honoLogLayer({ instance: logger });
