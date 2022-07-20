import jwt from 'jwt-simple';

const secret = process.env.SECRET;
const authorization = (req, res, next) => {
  const token = req.headers.authorization;

  if (!req.path.includes('/admin/login')) {
    if (!token) {
      return res.status(403).send({ message: 'Necesitas un token' })
    }
    try {
      const payload = jwt.decode(token.replace('Bearer ', ''), secret)
  
      req.params.user = payload.user
      
      req.params.isAdmin = payload.isAdmin
    } catch (ex) {
      return res.status(500).send({ message: 'Token invalido' })
    }
  }

  next()
}

export default authorization;