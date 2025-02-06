-- CreateTable
CREATE TABLE "Favorites_UserTrack" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Favorites_UserTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorites_UserAlbum" (
    "id" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Favorites_UserAlbum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorites_UserArtist" (
    "id" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Favorites_UserArtist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Favorites_UserTrack" ADD CONSTRAINT "Favorites_UserTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites_UserTrack" ADD CONSTRAINT "Favorites_UserTrack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites_UserAlbum" ADD CONSTRAINT "Favorites_UserAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites_UserAlbum" ADD CONSTRAINT "Favorites_UserAlbum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites_UserArtist" ADD CONSTRAINT "Favorites_UserArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites_UserArtist" ADD CONSTRAINT "Favorites_UserArtist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
