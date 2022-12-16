import MoviesController from "./MoviesController.js";
import ReviewsController from './ReviewsController.js';

export default class MoviesRoute {
    static configRoutes(router) {
        router.route('/').get(MoviesController.apiGetMovies);

        router
            .route('/review')
            .post(ReviewsController.apiPostReview)
            .put(ReviewsController.apiUpdateReview)
            .delete(ReviewsController.apiDeleteReview);

        return router;
    }
}
