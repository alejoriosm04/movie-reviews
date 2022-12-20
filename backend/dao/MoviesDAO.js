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
            console.error('unable to get ratings, $(e)');
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