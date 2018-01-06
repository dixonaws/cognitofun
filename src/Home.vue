<template>
  <div id="home">

    <p>The page is a demonstration of authentication and authorization with AWS Cognito. The API endpoints below
      require various permissions from <i>none</i> to <i>authorization</i>.</p>

    <p>The source for this application can be found at <a href="https://www.github.com/dixonaws/cognitofun">my Github
      cognitofun repo</a>.</p>

    <div class="row">
      <div class="col s4 m4">
        <div class="card green lighten-4">
          <div class="card-content black-text">
            <span class="card-title">Open API</span>
            <p>Click to invoke an API that does not require authentication or authoriztion.</p>
          </div>
          <div class="card-action center-align">
            <a href="#" @click="openApi()">Invoke</a>
          </div>
        </div>
      </div>

      <div class="col s4 m4">
        <div class="card blue lighten-1">
          <div class="card-content black-text">
            <span class="card-title">AuthN API</span>
            <p>Click to invoke a protected API. This endpoint requires authentication.</p>
          </div>
          <div class="card-action center-align">
            <a href="#" @click="authnApi()">Invoke</a>
          </div>
        </div>
      </div>

      <div class="col s4 m4">
        <div class="card red lighten-1">
          <div class="card-content black-text">
            <span class="card-title">AuthZ API</span>
            <p>Click to invoke a protected API. This endpoint requires AWS IAM authorization.</p>
          </div>
          <div class="card-action center-align">
            <a href="#" @click="authzApi()">Invoke</a>
          </div>
        </div>
      </div>


    </div> <!-- row -->

  </div> <!-- home -->


</template>

<script>

  export default {
    name: 'Home',
    data() {
      return {
        showModal: false,

      }
    },

    methods: {
      openApi() {
        console.log('openapi invoked');
      },

      authnApi() {
        console.log('authN API invoked');
      },

      authzApi() {
        console.log('authZ API invoked');
      }
    }

  }
</script>

