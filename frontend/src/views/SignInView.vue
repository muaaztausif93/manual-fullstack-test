<template>
  <div class="vertical-center">
    <div class="inner-block">
      <Form @submit="signIn" :validation-schema="signInValidationSchema">
        <h3 class="mb-3 text-center">Sign In</h3>

        <div class="form-group">
          <label class="mb-0">Email address</label>
          <Field name="email" type="email" class="form-control" />
          <ErrorMessage name="email" class="field-error" />
        </div>

        <div class="form-group">
          <label class="mb-0">Password</label>
          <Field name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="field-error" />
        </div>

        <div class="mt-2">
          <router-link to="/sign-up">Create New Account</router-link>
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-block mt-2">
          Sign In
        </button>
      </Form>
    </div>
  </div>
</template>

<script>
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as Yup from 'yup';

  export default {
    name: 'SignInView',
    data() {
      return {
        loader: null,
        signInValidationSchema: Yup.object({
          email: Yup.string().email().required(),
          password: Yup.string().required(),
        })
      }
    },
    components: {
      Form,
      Field,
      ErrorMessage
    },
    methods: {
      signIn(values) {
        if (!values) return;
        this.loader = this.$loading.show();
        this.$store.dispatch('auth/login', values)
        .then(() => {
          this.loader.hide();
          location.href = '/properties';
        })
        .catch(err => {
          this.loader.hide();
          this.$toast.error(err.message);
        });
      }
    }
  }
</script>
