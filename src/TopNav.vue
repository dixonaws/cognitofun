<template>
  <div id="topnav">

    <b-navbar class="bg-secondary text-white" toggleable="md">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand class="text-white" @click="navigate('/');" href="#">cognitofun</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <!--<b-nav-form>-->
          <!--<b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>-->
          <!--<b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>-->
          <!--</b-nav-form>-->


          <b-nav-item v-if="!this.loggedInUser()">
            <a class="text-white" v-b-modal.signinModal>Sign in</a>

          </b-nav-item>
          <b-nav-item-dropdown right v-else-if="this.loggedInUser()">
            <!-- Using button-content slot -->
            <template slot="button-content">
              <a class="text-white">{{ this.username }}</a>
            </template>
            <b-dropdown-item href="#">Show Credentials</b-dropdown-item>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-divider/>
            <b-dropdown-item href="#" @click="signout()">Signout</b-dropdown-item>


          </b-nav-item-dropdown>


        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <b-modal id="signinModal" size="sm" hide-footer header-bg-variant="light" header-text-variant="dark"
             title="Sign in to cognitofun!">

      <form>
        <b-input-group left="<i class='fa fa-user-circle' aria-hidden='true'></i>"
                       class="mb-sm-3 mr-sm-3 mb-sm-0">
          <b-input id="username" v-model="username" placeholder="Username"/>
        </b-input-group>

        <b-input-group left="&nbsp;<i class='fa fa-lock' aria-hidden='true'></i>"
                       class="mb-2 mr-sm-2 mb-sm-0 password">
          <b-input id="password" v-model="password" type="password" placeholder="Password"/>

        </b-input-group>

        <b-btn class="btn btn-primary btn-lg mt-lg-5" variant="outline-primary" block @click="signin()">Sign in</b-btn>
      </form>
      <br>
      <div style="text-align: center;">
        <a href="#">Forgot password?</a>

      </div>

      <br>
      <br>
      <hr>
      <div style="text-align: center;">
        Don't have an account? <a href="#"><b>Sign up</b></a>

      </div>

    </b-modal> <!-- signinModal -->

  </div> <!-- topnav -->
</template>

<script>
  import AWS from 'aws-sdk';
  import {CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';


  export default {
    name: 'topnav',
    data() {
      return {}
    },
    computed: {
      poolData: {
        get() {
          return(this.$store.state.poolData)
        }
      },
      username: {
        get() {
          return (this.$store.state.username)
        },
        set(aUsername) {
          this.$store.state.username = aUsername
        }
      },
      password: {
        get() {
          return (this.$store.state.password);
        },

        set(aPassword) {
          this.$store.state.password = aPassword;
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
        },


      }
    },

    methods: {
      signout() {
        // logout and navigate to the homepage
        console.log('Logging out (' + this.username + ')...')

        var userPool = new CognitoUserPool(this.poolData);

        var userData = {
          Username: this.username,
          Pool: userPool
        };

        var cognitoUser = new CognitoUser(userData);

        cognitoUser.signOut();

        // destroy the global cognitoUser one it has been signed out of Cognito
        this.idToken = null;
        this.refreshToken = null;
        this.sessionToken = null;
        this.accessKeyId = null;
        this.secretAccessKey = null;
        this.session=null;
        this.username=null;
        this.password=null;

        this.navigate('/');
      },
      navigate(path) {
        this.$router.push(path);

      }, // navigate

      signin() {
        var authenticationData = {
          Username: this.username,
          Password: this.password
        };

        var authenticationDetails = new AuthenticationDetails(authenticationData);

        var userPool = new CognitoUserPool(this.poolData);

        console.log(this.username);

        var userData = {
          Username: this.username,
          Pool: userPool
        };

        var cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (result) => {
            var cognitoUserSession = result;

            console.log("Loading Auth User...");
            console.log('cognitoUserSession: ' + cognitoUserSession)

            if (cognitoUser != null) {
              cognitoUser.getSession((err, session) => {
                if (err) {
                  alert(err);
                  return;
                }

                // hide the signin modal
                this.$root.$emit('bv::hide::modal', 'signinModal')

                // store the session locally in the Vuex store via computed properties
                this.session = session;
                this.idToken = session.getIdToken().getJwtToken();
                this.refreshToken = session.getRefreshToken().token;

                console.log('session email: ' + session.idToken.payload.email);

                var creds = new AWS.CognitoIdentityCredentials({
                  IdentityPoolId: 'us-east-1:3605014d-6a56-436e-95d1-fbc4c35b305f', // your identity pool id here
                  Logins: {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.us-east-1.amazonaws.com/us-east-1_1EoDp5qWJ': session.getIdToken().getJwtToken()
                  }
                }, {
                  region: "us-east-1"
                });

                creds.refresh((err, data) => {
                  if (err) console.log(err)
                  else {
                    // store the tokens locally in the authService
                    this.sessionToken = creds.sessionToken;
                    this.accessKeyId = creds.accessKeyId;
                    this.secretAccessKey = creds.secretAccessKey;

                    // AWS.config.credentials
                    // var s3 = new AWS.S3();

                    console.log('accessKeyId: ' + this.accessKeyId);
                    console.log('secretAccessKey: ' + this.secretAccessKey)

                  }
                }); // creds.refresh

              }); //cognitoUser.getSession


            }

          },

          onFailure: function (err) {
            console.error(err);
          }
        });


      }, // signin

      loggedInUser() {
        if (this.username && this.accessKeyId && this.secretAccessKey) {
          return (true);
        }
        else {
          return (false);
        }
      }, // loggedInUser

      showUserInfo() {
        if (this.loggedInUser()) {
          return (this.username);
          console.log(this.loggedInUser());
          console.log('AccessKeyId: ' + this.accessKeyId + ', secretAccessKey: ' + this.secretAccessKey);
        }
        else {
          console.log('No user logged in');
        }
      }, // showUserInfo

      showProfile() {
        alert('show profile');
      }

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


