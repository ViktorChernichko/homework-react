/**
 * Хелпер для логування з можливістю включення/виключення.
 * Використовуйте DEBUG_MODE для керування виводом у консоль.
 */

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
    // Помилки зазвичай краще виводити завжди, але слідуємо прапорцю за запитом
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
