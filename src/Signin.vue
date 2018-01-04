<template>
  <div id="signin">

    <p>Sign in to your existing account in Cognito.</p>

    <div class="card-panel">
      <div class="section">
        <h5>Sign in</h5>
      </div>

      <div class="divider"></div>

      <div class="section">
        <div class="row">
          <form class="col s12">

            <div class="row">
              <div class="input-field col s12">
                <input v-model="username" id="username" type="text" class="validate" data-length="12">
                <label for="username">Username</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <input v-model="password" id="password" type="password" class="validate">
                <label for="password">Password (at least 6 characters)</label>
              </div>
            </div>

          </form>
        </div>

      </div>

      <div class="divider"></div>

      <div id="buttons" class="section">
        <div class="row">
          <div class="col s3">
            <button @click="signin()" class="btn waves-effect waves-light" name="register" id="btn-register">Sign In
            </button>
          </div>

        </div>

      </div> <!-- buttons -->

    </div> <!-- card-panel -->


  </div>

</template>

<script>
  import AWS from 'aws-sdk';
  import {CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js';

  export default {
    name: 'signin',
    data() {
      return {
        username: null,
        password: null,

      }
    },

    computed: {
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

                console.log('cognito user is not null!');

                // store the session locally in the authService
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


      } // signin
    } // methods
  } // export default


</script>
