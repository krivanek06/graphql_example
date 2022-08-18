-- DropForeignKey
ALTER TABLE "MovieComment" DROP CONSTRAINT "MovieComment_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieCommentLike" DROP CONSTRAINT "MovieCommentLike_movieCommentId_fkey";

-- AddForeignKey
ALTER TABLE "MovieComment" ADD CONSTRAINT "MovieComment_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCommentLike" ADD CONSTRAINT "MovieCommentLike_movieCommentId_fkey" FOREIGN KEY ("movieCommentId") REFERENCES "MovieComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
