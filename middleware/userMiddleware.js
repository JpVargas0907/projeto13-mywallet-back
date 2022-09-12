import db from '../database/mongodb.js';

export async function userMiddleware(request, response, next) {
  const { authorization } = request.headers;
  const token = authorization?.replace('Bearer', '').trim();

  if (!token) {
    return response.status(401).send('Token não existe.');
  }  

  try {
    const session = await db.collection('sessions').findOne({ token });
    
    if (!session) {
      return response.status(401).send('Essa sessão não foi encontrada!'); 
    }  

    const user = await db.collection('users').findOne({ _id: session.userId });
    
    if (!user) {
      return response.status(401).send('Esse usuário não existe!');
    }

    response.locals.user = user;
    next();
  } catch (error) {
    console.log('Erro ao tentar obter usuário através da sessão');
    console.log(error);
    return response.sendStatus(500);
  }
}