import express from 'express';
import cors from 'cors';  
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userroutes';
import reciperoutes from './routes/reciperoutes'
import featureroutes from './routes/featureroute';
const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 4000;


app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use('/user', userRoutes); 
app.use('/recipe',reciperoutes);
app.use('/feature',featureroutes);

app.get('/', (req, res) => {
  res.json({ message: 'blablablalblblalbasdkljasl;dkj;lkj;aslkdj' });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});



