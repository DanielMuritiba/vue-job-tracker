<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a class="navbar-brand ms-3">
        <img src="./assets/logo.png" height="40" />
        Jobs.Inc
      </a>

      <div class="navbar-nav me-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/home" active-class="active">
            Home
          </router-link>
        </li>
      </div>

      <div class="navbar-nav ms-auto me-4">
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
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style></style>
