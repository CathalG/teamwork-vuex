import axios from 'axios';
import { createStore } from 'vuex'

export default createStore({
    state () {
      return {
        response:{
            data:{
                results:[]
            }
        },
        rows:[],
        statusString:null,
        errors:[],
        pageSize:10,
        currentPage:1,
        isLoading:true,
        sortColumn:'name',
        sortAscending:true,
        filterKeyword:"",
        responseCache:{}
      }
    },

    actions: { 
        //load people from Swapi
        async loadPeople ({ commit, getters,dispatch }) {
          //set initial variables
          let url = `https://swapi.dev/api/people?page=${getters.getCurrentPage}&per_page=${getters.getPageSize}`;
          commit('setLoading', true);
          commit('setStatusString', `Loading data...`);
          //if url is not already in the response cache then call swapi api
          if(this.state.responseCache==null || !(url in this.state.responseCache)){
            let response = await axios.get(url);
            await Promise.all(response.data.results.map(async (element) => {
              let response = await axios.get(element.homeworld);
              element.planet = response.data;
            }));
            Object.assign(this.state.responseCache, {[url]: response});  
            commit('setResponse', response);
            commit('setRows', response.data.results);
          }
          // else retrieve data from response cache
          else{
            let response = this.state.responseCache[url]
            commit('setResponse', response);
            commit('setRows', response.data.results);
          }
        //update load state and loadstatus string
        commit('setLoading', false);
        dispatch('loadStatusString');
        },

        nextPage({ commit,getters,dispatch}) {
          commit('setCurrentPage', getters.getCurrentPage < Math.ceil(getters.getRecordCount/getters.getPageSize)?getters.getCurrentPage+1:getters.getCurrentPage )
          dispatch('loadPeople');
        },

        prevPage({ commit,getters,dispatch}) {
          commit('setCurrentPage', getters.getCurrentPage>1? getters.getCurrentPage-1:getters.getCurrentPage )
          dispatch('loadPeople');
        },

        filterByKeyword({commit},term){
          let filteredRows =  this.state.response.data.results.filter((row)=>{return row.name.toLowerCase().indexOf(term.toLowerCase()) >= 0 });
          commit('setRows',filteredRows);
        },

        sortByColumn({ commit,getters},col){
          if (getters.getSortColumn === col) {
              commit('setSortAscending', !getters.getSortAscending) ;
            }
            else {
              commit('setSortAscending', true) 
              commit('setSortColumn', col)
            }
            this.state.rows.sort(function(a, b) {
              if (a[col] > b[col]) {
                return getters.getSortAscending ? 1 : -1
              } 
              else if (a[col] < b[col]) {
                return getters.getSortAscending ? -1 : 1
              }
              return 0;
            })
        },

        loadStatusString({ commit,getters}){
            let rangeStart = ( getters.getPageSize *  getters.getCurrentPage) -  getters.getPageSize;
            let rangeEnd =  getters.getPageSize *  getters.getCurrentPage;
            let total =  getters.getRecordCount;
            if(rangeEnd> getters.getRecordCount){
                rangeEnd =  getters.getRecordCount;
            }
            commit('setStatusString', `Showing ${rangeStart} - ${rangeEnd} of ${total}`)
        }
    },

    getters: {
        getCurrentPage(state){
            return state.currentPage
        },
        getPageSize(state){
            return state.pageSize
        },
        getRecordCount(state){
            return state.response.data.count
        },
        getSortColumn(state){
            return state.sortColumn
        },
        getSortAscending(state){
            return state.sortAscending
        },
        getFilterKeyword(state){
            return state.filterKeyword
        },
        getRows(state){
            return state.rows
        },
        getResponseCache(state){
            return state.responseCache
        }
    },

    mutations: {
        setLoading (state, status) {
            state.isLoading = status
          },
        setResponse (state, response) {
            state.response = response
          },
        setRows (state, rows) {
            state.rows = rows
          },
        setCurrentPage (state, page) {
            state.currentPage = page
          },
        setStatusString (state, string) {
            state.statusString = string
          },
        setSortAscending (state, sort) {
            state.sortAscending = sort
          },
        setSortColumn (state, col) {
            state.sortColumn = col
          },
        setFilterKeyword (state, filterKeyword) {
            state.filterKeyword = filterKeyword
          }
    }
  })