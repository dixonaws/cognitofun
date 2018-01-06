<template>
  <div id="home">

    <p>The page is a demonstration of authentication and authorization with AWS Cognito. The API endpoints below
      require various permissions from <i>none</i> to <i>authorization</i>.</p>

    <p>The source for this application can be found at <a href="https://www.github.com/dixonaws/cognitofun">my Github
      cognitofun repo</a>.</p>
    <br>

    <div class="card-deck">
      <div class="card border-dark mb-3" style="max-width: 18rem;">
        <div class="card-header"><h4>Open API</h4></div>
        <div class="card-body text-dark">
          <h5 class="card-title">No auth</h5>
          <p class="card-text">Invoke an API that does not require authentication (authN) or specific authorization
            (authZ).</p>
          <a href="#" @click="this.openApi()" class="card-link btn btn-primary">Invoke</a>
        </div>
      </div>

      <div class="card border-dark mb-3" style="max-width: 18rem;">
        <div class="card-header"><h4>Authenticated API</h4></div>
        <div class="card-body text-dark">
          <h5 class="card-title">Authentication Required</h5>
          <p class="card-text">This API requires authentication (authN) of any user in the system, but no specific
            authorization (authZ).</p>
          <a href="#" @click="this.authnApi()" class="card-link btn btn-primary">Invoke</a>
        </div>
      </div>

      <div class="card border-dark mb-3" style="max-width: 18rem;">
        <div class="card-header"><h4>Protected API</h4></div>
        <div class="card-body text-dark">
          <h5 class="card-title">authN and authZ</h5>
          <p class="card-text">You must be logged in as a user with an AccessKey and SecretAccess key that has specific IAM roles attached.
            (authN and authZ).</p>
          <a href="#" @click="this.authzApi()" class="card-link btn btn-primary">Invoke</a>
        </div>
      </div>
    </div> <!-- card deck -->

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

