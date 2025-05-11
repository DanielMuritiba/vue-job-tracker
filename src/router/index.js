import { createRouter, createWebHistory } from "vue-router";

import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";
import Unauthorized from "../views/Unauthorized.vue";
import Home from "@/views/Home.vue";
import Profile from "@/views/Profile.vue";
import CompanyJobs from "@/views/CompanyJobs.vue";
import CreateVacancies from "@/views/CreateVacancies.vue";
import Role from "@/models/role";
import store from "@/store";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
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
    meta: { roles: [Role.USER] },
  },
  {
    path: "/CompanyJobs",
    name: "CompanyJobs",
    component: CompanyJobs,
    meta: { roles: [Role.COMPANY] },
  },
  {
    path: "/CreateVacancies",
    name: "CreateVacancies",
    component: CreateVacancies,
    meta: { roles: [Role.COMPANY] },
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

router.beforeEach((to, from, next) => {
  const requiredRoles = to.meta.roles;
  const currentUser = store.getters["currentUser"];

  if (requiredRoles?.length) {
    if (!currentUser) {
      return next({ path: "/login" });
    }

    if (!requiredRoles.includes(currentUser.role)) {
      return next({ path: "/401" });
    }
  }
  return next();
});
export default router;
