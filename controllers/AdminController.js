import JWT from 'jwt-simple';
import { Admin } from '../models';
import config from '../config';

async function login(req, res) {
  const { user, password } = req.body;
  const totallyAdmin = await Admin.find({}).count();

  if (totallyAdmin === 0) {
    console.log(config.secret)
    const admin = await Admin.create({
      user,
      privilegies: 'SuperAdmin',
      password: JWT.encode(password, config.secret, 'HS256')
    })

    const jwt = JWT.encode({
      id: admin._id,
      user: admin.user,
      privilegies: admin.privilegies
    }, config.secret)

    return res.status(200).send({token: jwt})
  }

  const existAdmin = await Admin.findOne({user});

  if (!existAdmin) {
    return res.status(204).send({message: "USER NOT EXIST"});
  }
  const decodePassword = JWT.decode(existAdmin.password, config.secret, false, 'HS256');
  const validPassword = password === decodePassword;

  if(!validPassword) {
    return res.status(204).send({message: "PASSWORD INVALID"});
  }

  const token = JWT.encode({
    id: existAdmin._id,
    user: existAdmin.user,
    privilegies: existAdmin.privilegies
  }, config.secret)

  return res.status(200).send({token})
}

export default {
  login
}