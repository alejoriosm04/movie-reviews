<template>
    <div class="card">
        <div class="card-header">
            Add Review
        </div>
        <div class="card-body">
            <form>
                <div class="mb-3">
                    <label class="form-label">Message</label>
                    <input v-model="message" type="text" class="form-control">
                </div>
                <a v-on:click="saveReview()" class="btn btn-primary">Submit</a>
            </form>
        </div>
    </div>
</template>

<script>
import ReviewService from '../services/ReviewService';

export default {
  name: 'AddReview',
  data() {
    return {
      message: '',
    };
  },
  props: ['movieId'],
  methods: {
    async saveReview() {
      if (this.message !== '') {
        const data = {
          review: this.message,
          name: this.$store.state.user.name,
          user_id: this.$store.state.user.id,
          movie_id: this.movieId,
        };
        await ReviewService.createReview(data);
        this.message = '';
        this.$emit('updateMovieInfo');
      }
    },
  },
};
</script>
