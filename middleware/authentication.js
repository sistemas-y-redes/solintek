export default async ({ $axios, store, redirect, app, route }) => {
    const jwtToken = app.$cookies.get("TOKEN");
    if (!jwtToken) redirect("/login")

    try {
        const res = await $axios
        .post("/api/usuarios/whoami", {
            headers: { Authorization: `Bearer ${jwtToken}` }
        });

        if (res) {
            store.commit('saveUser', res.data.username);
            store.commit('saveEmpleado', res.data.empleadoNombre);
        }
    } catch (error) {
        app.$cookies.set("TOKEN", "");
        redirect('/login')
    }
    
}