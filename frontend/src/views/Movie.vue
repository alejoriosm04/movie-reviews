<template>
    <div class="card">
        <div class="card-header">
            {{ movie.title }}
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <img v-if="movie.poster"
                    class="card-img-top" :src="movie.poster" />
                </div>
                <div class="col-md-6 col-sm-12">
                    <p class="card-text">{{ movie.plot }}</p>
                    <div>
                       Form to Add Reviews 
                    </div>
                    <hr />
                    <h3>Reviews</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MovieService from '../services/MovieService';
export default {
    name: 'Movies',
    data() {
        return {
            movie: {
                poster: '',
                title: '',
                rated: '',
                plot: '',
                _id: '',
                reviews: [],
            },
        };
    },
    created() {
        this.getMovie();
    },
    methods: {
        async getMovie() {
            const movieData = await MovieService.getMovie(
                this.$route.params.id
            );
            this.movie = movieData;
        },
    },
};
</script>

<style scoped>
.card-body {
    text-align: left;
}
</style>