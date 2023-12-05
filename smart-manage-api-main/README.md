# SmartManage API

This is a simple guide to set up and run a SmartManage API locally.

### Prerequisites
Before you begin, ensure you have the following software installed on your machine:

- [Docker](https://docs.docker.com/desktop/install/windows-install/)
- [Node.js](https://nodejs.org/en)

### Dependencies
To install the project dependencies, run the following command in your project's root directory:
```bash
npm install
```
This will install all the required Node.js packages and dependencies.

### Environment variables
Before starting the application, you need to configure some environment variables. Create a .env file in the project's root directory and add the following variables:
```dosini
# .env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=myuser
DB_PASSWORD=mypassword
DB_NAME=mydb
JWT_SECRET=mysecret
```
Make sure to fill in the correct values according to your configuration.

### Services
To run the application locally, we will use Docker Compose. Make sure you have Docker installed on your machine.

Execute the following command to start the services in the background:

```bash
docker-compose up -d
```
This will create and run the necessary containers for the database and other services.

### Migrations
After starting the Docker containers, you need to run TypeORM migrations to create the tables in the database. Execute the following command:
```bash
npm run typeorm migration:run -- -d src/database/index.ts
```
This will apply the migrations and set up the database structure.

### Running the application
Now that the migrations have been successfully applied, you can start the application. Execute the following command:
```bash
npm run dev
```
The application will be running at http://localhost:3000.

### Documentation
You can access the API documentation using Swagger. Open your web browser and go to the following URL:

http://localhost:3000/docs

This will open the Swagger interface, where you can explore and test the API endpoints.

Make sure the application is running before accessing the Swagger documentation.
