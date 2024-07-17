import logger from '../config/logger.js';

// Middleware para loggear todas las solicitudes y respuestas
const logMiddleware = (req, res, next) => {
  // Log de la solicitud
  logger.info('Solicitud entrante', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  });

  // Capturar la respuesta
  const oldWrite = res.write;
  const oldEnd = res.end;

  const chunks = [];

  res.write = function (chunk) {
    chunks.push(chunk);
    oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk) {
      chunks.push(chunk);
    }
    const body = Buffer.concat(chunks).toString('utf8');

    // Log de la respuesta
    logger.info('Respuesta saliente', {
      statusCode: res.statusCode,
      body: body,
    });

    oldEnd.apply(res, arguments);
  };

  next();
};

export default logMiddleware;