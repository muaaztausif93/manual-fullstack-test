<template>
  <div class="vertical-center">
    <div class="inner-block">
      <form>
        <h3 class="mb-3 text-center">Sign Up</h3>

        <div class="form-group">
          <label class="mb-0">Name</label>
          <input type="text" class="form-control" v-model="userForm.name" />
        </div>

        <div class="form-group">
          <label class="mb-0">Email address</label>
          <input type="email" class="form-control" v-model="userForm.email" />
        </div>

        <div class="form-group">
          <label class="mb-0">Password</label>
          <input type="password" class="form-control" v-model="userForm.password" />
        </div>

        <div class="form-group">
          <label class="mb-0">Confirm Password</label>
          <input type="password" class="form-control" v-model="userForm.confirmPassword" />
        </div>

        <div class="form-check">
          <input
            v-model="userForm.type"
            class="form-check-input"
            type="radio"
            name="userType"
            value="admin"
            id="admin">
          <label class="form-check-label" for="admin">
            Moderator
          </label>
        </div>
        <div class="form-check">
          <input
            v-model="userForm.type"
            class="form-check-input"
            type="radio"
            name="userType"
            id="tenant"
            value="tenant">
          <label class="form-check-label" for="tenant">
            Tenant
          </label>
        </div>

        <button
          type="button"
          class="btn btn-primary btn-block mt-2"
          v-on:click="signUp()">
          Create Account
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import router from '@/router/index';

  export default {
    name: 'SignUpView',
    data() {
      return {
        loader: null,
        userForm: {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          type: ''
        }
      }
    },
    methods: {
      signUp() {
        this.loader = this.$loading.show();
        delete this.userForm.confirmPassword;
        this.$store.dispatch('auth/register', this.userForm)
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
