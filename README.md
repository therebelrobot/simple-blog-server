# Simple Blog Platform API

This is a simple RESTful API for a blog platform that allows users to create, read, update, and delete blog posts. Users can also view all blog posts or a specific blog post by its ID. The API allows users to filter blog posts by category and sort by date created. The application is built using Node.js and the Express framework, and uses MongoDB to store the blog posts.

## Table of Contents

- [Simple Blog Platform API](#simple-blog-platform-api)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Testing](#testing)
  - [Deployment](#deployment)
  - [License](#license)

## Installation

To install and run the application locally, follow these steps:

- Clone the repository: `git clone https://github.com/your-username/simple-blog-platform.git`
- Install dependencies: `npm install`
- Create a `.env` file and set the following environment variables:

```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/simple-blog-platform
```

- Start the application: `npm start`

## Usage

The API provides the following endpoints:

```
GET /posts
```

Returns all blog posts in the database. Optional query parameters:

- `category` (string): filter by category
- `sort` (string): sort by date created (asc or desc)

```
GET /posts/:<span class="hljs-built_in">id</span>
```

Returns the blog post with the specified ID.

```
POST /assets
```

Creates a new asset by uploading a file in the request body and returns the asset's ID.

```
POST /posts
```

Creates a new blog post with the specified data in the request body. Required parameters:

- `title` (string): the title of the post
- `content` (string): the content of the post
- `category` (string): the category of the post
- `assetId` (string): the assetId of the associated post

```
PUT /posts/:<span class="hljs-built_in">id</span>
```

Updates the blog post with the specified ID with the data in the request body. Optional parameters:

```
DELETE /posts/:<span class="hljs-built_in">id</span>
```

Deletes the blog post with the specified ID.

## Testing

To run tests, follow these steps:

- Ensure that the application is not running.
- Create a `.env.test` file and set the following environment variables:

```
NODE_ENV=<span class="hljs-built_in">test</span>
PORT=3001
MONGODB_URI=mongodb://localhost:27017/simple-blog-platform-test
```

- Start the test server: `npm run test:server`
- In a new terminal window, run the tests: `npm test`

## Deployment

To deploy the application, follow these steps:

- Ensure that MongoDB is installed and running.
- Set the following environment variables:

```
NODE_ENV=production
PORT=8080
MONGODB_URI=mongodb://<username>:<password>@<hostname>:<port>/<database-name>
```

- Build the application: `npm run build`
- Start the application: `npm start`

## License

This project is licensed under [the Unlicense](./LICENSE). You are free to use, copy, modify, and/or distribute this code without any restrictions or requirements.
