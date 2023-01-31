<template>
  <div class="vertical-center">
    <div class="inner-block">
      <form>
        <h3 class="mb-3">Create New Property</h3>

        <div class="form-group">
          <label class="mb-0">Property Address</label>
          <input type="email" class="form-control" v-model="propertyForm.address" />
        </div>

        <button
          type="button"
          class="btn btn-primary btn-block"
          v-on:click="createProperty()">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import apiClient from '@/services/api.service';
  import router from '@/router/index';

  export default {
    name: 'PropertyCreateView',
    data() {
      return {
        loader: null,
        propertyForm: {
          address: ''
        }
      }
    },
    methods: {
      createProperty() {
        this.loader = this.$loading.show();
        apiClient.post('/property/create', this.propertyForm)
        .then(res => {
          this.loader.hide();
          this.$toast.success(res.data.message);
          router.push('/properties');
        })
        .catch(err => {
          this.loader.hide();
          console.log(err);
        })
      }
    }
  }
</script>