/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT DEFAULT 'https://xsgames.co/randomusers/assets/avatars/male/43.jpg';
