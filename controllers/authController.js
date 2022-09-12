import db from '../database/mongodb.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { authRegisterSchema, authLoginSchema } from '../schemas/authSchema.js';

export async function loginUser(request, response) {
  try {
    const user = request.body;

    const validate = authLoginSchema.validate(user);

    if (validate.error) {
      return response.status(422).send('Email e senha são obrigatorio!!');
    }

    const checkUser = await db.collection('users').findOne({ email: user.email });

    if (!checkUser) {
      return response.status(422).send('Email ou senha inválidos');
    }

    const decryptedPassword = bcrypt.compareSync(user.password, checkUser.password);

    if (decryptedPassword) {
      const token = uuid();
      await db.collection('sessions').insertOne({ token, userId: checkUser._id });

      return res.status(200).send({ token, name: checkUser.name });
    }

    response.status(200).send('Login efetuado com sucesso!');
  } catch (error) {
    response.sendStatus(500);
  }
}

export async function createUser(request, response) {
  try {
    const newUser = request.body;

    const validate = authRegisterSchema.validate(newUser);

    if (validate.error) {
      return response.sendStatus(422);
    }

    const passwordHash = bcrypt.hashSync(newUser.password, 10);

    await db.collection('users').insertOne({
      name: newUser.name,
      email: newUser.email,
      password: passwordHash
    });

    response.status(200).send('Usuário cadastrado com sucesso!');
  } catch (error) {
    response.sendStatus(500);
  }
}