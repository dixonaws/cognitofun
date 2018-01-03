<template>
  <div id="home">


    <div class="row">
      <div class="col s4 m4">
        <div class="card blue lighten-4">
          <div class="card-content black-text">
            <span class="card-title">Open API</span>
            <p>Click to invoke an API that does not require authentication or authoriztion.</p>
          </div>
          <div class="card-action">
            <a href="#">Invoke</a>
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
        message: null,

      }
    }

  }
</script>
