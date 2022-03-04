<template>
  <div class="page-container-outer">
    <div class="header-container">
      <img alt="Teamwork logo" class="logo" src="./assets/logo.png">
    </div>
      <PeopleTable/>
  </div>
</template>

<script>
import PeopleTable from './components/PeopleTable.vue'

export default {
  name: 'App',
  components: {
    PeopleTable
  },
  data () {
    return {
    }
  }

}
</script>

<style>
body{
  background: radial-gradient(#ffffff 50%, #d1d1d1  );
  background-size:cover ;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding-bottom: 50px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.logo{
  max-width: 230px;;
}

.header-container {
    display: flex;
    padding: 5px 0;
}

.page-container-outer {
    max-width: 1200px;
    margin: auto;
}

</style>
