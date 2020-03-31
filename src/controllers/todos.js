import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import Todos from '../api/todos.mock';
// import { mapGetters } from 'vuex';

Vue.use(Vuex);

require('../styles/todos.css');

const store = new Vuex.Store({

    state: {
        todos: Todos
    },

    // Using computed properties, we will have to recreate our object anywhere
    // it is needed and this could make our code more verbose and harder to maintain.
    // So let's use getters, which solves the issue or situation.
    // Think of getters as computed properties for the Store. 
    // The result will be cached, and will only reevaluate when a dependency in it updates.
    // Getters always recieve state as their first property so we can access our data.
    // We can create getters that depend on other getters.
    getters: {
        /**
         * An array of todo items that have already been completed. 
         * @return array
         */
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        },

        /**
         * An array of todo items that have not yet been completed.
         *  @return array
         */
        undoneTodos: state => {
            return state.todos.filter(todo => !todo.done)
        },

        /**
         * The number of already completed todo items.
         *  @return number
         */
        doneTodosCount: (state, getters) => {
            return getters.doneTodos.length
        },

        /**
         * The number of uncompleted todo items.
         *  @return number
         */
        undoneTodosCount: (state, getters) => {
            return getters.undoneTodos.length
        },

        /** 
         * Gets a todo item by title.
         * @return object
         */
        getTodoByTitle: (state) => (title) => {
            return state.todos.find(todo => todo.title === title)
        }
    }
});

new Vue({ 
    el: '#todos',
    store: store,
    data() {
        return {
            doneTodosCount: this.$store.getters.doneTodosCount,
            undoneTodosCount: this.$store.getters.undoneTodosCount
        }
    },
    // We can access getters using computed properties.
    computed: {
        todosCount() {
            return {
                done: this.$store.getters.doneTodosCount,
                undone: this.$store.getters.undoneTodosCount
            }
        }
    }
    // computed: mapGetters([
    //     // Grab all the getters and directly use in our apllication.
    //     'doneTodos', 'undoneTodos', 'doneTodosCount', 'undoneTodosCount', 'getTodoByTitle'
    // ])

});

// console.log(store.getters.doneTodos)
// console.log(store.getters.undoneTodos)
// console.log(store.getters.doneTodosCount)
// console.log(store.getters.undoneTodosCount)

// console.log(store.getters.getTodoByTitle('Todo 2'))
