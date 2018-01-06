import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

import 'aws-sdk';
import 'amazon-cognito-identity-js';
import 'jquery';
import 'fontawesome';
import {routes} from "./routes";

import AWS from 'aws-sdk';
import {CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

Vue.component('modal', {
  template: '#modal-template',
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
    signin() {
      var authenticationData = {
        Username: this.username,
        Password: this.password
      };

      var poolData = {
        UserPoolId: 'us-east-1_1EoDp5qWJ', // Your user pool id here
        ClientId: '73r41de3hst5kq2i05rrvam8qv' // Your client id here
      };

      var authenticationDetails = new AuthenticationDetails(authenticationData);

      var userPool = new CognitoUserPool(poolData);

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

          this.$emit('close')

        },

        onFailure: function (err) {
          console.error(err);
        }
      });


    } // signin

  }
})


const router=new VueRouter({
  routes: routes,
  mode: 'hash'
});

const store = new Vuex.Store({
  state: {
    username: null,
    password: null,
    session: null,
    idToken: null,
    refreshToken: null,
    secretAccessKey: null,
    accessKeyId: null,

  } // state

});

new Vue({
  el: '#app',
  data: {
    showModal: false
  },
  router: router,
  store: store,
  render: h => h(App),

  methods: {
    navigate(path) {
      this.$router.push(path);
    },
  }
})
