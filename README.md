# smart-blogger-api

## Overview

**smart-blogger-api** is a Node.js REST API that generates blog post ideas and content using an AI model (via Ollama), and allows you to save, retrieve, and delete blog posts. It uses MongoDB for data storage.

## Features

- Generate blog post ideas and content using an AI model
- Save generated posts to MongoDB
- Retrieve all saved posts
- Delete posts by ID
- Health and info endpoints

## Tech Stack & Packages

- **Node.js** with **Express** for the API server
- **MongoDB** with **Mongoose** for database
- **Ollama** for AI-powered content generation
- **body-parser** for parsing JSON requests
- **dotenv** for environment variable management

### Main NPM Packages

- express
- mongoose
- ollama
- body-parser
- dotenv

## How to Run the App

1. **Clone the repository**

   ```sh
   git clone <repo-url>
   cd smart-blogger-api
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add:

   ```env
   MONGODB_URI=<your-mongodb-connection-string>
   ```

4. **Start the server**

   ```sh
   node server.js
   ```

   The server will run on [http://localhost:3000](http://localhost:3000).

## API Endpoints

- `GET /smart-blogger-api/info` — App info
- `GET /smart-blogger-api/health` — Health check
- `POST /smart-blogger-api/blogger-ideas` — Generate blog ideas/content (body: `{ "topic": "your topic" }`)
- `POST /smart-blogger-api/save-post` — Save a post (body: `{ "topic": "...", "post": "..." }`)
- `GET /smart-blogger-api/posts` — Get all posts
- `DELETE /smart-blogger-api/delete-post/:id` — Delete a post by ID

## Notes

- Requires a running MongoDB instance.
- Requires Ollama and a model named `smart-blogger` available to generate content.

---