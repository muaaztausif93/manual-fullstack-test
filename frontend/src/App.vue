<template>
  <topbar-component v-if="currentUser"></topbar-component>
  <router-view :key="$route.fullPath" />
</template>

<script>
  import TopbarComponent from '@/components/TopbarComponent.vue';
  
  export default {
    components: {
      TopbarComponent
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
