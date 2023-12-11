export const state = () => ({
    User: null,
    Horas: []
});

export const mutations = {
    saveUser(state, User) {
        state.User = User;
    },
    saveEmpleado(state, EmpleadoNombre){
        state.EmpleadoNombre = EmpleadoNombre;
    },
    insertHora(state, Hora) {
        state.Horas.push(Hora);
    },
    deleteHora(state, indexHora) {
        state.Horas.splice(indexHora, 1)
    }
}