# Run project
- run the whole backend by `docker-compose up`
- run the client by navigating into `client` and `npm run start`

## Create & seed the database

- Prisma: create schema from schema.prisma:
  - npx prisma migrate dev
- Prisma: seed database
  - npx prisma db seed

## Links

- pgadmin: http://localhost:5555/
  - username: pgadmin4@pgadmin.org
  - password: admin
- graphql: http://localhost:3000/graphql

# Resources

- Setup prisma with docker: https://www.section.io/engineering-education/dockerized-prisma-postgres-api/
