<template>
  <div class="vertical-center">
    <div class="inner-block">
      <form>
        <h3 class="mb-3 text-center">Sign In</h3>

        <div class="form-group">
          <label class="mb-0">Email address</label>
          <input type="email" class="form-control" v-model="signInForm.email" />
        </div>

        <div class="form-group">
          <label class="mb-0">Password</label>
          <input type="password" class="form-control" v-model="signInForm.password" />
        </div>

        <div class="mt-2">
          <router-link to="/sign-up">Create New Account</router-link>
        </div>

        <button
          type="button"
          class="btn btn-primary btn-block mt-2"
          v-on:click="signIn()">
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import router from '@/router/index';

  export default {
    name: 'SignInView',
    data() {
      return {
        loader: null,
        signInForm: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      signIn() {
        this.loader = this.$loading.show();
        this.$store.dispatch('auth/login', this.signInForm)
        .then(() => {
          this.loader.hide();
          router.push('/properties');
        })
        .catch(err => {
          this.loader.hide();
          this.$toast.error(err.message);
        });
      }
    }
  }
</script>
