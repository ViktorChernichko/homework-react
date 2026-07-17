const DEBUG_MODE = true;

const logger = {
  log: (...args) => {
    if (DEBUG_MODE) {
      console.log("[LOG]:", ...args);
    }
  },
  warn: (...args) => {
    if (DEBUG_MODE) {
      console.warn("[WARN]:", ...args);
    }
  },
  error: (...args) => {
    if (DEBUG_MODE) {
      console.error("[ERROR]:", ...args);
    }
  },
  info: (...args) => {
    if (DEBUG_MODE) {
      console.info("[INFO]:", ...args);
    }
  }
};

export default logger;
