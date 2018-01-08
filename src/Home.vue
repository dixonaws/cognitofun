<template>
  <div id="home">

    <p>The page is a demonstration of authentication and authorization with AWS Cognito. The API endpoints below
      require various permissions from <i>none</i> to <i>authorization</i>.</p>

    <p>The source for this application can be found at <a href="https://www.github.com/dixonaws/cognitofun">my Github
      cognitofun repo</a>.</p>
    <br>

    <table class="table table-hover table-bordered">
      <tr>
        <td>Username</td>
      <td>{{this.username}}</td>
      </tr>
      <tr>
        <td>Valid until</td>
        <td>{{this.validUntil}}</td>
      </tr>
      <tr>
        <td>AccessKeyId</td>
        <td>{{this.accessKeyId}}</td>
      </tr>
      <tr>
        <td>SecretAccessKey</td>
        <td>{{this.secretAccessKey}}</td>
      </tr>
      <!--<tr>-->
        <!--<td>IdToken</td>-->
        <!--<td>{{this.idToken}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td>RefreshToken</td>-->
        <!--<td>{{this.refreshToken}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td>Session</td>-->
        <!--<td>{{this.session}}</td>-->
      <!--</tr>-->

    </table>
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
          <p class="card-text">You must be logged in as a user with an AccessKey and SecretAccess key that has specific
            IAM roles attached.
            (authN and authZ).</p>
          <a href="#" @click="this.authzApi()" class="card-link btn btn-primary">Invoke</a>
        </div>
      </div>
    </div> <!-- card deck -->
    <hr>
    Display API results here

  </div> <!-- home -->
</template>

<script>

  export default {
    name: 'Home',
    data() {
      return {}
    },

    computed: {
      poolData: {
        get() {
          return (this.$store.state.poolData)
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

      },
      validUntil: {
        get() {
          return(0)
        }
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
      },

      displayTree() {

        document.getElementById('tree').tree({
          dataSource: [{text: 'foo', children: [{text: 'bar'}]}]
        });

      },
    }

  }
</script>

