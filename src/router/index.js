import { createRouter, createWebHistory } from "vue-router";

import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";
import Unauthorized from "../views/Unauthorized.vue";
import Home from "@/views/Home.vue";
import Profile from "@/views/Profile.vue";
import CompanyJobs from "@/views/CompanyJobs.vue";
import CreateVacancies from "@/views/CreateVacancies.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/CompanyJobs",
    name: "CompanyJobs",
    component: CompanyJobs,
  },
  {
    path: "/CreateVacancies",
    name: "CreateVacancies",
    component: CreateVacancies,
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
  },
  {
    path: "/401",
    name: "401",
    component: Unauthorized,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
