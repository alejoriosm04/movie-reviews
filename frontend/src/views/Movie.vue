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
                       <AddReview
                        v-if="$store.state.user.id"
                        :movieId="movie._id"
                        v-on:update-movie-info="getMovie"
                       />
                    </div>
                    <hr />
                    <h3>Reviews</h3>
                    <ul class="list-group">
                        <li class="list-group-item pb-3 pt-3" v-for="review in movie.reviews" :key="review._id">
                            <h5 class="card-title">Review by {{ review.name }}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{{ getFormatterDate(review.date) }}</h6>
                            <p v-if="!review.editing" class="card-text">{{ review.review }}</p>
                            <p v-if="review.editing" class="card-text">
                                <input v-model="newReviewMessage" type="text" class="form-control">
                            </p>
                            <a v-if="verifyAuthorship(review.user_id)" v-on:click="editReview(review)" class="btn btn-primary me-3"> Edit </a>
                            <a v-if="verifyAuthorship(review.user_id)" v-on:click="deleteReview(review._id)" class="btn btn-danger"> Delete </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as moment from 'moment';
import MovieService from '../services/MovieService';
import AddReview from '../components/AddReview.vue';
import ReviewService from '../services/ReviewService';

export default {
  name: 'Movies',
  components: {
    AddReview,
  },
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
      newReviewMessage: '',
    };
  },
  created() {
    this.getMovie();
  },
  methods: {
    async getMovie() {
      const movieData = await MovieService.getMovie(
        this.$route.params.id,
      );
      const modifiedReviews = movieData.reviews.map(
        (v) => ({ ...v, editing: false }),
      );
      movieData.reviews = modifiedReviews;
      this.movie = movieData;
    },
    getFormatterDate(date) {
      return moment(date).format('Do MMMM YYYY');
    },
    verifyAuthorship(reviewUserId) {
      if (this.$store.state.user.id && this.$store.state.user.id === reviewUserId) {
        return true;
      }
      return false;
    },
    editReview(review) {
      if (review.editing) {
        review.review = this.newReviewMessage;
        this.saveUpdatedReview(review);
        review.editing = false;
      } else {
        this.newReviewMessage = review.review;
        review.editing = true;
      }
    },
    async saveUpdatedReview(newReview) {
      const data = {
        review: newReview.review,
        name: newReview.name,
        user_id: newReview.user_id,
        movie_id: newReview.movie_id,
        review_id: newReview._id,
      };
      await ReviewService.updateReview(data);
    },
    async deleteReview(reviewId) {
      const data = {
        user_id: this.$store.state.user.id,
        review_id: reviewId,
      };
      await ReviewService.deleteReview(data);
      this.getMovie();
    },
  },
};
</script>

<style scoped>
.card-body {
    text-align: left;
}
</style>
