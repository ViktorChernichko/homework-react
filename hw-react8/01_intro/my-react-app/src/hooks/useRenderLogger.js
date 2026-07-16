import { useEffect } from 'react';
import logger from '../utils/logger.js';

/**
 * Хук для логування ререндерів компонента та часу їх виконання.
 * @param {string} componentName - Назва компонента для логування.
 */
export const useRenderLogger = (componentName) => {
  const startTime = performance.now();

  useEffect(() => {
    const endTime = performance.now();
    logger.info(`[Render] ${componentName} відрендерено за ${(endTime - startTime).toFixed(2)} мс`);
  });
};
