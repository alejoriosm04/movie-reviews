import MoviesController from "./MoviesController.js";
import ReviewsController from './ReviewsController.js';

export default class MoviesRoute {
    static configRoutes(router) {
        router.route('/').get(MoviesController.apiGetMovies);
        router.route('/id/:id').get(MoviesController.apiGetMoviesById);
        router.route('/ratings').get(MoviesController.apiGetRatings);

        router
            .route('/review')
            .post(ReviewsController.apiPostReview)
            .put(ReviewsController.apiUpdateReview)
            .delete(ReviewsController.apiDeleteReview);

        return router;
    }
}
