import { createStore } from 'vuex'
const store = createStore({
    state() {
        return {
           token: ''
        }
    },
    mutations: {
        increment(state, value) {
            state.token = value
        }
    }
})
export default store