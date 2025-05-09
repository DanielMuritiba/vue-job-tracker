<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a class="navbar-brand ms-3">
        <img src="./assets/logo.png" height="40" />
        Jobs.Inc
      </a>

      <div class="navbar-nav me-auto">
        <li class="nav-item" v-if="currentUser && isCompany">
          <router-link
            class="nav-link"
            to="/CreateVacancies"
            active-class="active"
          >
            Create vacancies
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/home" active-class="active">
            Home
          </router-link>
        </li>
      </div>

      <!-- User logged out -->
      <div class="navbar-nav ms-auto me-4" v-if="!currentUser">
        <li class="nav-item">
          <router-link class="nav-link" to="/register" active-class="active">
            Sign up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login" active-class="active">
            Sign in
          </router-link>
        </li>
      </div>

      <!-- User logged In -->
      <div class="navbar-nav ms-auto me-4" v-if="currentUser">
        <li class="nav-item" v-if="!isCompany">
          <router-link class="nav-link" to="/profile" active-class="active">
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item" v-if="isCompany">
          <router-link class="nav-link" to="/CompanyJobs" active-class="active">
            My job vacancies
          </router-link>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" @click="logOut"> Sign Out </a>
        </li>
      </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
import vuex from "vuex";
import Role from "./models/role";

export default {
  computed: {
    ...vuex.mapGetters(["currentUser"]),
    isCompany() {
      console.log("typeof currentUser.role:", typeof this.currentUser.role);
      console.log("typeof Role.COMPANY:", typeof Role.COMPANY);
      console.log(
        "currentUser.role === 'COMPANY':",
        this.currentUser?.role === "COMPANY"
      );

      return this.currentUser?.role == Role.COMPANY;
    },
  },
  methods: {
    ...vuex.mapActions(["clearUser"]),
    logOut() {
      this.clearUser();
      this.$router.push("/login");
    },
  },
};
</script>
<style></style>
