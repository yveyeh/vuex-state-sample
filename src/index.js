import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import { mapState } from 'vuex';

Vue.use(Vuex);

// This pattern makes the component rely on the global store.
// When using a modular system, we will have to import the store in every single component that is using it.
// It will also require marking when testing the component.
const store = new Vuex.Store({
    state: {
        count: 3
    }
});

new Vue({
    // 'el': "#app",
    data() {
        return {
            localCount: 4
        }
    },
    store: store, // inject store from the root component.
    computed: mapState({
        count: state => state.count,
        countAlias: 'count',
        countPlusLocalState(state) { 
            // this shows us that not all of our state has to be held within our store.
            // it's ok to have some data within our component if it will only be used in that component.
            return state.count + this.localCount
        }
    })
    // computed: mapState(['count'])
    // render: h => h(App)
}).$mount('#app');