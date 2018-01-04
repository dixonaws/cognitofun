<template>
  <div id="topnav">

    <nav>
      <div class="nav-wrapper grey lighten-2">
        <a @click="navigate('/')" href="#" class="brand-logo black-text left">cognitofun</a>
        <!--<ul id="nav-desktop" class="right show-on-large hide-on-small-and-down">-->
          <!--<li><a @click="signin()" class="blue darken-3 white-text waves-effect btn btn-small">Sign in</a></li>-->
          <!--<li><a @click="register()" class="blue darken-3 white-text waves-effect btn btn-small">Register</a></li>-->

        <!--</ul>-->

        <ul id="nav-mobile" class="right">
          <li><a @click="signin()" class="blue-text">Sign in</a></li>
          <li><a @click="navigate('/register')" class="blue-text">Register</a></li>
        </ul>


      </div>
    </nav>


  </div> <!-- topnav -->
</template>

<script>

  export default {
    name: 'topnav',
    data() {
      return {
        message: null,
      }
    },

    methods: {
      navigate(path) {
        this.$router.push(path);

      },

      signin() {
        console.log('signin()');
      },

      register() {
        console.log('register()');
      }
    }

  }
</script>

