import axios from 'axios';

export default class ReviewService {
  static async createReview(data) {
    const res = await axios.post(
      'https://movie-reviews-backend.vercel.app/api/v1/movies/review',
      data,
    );
    return res;
  }

  static async deleteReview(data) {
    const res = await axios.delete(
      'https://movie-reviews-backend.vercel.app/api/v1/movies/review',
      { data },
    );
    return res;
  }

  static async updateReview(data) {
    const res = await axios.put(
      'https://movie-reviews-backend.vercel.app/api/v1/movies/review',
      data,
    );
    return res;
  }
}
