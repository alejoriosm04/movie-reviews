<template>
<div class="card">
    <div class="card-header">
    Movie Results
    </div>
    <div class="card-body">
        <!-- form control -->
        <div class="row mb-3">
            <div class="col">
            <div class="d-flex">
                <input v-model="titleToSearch" class="form-control"
                placeholder="Search by title" />
                <a v-on:click="filterMovies('title')"
                class="btn btn-primary ms-4"
                >
                Search
                </a>
            </div>
            </div>
            <div class="col">
            <div class="d-flex">
            <select v-model="ratingToSearch" class="form-select">
                <option disabled selected value="">Select by Rating</option>
                <option v-for="rating in ratings" :key="rating" :value="rating">
                {{ rating }}
                </option>
            </select>
            <a v-on:click="filterMovies('rated')"
                class="btn btn-primary ms-4"
            >
                Filter
            </a>
            </div>
            </div>
        </div>
        <!-- form control -->

        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div v-for="movie in movies" class="col" :key="movie._id">
            <div class="card">
                <img v-if="movie.poster" class="card-img-top"
                :src="movie.poster" />
                <div class="card-body">
                <h5 class="card-title fw-bold">{{ movie.title }}</h5>
                <p v-if="movie.rated" class="card-text">
                    Rating: {{ movie.rated }}
                </p>
                <p class="card-text">{{ movie.plot }}</p>
                <a class="btn btn-primary">
                    View Reviews
                </a>
                </div>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'Movies',
  data() {
    return {
      movies: [],
      ratings: [],
      titleToSearch: '',
      ratingToSearch: '',
    };
  },
  created() {
    this.getMovies();
    this.getRatings();
  },
  methods: {
    getMovies() {
      this.movies = [
        {
          _id: '3',
          title: 'Matrix',
          poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Matrix_Poster.jpg/220px-The_Matrix_Poster.jpg',
          rated: 'AG',
          plot: 'Best Movie',
        },
        {
          _id: '4',
          title: 'Matrix 2',
          poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Matrix_Poster.jpg/220px-The_Matrix_Poster.jpg',
          rated: 'AG',
          plot: 'Best Movie',
        },
        {
          _id: '5',
          title: 'Matrix 3',
          poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/The_Matrix_Poster.jpg/220px-The_Matrix_Poster.jpg',
          rated: 'AG',
          plot: 'Best Movie',
        },
      ];
    },
    getRatings() {
      this.ratings = ['AO', 'G', 'GP'];
    },
    filterMovies(type) {
      if (type === 'title') {
        console.log(this.titleToSearch);
      } else {
        console.log(this.ratingToSearch);
      }
    },
  },
};
</script>

<style scoped>
.card-body{
    text-align: left;
}
</style>
