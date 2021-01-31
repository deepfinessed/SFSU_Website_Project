# CSC 648 Project

## Description

This application was part of a group project to create a monitoring app for COVID and fire statistics in the state of California. This is a subtree omitting the AWS Credentials (which I would not want in source control anyway, but was required to post as part of the assignment).

The application requires Docker as a dependency. Other than this note, everything is as it was when the project was submitted. For ease of use, sample credentials are included in an environment file so the app 'works' out of the box, though normally such credentials would be omitted from source control.

## Instructions

To launch the app locally, use

```docker-compose up -d```

You can check logs inside a container using ```logs``` as so:

```docker-compose logs backend```

or

```docker-compose logs db```

To deploy the app inside the server, use ```deploy.sh```  .  

After pulling significant changes, particularly to dockerfiles,
you may need to order Docker to rebuild your containers. To do this,
use  

```docker-compose build```.  

## Prisma/Database

This backend uses [prisma](https://www.prisma.io/docs/) to communicate with the database.

It uses models located in backend/prisma/schema.prisma to produce the tables in the database.  

If you change or add a model, to update the database, use the script: ```backend/scripts/migrate.sh``` followed by
a name for your migration. For example:  

```./migrate.sh User```

would create a migration named User.

By default, launching the app uses the most updated database migration.  

Right now, the backend also runs a few tests on the database on launch. Be sure
to check that these tests pass.
