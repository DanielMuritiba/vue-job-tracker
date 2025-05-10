import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import $ from "jquery";
window.$ = $;
window.jQuery = $;

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./global.css";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faUserCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faHome, faUserCircle);

createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
