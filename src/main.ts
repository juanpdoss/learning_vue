import { createApp } from "vue";
import { createWebHashHistory, createRouter } from "vue-router";

import App from "./App.vue";
import Statistics from "./components/statistics.vue"
import Body from "./components/Body.vue"

import "./assets/main.css";

const routes = [
  { path: "/", component: Body },
  { path: "/statistics", component: Statistics },
];

const app = createApp(App);
const router = createRouter({
    routes,
    history: createWebHashHistory()
});

app.use(router);

app.mount("#app");
