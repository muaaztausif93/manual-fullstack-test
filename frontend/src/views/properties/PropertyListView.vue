<template>
  <div class="p-2 mt-3">
    <div class="d-flex mb-2 p-3">
      <h2 class="mb-0">Properties</h2>
      <router-link class="ml-auto btn btn-primary" to="/properties/new">Add Property</router-link>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Address</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="property in properties" v-bind:key="property.id">
          <td>{{ property.id }}</td>
          <td>{{ property.address }}</td>
          <td>
            <router-link
              class="btn btn-primary"
              :to="{
                name: 'propertyDetail',
                params: { id: property.id },
                query: { maxId: lastPropertyId, minId: firstPropertyId }
              }">
              Details
            </router-link>
          </td>
        </tr>
        <tr v-if="properties.length == 0">
          <td colspan="3">No records found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import apiClient from '@/services/api.service';

  export default {
    name: 'PropertyListView',
    data() {
      return {
        loader: null,
        properties: [],
        firstPropertyId: null,
        lastPropertyId: null
      }
    },
    mounted() {
      this.fetchProperties();
    },
    methods: {
      fetchProperties() {
        this.loader = this.$loading.show();
        apiClient.get('property/list')
        .then(res => {
          this.properties = res.data.data;
          this.firstPropertyId = this.properties[0].id;
          this.lastPropertyId = this.properties[this.properties.length - 1].id
          this.loader.hide();
        })
        .catch(err => {
          console.log(err);
          this.loader.hide();
        })
      }
    }
  }
</script>
