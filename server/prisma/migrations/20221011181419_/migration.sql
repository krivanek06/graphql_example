/*
  Warnings:

  - You are about to drop the `MovieCommentLike` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `likes` to the `MovieComment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MovieCommentLike" DROP CONSTRAINT "MovieCommentLike_movieCommentId_fkey";

-- DropForeignKey
ALTER TABLE "MovieCommentLike" DROP CONSTRAINT "MovieCommentLike_userId_fkey";

-- AlterTable
ALTER TABLE "MovieComment" ADD COLUMN     "likes" INTEGER NOT NULL;

-- DropTable
DROP TABLE "MovieCommentLike";
