<template>
  <div class="container mt-5">
    <div class="card ms-auto me-auto p-3 shadow-lg custom-card">
      <font-awesome-icon icon="user-circle" class="ms-auto me-auto user-icon" />

      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <form
        @submit.prevent="handleLogin"
        novalidate
        :class="submitted ? 'was-validated' : ''"
      >
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="formData.email"
            type="text"
            id="email"
            class="form-control"
            name="email"
            placeholder="Email"
            required
          />
          <div class="invalid-feedback">Email is required.</div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="formData.password"
            type="password"
            id="password"
            class="form-control"
            name="password"
            placeholder="Password"
            required
          />
          <div class="invalid-feedback">Password is required.</div>
        </div>

        <button
          class="btn btn-success w-100 mt-3"
          @click="submitted = true"
          :disabled="loading"
        >
          Sign in
        </button>
      </form>

      <router-link to="/register" class="btn btn-link" style="color: #004500">
        Create a new Account!
      </router-link>
    </div>
  </div>
</template>
<script>
import User from "@/models/user";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "LoginView",
  setup() {
    const formData = ref(new User());
    const loading = ref(false);
    const submitted = ref(false);
    const errorMessage = ref("");

    const store = useStore();
    const { currentUser } = store.getters;

    function handleLogin() {}

    return {
      formData,
      loading,
      submitted,
      errorMessage,
      currentUser,
      handleLogin,
    };
  },
};
</script>

<style scoped></style>
