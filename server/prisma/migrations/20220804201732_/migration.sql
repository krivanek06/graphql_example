/*
  Warnings:

  - You are about to drop the `MovieFollowers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MovieFollowers" DROP CONSTRAINT "MovieFollowers_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieFollowers" DROP CONSTRAINT "MovieFollowers_userId_fkey";

-- DropTable
DROP TABLE "MovieFollowers";

-- CreateTable
CREATE TABLE "MovieCommentLike" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "movieCommentId" INTEGER,

    CONSTRAINT "MovieCommentLike_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MovieCommentLike" ADD CONSTRAINT "MovieCommentLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCommentLike" ADD CONSTRAINT "MovieCommentLike_movieCommentId_fkey" FOREIGN KEY ("movieCommentId") REFERENCES "MovieComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
