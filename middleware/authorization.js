import jwt from 'jwt-simple';
import Mongoose from 'mongoose';
import { Admin } from '../models';

const secret = process.env.SECRET;
const authorization = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!req.path.includes('/admin/login') && !req.path.includes('/guest/get')) {
    if (!token) {
      return res.status(403).send({ message: 'You need a token' })
    }
    try {
      const payload = jwt.decode(token.replace('Bearer ', ''), secret)
      const userExist = await Admin.findOne({_id: Mongoose.Types.ObjectId(payload.id)});

      if (!userExist) return res.status(403).send({ message: 'User doesn\`t  exist' })

      req.params.user = payload.user

      req.params.privilegies = payload.privilegies
    } catch (err) {
      console.error(err)
      return res.status(500).send({ message: 'Token invalid' })
    }
  }

  next()
}

export default authorization;