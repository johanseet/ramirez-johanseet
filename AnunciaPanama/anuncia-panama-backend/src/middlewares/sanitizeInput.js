//Limpia los datos de entrada para prevenir inyecciones de SQL o XSS.
import sanitize from 'sanitize-html';

const sanitizeInput = (req, res, next) => {
  Object.keys(req.body).forEach((key) => {
    req.body[key] = sanitize(req.body[key]);
  });
  next();
};

export default sanitizeInput;
