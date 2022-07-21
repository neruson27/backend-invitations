import JWT from 'jwt-simple';
import { Admin } from '../models';
import config from '../config';
import { encryptPassword, validatePassword } from '../utils/password';

async function login(req, res) {
  const { user, password } = req.body;
  console.log(req.body)
  const totallyAdmin = await Admin.find({}).count();

  console.log(totallyAdmin)

  if (totallyAdmin === 0) {
    const admin = await Admin.create({
      user,
      privilegies: 'SuperAdmin',
      password: await encryptPassword(password)
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
    return res.status(400).send({message: "USER NOT EXIST"});
  }

  const validPassword = await validatePassword(password, existAdmin.password);

  if(!validPassword) {
    return res.status(400).send({message: "PASSWORD INVALID"});
  }

  const token = JWT.encode({
    id: existAdmin._id,
    user: existAdmin.user,
    privilegies: existAdmin.privilegies
  }, config.secret)

  return res.status(200).send({token})
}

async function createAnotherAdmin(req, res) {
  if (req.params.privilegies !== 'SuperAdmin') return res.status(400).send({message: 'NO PASARAAAS!'})

  const { user, password } = req.body;

  const admin = await Admin.create({
    user,
    privilegies: 'Admin',
    password: await encryptPassword(password)
  })

  const jwt = JWT.encode({
    id: admin._id,
    user: admin.user,
    privilegies: admin.privilegies
  }, config.secret)

  return res.status(200).send({token: jwt})
}

export default {
  login,
  createAnotherAdmin
}