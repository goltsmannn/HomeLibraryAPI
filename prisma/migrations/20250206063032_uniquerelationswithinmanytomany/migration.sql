/*
  Warnings:

  - The primary key for the `Favorites_UserAlbum` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Favorites_UserAlbum` table. All the data in the column will be lost.
  - The primary key for the `Favorites_UserArtist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Favorites_UserArtist` table. All the data in the column will be lost.
  - The primary key for the `Favorites_UserTrack` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Favorites_UserTrack` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[albumId,userId]` on the table `Favorites_UserAlbum` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[artistId,userId]` on the table `Favorites_UserArtist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[trackId,userId]` on the table `Favorites_UserTrack` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Favorites_UserAlbum" DROP CONSTRAINT "Favorites_UserAlbum_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "Favorites_UserArtist" DROP CONSTRAINT "Favorites_UserArtist_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "Favorites_UserTrack" DROP CONSTRAINT "Favorites_UserTrack_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_UserAlbum_albumId_userId_key" ON "Favorites_UserAlbum"("albumId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_UserArtist_artistId_userId_key" ON "Favorites_UserArtist"("artistId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_UserTrack_trackId_userId_key" ON "Favorites_UserTrack"("trackId", "userId");
