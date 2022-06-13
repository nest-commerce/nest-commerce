

# NestCommerce

Open source headless ecommerce platform based on NestJS

## Get Started
* Clone this repo
* Ensure Docker is installed and running locally
* Copy `.env.example` as `.env` in `apps/api` folder and update values accordingly
* Execute `docker-compose up` in the root folder
* Admin UI available at [localhost:3000/](http://localhost:3000/)
* Swagger documentation is available at [localhost:3000/api/swagger](http://localhost:3000/api/swagger)

## Running in development
* Execute `docker-compose up mysql` in root folder
* Execute `npx nx serve api` to start API server
* Execute `npx nx serve admin-ui` to serve admin-ui

## Tech Stack
### Backend
* [NestJS](https://docs.nestjs.com/)
* [Prisma](https://www.prisma.io/)
* [MySQL](https://www.mysql.com/)
* [Docker](https://www.docker.com/)

### Admin-UI Frontend
* [React](https://reactjs.org/)
