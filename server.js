import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import transictionRoutes from './routes/transictionRoutes.js';

const server = express();

dotenv.config();
server.use(cors());
server.use(express.json());

server.use(authRoutes);
server.use(transictionRoutes);

server.listen(5000);