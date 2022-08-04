/*
  Warnings:

  - You are about to drop the column `movieId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_movieId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "movieId",
DROP COLUMN "username";

-- CreateTable
CREATE TABLE "MovieFollowers" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "movieId" INTEGER,
    "userId" INTEGER,

    CONSTRAINT "MovieFollowers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MovieFollowers" ADD CONSTRAINT "MovieFollowers_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieFollowers" ADD CONSTRAINT "MovieFollowers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
