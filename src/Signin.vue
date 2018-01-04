<template>
  <div id="register">

    <p>Use this form to register a new user in the system.</p>

    <div class="card-panel">
      <div class="section">
        <h5>New User Registration</h5>
      </div>

      <div class="divider"></div>

      <div class="section">
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s6">
                <input v-model="first_name" id="first_name" type="text" class="validate">
                <label for="first_name">First Name</label>
              </div>
              <div class="input-field col s6">
                <input v-model="last_name" id="last_name" type="text" class="validate">
                <label for="last_name">Last Name</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input v-model="username" id="username" type="text" class="validate" data-length="12">
                <label for="username">Username</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input v-model="email" id="email" type="email" class="validate">
                <label for="email" data-error="Enter an address in the format of username@domain.com" data-success="Ok">Email</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input v-model="password" id="password" type="password" class="validate">
                <label for="password">Password (at least 6 characters)</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input v-model="confirm_password" id="confirm_password" type="password" class="validate">
                <label for="password">Confirm Password</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s12">
                <input v-model="phone" id="phone" type="text" class="validate">
                <label for="phone">Phone</label>
              </div>
            </div>

          </form>
        </div>

      </div>

      <div class="divider"></div>

      <div id="buttons" class="section">
        <div class="row">
          <div class="col s3">
            <button @click="register()" class="btn waves-effect waves-light" name="register" id="btn-register">Register
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
    name: 'register',
    data() {
      return {
        first_name: null,
        last_name: null,
        password: null,
        confirm_password: null,
        email: null,
        phone: null,

      }
    },

    computed: {
      username: {
        get() {
          return this.$store.state.username;
        },
        set(aUsername) {
          this.$store.state.username=aUsername;
        }
      }
    },

    methods: {
      navigate(path) {
        this.$router.push(path);
      },

      invalidCredentials() {
        // noop
      },

      confirm() {
        this.navigate('/confirm');
      },

      register() {
        console.log('register(): ' + this.last_name + ', ' + this.first_name + ' (' + this.email + ')')
        Materialize.toast('Registering user ' + this.email + ' &nbsp;&nbsp; <i class="fas fa-circle-notch fa-spin"></i>', 2000)

        var poolData = {
          UserPoolId: 'us-east-1_1EoDp5qWJ', // Your user pool id here
          ClientId: '73r41de3hst5kq2i05rrvam8qv' // Your client id here
        };

        var userPool = new CognitoUserPool(poolData);

        var attributeList = [];

        var dataEmail = {
          Name: 'email',
          Value: this.email
        };

        var dataPhoneNumber = {
          Name: 'phone_number',
          Value: this.phone
        };

        var attributeEmail = new CognitoUserAttribute(dataEmail);
        var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);

        attributeList.push(attributeEmail);
        attributeList.push(attributePhoneNumber);

        console.log('register(): registering user ' + this.username + ', ' + this.phone + ', ' + this.email + '... ');

        userPool.signUp(this.username, this.password, attributeList, null, (err, result) => {
          if (err) {
            console.error(err);
          } else {
            var cognitoUser = result.user;

            var username=cognitoUser.getUsername();
            console.log('register(): user registered as ' + username);
            this.username=username;

            // Remove the dialog box
            // var toastElement = $('.toast').first()[0];
            // var toastInstance = toastElement.M_Toast;
            // toastInstance.remove();

            this.navigate('/confirm');
          }
        });


      } // register

    } //methods
  }
</script>
