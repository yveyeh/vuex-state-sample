import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import todos from '../api/todos.mock';

Vue.use(Vuex);

require('../styles/todos.css');

const store = new Vuex.Store({
   state: {
       ...todos
   },
});

new Vue({ 
    el: '#app',
    store,
    data: {
    },
    computed: {
    }
});
