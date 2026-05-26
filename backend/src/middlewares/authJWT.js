const jwt = require('jsonwebtoken');

/**
 * Middleware: verifica se o token JWT é válido.
 * Adiciona req.user = { id, email, name, plan } nas rotas protegidas.
 */
function authJWT(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Token de autenticação não fornecido.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, name, email, plan }
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado. Faça login novamente.',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Token inválido.',
    });
  }
}

module.exports = authJWT;
