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
                <router-link :to="'/movie/'+movie._id" class="btn btn-primary">
                    View Reviews
                </router-link>
                </div>
            </div>
            </div>
        </div>
    </div>
    <nav>
      <ul class="pagination ms-3">
        <li class="page-item">
          <a class="page-link pointer" v-on:click="getPrevPage()">
            Get previous {{ entriesPerPage }}
          </a>
        </li>
        <li class="page-item disabled">
          <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
            Showing Page: {{ currentPage }}
          </a>
        </li>
        <li class="page-item">
          <a class="page-link pointer" v-on:click="getNextPage()">
            Get next {{ entriesPerPage }}
          </a>
        </li>
      </ul>
    </nav>
</div>
</template>

<script>
import MovieService from '../services/MovieService';

export default {
  name: 'Movies',
  data() {
    return {
      movies: [],
      ratings: [],
      titleToSearch: '',
      ratingToSearch: '',
      typeToSearch: '',
      currentPage: 0,
      entriesPerPage: 20,
      totalPage: 0,
    };
  },
  created() {
    this.getMovies();
    this.getRatings();
  },
  methods: {
    async getMovies() {
      let query = '';
      if (this.typeToSearch === 'title') {
        query = this.titleToSearch;
      } else if (this.typeToSearch === 'rated') {
        query = this.ratingToSearch;
      }
      const moviesData = await MovieService.getMovies(
        query, this.typeToSearch, this.currentPage
      );
      this.totalPages = Math.ceil(
        moviesData.total_results / this.entriesPerPage
      ) - 1;
      this.movies = moviesData.movies;
    },
    async getRatings() {
      this.ratings = await MovieService.getRatings();
    },
    async filterMovies(type) {
      this.typeToSearch = type;
      this.currentPage = 0;
      this.getMovies();
    },
    async getNextPage() {
      this.currentPage += 1;
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
      this.getMovies();
    },
    async getPrevPage() {
      this.currentPage -= 1;
      if (this.currentPage < 0) {
        this.currentPage = 0;
      }
      this.getMovies();
    },
  },
};
</script>

<style scoped>
.card-body{
    text-align: left;
}
</style>
