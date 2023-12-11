export default async ({ $axios, store, redirect, app, route }) => {
    const jwtToken = app.$cookies.get("TOKEN");
    
    if (jwtToken) {
        const res = await $axios
        .post("/api/usuarios/whoami", {
            headers: { Authorization: `Bearer ${jwtToken}` }
        });

        if (res) redirect("/");
    }

}