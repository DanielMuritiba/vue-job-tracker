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
import AuthenticationService from "@/services/authentication.service";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "LoginView",

  data() {
    return {
      formData: new User(),
      loading: false,
      submitted: false,
      errorMessage: "",
    };
  },

  computed: {
    ...mapGetters(["currentUser"]),
  },

  mounted() {
    if (this.currentUser?.email) {
      this.$router.push("/home");
    }
  },

  methods: {
    ...mapActions(["updateUser"]),
    handleLogin() {
      if (!this.formData.email || !this.formData.password) {
        return;
      }

      this.loading = true;

      AuthenticationService.login(this.formData)
        .then((response) => {
          this.updateUser(response.data);
          this.$router.push("/home");
        })
        .catch((err) => {
          console.error(err);
          this.errorMessage = "There was a problem with your login.";
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped></style>
