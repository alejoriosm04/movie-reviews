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
}