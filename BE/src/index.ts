import express from 'express';
import cors from 'cors';  // Add this import
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userroutes';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 4000;

// Add CORS configuration before other middleware
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use('/user', userRoutes); 

app.get('/', (req, res) => {
  res.json({ message: 'OchlimPo BE' });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});