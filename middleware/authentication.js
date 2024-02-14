export default async ({ $axios, store, redirect, app, route }) => {
    const jwtToken = app.$cookies.get("TOKEN");
    if (!jwtToken) redirect("/login")

    try {
        const res = await $axios
        .post("/api/usuarios/whoami", {
            headers: { Authorization: `Bearer ${jwtToken}` }
        });

        if (res) {
          const inOneDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // 24 horas desde ahora
          app.$cookies.set("TOKEN", jwtToken, { expires: inOneDay }); // Reestablece la cookie con la nueva fecha de expiración
        }
    } catch (error) {
      app.$cookies.remove("TOKEN");
        redirect('/login')
    }

}
