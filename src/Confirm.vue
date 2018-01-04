<template>
  <div id="confirm">

    <p>Text sent to your phone. Please confirm your resgistration.</p>

    <div class="card-panel">
      <div class="section">
        <h5>Confirm</h5>
      </div>

      <div class="divider"></div>

      <div class="section">
        <div class="row">
          <form class="col s12">
            <div v-if="username==''" class="row">
              <div class="input-field col s6">
                <input v-bind="this.username" v-model="this.username" id="username" type="text" class="validate">

              </div>
            </div>

          </form>
        </div>

        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s6">
                <input v-model="confirmation_code" id="confirmation_code" type="text" class="validate">
                <label for="confirmation_code">Confirmation Code</label>
              </div>
            </div>

          </form>
        </div>

      </div>

      <div class="divider"></div>

      <div id="buttons" class="section">
        <div class="row">
          <div class="col s2">
            <button @click="confirm()" class="btn waves-effect waves-light" type="submit" name="action">Confirm</button>
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
    name: 'confirm',
    data() {
      return {
        confirmation_code: null,

      }
    },

    computed: {
      username: {
        get() {
          return (this.$store.state.username);
        },
        set(aUsername) {
          this.$store.state.username = aUsername;
        }
      }
    },

    methods: {
      navigate(path) {
        this.$router.push(path);
      },

      confirm() {
        console.log('confirm(): confirming username ' + this.$store.state.username + ', ' + 'code ' + this.confirmation_code + '...')

        var poolData = {
          UserPoolId: 'us-east-1_1EoDp5qWJ', // Your user pool id here
          ClientId: '73r41de3hst5kq2i05rrvam8qv' // Your client id here
        };

        var userPool = new CognitoUserPool(poolData);

        var userData = {
          Username: this.username,
          Pool: userPool
        };

        var cognitoUser = new CognitoUser(userData);

        console.log("Confirming user: " + userData + ", code: " + this.confirmation_code)

        cognitoUser.confirmRegistration(this.confirmation_code, true, (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log('confirm(): call result: ' + result);
          Materialize.toast('Confirmed ' + this.username, 2000)

          this.navigate('/');
        });


      } // register

    } //methods
  }
</script>
