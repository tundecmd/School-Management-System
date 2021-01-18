import axios from "axios";
//import VueRouter from 'vue-router';


const state = {
    token: localStorage.getItem("token") || "",
    user: {},
    status: ""
};

const actions = {
    // Signin action
    async signin({ commit }, student) {
        commit("auth_request");
        let res = await axios.post("http://localhost:3000/api/students/login", student)
        if (res.data) {
            const token = res.data.token;
            const user = res.data.student;
            // store the token in the localStorage
            localStorage.setItem("token", token);
            // set the axios
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user)
        }
        return res;
    }
};

const mutations = {
    auth_request(state) {
        state.status = "loading"
    },
    auth_success(state, token, user) {
        state.token = token
        state.user = user
        state.status = "success"
    }
};

const getters = {
    isLoggedIn: state => !!state.token,
    authState: state => state.status,
    user: state => state.user
};

export default {
    state,
    getters,
    actions,
    mutations
}