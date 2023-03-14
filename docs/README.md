## Table of Contents

- [Table of Contents](#table-of-contents)
- [Local Usage](#local-usage)
  - [Prerequisites](#prerequisites)
    - [Docker](#docker)
    - [Non-Docker](#non-docker)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)

## Local Usage

### Prerequisites

To install and use the application locally, it is recommended you have `docker` and `docker-compose` installed on your machine.

- Clone the repository: `git clone https://github.com/your-username/simple-blog-platform.git`
- Install dependencies: `yarn`
- Copy the `.env.sample` file to `.env`

#### Docker

If you are using docker, no changes are needed to the `.env` file as copied. To build the application and docker image run:

```bash
yarn build
```

To run the application as if it were production (both with the built image and an instance of mongo), run:

```bash
yarn start
```

To run in development (build on host, run mongo in docker):

```bash
yarn dev
```

#### Non-Docker

If you don't have docker installed, you'll need to ensure that you have mongodb installed and running locally, you've created the db and user for the application, and have updated `.env` to reflect those changes

## Usage

The API provides the following endpoints:

```
GET /posts
```

Returns all blog posts in the database. Optional query parameters:

- `category` (string): filter by category
- `sort` (string): sort by date created (asc or desc)

```
GET /posts/:id
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
PUT /posts/:id
```

Updates the blog post with the specified ID with the data in the request body. Optional parameters:

```
DELETE /posts/:id
```

Deletes the blog post with the specified ID.

## Testing

To run tests, follow these steps:

- run `yarn test`

## Deployment

Deployment is currently automated using Github Actions. Simply push to the `main` branch and the workflows should run. After deployment, you should see the password protected demo at https://audioshake.dock.aster.hn (For Basic Auth credentials and a RapidAPI Session file for testing, please contact Aster via email: contact@aster.hn)
