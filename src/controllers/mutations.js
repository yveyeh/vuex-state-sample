import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import { mapState, mapMutations } from 'vuex';

Vue.use(Vuex);

require('../styles/mutations.css');

const store = new Vuex.Store({

    state: {
        count: 0
    },

    // mutations change state and tracks changes along the way.
    // mutations have a type (which is how we commit a mutation) and a handler (which actually changes state).
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
    }

});


new Vue({ 

    el: '#mutations',
    store: store,
    data() {
        return {
            
        }
    },
    computed: mapState ([
        'count'
    ]),
    methods: {
        increment() {
            // commiting mutations within our application.
            this.$store.commit('increment')
        },
        decrement() {
            this.$store.commit('decrement')
        },
        incrementBy() {
            this.$store.commit('incrementBy', { amount: 5 })
        },
        decrementBy() {
            this.$store.commit({ type: 'decrementBy', amount: 5 })
        }
    }

    // With mapMutations,
    // methods: mapMutations ([
    //     'increment',
    //     'decrement'
    // ])

});

store.commit('increment');
console.log(store.state.count);

store.commit('incrementBy', { amount: 14 });
console.log(store.state.count);

store.state.count = 1;
// Optionally you could do the commit above as follows:
store.commit({
    type: 'incrementBy',
    amount: 79
});
console.log(store.state.count)


// If we're bound to create additional properties then we can do the following.
// It is nevertheless rare that you run into such a situation which isn't ideal.
// So it's best to create all of your data within the 'state' upfront.

// Vue.set(obj, 'new prop', 123);
// state.obj = { ...state.obj, newProp: 123 };