import axios from 'axios';

export default class MovieService {
  static async getMovies(query = '', by = 'title', page = 0) {
    const res = await axios.get(
      `http://localhost:5000/api/v1/movies?${by}=${query}&page=${page}`,
    );
    return res.data;
  }

  static async getMovie(id) {
    const res = await axios.get(
      `http://localhost:5000/api/v1/movies/id/${id}`,
    );
    return res.data;
  }

  static async getRatings() {
    const res = await axios.get(
      'http://localhost:5000/api/v1/movies/ratings',
    );
    return res.data;
  }
}
