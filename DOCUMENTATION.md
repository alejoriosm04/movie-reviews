# MEVN Stack

## Contents

- [Backend](#backend)
    - [Setting Up mOngoDB Atlas](#setting-up-mongodb-atlas)
    - [Adding Sample Data](#adding-sample-data)
    - [Setting Up Node.js and Express backend](#setting-up-nodejs-and-express-backend)
        - [Automatic Server Restart with nodemon](#automatic-server-restart-with-nodemon)
    - [Creating the server and routing](#creating-the-server-and-routing)
    - [Movies and Reviews Controller](#movies-and-reviews-controller)
    - [Movies and Reviews Data Access Object](#movies-and-reviews-data-access-object)
- [Vue Frontend](#vue-frontend)
    - [Vue Workflow](#vue-workflow)
    - [Bootstrap Components](#bootstrap-components)
    - [Contribute Frontend](#contribute-frotend)
- [Deployement](#deployement)

---

The MEVN stack is a popular stack of technologies for building a modern Single Page Application. MEVN stands for MongoDB, Express, Vue and Node.js:

- Node.js is one of the most popular server-side frameworks that allows you to execute JavaScript code in a web server.
- Express is a web application framework for Node.js which makes application development in Node easier and faster. Node and Express together form the middle-tier web server of the stack.
- MongoDB is NoSQL database which stores data persistently in the form of collections and documents.
- Vue is a frontend framework to build user interfaces like React.

<aside>
👉 In the following documentation I will save different things that I thought are important in the development of a project with this Stack. I did this project with the guide of the book Beginning MEVN Stack, wrote by Greg Lim and Daniel Correa.

</aside>

<aside>
🚨 It is assumed that the reader of this documentation has basic knowledge in basic programming concepts about JavaScript and database management with MongoDB.

</aside>

---

# Backend

## Setting Up MongoDB Atlas

First of all, we need to setting up our database in MongoDB Atlas. This database will allow us to save, create, delete and edit all the data of the program and users.

Go to [MongoDB](https://www.mongodb.com/home) create an account. There, you would have to create a new project to build a new cluster. Then, build a new cluster, use the default settings presented by the website.

- Taking into account that we need a free service.
- Choose a nearby server.
- Create an user to admin. the database. You can do this from **Database Access**.
- Allow access to database from anywhere in **Network Access**.

These are the main functionalities that our database in MongoDB should have.

## Adding Sample Data

Is important to have data with which to work. MongoDB provides a lot of sample data for us. In the MongoDB Cluster, on the three dots, you can Load sample Datasets. Then, go to Collections, and choose with which one collections do you want to work in your project.

In this example, we will work with `‘sample_mflix’` so we have to analyze the structure of this Dataset, to develop properly our program.

## Setting Up Node.js and Express backend

First, we need to install Node.js on our machine. Go to [nodejs.org](http://nodejs.org) and download the appropiate version for your Operating System. In this project, I worked with an UNIX development environment.

To check if you have `node` install on your machine and see what version do you have, run:

```bash
node -v
```

In the same way, I recommend to check the `npm` status on your machine running:

```bash
npm -version
```

Any problems, check the respective documentation on internet to solve this.

---

Create the main folder of the project on your machine and go there.

```bash
mkdir movie-reviews
cd movie-reviews
```

Then, create the `backend` folder:

```bash
mkdir backend
cd backend
```

Inside the backend folder, create a `package.json` running:

```bash
npm init
```

This will prompt a series of questions about our project to create this file for us. For now, press enter for the first three questions, in the ‘entry-point’ question write `Index.js` and press enter for the rest of the questions. After this, the file will be created and will contain metadata about out Node project.

Next, we need to install a few dependencies by running:

```bash
npm install express cors mongodb dotenv
```

- Express is the framework that acts as a light layer atop the Node.js web server making it easier to develop Node.js web applications.
- CORS is mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin. This package provides a middleware that can enable CORS with different options so we can make the right connections on the network.
- `mongodb` allows us to interact with MongoDB database.
- `dotenv` loads environmental variables from the `process.env` file instead of setting environment variables on our development machine which simplifies development.

The final `package.json` should look something like this:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "Index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "mongodb": "^4.12.1"
  }
}
```

<aside>
👉 All the packages and dependencies are saved in a folder called `node_modules`, this folder loads many files that build our project on `node.js`.

</aside>

### Automatic Server Restart with `nodemon`

The next package called `nodemon` will allow us to detect automatically code changes and restart the Node server so we don’t have to manually stop and restart it whenever we make a code change.

```json
npm install -g nodemon
```

<aside>
👉 The `-g` flag is to install a package globally on our development environment.

</aside>

## Creating the server and routing

Firstly, because we are using ES6’s import statement, add into package.json the below line:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "Index.js",
  "type": "module", <------------------
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "mongodb": "^4.12.1"
  }
}
```

---

The next code is a web server application built using the Node.js framework called Express. The `Index` class contains a static method called `main` that is responsible for configuring the server and establishing a connection to the database.

The `setUpServer` method is responsible for configuring the `cors` and `express.json` middleware and sets up a route for movies using the `MoviesRoute` class. It also sets up a handler for all routes that have not been handled previously, which returns a response with a 404 status code and an error message. Later, all the routes of the website will be handled in another file.

The `setUpDatabase` method is responsible for establishing a connection to the MongoDB database using the connection URI stored in an `.env` file that is loaded using the `dotenv` library. It then injects the database connection into the `MoviesDAO` and `ReviewsDAO` classes, which are responsible for performing database operations on the movies and reviews collections, respectively.

Finally, the server is started using the `listen` method of Express and a message is displayed in the console indicating on which port the server is running.

The `main` method is invoked at the end of the code to start the application.

```jsx
import express from 'express';
import cors from 'cors';
import MoviesRoute from './api/MoviesRoute.js';
import dotenv from 'dotenv';
import mongodb from 'mongodb';
import MoviesDAO from './dao/MoviesDAO.js';
import ReviewsDAO from './dao/ReviewsDAO.js';

class Index {
    static app = express();

    static router = express.Router();

    static main() {
        dotenv.config();
        Index.setUpServer();
        Index.setUpDatabase();
    }

    static setUpServer() {
        Index.app.use(cors());
        Index.app.use(express.json());
        Index.app.use('/api/v1/movies', MoviesRoute.configRoutes(Index.router));
        Index.app.use('*', (req, res) => {
           res.status(404).json({error: 'not found'}); 
        });
    }

    static async setUpDatabase() {
        const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);
        const port = process.env.PORT || 8000;
        try {
            // Connect to the MongoDB cluster
            await client.connect();
            await MoviesDAO.injectDB(client);
            await ReviewsDAO.injectDB(client);
            Index.app.listen(port, () => {
                console.log(`Server running on port ${port}`);
            });
        } catch (e) {
            console.error(e);
            process.exit(1);
        } 
    }
}

Index.main();
```

The `.env` file must have the URI variable that stores the URL to the database, the database name and the starting point of server.

To get the URI string, go to MongoDB Atlas, in the main page, go to **connect** and choose **conecct your application**.

```jsx
MOVIEREVIEWS_DB_URI=mongodb+srv://alejoriosm04:<ppassword>@cluster0.rm8pmmn.mongodb.net/sample_mflix?retryWrites=true&w=majority
MOVIEREVIEWS_NS=sample_mflix
PORT=5000
```

---

Next, the following code is a class that is responsible for configuring the routes for the movie section of the application. The class exports a static method called `configRoutes` that receives an instance of an Express router and sets up the following routes:

- `/`: route that handles GET requests and returns a list of movies. This handler is provided by the `apiGetMovies` method of the `MoviesController` class.
- `/id/:id`: route that handles GET requests and returns a specific movie by its ID. This handler is provided by the `apiGetMovieById` method of the `MoviesController` class.
- `/ratings`: route that handles GET requests and returns a list of movie ratings. This handler is provided by the `apiGetRatings` method of the `MoviesController` class.
- `/review`: route that handles POST, PUT, and DELETE requests and performs create, update, and delete operations on movie reviews, respectively. The handlers for these requests are provided by the `apiPostReview`, `apiUpdateReview`, and `apiDeleteReview` methods of the `ReviewsController` class, respectively.

The `configRoutes` method returns the configured instance of the Express router with the aforementioned routes. This instance is used in the main application to set up these routes on the server.

```jsx
import MoviesController from "./MoviesController.js";
import ReviewsController from './ReviewsController.js';

export default class MoviesRoute {
    static configRoutes(router) {
        router.route('/').get(MoviesController.apiGetMovies);
        router.route('/id/:id').get(MoviesController.apiGetMovieById);
        router.route('/ratings').get(MoviesController.apiGetRatings);

        router
            .route('/review')
            .post(ReviewsController.apiPostReview)
            .put(ReviewsController.apiUpdateReview)
            .delete(ReviewsController.apiDeleteReview);

        return router;
    }
}
```

If you go to the URL: [localhost:5000/api/v1/movies](http://localhost:5000/api/v1/movies), you would get a result on the website, because the server and the respective router are working.

However, we must create methods that perform the functions when we work with Movies or when we create, modify or delete reviews about movies.

## Movies and Reviews Controller

The following code defines a class called `MoviesController`, the class that perform the actions related with movies, with three static methods: `apiGetMovies`, `apiGetMovieById`, and `apiGetRatings`.

The `apiGetMovies` method is intended to handle an HTTP GET request to retrieve a list of movies. It does this by calling the `getMovies` method on an instance of `MoviesDAO`, passing in an object with the keys `filters`, `page`, and `moviesPerPage`. The `filters` object is created by checking for the presence of the query parameters `rated` or `title` in the request, and adding them to the `filters` object if they are present. The `page` and `moviesPerPage` values are obtained from the request's query parameters and are passed as is to the `getMovies` method.

The `getMovies` method returns an object with two properties: `moviesList` and `totalNumMovies`. These values are destructured from the return value and are used to create the `response` object, which is then sent as the response to the client using the `res.json` method.

The `apiGetMovieById` method is intended to handle an HTTP GET request to retrieve a single movie by its ID. It does this by calling the `getMovieById` method on an instance of `MoviesDAO`, passing in the `id` parameter from the request's `params` object. If the returned movie is `null` or `undefined`, the method sends a 404 response with a JSON object containing an error message. Otherwise, it sends the movie as the response to the client.

The `apiGetRatings` method is intended to handle an HTTP GET request to retrieve a list of ratings. It does this by calling the `getRatings` method on an instance of `MoviesDAO` and sending the returned list of ratings as the response to the client. If an error occurs, it logs the error to the console and sends a 500 response with a JSON object containing the error.

```jsx
import MoviesDAO from '../dao/MoviesDAO.js';

export default class MoviesController {
    static async apiGetMovies(req, res, next) {
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page): 0;

        const filters = {};
        if (req.query.rated) {
            filters.rated = req.query.rated;
        } else if (req.query.title) {
            filters.title = req.query.title;
        }

        const { moviesList, totalNumMovies } = await MoviesDAO.getMovies(
            { filters, page, moviesPerPage }
        );

        const response = {
            movies: moviesList,
            page,
            filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        };
        res.json(response);
    }

    static async apiGetMovieById(req, res, next) {
        try {
            const id = req.params.id || {};
            const movie = await MoviesDAO.getMovieById(id);

            if (!movie) {
                res.status(404).json({ error: 'not found' });
                return;
            }
            res.json(movie);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiGetRatings(req, res, next) {
        try {
            const propertyTypes = await MoviesDAO.getRatings();
            res.json(propertyTypes);
        } catch (e) {
            console.log(`api,${e}`);
            res.status(500).json({ error: e });
        }
    }
}
```

Finally, the following code defines a class called `ReviewsController`, the class that perform the actions related with reviews about movies, with three static methods: `apiPostReview`, `apiUpdateReview`, and `apiDeleteReview`.

The `apiPostReview` method is intended to handle an HTTP POST request to create a new review for a movie. It does this by extracting the `movie_id`, `name`, `user_id`, and `review` values from the request's body and the current date. It then calls the `addReview` method on an instance of `ReviewsDAO`, passing in these values. If an error occurs, the method sends a 500 response with a JSON object containing the error message. Otherwise, it sends a success response to the client.

The `apiUpdateReview` method is intended to handle an HTTP PUT request to update an existing review. It does this by extracting the `review_id`, `review`, and `user_id` values from the request's body and the current date. It then calls the `updateReview` method on an instance of `ReviewsDAO`, passing in these values. If the `updateReview` method returns an error, the method sends it as the response to the client. If the `updateReview` method returns a successful result but no documents were modified, the method throws an error and sends a 500 response with a JSON object containing the error message. Otherwise, it sends a success response to the client.

The `apiDeleteReview` method is intended to handle an HTTP DELETE request to delete an existing review. It does this by extracting the `review_id` and `user_id` values from the request's body. It then calls the `deleteReview` method on an instance of `ReviewsDAO`, passing in these values. If an error occurs, the method sends a 500 response with a JSON object containing the error message. Otherwise, it sends a success response to the client.

```jsx
import ReviewsDAO from '../dao/ReviewsDAO.js';

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
          const movieId = req.body.movie_id;
          const { review } = req.body;
          const userInfo = {
            name: req.body.name,
            _id: req.body.user_id,
          };
    
          const date = new Date();
    
          const ReviewResponse = await ReviewsDAO.addReview(
            movieId,
            userInfo,
            review,
            date,
          );
          res.json({ status: 'success ' });
        } catch (e) {
          res.status(500).json({ error: e.message });
        }
      }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id;
            const { review } = req.body;

            const date = new Date();

            const ReviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                review,
                date,
            );

            const { error } = ReviewResponse;
            if (error) {
                res.status.json({ error });
            }

            if (ReviewResponse.modifiedCount === 0) {
                throw new Error('unable to update review. User may not be original poster');
            }
            res.json({ status: 'succes '});
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.body.review_id;
            const userId = req.body.user_id;
            console.log('apiDeleteReview', req.body);
            const ReviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId,
            );

            res.json({ status: 'success '});
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}
```

## Movies and Reviews Data Access Object

A Data Access Object (DAO) is a design pattern that provides an abstract interface for accessing data stored in a database. The DAO design pattern separates the data access logic and maps it to the business logic. It allows the business logic to remain independent of the underlying data access implementation, making it easier to change the data access implementation without affecting the business logic.

This DAO will allow us to perform the respective actions created in the Movies and Reviews controllers and returning the necessary data to work properly.

---

The following code defines a class called `MoviesDAO` with four static methods: `injectDB`, `getMovies`, `getRatings`, and `getMovieById`.

The `injectDB` method is intended to initialize the `movies` property of the `MoviesDAO` class with a connection to the 'movies' collection in a MongoDB database. It does this by calling the `conn.db` method with the namespace specified in the `MOVIEREVIEWS_NS` environment variable, and the `collection` method on the returned value, passing in the string 'movies'. If an error occurs, it logs the error to the console.

The `getMovies` method is intended to retrieve a list of movies from the 'movies' collection in the database. It does this by building a query object based on the `filters` argument, and then using the `find` and `toArray` methods on the `movies` property to execute the query and return the results as an array. It also uses the `countDocuments` method to count the total number of movies in the collection that match the query. If an error occurs, it logs the error to the console and returns an empty array and a count of 0.

The `getRatings` method is intended to retrieve a list of unique ratings from the 'movies' collection in the database. It does this by using the `distinct` method on the `movies` property, passing in the string 'rated' as the argument. If an error occurs, it logs the error to the console and returns an empty array.

The `getMovieById` method is intended to retrieve a single movie from the 'movies' collection in the database by its ID. It does this by using the `aggregate` method on the `movies` property and passing in an array of pipeline stages. The first stage uses the `$match` operator to filter the documents by their `_id` field, using the provided `id` argument as the value. The second stage uses the `$lookup` operator to perform a left outer join with the 'reviews' collection, using the `movie_id` field in the 'reviews' collection as the join field and the `_id` field in the 'movies' collection. The resulting joined documents are then returned as an array in the `reviews` field of the input documents. The method uses the `next` method on the returned cursor to get the first (and only) element in the array. If an error occurs, it logs the error to the console and throws it.

```jsx
import mongodb from 'mongodb';

export default class MoviesDAO {
    static movies;

    static ObjectId = mongodb.ObjectId;

    static async injectDB(conn) {
        if (MoviesDAO.movies) {
            return; 
        }
        try {
            MoviesDAO.movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection('movies');
        } catch (e) {
            console.error(`unable to connect in MoviesDAO: ${e}`);
        }
    }

    static async getMovies({
        filters = null,
        page = 0,
        moviesPerPage = 20,
    } = {}) {
        let query;
        if (filters) {
            if ('title' in filters) {
                query = { $text: { $search: filters.title } };
            } else if ('rated' in filters) {
                query = { rated: { $eq: filters.rated } };
            }
        }

        let cursor;
        try {
            cursor = await MoviesDAO.movies.find(query).limit(moviesPerPage).skip(moviesPerPage * page);
            const moviesList = await cursor.toArray();
            const totalNumMovies = await MoviesDAO.movies.countDocuments(query);
            return { moviesList, totalNumMovies };
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { moviesList: [], totalNumMovies: 0 };
        }
    }

    static async getRatings() {
        let ratings = [];
        try {
            ratings = await MoviesDAO.movies.distinct('rated');
            return ratings;
        } catch (e) {
            console.error('unable to get ratings, $(e');
            return ratings;
        }
    }

    static async getMovieById(id) {
        try {
            return await MoviesDAO.movies.aggregate([
                {
                    $match: {
                        _id: new MoviesDAO.ObjectId(id),
                    },
                },
                {
                    $lookup:
                    {
                        from: 'reviews',
                        localField: '_id',
                        foreignField: 'movie_id',
                        as: 'reviews',
                    },
                },
            ]).next();
        } catch (e) {
            console.error(`something went wrong in getMovieById: {e}`);
            throw e;
        }
    }
}
```

---

The following code defines a class called `ReviewsDAO` with four static methods: `injectDB`, `addReview`, `updateReview`, and `deleteReview`.

The `injectDB` method is intended to initialize the `reviews` property of the `ReviewsDAO` class with a connection to the 'reviews' collection in a MongoDB database. It does this by calling the `conn.db` method with the namespace specified in the `MOVIEREVIEWS_NS` environment variable, and the `collection` method on the returned value, passing in the string 'reviews'. If an error occurs, it logs the error to the console.

The `addReview` method is intended to add a new review to the 'reviews' collection in the database. It does this by creating a document containing the provided `movieId`, `user`, `review`, and `date` values and the current user's `name` and `_id`, and then calling the `insertOne` method on the `reviews` property, passing in the document. If an error occurs, it logs the error to the console and returns an object containing the error.

The `updateReview` method is intended to update an existing review in the 'reviews' collection in the database. It does this by calling the `updateOne` method on the `reviews` property, passing in a filter object and an update object. The filter object specifies the `user_id` and `_id` fields of the review to be updated, using the provided `userId` and `reviewId` arguments as values, and the update object uses the `$set` operator to update the `review` and `date` fields of the review with the provided `review` and `date` arguments. If an error occurs, it logs the error to the console and returns an object containing the error.

The `deleteReview` method is intended to delete an existing review from the 'reviews' collection in the database. It does this by calling the `deleteOne` method on the `reviews` property, passing in a filter object. The filter object specifies the `_id` field of the review to be deleted, using the provided `reviewId` argument as the value, and the `user_id` field of the review, using the provided `userId` argument as the value. This ensures that only a review with a matching `_id` and `user_id` will be deleted. If an error occurs, it logs the error to the console and returns an object containing the error.

In summary, the `ReviewsDAO` class provides a set of methods for interacting with the 'reviews' collection in a MongoDB database, including adding, updating, and deleting reviews, as well as establishing a connection to the database. The `MoviesDAO` class provides a similar set of methods for interacting with the 'movies' collection in the database, including retrieving lists of movies and ratings, and retrieving a single movie by its ID. The `MoviesController` and `ReviewsController` classes provide a set of methods for handling HTTP requests and using the `MoviesDAO` and `ReviewsDAO` classes to perform actions on the database in response to those requests.

```jsx
import mongodb from 'mongodb';

export default class ReviewsDAO {
    static reviews;

    static ObjectId = mongodb.ObjectId;

    static async injectDB(conn) {
        if (ReviewsDAO.reviews) {
            return;
        }
        try {
            ReviewsDAO.reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews');
        } catch (e) {
            console.error(`unable to establish connection handle in reviewDAO: ${e}`);
        }
    }

    static async addReview(movieId, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date,
                review,
                movie_id: ReviewsDAO.ObjectId(movieId),
            };
            return await ReviewsDAO.reviews.insertOne(reviewDoc);
        } catch (e) {
            console.error(`unable to post review: ${e}`);
            return { error: e };
        }
    }

    static async updateReview(reviewId, userId, review, date) {
        try {
            const updateResponse = await ReviewsDAO.reviews.updateOne(
                { user_id: userId, _id: ReviewsDAO.ObjectId(reviewId) },
                { $set: { review, date } },
            );
            return updateResponse;
        } catch (e) {
            console.error(`unable to update review: ${e}`);
            return { error: e };
        }
    }

    static async deleteReview(reviewId, userId) {
        try {
            const deleteResponse = await ReviewsDAO.reviews.deleteOne({
                _id: ReviewsDAO.ObjectId(reviewId),
                user_id: userId,
            });
            return deleteResponse
        } catch (e) {
            console.error(`unable to delete review: ${e}`);
            return { error: e };
        }
    }
}
```

<aside>
💡 If you want to test your backend API doing different request to the database and the server, like `GET`, `PUT` or `DELETE`. Use [Insomnia](https://insomnia.rest/download).

</aside>

# Vue Frontend

The frontend of this project is built with Vue.js, a progressive JavaScript framework for building user interfaces. It was also developed with Bootstrap, a popular HTML, CSS, and JavaScript framework for developing responsive, mobile-first websites.

The project is structured as follows:

```
frontend
├── public
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src
│   ├── assets
│   │   └── [static assets]
│   ├── components
│   │   ├── [Vue components]
│   ├── views
│   │   ├── [Vue views]
│   ├── App.vue
│   ├── main.js
│   ├── router.js
│   ├── store.js
│   └── [other Vue files]
├── .browserslistrc
├── .eslintrc.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

```

`**public**`

This folder contains static assets such as the `index.html` file, the favicon, and the manifest file for PWA (Progressive Web App) support.

`**src**`

This folder contains the source code for the frontend application.

`**assets**`

This folder contains static assets such as images, fonts, and stylesheets.

`**components**`

This folder contains the Vue components used in the application. Each component has its own folder containing the component's template, script, and stylesheet files.

`**views**`

This folder contains the Vue views, which are the main components that are rendered in the application. Each view has its own folder containing the view's template, script, and stylesheet files.

`**App.vue**`

This is the root Vue component of the application. It contains the main layout of the application, such as the header and footer.

`**main.js**`

This is the main entry point of the application. It creates the Vue instance and mounts it to the DOM.

`**router.js**`

This file contains the Vue Router configuration for the application. It defines the different routes and the components that are rendered for each route.

`**store.js**`

This file contains the Vuex store configuration for the application. It defines the different state, mutations, actions, and getters for the application.

**Other files**

Other files in the `src` folder include configuration files for linting (`.eslintrc.js`) and the list of supported browsers (`.browserslistrc`), as well as the `package.json` and `package-lock.json` files for managing dependencies.

## Vue Workflow

The frontend of this project was created by following the MEVN stack development workflow. This includes setting up the Vue.js project with the Vue CLI, creating Vue components and views, configuring the Vue Router and Vuex store, and integrating with the backend API. The application was designed to be responsive and optimized for mobile devices.

To create the movie review form, a Vue component was created and added to the `components` folder. This component contains the form template, script, and stylesheet files. The form includes fields for the movie title and the review, as well as a submit button. The form is linked to the Vuex store through a mutation that is called when the form is submitted. This mutation sends a request to the backend API to create a new movie review in the database.

- To display the movie reviews, a Vue view was created and added to the `views` folder. This view contains the template and script files for displaying the movie reviews. The view is linked to the Vuex store through a getter that retrieves the movie reviews from the store. The view also includes a pagination component that allows users to navigate through the different pages of reviews.
- Overall, the frontend of the movie reviews application was created using the principles of the Vue.js framework, including reactive data binding, composable components, and a centralized store. This allows for a dynamic and scalable application that can be easily extended and modified as needed.

## Bootstrap Components

To further enhance the user experience, the frontend of the application was designed to be responsive and optimized for mobile devices. This was achieved through the use of responsive layout techniques and the optimization of assets such as images and stylesheets. 

The Bootstrap framework was used to provide a consistent and responsive layout for the application. It was also used to style various elements such as buttons, forms, and navigation bars.

To use Bootstrap in the application, the Bootstrap CSS and JavaScript files were included in the `index.html` file in the `public` folder. The Bootstrap classes were then applied to the relevant elements in the application's templates and stylesheets.

In addition, the frontend of the application was developed with performance in mind. Techniques such as code splitting, lazy loading, and minification were applied to help ensure that the application loads quickly and efficiently, even on slower devices or network connections.

## Contribute Frotend

In order to fully understand and contribute to the frontend of the movie reviews application, it is recommended to have a strong understanding of Vue.js and its fundamental concepts. This includes knowledge of reactive data binding, composable components, and the Vuex store.

It is also helpful to have a basic understanding of web development concepts such as HTML, CSS, and JavaScript. Experience with responsive layout techniques and performance optimization is also useful.

Finally, knowledge of web accessibility guidelines and best practices is important in order to ensure that the application is accessible to all users.

# Deployement

The movie reviews application was deployed using Vercel, a cloud platform for hosting and deploying web applications.

The backend of the application was deployed on its own server, while the frontend was deployed on a separate server. The backend and frontend servers were connected through their respective URLs.

To deploy the backend of the application, the following steps were taken:

1. The code for the backend was pushed to a Git repository hosted on GitHub.
2. A new project was created on Vercel, linked to the GitHub repository.
3. The project was configured to deploy the backend code to a Node.js server.
4. A `vercel.json` file was created in the root directory of the backend code. This file contained information about the project, such as the name and version, as well as the build and start scripts.
5. The project was deployed and the server was started.

---

To deploy the frontend of the application, the following steps were taken:

1. The code for the frontend was pushed to a Git repository hosted on GitHub.
2. A new project was created on Vercel, linked to the GitHub repository.
3. The project was configured to deploy the frontend code to a static server.
4. The project was deployed and the server was started.

Overall, the deployment process for the movie reviews application was straightforward andefficient, thanks to the use of Vercel and the separation of the backend and frontend into separate servers. The `vercel.json` file was necessary to ensure that the Vercel server was able to build and process the backend project correctly. This allows for easy updates and maintenance of the application.

For more details: **[How to create and deploy an Express.js app to Vercel?](https://syntackle.live/blog/how-to-create-and-deploy-an-express-js-app-to-vercel-ljgvGrsCH7ioHsAxuw3G/)**