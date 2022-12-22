<template>
<div class="card">
  <div class="card-header">
    Login
  </div>
  <div class="card-body">
  <form>
  <div class="row">
    <div class="col">
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">ID</label>
        <div class="col-sm-10">
          <input v-model="userId" type="number" class="form-control">
        </div>
      </div>
    </div>
    <div class="col">
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10">
          <input v-model="userName" type="text" class="form-control">
        </div>
      </div>
    </div>
  </div>
  <a v-on:click="login()" class="btn btn-primary">Submit</a>
  </form>
  </div>
</div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      userId: '',
      userName: '',
    };
  },
  methods: {
    login() {
      if (!(this.userId === '' || this.userName === '')) {
        this.$store.commit('connect', {
          id: this.userId, name: this.userName,
        });
        this.$router.push({ path: '/' });
      }
    },
  },
};
</script>
