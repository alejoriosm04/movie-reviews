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

