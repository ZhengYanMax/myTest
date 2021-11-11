export default {
    namespaced: true,
    state: {
        userinfo:{
            token: '',
            user:''
        }
    },
    mutations: {
        setUser(state, payload) {
            state.userinfo = payload;
        },
        deleteUser(state) {
            state.userinfo={
                token:'',
                user:''
            }
        }
    }

}