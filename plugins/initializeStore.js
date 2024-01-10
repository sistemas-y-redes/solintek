export default ({ store }) => {
    if (process.browser) {
        window.onNuxtReady(() => {
            if (localStorage.getItem('User')) {
                store.commit('saveUser', JSON.parse(localStorage.getItem('User')));
            }
            if (localStorage.getItem('UserInfo')) {
                store.commit('saveUserInfo', JSON.parse(localStorage.getItem('UserInfo')));
            }
            // Repite para los demás elementos del estado que necesitas inicializar
        });
    }
};