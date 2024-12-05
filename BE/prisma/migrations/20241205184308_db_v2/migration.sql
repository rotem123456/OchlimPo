/*
  Warnings:

  - You are about to drop the column `description` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `ingredients` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `steps` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `foodCategory` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FoodCategory" AS ENUM ('dietary', 'taste', 'cuisine', 'ingredient', 'preparation', 'course');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('BLOGGER', 'CHEF', 'POSTER', 'VIEWER');

-- CreateEnum
CREATE TYPE "FoodType" AS ENUM ('vegitarian', 'meat', 'vegan', 'glutenFree', 'keto', 'paleo', 'dairy', 'spicy', 'sweet', 'savory', 'sour', 'bitter', 'seafood', 'halal', 'kosher', 'raw', 'grilled', 'fried', 'baked', 'steamed', 'roasted', 'indian', 'chinese', 'japanese', 'korean', 'thai', 'italian', 'mexican', 'mediterranean', 'french', 'vietnamese', 'lowCarb', 'highProtein', 'organic', 'fusion', 'streetFood', 'gourmet', 'comfort', 'seasonal', 'breakfast', 'brunch', 'lunch', 'dinner', 'appetizer', 'mainCourse', 'dessert', 'snack', 'soup', 'salad', 'sandwich', 'noodles', 'rice', 'bbq');

-- CreateEnum
CREATE TYPE "Ingredients" AS ENUM ('chicken', 'beef', 'pork', 'lamb', 'salmon', 'tuna', 'shrimp', 'tofu', 'eggs', 'onion', 'garlic', 'tomato', 'potato', 'carrot', 'broccoli', 'spinach', 'mushroom', 'bellPepper', 'cucumber', 'rice', 'pasta', 'bread', 'quinoa', 'oats', 'milk', 'cheese', 'yogurt', 'butter', 'cream', 'basil', 'oregano', 'thyme', 'cumin', 'paprika', 'cinnamon', 'turmeric', 'ginger', 'chili', 'blackPepper', 'olive_oil', 'soySauce', 'vinegar', 'honey', 'flour', 'sugar', 'salt');

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "description",
DROP COLUMN "difficulty",
DROP COLUMN "ingredients",
DROP COLUMN "steps",
ADD COLUMN     "foodCategory" "FoodCategory" NOT NULL,
ADD COLUMN     "shortDescription" TEXT NOT NULL DEFAULT 'No Description Added';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userSaved" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "userScore" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "type",
ADD COLUMN     "type" "UserType" NOT NULL;

-- CreateTable
CREATE TABLE "RecipeType" (
    "id" SERIAL NOT NULL,
    "type" "FoodType" NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "RecipeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "ingridient" "Ingredients" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RecipeType_recipeId_type_key" ON "RecipeType"("recipeId", "type");

-- CreateIndex
CREATE INDEX "Ingredient_recipeId_idx" ON "Ingredient"("recipeId");

-- CreateIndex
CREATE INDEX "Recipe_userId_idx" ON "Recipe"("userId");

-- AddForeignKey
ALTER TABLE "RecipeType" ADD CONSTRAINT "RecipeType_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
