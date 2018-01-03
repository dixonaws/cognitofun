<template>
  <div id="app" class="container">

    <header>
      <top-nav></top-nav>
    </header>

    <main>

      <router-view></router-view>

    </main>

    <footer>

    </footer>


  </div> <!-- app -->
</template>

<script>
  import TopNav from './TopNav.vue';
  import BottomNav from './BottomNav.vue';

  export default {
    name: 'app',
    data() {
      return {
        message: null,
      }
    },

    methods: {},

    components: {
      'top-nav': TopNav,
      'bottom-nav': BottomNav

    }

  }
</script>

