import pino from "pino";
import dayjs from "dayjs";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: `SYS:🕖dd-mm-yyyy HH:MM:ss`,
      ignore: "pid,hostname",
    },
  },
});

export default logger;
