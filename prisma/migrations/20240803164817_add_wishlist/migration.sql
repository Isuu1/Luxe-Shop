/*
  Warnings:

  - The `productPrice` column on the `Wishlist` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Wishlist" DROP COLUMN "productPrice",
ADD COLUMN     "productPrice" INTEGER;
