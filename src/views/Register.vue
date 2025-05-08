<template>
  <div class="container mt-5">
    <div class="card ms-auto me-auto p-3 shadow-lg custom-card">
      <font-awesome-icon icon="user-circle" class="ms-auto me-auto user-icon" />

      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <form
        @submit.prevent="handleRegister"
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
          <label for="username">Username</label>
          <input
            v-model="formData.username"
            type="text"
            id="username"
            class="form-control"
            name="username"
            placeholder="Username"
            required
          />
          <div class="invalid-feedback">Username is required.</div>
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

        <div class="d-flex justify-content-center gap-4 mt-2 mb-2">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              id="roleUser"
              value="USER"
              v-model="formData.role"
              name="role"
            />
            <label class="form-check-label" for="roleUser">User</label>
          </div>

          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              id="roleCompany"
              value="COMPANY"
              v-model="formData.role"
              name="role"
            />
            <label class="form-check-label" for="roleCompany">Company</label>
          </div>
        </div>

        <div v-if="!formData.role && submitted" class="text-danger mb-2">
          Please select a role.
        </div>

        <button
          class="btn btn-success w-100 mt-3"
          @click="submitted = true"
          :disabled="loading"
        >
          Sign up
        </button>
      </form>

      <router-link to="/login" class="btn btn-link" style="color: #004500">
        I have an Account!
      </router-link>
    </div>
  </div>
</template>
<script>
import User from "@/models/user";
import AuthenticationService from "@/services/authentication.service";
import vuex from "vuex";

export default {
  name: "registerView",
  data() {
    return {
      formData: new User(),
      loading: false,
      submitted: false,
      errorMessage: "",
    };
  },
  computed: {
    ...vuex.mapGetters(["currentUser"]),
  },
  mounted() {
    if (this.currentUser?.email) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister() {
      if (
        !this.formData.username ||
        !this.formData.password ||
        !this.formData.email ||
        !this.formData.role
      ) {
        return;
      }

      this.loading = true;

      AuthenticationService.register(this.formData)
        .then(() => {
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.status === 409) {
            this.errorMessage = "Email already exists.";
          } else {
            this.errorMessage = "Unexpected error occurred.";
          }
        })
        .then(() => (this.loading = false));
    },
  },
};
</script>

<style scoped></style>
