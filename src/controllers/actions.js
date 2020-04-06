import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import { mapState, mapMutations, mapActions } from 'vuex';

Vue.use(Vuex);

require('../styles/actions.css');

const store = new Vuex.Store({

    state: {
        count: 0
    },

    mutations: {
        increment(state) { // the type here is the 'increment'.
            state.count++  // the handler is here.
        },
        incrementBy(state, payload) {
            state.count += payload.amount;
        },
        decrement(state) {
            state.count--
        },
        decrementBy(state, payload) {
            state.count -= payload.amount;
        }
    },

    // actions are similar to mutations, since they change our state.
    // their difference is when you dispatch an action which in turn commits mutations.
    // actions can contain asynchronous operations.
    actions: {
        incrementAsync(context) {
            // context: an object that exposes the methods and properties of the store instance.
            // you can do context.state, context.getters, or content.dispatch to call other actions.
            setTimeout(() => {
                context.commit('increment')
            }, 1500);
        },
        incrementByAsync(context, payload) {
            setTimeout(() => {
                context.commit('incrementBy', payload)
            }, 1500);
        },
        decrementAsync({ commit }) {
            setTimeout(() => {
                commit('decrement')
            }, 1500);
        },
        decrementByAsync({ commit }, payload) {
            setTimeout(() => {
                commit('decrementBy', payload)
            }, 1500);
        },
        actionA({ commit }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('someMutation')
                    resolve()
                }, 1000)
            })
        },
        actionB({ dispatch, commit }) { // we can chain our actions
            return dispatch('actionA').then(() => {
                commit('someOtherMutation')
            })
        },
        async actionC ({ commit }) {
            commit('gotData', await getData())
        },
        async actionD ({ dispatch, commit} ) {
            await dispatch('actionC')
            commit('gotOtherData', await getOtherData())
        }
    }

});


new Vue({ 

    el: '#actions',
    store: store,
    data() {
        return {
            
        }
    },
    computed: mapState ([ 'count' ]),
    methods: {
        increment() {
            // dispatching actions within our application.
            this.$store.dispatch('incrementAsync')
        },
        decrement() {
            this.$store.dispatch('decrementAsync')
        },
        incrementBy() {
            // you can also dispatch actions with payloads
            this.$store.dispatch('incrementByAsync', { amount: 3 })
        },
        decrementBy() {
            // we can also dispatch actions like...
            this.$store.dispatch({ type: 'decrementByAsync', amount: 3 })
        },
        testActionA(){
            this.$store.dispatch('actionA').then(() => {
                // commit some other mutation or make some changes to the application.
            })
        }
    }

    // With mapMutations,
    // methods: mapMutations ([
    //     'increment',
    //     'decrement'
    // ])

});