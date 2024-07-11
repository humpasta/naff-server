# N.A.F.F. Express Server

This is a simple service written in node.js and Express that provides basic functionality for the monthly newsletter of the K.A.F.F. im Osnabrück/Germany (https://kaff-os.de).

## How to run

Create a valid .env file by renaming and filling in env-example. The application expects a simple sqlite database containing one table `subscribers` with a single text column `email`.