# PharmaPote

## Description
PharmaPote is a health management application where users can create an account, add their treatments, schedule reminders and receive notifications for medications.

## Tech Stack

### Backend
- Node.js
- Express with TypeScript
- Mongoose
- MongoDB
- JWT

### Frontend
- Angular

# How to Run the Project
The project has two main parts: the backend server and the frontend client.

## Backend Setup
1. Navigate to the `server` directory from the root of the project.
2. Install the required npm packages by running `npm install`.
3. Start the server using `npm start`. This will compile the TypeScript files to JavaScript in the `dist` directory and then run the server with `nodemon` for live reloading. 

## Frontend Setup
1. Navigate to the `client` directory from the root of the project.
2. Run `npm install` to install all the dependencies for the Angular frontend.
3. After the installation, start the Angular development server using `ng serve`.

Make sure to run both the backend and frontend services simultaneously in different terminal sessions to have the full functionality of the project available.

## Database Setup

### MongoDB Local Setup
Ensure MongoDB is installed and running on your local system. The backend application is configured to connect to a local MongoDB instance by default.

### Importing Data to MongoDB
To import the `medicaments` collection from the provided JSON file into your local MongoDB database, follow these steps:

1. Navigate to the root directory of the project where the `medicamentsCollection` folder is located.
2. Use the `mongoimport` command to import the data from the `medicaments.json` file into your MongoDB database. Run the following command in your terminal:

```bash
mongoimport --db theproject --collection medicaments --file medicamentsCollection/medicaments.json

