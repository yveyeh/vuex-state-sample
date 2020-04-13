import Vue from 'vue/dist/vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const moduleA = {
    namespaced: true, // makes the module more self-contained and reusable.
    state: { 
        count: 3
    },
    mutations: {
        increment(state) {
            state.count++
        }
    },
    getters: {
        doubleCount(state) {
            return state.count * 2  
        }
    },
    actions: {
        incrementIfOdd({state, commit}) {
            if (state.count % 2 === 1) {
                commit('increment');
            }
        }
    }
}

const moduleB = {
    namespaced: true,
    modules: {
        subModule: {
            namespaced: true,
            state: {
                
            },
            mutations: {
                login() {
                    console.log('Login from mutations.')
                }
            },
            getters: {
                login() {
                    console.log('Login from getters.')
                }
            },
            actions: {
                login() {
                    console.log('Login from actions.')
                }
            }
        }
    },
    state: {
        count: 5
    },
    mutations: {
        
    },
    getters: {
        // passing state and getters allows us to access state and getters in this module
        sampleGetter(state, getters, rootState, rootGetters) {
            state.count
            rootState.count
            
            getters.anotherSampleGetter
            rootGetters.sampleRootGetter
        },
        anotherSampleGetter() {
            console.log('Another sample getter in module B.')
        }
    },
    actions: {
        sampleAction({ dispatch, commit, getters, rootGetters }) {
            getters.sampleGetter
            rootGetters.sampleGetter

            // look into our module
            dispatch('anotherSampleGetter');

            // look into the store - takes in action type, payload, 
            // and an object setting root to true which tells vuex to 
            // "look inside the store".
            dispatch('sampleRootGetter', null, { root: true }); 

            commit('sampleMutation');

            commit('sampleRootMutation', null, { root: true }); 
        }
    }
}

const store = new Vuex.Store({
    modules: {
        a: moduleA,
        b: moduleB
    },
    state: {
        count: 2
    },
    mutations: {
        
    },
    getters: {
        // sampleRootGetter() {}
    },
    actions: {
        
    }
})

import { mapState, mapActions } from "vuex";


new Vue({ 
    el: '#modules',
    store,
    data: {
    },
    computed: mapState({
        a: state => state.a.count,
        b: state => state.b.subModule.count
    }),
    methods: mapActions([
        'some/nested/module/foo', // this['some/nested/module/foo']()     // foo is the action //
    ])
    // Another way (which is neat)
    // methods: mapActions('some/nested/module/foo', [
    //     'foo' // this.foo()
    // ])

});

// console.log(store.state.a.count)
// // console.log(store.state.b.count)
// store.commit('a/increment')
// console.log(store.state.a.count)

store.commit('b/subModule/login') // commit mutations.
store.dispatch('b/subModule/login') // dispatch actions.
store.getters['b/subModule/login'] // call getters.