import axios from 'axios';

export default class ReviewService {
  static async createReview(data) {
    const res = await axios.post(
      'http://localhost:5000/api/v1/movies/review',
      data,
    );
    return res;
  }

  static async deleteReview(data) {
    const res = await axios.delete(
      'http://localhost:5000/api/v1/movies/review',
      { data },
    );
    return res;
  }

  static async updateReview(data) {
    const res = await axios.put(
      'http://localhost:5000/api/v1/movies/review',
      data,
    );
    return res;
  }
}
