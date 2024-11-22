import express from 'express';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userroutes';
// import {genSalt, hash} from 'bcrypt';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});