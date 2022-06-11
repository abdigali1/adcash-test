import { createApp } from "vue";
import store from "./stores";
import App from "./App.vue";

const app = createApp(App);
app.use(store).mount("#app");
