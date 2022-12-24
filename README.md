<h1 align="center">
    Movie Reviews 🎬🍿
</h1>

A web application that allows users to leave movie reviews and ratings, built with the MEVN stack.

## Features

- 📥 Accepts input of movie title and review from users
- 🔍 Displays all movie reviews on a single page
- 📊 Calculates average rating for each movie
- 🔒 Requires user login to leave reviews

## Motivation

The main aim of this project was to create a platform for users to share their thoughts on movies and see what others thought as well. Another motivation for this project was to have a personal project to add to my portfolio.

## Method

The MEVN stack (MongoDB, Express, Vue.js, and Node.js) was used to build this application. The front-end was built with Vue.js and the back-end with Node.js and Express. MongoDB was used to store the movie reviews.

Users can log in and leave a review for a specific movie. The review and the movie title are stored in the database. All reviews are displayed on the same page, with the average rating for each movie calculated and displayed as well.

## Try it out

To use this application, users must first create an account and log in. Once logged in, they can leave a review for a specific movie by entering the movie title and their review in the designated fields and submitting the form. All movie reviews can be viewed on the same page.

To try out the application, visit the following website: https://movie-reviews-nine.vercel.app/

Note that this is only a demo version and may not have all features enabled or may not function as expected.

## Documentation

Detailed documentation about the development of this project can be found in a file called `DOCUMENTATION.md` in the main folder of the GitHub project. It is recommended to read this file for more details about the project.

## Install for development

If you want to install the application locally for development and contribute to it, follow these steps:

- Clone the repo:

        git clone git@github.com:alejoriosm04/movie-reviews.git

- Install dependencies for the backend:

        cd movie-reviews/backend
        npm install

- Start the backend server:

        nodemon server

- In a new terminal, navigate to the frontend folder and install dependencies:

        cd movie-reviews/frontend
        npm install

- Build the frontend:

        npm run build

- Start the frontend server:

        npm run serve

**Note:** Be sure to check the packages listed in the `package.json` file in each folder to ensure that you have all the necessary dependencies installed.

## Contribute

You are welcome to submit issues or pull requests to improve the application. As this is a portfolio project, I will be reviewing and accepting pull requests at my discretion.

To contribute to the project, follow these steps:

1. Create a new branch with a descriptive name, such as feature/signup-form or bugfix/login-error.

2. Make your changes on the new branch.

3. Push your changes to the branch and create a pull request.

Thank you for considering contributing to this project

## Acknowledgments

I would like to thank Greg Lim and [Daniel Correa](https://github.com/danielgara) for teaching me how to create this project in their book, "Beginning MEVN Stack Development". Their guidance and support were invaluable in the development of this project.

## Author

This project was developed by [Alejandro Rios](https://github.com/alejoriosm04).

<a href="https://github.com/alejoriosm04/movie-reviews/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=alejoriosm04/movie-reviews" />
</a>

<!-- Made with [contrib.rocks](https://contrib.rocks).
-->

## License

Copyright 2022 Alejandro Rios.