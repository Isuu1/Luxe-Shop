/*
  Warnings:

  - You are about to drop the column `productRating` on the `Wishlist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Wishlist" DROP COLUMN "productRating",
ADD COLUMN     "productRatings" INTEGER;
