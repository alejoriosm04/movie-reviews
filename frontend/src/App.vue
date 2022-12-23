<template>
  <div>
    <!-- Header -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">Movies APP</router-link>
        <button class="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link to="/" class="nav-link active">Home</router-link>
            <router-link to="/movies" class="nav-link active">
              Movies
            </router-link>
            <router-link to="/about" class="nav-link active">
              About
            </router-link>
            <router-link v-if="!userData" to="/login" class="nav-link active">
              Login
            </router-link>
            <a v-if="userData" v-on:click="logout()" class="nav-link active pointer">
              Logout ({{ userData }})
            </a>
          </div>
        </div>
      </div>
    </nav>
    <!-- Header -->
    <div class="container mt-4">
      <router-view/>
    </div>
    <!-- Footer -->
    <footer class="text-center text-lg-start bg-light text-muted mt-4">
      <div class="text-center p-4" style="background-color: gainsboro;">
        © 2023 Copyright -
        <a class="text-reset fw-bold text-decoration-none"
          target="_blank" href="https://twitter.com/alejoriosm04"
        >
          Alejandro Rios
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    userData() {
      if (this.$store.state.user.id) {
        return `${this.$store.state.user.id} ${this.$store.state.user.name}`;
      }
      return '';
    },
  },
  methods: {
    logout() {
      this.$store.commit('disconnect');
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.pointer{
  cursor:pointer;
}
</style>
