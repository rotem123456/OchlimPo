import { PrismaClient, UserType, FoodType, Ingredients, FoodCategory } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function seed() {
  await prisma.$transaction([
    prisma.ingredient.deleteMany(),
    prisma.recipeType.deleteMany(),
    prisma.recipe.deleteMany(),
    prisma.user.deleteMany(),
  ])


  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'chef@example.com',
        name: 'Master Chef',
        password: await bcrypt.hash('password123', 10),
        type: UserType.CHEF,
      },
    }),
    prisma.user.create({
      data: {
        email: 'blogger@example.com',
        name: 'Food Blogger',
        password: await bcrypt.hash('password123', 10),
        type: UserType.BLOGGER,
      },
    }),
  ])

  const recipes = [
    {
      name: 'Spaghetti Carbonara',
      time: '30 minutes',
      shortDescription: 'Classic Italian pasta dish with eggs and pancetta',
      foodCategory: FoodCategory.course,
      userId: users[0].id,
      tags: [FoodType.italian, FoodType.spicy, FoodType.comfort],
      ingredients: [
        { ingridient: Ingredients.eggs, amount: 3 },
        { ingridient: Ingredients.pasta, amount: 500 },
        { ingridient: Ingredients.cheese, amount: 100 },
        { ingridient: Ingredients.blackPepper, amount: 5 },
      ],
    },
    {
      name: 'Vegetable Stir Fry',
      time: '20 minutes',
      shortDescription: 'Quick and healthy Asian-style vegetables',
      foodCategory: FoodCategory.course,
      userId: users[1].id,
      tags: [FoodType.chinese, FoodType.vegitarian, FoodType.salad],
      ingredients: [
        { ingridient: Ingredients.broccoli, amount: 200 },
        { ingridient: Ingredients.carrot, amount: 100 },
        { ingridient: Ingredients.bellPepper, amount: 150 },
        { ingridient: Ingredients.soySauce, amount: 30 },
        { ingridient: Ingredients.ginger, amount: 10 },
      ],
    },
  ]

  for (const recipe of recipes) {
    const { tags, ingredients, ...recipeData } = recipe
    
    await prisma.recipe.create({
      data: {
        ...recipeData,
        tags: {
          create: tags.map(type => ({ type })),
        },
        ingredients: {
          create: ingredients,
        },
      },
    })
  }

  console.log('Database seeded successfully!')
}

seed()
  .catch((error) => {
    console.error('Error seeding database:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })