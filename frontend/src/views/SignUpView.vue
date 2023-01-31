<template>
  <div class="vertical-center">
    <div class="inner-block">
      <Form @submit="signUp" :validation-schema="signUpValidationSchema">
        <h3 class="mb-3 text-center">Sign Up</h3>

        <div class="form-group">
          <label class="mb-0">Name</label>
          <Field name="name" type="text" class="form-control" />
          <ErrorMessage name="name" class="field-error" />
        </div>

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

        <div class="form-group">
          <label class="mb-0">Confirm Password</label>
          <Field name="confirmPassword" type="password" class="form-control" />
          <ErrorMessage name="confirmPassword" class="field-error" />
        </div>

        <div class="form-check">
          <Field
            class="form-check-input"
            type="radio"
            name="userType"
            value="admin"
            id="admin" />
          <label class="form-check-label" for="admin">
            Moderator
          </label>
        </div>
        <div class="form-check">
          <Field
            class="form-check-input"
            type="radio"
            name="userType"
            id="tenant"
            value="tenant" />
          <label class="form-check-label" for="tenant">
            Tenant
          </label>

          <div class="ml-n4">
            <ErrorMessage name="userType" class="field-error" />
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-block mt-2"
          v-on:click="signUp()">
          Create Account
        </button>
      </Form>
    </div>
  </div>
</template>

<script>
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as Yup from 'yup';

  export default {
    name: 'SignUpView',
    data() {
      return {
        loader: null,
        signUpValidationSchema: Yup.object({
          name: Yup.string().required(),
          email: Yup.string().email().required(),
          password: Yup.string().min(6).required(),
          confirmPassword: Yup.string().min(6).required(),
          userType: Yup.string().required()
        })
      }
    },
    components: {
      Form,
      Field,
      ErrorMessage
    },
    methods: {
      signUp(values) {
        if (!values) return;

        this.loader = this.$loading.show();
        const formData = {
          name: values.name,
          email: values.email,
          password: values.password,
          type: values.userType
        };
        this.$store.dispatch('auth/register', formData)
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
