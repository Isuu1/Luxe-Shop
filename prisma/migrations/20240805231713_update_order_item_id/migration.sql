/*
  Warnings:

  - A unique constraint covering the columns `[sanityId]` on the table `Wishlist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_sanityId_key" ON "Wishlist"("sanityId");
