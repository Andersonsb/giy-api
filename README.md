# giy-api

Api of GIY project. NodeJS/Express/MongoDB

Needs a MongoDB on Atlas:
set:
"MONGO_ATLAS_PW": "<password>",
"JWT_KEY": "<secretkey>"
as environments variables.

(i'm using nodemon, so env variables are on nodemon.json for now)

running:
docker build .
docker run -d --name <name of container> -p 3000:3000 <image>
it will be accessible on localhost:3000 on host
