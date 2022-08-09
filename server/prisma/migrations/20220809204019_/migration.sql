/*
  Warnings:

  - Made the column `movieId` on table `MovieComment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `MovieComment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "MovieComment" DROP CONSTRAINT "MovieComment_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieComment" DROP CONSTRAINT "MovieComment_userId_fkey";

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "description" SET DEFAULT '';

-- AlterTable
ALTER TABLE "MovieComment" ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "movieId" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "description" SET DEFAULT '';

-- AddForeignKey
ALTER TABLE "MovieComment" ADD CONSTRAINT "MovieComment_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieComment" ADD CONSTRAINT "MovieComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
