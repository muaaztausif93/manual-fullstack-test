<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="mr-auto">User Information</div>
      <div class="my-2 my-lg-0">
        <a v-on:click="signOut()">Sign Out</a>
      </div>
    </div>
  </nav>
</template>

<script>
  import router from '@/router/index'

  export default {
    name: 'TopbarComponent',
    methods: {
      signOut() {
        this.loader = this.$loading.show();
        this.$store.dispatch('auth/logout')
        .then(() => {
          this.loader.hide();
          router.push('/sign-in');
        });
      }
    }
  }
</script>