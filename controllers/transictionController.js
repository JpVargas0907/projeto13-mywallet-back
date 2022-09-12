import db from '../database/mongodb.js';
import { transictionSchema } from '../schemas/transictionSchema.js';
import dayjs from 'dayjs';

export async function catchTransictions(request, response) {
  const { user } = response.locals;
  console.log(user._id);
  try {
    const transictions = await db
      .collection('transictions')
      .find({ userId: user._id })
      .toArray();

    response.status(200).send(transictions);
  } catch (error) {
    console.error('Não foi possível pegar as transações do usuário');
  }
}

export async function registerTransiction(request, response) {
  const { value, description, transictionType } = request.body;

  const validate = transictionSchema.validate({ value, description, type });

  if (validate.error) {
    return response.sendStatus(422);
  }

  try {
    const { user } = res.locals;
    await db
      .collection('transictions')
      .insertOne({
        value,
        description,
        transictionType,
        userId: user._id,
        date: dayjs().format('DD/MM')
      });
    response.sendStatus(201);
  } catch (error) {
    response.sendStatus(500);
  }
}