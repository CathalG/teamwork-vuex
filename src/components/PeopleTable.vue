<template>
  <div class="table-container" v-bind:class="{ loading: isLoading }">
    <div id="table-preheader">
      <div>Filter results by name: <input v-model="filterTerm" @input="filterByKeyword" id="name-filter-input" placeholder="Enter a name..."></div>
      <div class="result-count"> 
         <span>{{statusString}}</span>   
        <button @click="prevPage">Previous</button> 
        <button @click="nextPage">Next</button>
    </div>
    </div>
    <table class="people-table">
      <thead>
        <tr>
          <th @click="sort('name')">Name</th>
          <th @click="sort('height')">Height</th>
          <th @click="sort('mass')">Mass</th>
          <th @click="sort('created')">Created</th>
          <th @click="sort('edited')">Edited</th>
          <th @click="sort('homeworld')">Planet Name</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="row in rows" v-bind:key="row.name">
        <td>{{row.name}}</td>
        <td>{{row.height}}</td>
        <td>{{row.mass}}</td>
        <td>{{ moment(row.created).format("DD MMM YYYY")}}</td>
        <td>{{ moment(row.edited).format("DD MMM YYYY")}}</td>
        <td class="planet-link" v-if="row.planet" @click="showModal(row.planet)">{{row.planet.name}}</td>
      </tr>
      </tbody>
    </table>
      <PlanetModal v-if="currentPlanet" :class="{ visible: isModalVisible }"  @close="closeModal">
        <h2>{{currentPlanet.name}}</h2>
        <p>Diameter: {{currentPlanet.diameter}}</p>
        <p>Climate: {{currentPlanet.climate}}</p>
        <p>Population: {{currentPlanet.population}}</p>
      </PlanetModal>
  </div>
</template>

<script>
import moment from 'moment'
import PlanetModal from './PlanetModal.vue'
import { mapState} from 'vuex'

export default {
  name: 'PeopleTable',
  components: {
    PlanetModal
  },
  data () {
    return {
      currentPlanet:null,
      isModalVisible: false,
      filterTerm: "",
    }
  },
  created(){
     this.moment = moment;
     this.$store.dispatch('loadPeople');
  },
  methods:{
    nextPage(){
      this.$store.dispatch('nextPage');
    },
    prevPage(){
      this.$store.dispatch('prevPage');
    },
    sort(col){
      this.$store.dispatch('sortByColumn', col)
    },
    filterByKeyword(){
      this.$store.dispatch('filterByKeyword', this.filterTerm)
    },
    showModal(planet) {
      this.currentPlanet = planet;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  },
  computed: mapState({
      rows: state => state.rows,
      isLoading: state => state.isLoading,
      currentPage: state => state.currentPage,
      statusString: state => state.statusString
    })
  }
</script>

<style scoped>

  table.people-table::after {
    opacity: 0;
    pointer-events: none;
    transition: all 0.2s ease-in-out;
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #FFF;
    z-index: 10000;
    background-image: url(".././assets/loader.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 40px;
  }

  .loading table.people-table::after {
    opacity: 1;
    pointer-events: all;
  }

  .planet-link{
    color: #ff1cb3;  
    cursor: pointer;
  }

  .planet-link:hover{
    text-decoration: underline;
  }

  div#table-preheader {
    border-bottom: 1px solid #d2d2d2;
    margin-bottom: 10px;
    text-align: left;
    display: flex;
    align-items: center;
    padding: 5px 0 15px;
  }

  div#table-preheader button{
    background: #FFF;
    box-shadow: none;
    margin: 0 5px;
    border-radius: 50px;
    padding: 7px 20px;
    margin-left: 5px;
    border: 1px solid #afa3a3;
    font-size: 14px;
    cursor: pointer;
  }

  div#table-preheader div{
    flex: 1;
  }

   div#table-preheader .result-count{
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

   div#table-preheader span{
     margin-right:15px;
   }

  input#name-filter-input {
    border-radius: 50px;
    padding: 8px 20px;
    margin-left: 10px;
    border: 1px solid #afa3a3;
    outline-color: #ff1cb3;
}

  .table-container{
      background: #FFF;
      box-shadow: 5px 8px 50px rgb(0 0 0 / 20%);
      padding: 20px 30px;
  }

  table.people-table {
      margin: auto;
      width:100%;
      table-layout: fixed;
      position: relative;
  }

  table.people-table th, table.people-table td {
      border-collapse: collapse;
      border: 0;
      padding:5px 10px;
      font-weight:400;
      text-align: left;
      padding: 12px 15px;
  }

    table.people-table th{
      cursor: pointer;
      font-weight: 600;
      user-select: none;
    }

</style>
