<template>
  <div class="vertical-center">
    <div class="container">
      <div class="card">
        <div class="card-header d-flex align-items-center">
          <h5 class="mb-0">Featured Property</h5>
          <h5 class="ml-auto mb-0">Max Visitors: {{ openHouse?.visitorAmount }}</h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-12">
              <h4 class="mb-0">
                Address
              </h4>
              <p>{{ property?.address }}</p>
            </div>
          </div>


          <h4 class="mb-0">
            Enrolled Tenants
          </h4>

          <div v-if="enrolledPropertyUsers.length === 0">
            There are no enrolled tenants in this property
          </div>

          <div class="row mt-2" v-for="(enrolledProperty, index) in enrolledPropertyUsers" v-bind:key="index">
            <div class="col-6">
              {{ enrolledProperty.user.name }}
            </div>
            <div class="col-6">
              <a href="javascript:void(0)" v-on:click="unenrollTenant(enrolledProperty.userId)">Unenroll</a>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-6 pr-0">
              <select class="form-control" v-model="enrollmentForm.userId">
                <option value="" selected>
                  Select a tenant
                </option>
                <option
                  v-for="(tenant, index) in prospectiveTenants"
                  v-bind:key="index"
                  :value="tenant.id">
                  {{ tenant.name }}
                </option>
              </select>
            </div>
            <div class="col-6">
              <button class="btn btn-primary" v-on:click="enrollTenant()">Enroll Tenant</button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="$route.query.maxId && $route.query.minId"
        class="d-flex mt-3">
          <button
            :disabled="$route.params.id == $route.query.minId"
            type="button"
            class="btn btn-secondary"
            v-on:click="fetchAnotherProperty(false)">
            Fetch Previous Property
          </button>
          <button
            :disabled="$route.params.id == $route.query.maxId"
            type="button"
            class="btn btn-primary ml-2"
            v-on:click="fetchAnotherProperty(true)">
            Fetch Next Property
          </button>
      </div>
    </div>
  </div>
</template>

<script>
  import apiClient from '@/services/api.service';
  import router from '@/router/index';

  export default {
    name: 'PropertyDetailView',
    data() {
      return  {
        loader: null,
        property: {},
        enrolledPropertyUsers: [],
        openHouse: {},
        prospectiveTenants: [],
        enrollmentForm: {
          propertyId: '',
          userId: ''
        }
      }
    },
    mounted() {
      this.fetchPropertyDetails();
      this.fetchTenants();
    },
    methods: {
      fetchAnotherProperty(increment) {
        router.push({
          name: 'propertyDetail',
          params: { id: increment ? ++this.property.id : --this.property.id },
          query: { maxId: this.$route.query.maxId, minId: this.$route.query.minId }
        });
      },
      enrollTenant() {
        if (this.enrolledPropertyUsers.length === this.openHouse.visitorAmount) {
          this.$toast.error('This property already has the maximum number of enrolled tenants');
          return;
        }

        apiClient.post('/enrollment/enroll', this.enrollmentForm)
        .then(res => {
          this.fetchPropertyDetails();
          this.$toast.success(res.data.message);
        })
        .catch(err => {
          console.log(err);
          this.loader.hide();
        });
      },
      unenrollTenant(userId) {
        apiClient.post('/enrollment/unenroll', { userId, propertyId: this.property.id })
        .then(res => {
          this.fetchPropertyDetails();
          this.$toast.success(res.data.message);
        })
        .catch(err => {
          console.log(err);
          this.loader.hide();
        });
      },
      fetchPropertyDetails() {
        this.loader = this.$loading.show();
        apiClient.get(`/property/details/${this.$route.params.id}`)
        .then(res => {
          this.property = res.data.data.property;
          this.enrolledPropertyUsers = res.data.data.enrolledPropertyUsers;
          this.openHouse = res.data.data.openHouse;
          this.enrollmentForm.propertyId = this.property.id;
          this.loader.hide();
        })
        .catch(err => {
          console.log(err);
          this.loader.hide();
        });
      },
      fetchTenants() {
        apiClient.get('/user/getAll')
        .then(res => {
          this.prospectiveTenants = res.data.data.filter(user => user.type == 'tenant');
        })
        .catch(err => {
          console.log(err);
        });
      }
    }
  }
</script>
