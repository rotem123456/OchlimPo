import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});


app.post('/users', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const { email, name, password, type } = req.body;
    
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
        type
      }
    });
    
    res.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: 'Failed to create user'});
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(400).json({ error: 'Failed to fetch users' });
  }
});



app.get('/recipes', async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany();
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(400).json({ error: 'Failed to fetch recipes' });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});