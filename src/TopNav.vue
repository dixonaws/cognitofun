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
          <li><a class="modal-trigger blue-text" href="#" @click="showModal = true">Sign in</a></li>
          <!--<li><a @click="navigate('/signin')" class="blue-text">Sign in</a></li>-->
          <li><a @click="navigate('/register')" class="blue-text">Register</a></li>
        </ul>


      </div>
    </nav>

    <div id="modal-signin" class="modal modal-fixed-footer">
      <div class="modal-content"></div>
      <div class="modal-footer"></div>
    </div>

    <!-- modal -->
        <script type="text/x-template" id="modal-template">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">

                <div class="modal-header">
                  <slot name="header">
                    Sign in
                  </slot>
                </div>

                <div class="modal-body">
                  <slot name="body">
                    Sign in form
                  </slot>
                </div>

               <div class="modal-footer center-align">
                 <slot name="footer">
                  <a href="#" @click="signin()">Sign in</a>
                  <br><br>
                  Don't have an account? <a href=""">Sign up</a>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
      </script>
  <!-- modal -->


    <modal v-if="showModal" @close="showModal = false">
      <h5 slot="header">Sign in to your account</h5>
      <hr>

      <div slot="body">
        <hr>
            <div class="row">
              <form class="col s12">
                <br>
                <div class="row">
                  <div class="input-field col s12">

                    <input v-model="username" id="username" type="text" class="validate" data-length="12">
                    <label for="username">Username</label>
                  </div>
                </div>

                <div class="row">
                  <div class="input-field col s12">
                    <input v-model="password" id="password" type="password" class="validate">
                    <label for="password">Password</label>
                  </div>
                </div>

              </form>
            <hr>
            </div>

      </div> <!-- sign in form -->
    </modal>



  </div> <!-- topnav -->
</template>

<script>


  export default {
    name: 'topnav',
    data() {
      return {
        showModal: false,
        // username: null,
        // password: null
      }
    },
    computed: {
      username: {
        get() {
          return(this.$store.state.username)
        },
        set(aUsername) {
          this.$store.state.username=aUsername
        }
      },
      password: {
        get() {
          return(this.$store.state.password);
        },

        set(aPassword) {
          this.$store.state.password=aPassword;
        }
      },
      session: {
        get() {
          return (this.$store.state.session);
        },
        set(aSession) {
          this.$store.state.session = aSession;
        }
      },
      idToken: {
        get() {
          return (this.$store.state.idToken);
        },
        set(aIdToken) {
          this.$store.state.idToken = aIdToken;
        }
      },
      refreshToken: {
        get() {
          return (this.$store.state.refreshToken);
        },
        set(aRefreshToken) {
          this.$store.state.refreshToken = aRefreshToken;
        }
      },
      accessKeyId: {
        get() {
          return (this.$store.state.accessKeyId);
        },
        set(aAccessKeyId) {
          this.$store.state.accessKeyId = aAccessKeyId;
        }
      },
      secretAccessKey: {
        get() {
          return (this.$store.state.secretAccessKey)
        },
        set(aSecretAccessKey) {
          this.$store.state.secretAccessKey = aSecretAccessKey;
        }
      }
    },


    methods: {
      navigate(path) {
        this.$router.push(path);

      },
    }

  }
</script>

<style>
  modal-mask {
    position: absolute;
    z-index: 9999999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .2s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    z-index: 9999999;
    position: absolute;
    left: 100px;
    top: 100px;
    height: 415px;
    width: 350px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: left;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 100;
  }

  .modal-leave-active {
    opacity: 100;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>


