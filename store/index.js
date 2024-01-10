
export const state = () => ({
    User: null,
    EmpleadoNombre: null,
    UserInfo: null,
    Horas: []
    // ... otros estados
});

export const mutations = {
    saveUser(state, User) {
        state.User = User;
        localStorage.setItem('User', JSON.stringify(User));
    },
    saveUserInfo(state, UserInfo) {
        state.UserInfo = UserInfo;
        localStorage.setItem('UserInfo', JSON.stringify(UserInfo));
    },
    insertHora(state, Hora) {
        state.Horas.push(Hora);
    },
    deleteHora(state, indexHora) {
        state.Horas.splice(indexHora, 1)
    }
}
