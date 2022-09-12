import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URL);
let db;

try {
    await mongoClient.connect();
    db = mongoClient.db(process.env.MONGO_DB_NAME);
} catch (error) {
    console.error('Erro ao tentar conexão com o banco de dados!');
}

export default db;