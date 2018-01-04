<template>
  <div id="app" class="container">

    <header>
      <top-nav></top-nav>
    </header>

    <main>

      <transition
        duration="600"
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutLeft"
        mode="out-in">
        <router-view></router-view>
      </transition>

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

    methods: {
      navigate(path) {
        this.$router.push(path);
      },


    },

    components: {
      'top-nav': TopNav,
      'bottom-nav': BottomNav

    }

  }
</script>

